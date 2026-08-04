import "server-only";

import { getSql } from "@/lib/db";

export type ClientRow = {
  id: string;
  companyName: string;
  contactPerson: string | null;
  email: string | null;
  emailCc: string | null;
  address: string | null;
  city: string | null;
  country: string;
  pib: string | null;
  mb: string | null;
  phone: string | null;
  notes: string | null;
  active: boolean;
};

type RawClient = {
  id: string;
  company_name: string;
  contact_person: string | null;
  email: string | null;
  email_cc: string | null;
  address: string | null;
  city: string | null;
  country: string;
  pib: string | null;
  mb: string | null;
  phone: string | null;
  notes: string | null;
  active: boolean;
};

const toClient = (raw: RawClient): ClientRow => ({
  id: raw.id,
  companyName: raw.company_name,
  contactPerson: raw.contact_person,
  email: raw.email,
  emailCc: raw.email_cc,
  address: raw.address,
  city: raw.city,
  country: raw.country,
  pib: raw.pib,
  mb: raw.mb,
  phone: raw.phone,
  notes: raw.notes,
  active: raw.active,
});

export type ClientListRow = ClientRow & {
  mrr: number;
  invoiceCount: number;
};

export async function listClients(): Promise<ClientListRow[]> {
  const sql = getSql();
  const rows = (await sql`
    select c.*,
      coalesce((
        select sum(s.monthly_price * s.quantity) from subscriptions s
        where s.client_id = c.id and s.active
      ), 0) as mrr,
      (select count(*) from invoices i where i.client_id = c.id) as invoice_count
    from clients c
    order by c.active desc, lower(c.company_name)
  `) as (RawClient & { mrr: string; invoice_count: string })[];

  return rows.map((raw) => ({
    ...toClient(raw),
    mrr: Number(raw.mrr),
    invoiceCount: Number(raw.invoice_count),
  }));
}

export async function getClient(id: string): Promise<ClientRow | null> {
  const sql = getSql();
  const rows = (await sql`select * from clients where id = ${id}`) as RawClient[];
  return rows[0] ? toClient(rows[0]) : null;
}

export type ClientInput = {
  companyName: string;
  contactPerson: string | null;
  email: string | null;
  emailCc: string | null;
  address: string | null;
  city: string | null;
  country: string;
  pib: string | null;
  mb: string | null;
  phone: string | null;
  notes: string | null;
  active: boolean;
};

export async function createClient(input: ClientInput): Promise<string> {
  const sql = getSql();
  const rows = (await sql`
    insert into clients (
      company_name, contact_person, email, email_cc, address, city, country,
      pib, mb, phone, notes, active
    ) values (
      ${input.companyName}, ${input.contactPerson}, ${input.email}, ${input.emailCc},
      ${input.address}, ${input.city}, ${input.country}, ${input.pib}, ${input.mb},
      ${input.phone}, ${input.notes}, ${input.active}
    )
    returning id
  `) as { id: string }[];
  return rows[0].id;
}

export async function updateClient(id: string, input: ClientInput): Promise<void> {
  const sql = getSql();
  await sql`
    update clients set
      company_name = ${input.companyName},
      contact_person = ${input.contactPerson},
      email = ${input.email},
      email_cc = ${input.emailCc},
      address = ${input.address},
      city = ${input.city},
      country = ${input.country},
      pib = ${input.pib},
      mb = ${input.mb},
      phone = ${input.phone},
      notes = ${input.notes},
      active = ${input.active},
      updated_at = now()
    where id = ${id}
  `;
}

export type SubscriptionRow = {
  id: string;
  clientId: string;
  title: string;
  itemDescription: string;
  quantity: number;
  monthlyPrice: number;
  currency: string;
  active: boolean;
};

export async function listSubscriptions(clientId?: string): Promise<SubscriptionRow[]> {
  const sql = getSql();
  const rows = clientId
    ? ((await sql`
        select * from subscriptions where client_id = ${clientId} order by created_at
      `) as Record<string, string | boolean>[])
    : ((await sql`
        select * from subscriptions order by created_at
      `) as Record<string, string | boolean>[]);

  return rows.map((raw) => ({
    id: raw.id as string,
    clientId: raw.client_id as string,
    title: raw.title as string,
    itemDescription: raw.item_description as string,
    quantity: Number(raw.quantity),
    monthlyPrice: Number(raw.monthly_price),
    currency: raw.currency as string,
    active: Boolean(raw.active),
  }));
}

export async function createSubscription(input: {
  clientId: string;
  title: string;
  itemDescription: string;
  quantity: number;
  monthlyPrice: number;
  currency: string;
}): Promise<void> {
  const sql = getSql();
  await sql`
    insert into subscriptions (client_id, title, item_description, quantity, monthly_price, currency)
    values (${input.clientId}, ${input.title}, ${input.itemDescription},
            ${input.quantity}, ${input.monthlyPrice}, ${input.currency})
  `;
}

export async function setSubscriptionActive(id: string, active: boolean): Promise<void> {
  const sql = getSql();
  await sql`update subscriptions set active = ${active}, updated_at = now() where id = ${id}`;
}
