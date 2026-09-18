import "server-only";

import { getSql } from "@/lib/db";
import { formatHours, type EduKind } from "./format";
import { notifyHoursGranted, notifyOrderPlaced } from "./notify";
import { findPackage, type EduPackage } from "./packages";

/**
 * Package orders for edukacija.
 *
 * The buyer places one from /edukacija/porudzbina after signing in; hours only
 * appear once /os marks it paid. See db/migrations/014_edu_orders.sql for why
 * the order and the hour ledger are deliberately two things.
 */

export type EduOrderStatus = "nova" | "placena" | "otkazana";

export type EduOrder = {
  id: string;
  portalUserId: string;
  packageId: string;
  hours: number;
  priceEur: number;
  kind: EduKind;
  status: EduOrderStatus;
  goal: string | null;
  phone: string | null;
  createdAt: string;
  paidAt: string | null;
};

export type StudioOrder = EduOrder & {
  email: string;
  fullName: string | null;
};

const ORDER_COLUMNS = `
  o.id, o.portal_user_id as "portalUserId", o.package_id as "packageId",
  o.hours::float8 as "hours", o.price_eur::float8 as "priceEur", o.kind, o.status,
  o.goal, o.phone,
  to_char(o.created_at at time zone 'Europe/Belgrade', 'DD.MM.YYYY. HH24:MI') as "createdAt",
  to_char(o.paid_at at time zone 'Europe/Belgrade', 'DD.MM.YYYY. HH24:MI') as "paidAt"
`;

const clean = (value: string | null | undefined, max: number): string | null => {
  const text = (value ?? "").trim();
  return text === "" ? null : text.slice(0, max);
};

export type PlaceOrderInput = {
  portalUserId: string;
  email: string;
  fullName: string | null;
  packageId: string;
  goal?: string | null;
  phone?: string | null;
};

export type PlaceOrderResult =
  | { ok: true; order: EduOrder }
  | { ok: false; code: "package" | "duplicate"; message: string };

/**
 * Records the order and tells the owner.
 *
 * A pending order blocks a second one: a buyer who double-submits, or who comes
 * back an hour later wondering whether it went through, must not leave two rows
 * for Đorđe to reconcile by hand.
 */
export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const pkg: EduPackage | null = findPackage(input.packageId);
  if (!pkg) {
    return { ok: false, code: "package", message: "Taj paket ne postoji. Izaberi jedan od ponuđenih." };
  }

  const sql = getSql();
  const pending = (await sql`
    select id from edu_orders
    where portal_user_id = ${input.portalUserId} and status = 'nova'
    limit 1
  `) as { id: string }[];
  if (pending.length > 0) {
    return {
      ok: false,
      code: "duplicate",
      message:
        "Već imaš porudžbinu koja čeka uplatu. Instrukcije su ti stigle na mejl — odgovori na taj mejl ako treba izmena.",
    };
  }

  const goal = clean(input.goal, 2000);
  const phone = clean(input.phone, 40);
  const rows = (await sql.query(
    `insert into edu_orders (portal_user_id, package_id, hours, price_eur, goal, phone)
     values ($1, $2, $3, $4, $5, $6)
     returning ${ORDER_COLUMNS.replaceAll("o.", "")}`,
    [input.portalUserId, pkg.id, pkg.hours, pkg.priceEur, goal, phone],
  )) as EduOrder[];

  const order = rows[0];
  await notifyOrderPlaced(
    { email: input.email, fullName: input.fullName },
    { packageLabel: pkg.label, hours: pkg.hours, priceEur: pkg.priceEur, goal, phone },
  );
  return { ok: true, order };
}

export async function listBuyerOrders(portalUserId: string): Promise<EduOrder[]> {
  const sql = getSql();
  return (await sql.query(
    `select ${ORDER_COLUMNS} from edu_orders o
     where o.portal_user_id = $1
     order by o.created_at desc
     limit 50`,
    [portalUserId],
  )) as EduOrder[];
}

export async function listStudioOrders(limit = 50): Promise<StudioOrder[]> {
  const sql = getSql();
  return (await sql.query(
    `select ${ORDER_COLUMNS}, u.email, u.full_name as "fullName"
     from edu_orders o join portal_users u on u.id = o.portal_user_id
     order by (o.status = 'nova') desc, o.created_at desc
     limit $1`,
    [limit],
  )) as StudioOrder[];
}

/**
 * Marks an order paid and credits its hours.
 *
 * The UPDATE claims the order — a second click finds no 'nova' row and stops
 * before the ledger, so one order can never credit hours twice.
 */
export async function markOrderPaid(
  id: string,
  createdBy: string,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const sql = getSql();
  const claimed = (await sql`
    update edu_orders set status = 'placena', paid_at = now()
    where id = ${id} and status = 'nova'
    returning id, portal_user_id as "portalUserId", hours::float8 as "hours",
      kind, package_id as "packageId"
  `) as { id: string; portalUserId: string; hours: number; kind: EduKind; packageId: string }[];

  const order = claimed[0];
  if (!order) return { ok: false, message: "Porudžbina je već zatvorena ili ne postoji." };

  const entry = (await sql`
    insert into edu_hour_entries (portal_user_id, kind, hours, reason, note, created_by)
    values (${order.portalUserId}, ${order.kind}, ${order.hours}, 'purchase',
            ${`Paket ${order.packageId} sa sajta`}, ${createdBy})
    returning id
  `) as { id: number }[];

  await sql`update edu_orders set hours_entry_id = ${entry[0]?.id ?? null} where id = ${order.id}`;

  const user = (await sql`
    select email, full_name as "fullName" from portal_users where id = ${order.portalUserId}
  `) as { email: string; fullName: string | null }[];

  const mailed = user[0]
    ? await notifyHoursGranted(user[0], {
        hours: order.hours,
        kind: order.kind,
        note: "Paket je plaćen — sati su na nalogu.",
      })
    : false;

  return {
    ok: true,
    message: `Dodato ${formatHours(order.hours)}.${mailed ? " Klijent obavešten mejlom." : ""}`,
  };
}

export async function cancelOrder(id: string): Promise<boolean> {
  const sql = getSql();
  const rows = (await sql`
    update edu_orders set status = 'otkazana'
    where id = ${id} and status = 'nova'
    returning id
  `) as { id: string }[];
  return rows.length > 0;
}
