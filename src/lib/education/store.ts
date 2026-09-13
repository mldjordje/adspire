import "server-only";

import { z } from "zod";

import { getSql } from "@/lib/db";
import { findPortalUserByEmail, upsertPortalUser } from "@/lib/portal/users";
import {
  isEduKind,
  ledgerReason,
  formatHours,
  type BookingStatus,
  type EduKind,
  type LedgerReason,
} from "./format";
import {
  notifyBooked,
  notifyCanceledByBuyer,
  notifyCanceledByStudio,
  notifyHoursGranted,
  notifyLowBalance,
  notifyMeetLink,
  type Person,
} from "./notify";
import {
  belgradeNow,
  CANCEL_CUTOFF_HOURS,
  isDate,
  isMonth,
  MAX_BOOKING_HOURS,
  minutesUntil,
  monthRange,
  SLOT_PATTERN,
  slotSequence,
} from "./slots";

/**
 * Edukacija: hour wallets and the sessions booked against them.
 *
 * The Neon HTTP driver has no interactive transaction, so every multi-step
 * write here is ordered so a crash leaves the safer half-state, and every
 * transition is claimed with a guarded UPDATE or a unique index rather than a
 * preceding read.
 */

// ── Types ───────────────────────────────────────────────────────────────────

export type WalletBalance = {
  kind: EduKind;
  purchased: number;
  used: number;
  remaining: number;
};

export type EduBooking = {
  id: string;
  kind: EduKind;
  date: string;
  startSlot: string;
  hours: number;
  status: BookingStatus;
  topic: string | null;
  meetUrl: string | null;
  recordingUrl: string | null;
};

export type StudioBooking = EduBooking & {
  portalUserId: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  cancelReason: string | null;
};

export type BookingFailure = "invalid" | "past" | "closed" | "taken" | "balance" | "not_found" | "too_late";

export type BookingResult =
  | { ok: true; booking: EduBooking }
  | { ok: false; code: BookingFailure; message: string };

export type AvailableDay = { date: string; slots: string[] };

const BOOKING_COLUMNS = `
  b.id, b.kind, b.date::text as "date", b.start_slot as "startSlot", b.hours,
  b.status, b.topic, b.meet_url as "meetUrl", b.recording_url as "recordingUrl"
`;

const fail = (code: BookingFailure, message: string): BookingResult => ({ ok: false, code, message });

const personOf = (row: { email: string; fullName: string | null }): Person => ({
  email: row.email,
  fullName: row.fullName,
});

// ── Wallet ──────────────────────────────────────────────────────────────────

/**
 * Balance per kind. Education and consulting hours are separate pots and are
 * never spent against each other. A refund is a positive row too, so it is kept
 * out of "purchased" — otherwise every cancellation would inflate the total.
 */
export async function getWallets(portalUserId: string): Promise<WalletBalance[]> {
  const sql = getSql();
  const rows = (await sql`
    select kind,
      coalesce(sum(hours) filter (where hours > 0 and reason <> 'refund'), 0)::float8 as purchased,
      coalesce(sum(hours), 0)::float8 as remaining
    from edu_hour_entries
    where portal_user_id = ${portalUserId}
    group by kind
    order by kind
  `) as { kind: EduKind; purchased: number; remaining: number }[];
  return rows.map((row) => ({ ...row, used: Math.max(0, row.purchased - row.remaining) }));
}

export async function getBalance(portalUserId: string, kind: EduKind): Promise<number> {
  const sql = getSql();
  const rows = (await sql`
    select coalesce(sum(hours), 0)::float8 as remaining
    from edu_hour_entries where portal_user_id = ${portalUserId} and kind = ${kind}
  `) as { remaining: number }[];
  return rows[0]?.remaining ?? 0;
}

// ── Buyer side ──────────────────────────────────────────────────────────────

/**
 * Open slots per day for a month, minus everything booked and every hour that
 * has already passed. The /os editor reads the raw schedule instead.
 */
export async function getAvailableMonth(month: string): Promise<AvailableDay[]> {
  if (!isMonth(month)) return [];
  const { start, end } = monthRange(month);
  const sql = getSql();
  const rows = (await sql`
    select a.date::text as "date", a.slots,
      array(select s.slot from edu_booking_slots s where s.date = a.date) as taken
    from edu_availability a
    where a.date >= ${start}::date and a.date < ${end}::date
    order by a.date
  `) as { date: string; slots: string[]; taken: string[] }[];

  const now = belgradeNow();
  const days: AvailableDay[] = [];
  for (const row of rows) {
    if (row.date < now.date) continue;
    const taken = new Set(row.taken);
    const free = row.slots
      .filter((slot) => SLOT_PATTERN.test(slot) && !taken.has(slot))
      .filter((slot) => (minutesUntil(row.date, slot, now) ?? -1) > 0)
      .sort();
    if (free.length > 0) days.push({ date: row.date, slots: free });
  }
  return days;
}

export async function getBuyerBookings(
  portalUserId: string,
): Promise<{ upcoming: EduBooking[]; past: EduBooking[] }> {
  const sql = getSql();
  const rows = (await sql.query(
    `select ${BOOKING_COLUMNS} from edu_bookings b
     where b.portal_user_id = $1
     order by b.date desc, b.start_slot desc
     limit 100`,
    [portalUserId],
  )) as EduBooking[];

  const today = belgradeNow().date;
  const upcoming = rows.filter((b) => b.status === "zakazano" && b.date >= today).reverse();
  const past = rows.filter((b) => !(b.status === "zakazano" && b.date >= today));
  return { upcoming, past };
}

export type BuyerLedgerEntry = {
  id: string;
  kind: EduKind;
  hours: number;
  reason: LedgerReason;
  note: string | null;
  createdAt: string;
};

/** The buyer's own wallet history — where every hour came from and went. */
export async function listBuyerLedger(portalUserId: string, limit = 50): Promise<BuyerLedgerEntry[]> {
  const sql = getSql();
  return (await sql`
    select id::text as id, kind, hours::float8 as hours, reason, note,
      to_char(created_at at time zone 'Europe/Belgrade', 'DD.MM.YYYY.') as "createdAt"
    from edu_hour_entries
    where portal_user_id = ${portalUserId}
    order by created_at desc
    limit ${limit}
  `) as BuyerLedgerEntry[];
}

export type BookingInput = {
  date: string;
  startSlot: string;
  hours: number;
  kind: unknown;
  topic?: string | null;
};

/**
 * Reserve a session. Every failure returns a code rather than throwing, so the
 * route can turn "someone took this slot while you were choosing" into a 409
 * the calendar knows how to recover from.
 */
export async function createBooking(portalUserId: string, input: BookingInput): Promise<BookingResult> {
  const { date, startSlot, kind } = input;
  const hours = Number(input.hours);
  const topic = typeof input.topic === "string" ? input.topic.trim().slice(0, 300) || null : null;

  if (!isDate(date) || !SLOT_PATTERN.test(startSlot)) return fail("invalid", "Neispravan termin.");
  if (!isEduKind(kind)) return fail("invalid", "Neispravan tip sesije.");
  const sequence = slotSequence(startSlot, hours);
  if (!sequence) {
    return fail("invalid", `Trajanje mora biti ceo broj sati, najviše ${MAX_BOOKING_HOURS}.`);
  }
  if ((minutesUntil(date, startSlot, belgradeNow()) ?? -1) <= 0) {
    return fail("past", "Taj termin je već prošao.");
  }

  const sql = getSql();

  // Advisory read: the primary key on edu_booking_slots is what decides, but
  // reading first lets the common case fail with a useful message.
  const dayRows = (await sql`
    select a.slots,
      array(select s.slot from edu_booking_slots s where s.date = a.date) as taken
    from edu_availability a where a.date = ${date}::date
  `) as { slots: string[]; taken: string[] }[];
  const day = dayRows[0];
  if (!day) return fail("closed", "Taj dan nije otvoren za termine.");
  const open = new Set(day.slots);
  if (!sequence.every((slot) => open.has(slot))) {
    return fail("closed", "Izabrano trajanje ne staje u otvorene termine tog dana.");
  }
  const taken = new Set(day.taken);
  if (sequence.some((slot) => taken.has(slot))) {
    return fail("taken", "Termin je u međuvremenu zauzet.");
  }

  const balance = await getBalance(portalUserId, kind);
  if (balance < hours) {
    return fail("balance", `Na stanju imaš ${formatHours(balance)} — nedovoljno za ovaj termin.`);
  }

  const created = (await sql`
    insert into edu_bookings (portal_user_id, kind, date, start_slot, hours, topic)
    values (${portalUserId}, ${kind}, ${date}::date, ${startSlot}, ${hours}, ${topic})
    returning id
  `) as { id: string }[];
  const bookingId = created[0]?.id;
  if (!bookingId) return fail("invalid", "Termin nije sačuvan.");

  // The claim. Partial success means someone else holds one of the hours, so
  // the whole booking is undone — slots and debit cascade with it.
  const claimed = (await sql`
    insert into edu_booking_slots (booking_id, date, slot)
    select ${bookingId}, ${date}::date, s from unnest(${sequence}::text[]) as s
    on conflict (date, slot) do nothing
    returning slot
  `) as { slot: string }[];
  if (claimed.length !== sequence.length) {
    await sql`delete from edu_bookings where id = ${bookingId}`;
    return fail("taken", "Termin je upravo zauzet. Izaberi drugi.");
  }

  await sql`
    insert into edu_hour_entries (portal_user_id, kind, hours, reason, booking_id, note)
    values (${portalUserId}, ${kind}, ${-hours}, 'booking', ${bookingId}, ${`termin ${date} ${startSlot}`})
  `;

  // Re-read after the debit: two bookings started at the same moment can both
  // see enough hours before it, and only the ledger knows the truth.
  const remaining = await getBalance(portalUserId, kind);
  if (remaining < 0) {
    await sql`delete from edu_bookings where id = ${bookingId}`;
    return fail("balance", "Nemaš dovoljno sati na stanju.");
  }

  const booking: EduBooking = {
    id: bookingId,
    kind,
    date,
    startSlot,
    hours,
    status: "zakazano",
    topic,
    meetUrl: null,
    recordingUrl: null,
  };

  const people = (await sql`
    select email, full_name as "fullName" from portal_users where id = ${portalUserId}
  `) as { email: string; fullName: string | null }[];
  if (people[0]) {
    await notifyBooked(personOf(people[0]), booking);
    // Crossing below one hour happens once per wallet top-up: nothing smaller
    // than an hour can be booked, so this booking was the last one.
    if (remaining < 1 && remaining + hours >= 1) {
      await notifyLowBalance(personOf(people[0]), { kind, remaining });
    }
  }

  return { ok: true, booking };
}

/**
 * Flip a booking to `otkazano`, free its slots and — unless the studio is
 * writing the session off — put the hours back.
 *
 * The status guard on the UPDATE is the whole safety mechanism: only the caller
 * that performs the transition refunds. The partial unique index on refunds is
 * the second belt. Slots are freed before the credit: a refunded wallet with a
 * still-blocked hour is the worse half-state.
 */
async function releaseBooking(
  booking: { id: string; portalUserId: string; kind: EduKind; hours: number; date: string; startSlot: string },
  refund: boolean,
  reason: string | null,
): Promise<boolean> {
  const sql = getSql();
  const closed = (await sql`
    update edu_bookings
    set status = 'otkazano', canceled_at = now(), cancel_reason = ${reason}
    where id = ${booking.id} and status = 'zakazano'
    returning id
  `) as { id: string }[];
  if (closed.length === 0) return false;

  await sql`delete from edu_booking_slots where booking_id = ${booking.id}`;
  if (refund) {
    await sql`
      insert into edu_hour_entries (portal_user_id, kind, hours, reason, booking_id, note)
      values (${booking.portalUserId}, ${booking.kind}, ${booking.hours}, 'refund', ${booking.id},
              ${`otkazan termin ${booking.date} ${booking.startSlot}`})
      on conflict (booking_id) where reason = 'refund' do nothing
    `;
  }
  return true;
}

async function getStudioBooking(bookingId: string): Promise<StudioBooking | null> {
  if (!z.uuid().safeParse(bookingId).success) return null;
  const sql = getSql();
  const rows = (await sql.query(
    `select ${BOOKING_COLUMNS}, b.portal_user_id as "portalUserId", b.cancel_reason as "cancelReason",
       u.email, u.full_name as "fullName", u.phone
     from edu_bookings b join portal_users u on u.id = b.portal_user_id
     where b.id = $1`,
    [bookingId],
  )) as StudioBooking[];
  return rows[0] ?? null;
}

/** The buyer cancels their own session, no later than the cutoff. */
export async function cancelBookingAsBuyer(portalUserId: string, bookingId: string): Promise<BookingResult> {
  const booking = await getStudioBooking(bookingId);
  if (!booking || booking.portalUserId !== portalUserId) {
    return fail("not_found", "Termin nije pronađen.");
  }
  if (booking.status !== "zakazano") return fail("not_found", "Termin je već zatvoren.");

  const left = minutesUntil(booking.date, booking.startSlot, belgradeNow()) ?? -1;
  if (left < CANCEL_CUTOFF_HOURS * 60) {
    return fail(
      "too_late",
      `Otkazivanje je moguće najkasnije ${CANCEL_CUTOFF_HOURS}h pre termina. Javi se direktno.`,
    );
  }

  if (!(await releaseBooking(booking, true, "Otkazao klijent."))) {
    return fail("not_found", "Termin je već zatvoren.");
  }
  await notifyCanceledByBuyer(personOf(booking), booking);
  return { ok: true, booking: { ...booking, status: "otkazano" } };
}

// ── Studio side (/os) ───────────────────────────────────────────────────────

export type StudioFilter = "upcoming" | "past" | "all";

export async function listStudioBookings(filter: StudioFilter): Promise<StudioBooking[]> {
  const sql = getSql();
  const rows = (await sql.query(
    `select ${BOOKING_COLUMNS}, b.portal_user_id as "portalUserId", b.cancel_reason as "cancelReason",
       u.email, u.full_name as "fullName", u.phone
     from edu_bookings b join portal_users u on u.id = b.portal_user_id
     order by b.date desc, b.start_slot desc
     limit 300`,
  )) as StudioBooking[];

  const today = belgradeNow().date;
  const isUpcoming = (b: StudioBooking) => b.status === "zakazano" && b.date >= today;
  if (filter === "upcoming") return rows.filter(isUpcoming).reverse();
  if (filter === "past") return rows.filter((b) => !isUpcoming(b));
  return rows;
}

/**
 * The studio cancels. No cutoff — the 24h rule protects the studio's calendar
 * from last-minute buyer changes, not the studio from itself. `refund: false`
 * is the no-show that keeps the hours spent.
 */
export async function cancelBookingAsStudio(
  bookingId: string,
  options: { refund: boolean; reason: string | null },
): Promise<{ ok: boolean; message: string }> {
  const booking = await getStudioBooking(bookingId);
  if (!booking || booking.status !== "zakazano") {
    return { ok: false, message: "Termin nije pronađen ili je već zatvoren." };
  }
  if (!(await releaseBooking(booking, options.refund, options.reason))) {
    return { ok: false, message: "Termin je već zatvoren." };
  }
  await notifyCanceledByStudio(personOf(booking), booking, options);
  return {
    ok: true,
    message: options.refund ? "Otkazano, sati vraćeni." : "Otkazano bez povraćaja sati.",
  };
}

/** Hours stay spent — the session happened. Only the status moves. */
export async function markBookingHeld(bookingId: string): Promise<boolean> {
  if (!z.uuid().safeParse(bookingId).success) return false;
  const sql = getSql();
  const rows = (await sql`
    update edu_bookings set status = 'odrzano'
    where id = ${bookingId} and status = 'zakazano'
    returning id
  `) as { id: string }[];
  return rows.length > 0;
}

/**
 * Store a pasted meeting or recording link. The client is mailed only when a
 * meeting link actually appears or changes — saving the same row twice must not
 * send the same notice twice.
 */
export async function setBookingLink(
  bookingId: string,
  field: "meet" | "recording",
  url: string | null,
): Promise<{ ok: boolean; notified: boolean }> {
  const booking = await getStudioBooking(bookingId);
  if (!booking) return { ok: false, notified: false };
  const sql = getSql();

  if (field === "recording") {
    await sql`update edu_bookings set recording_url = ${url} where id = ${bookingId}`;
    return { ok: true, notified: false };
  }

  await sql`update edu_bookings set meet_url = ${url} where id = ${bookingId}`;
  const changed = url !== null && url !== booking.meetUrl && booking.status === "zakazano";
  if (changed) await notifyMeetLink(personOf(booking), { ...booking, meetUrl: url });
  return { ok: true, notified: changed };
}

export type AvailabilityDay = { date: string; slots: string[]; taken: string[] };

/** The raw schedule for /os, with booked hours alongside so closing a booked
 *  hour is visible rather than silent. */
export async function getAvailabilityMonth(month: string): Promise<AvailabilityDay[]> {
  if (!isMonth(month)) return [];
  const { start, end } = monthRange(month);
  const sql = getSql();
  return (await sql`
    select d.date::text as "date",
      coalesce((select a.slots from edu_availability a where a.date = d.date), '{}') as slots,
      array(select s.slot from edu_booking_slots s where s.date = d.date order by s.slot) as taken
    from (
      select date from edu_availability where date >= ${start}::date and date < ${end}::date
      union
      select date from edu_booking_slots where date >= ${start}::date and date < ${end}::date
    ) d
    order by d.date
  `) as AvailabilityDay[];
}

/** Empty slots closes the day. Booked sessions are not touched either way. */
export async function setAvailability(dates: string[], slots: string[]): Promise<void> {
  const clean = Array.from(new Set(slots.filter((slot) => SLOT_PATTERN.test(slot)))).sort();
  const sql = getSql();
  for (const date of dates.filter(isDate)) {
    if (clean.length === 0) {
      await sql`delete from edu_availability where date = ${date}::date`;
    } else {
      await sql`
        insert into edu_availability (date, slots) values (${date}::date, ${clean})
        on conflict (date) do update set slots = excluded.slots, updated_at = now()
      `;
    }
  }
}

export type Participant = {
  id: string;
  email: string;
  fullName: string | null;
  education: number;
  consulting: number;
  purchased: number;
  lastChange: string;
};

export async function listParticipants(): Promise<Participant[]> {
  const sql = getSql();
  return (await sql`
    select u.id, u.email, u.full_name as "fullName",
      coalesce(sum(e.hours) filter (where e.kind = 'education'), 0)::float8 as education,
      coalesce(sum(e.hours) filter (where e.kind = 'consulting'), 0)::float8 as consulting,
      coalesce(sum(e.hours) filter (where e.hours > 0 and e.reason <> 'refund'), 0)::float8 as purchased,
      to_char(max(e.created_at) at time zone 'Europe/Belgrade', 'DD.MM.YYYY.') as "lastChange"
    from edu_hour_entries e
    join portal_users u on u.id = e.portal_user_id
    group by u.id
    order by max(e.created_at) desc
  `) as Participant[];
}

export type LedgerEntry = {
  id: string;
  email: string;
  kind: EduKind;
  hours: number;
  reason: LedgerReason;
  note: string | null;
  invoiceNumber: string | null;
  createdBy: string | null;
  createdAt: string;
};

export async function listLedger(limit = 30): Promise<LedgerEntry[]> {
  const sql = getSql();
  return (await sql`
    select e.id::text as id, u.email, e.kind, e.hours::float8 as hours, e.reason, e.note,
      i.number as "invoiceNumber", e.created_by as "createdBy",
      to_char(e.created_at at time zone 'Europe/Belgrade', 'DD.MM.YYYY. HH24:MI') as "createdAt"
    from edu_hour_entries e
    join portal_users u on u.id = e.portal_user_id
    left join invoices i on i.id = e.invoice_id
    order by e.created_at desc
    limit ${limit}
  `) as LedgerEntry[];
}

export type InvoiceOption = { id: string; label: string };

/** Recent invoices to link a grant to, so "who paid for these hours" has an answer. */
export async function listInvoiceOptions(): Promise<InvoiceOption[]> {
  const sql = getSql();
  return (await sql`
    select id, number || ' · ' || coalesce(buyer->>'companyName', buyer->>'name', '—') || ' · ' || total::text || ' ' || currency as label
    from invoices
    order by issue_date desc, created_at desc
    limit 40
  `) as InvoiceOption[];
}

const grantSchema = z.object({
  email: z.string().trim().max(254).toLowerCase().pipe(z.email()),
  fullName: z.string().trim().max(120).nullable(),
  kind: z.enum(["education", "consulting"]),
  hours: z.number().finite().refine((h) => h !== 0 && Math.abs(h) <= 200),
  reason: z.string().nullable(),
  note: z.string().trim().max(300).nullable(),
  invoiceId: z.uuid().nullable(),
  notify: z.boolean(),
  createdBy: z.string().nullable(),
});

export type GrantInput = z.input<typeof grantSchema>;

/**
 * Hand hours to a client — after an invoice is paid, or for anything agreed
 * outside the calendar — or take them back off.
 *
 * Adding creates the portal account when there is none: the client then logs in
 * with the magic link and finds the hours waiting. Subtracting never creates an
 * account and never pushes a balance below zero.
 */
export async function grantHours(
  input: GrantInput,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const parsed = grantSchema.safeParse({ ...input, hours: Math.round(Number(input.hours) * 100) / 100 });
  if (!parsed.success) {
    return { ok: false, message: "Proveri email i broj sati (različit od nule, najviše 200)." };
  }
  const grant = parsed.data;

  const user =
    grant.hours > 0
      ? await upsertPortalUser(grant.email, { fullName: grant.fullName })
      : await findPortalUserByEmail(grant.email);
  if (!user) return { ok: false, message: "Taj klijent nema nalog ni sate za oduzimanje." };

  const balance = await getBalance(user.id, grant.kind);
  if (balance + grant.hours < 0) {
    return {
      ok: false,
      message: `Klijent ima ${formatHours(balance)} — oduzimanje bi dalo minus.`,
    };
  }

  const reason = ledgerReason(grant.hours, grant.reason, grant.invoiceId !== null);
  const sql = getSql();
  await sql`
    insert into edu_hour_entries (portal_user_id, kind, hours, reason, invoice_id, note, created_by)
    values (${user.id}, ${grant.kind}, ${grant.hours}, ${reason}, ${grant.invoiceId},
            ${grant.note}, ${grant.createdBy})
  `;

  let mailed = false;
  if (grant.notify && grant.hours > 0) {
    mailed = await notifyHoursGranted(
      { email: user.email, fullName: user.full_name },
      { hours: grant.hours, kind: grant.kind, note: grant.note },
    );
  }

  const after = formatHours(balance + grant.hours);
  return {
    ok: true,
    message: `${grant.email}: ${grant.hours > 0 ? "+" : ""}${formatHours(grant.hours)}, stanje ${after}.${
      mailed ? " Klijent obavešten mejlom." : ""
    }`,
  };
}
