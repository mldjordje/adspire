import "server-only";

import { getSql } from "@/lib/db";
import type { InvoiceKind, InvoiceScope } from "./rules";

export type InvoiceStatus = "issued" | "paid" | "cancelled";

export type InvoiceListRow = {
  id: string;
  number: string;
  kind: InvoiceKind;
  status: InvoiceStatus;
  /** null means the client has never received it — the most common reason an
   *  invoice goes unpaid is that it was never sent. */
  sentAt: string | null;
  issueDate: string;
  dueDate: string | null;
  currency: string;
  total: number;
  clientName: string;
  periodLabel: string | null;
};

type RawList = {
  id: string;
  number: string;
  kind: InvoiceKind;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string | null;
  sent_at: string | null;
  currency: string;
  total: string;
  client_name: string | null;
  buyer_name: string | null;
  period_label: string | null;
};

const toRow = (raw: RawList): InvoiceListRow => ({
  id: raw.id,
  number: raw.number,
  kind: raw.kind,
  status: raw.status,
  sentAt: raw.sent_at,
  issueDate: raw.issue_date.slice(0, 10),
  dueDate: raw.due_date?.slice(0, 10) ?? null,
  currency: raw.currency,
  total: Number(raw.total),
  // The row's own buyer snapshot wins: a client renamed or deleted later must
  // not change what an issued document is listed under.
  clientName: raw.buyer_name ?? raw.client_name ?? "—",
  periodLabel: raw.period_label,
});

// `::text` on every date: the driver would otherwise decode them into UTC Date
// objects and shift the calendar day — see the note in src/lib/db.ts.
const LIST_SELECT = `
  select i.id, i.number, i.kind, i.status, i.issue_date::text, i.due_date::text,
         i.sent_at::text, i.currency, i.total, c.company_name as client_name,
         i.buyer->>'companyName' as buyer_name, i.period_label
  from invoices i
  left join clients c on c.id = i.client_id
`;

export async function listInvoices(options: { clientId?: string; limit?: number } = {}) {
  const sql = getSql();
  const limit = options.limit ?? 200;
  const rows = options.clientId
    ? ((await sql.query(
        `${LIST_SELECT} where i.client_id = $1 order by i.issue_date desc, i.invoice_seq desc limit $2`,
        [options.clientId, limit],
      )) as RawList[])
    : ((await sql.query(
        `${LIST_SELECT} order by i.issue_date desc, i.invoice_seq desc limit $1`,
        [limit],
      )) as RawList[]);
  return rows.map(toRow);
}

export type InvoiceDetail = InvoiceListRow & {
  sentAt: string | null;
  scope: InvoiceScope;
  supplyDate: string | null;
  place: string;
  paymentMethod: string;
  bankAccount: string | null;
  totalRsd: number | null;
  fxRate: number | null;
  vatNote: string;
  note: string | null;
  paidAt: string | null;
  clientId: string | null;
  buyer: Record<string, string | null>;
  items: { name: string; quantity: number; unitPrice: number; total: number }[];
};

export async function getInvoiceDetail(id: string): Promise<InvoiceDetail | null> {
  const sql = getSql();
  const rows = (await sql.query(`${LIST_SELECT} where i.id = $1`, [id])) as RawList[];
  if (!rows[0]) return null;

  const extra = (await sql`
    select scope, supply_date::text, place, payment_method, bank_account, total_rsd,
           fx_rate, vat_note, note, paid_at::text, sent_at::text, client_id, buyer
    from invoices where id = ${id}
  `) as {
    sent_at: string | null;
    scope: InvoiceScope;
    supply_date: string | null;
    place: string;
    payment_method: string;
    bank_account: string | null;
    total_rsd: string | null;
    fx_rate: string | null;
    vat_note: string;
    note: string | null;
    paid_at: string | null;
    client_id: string | null;
    buyer: Record<string, string | null>;
  }[];

  const items = (await sql`
    select name, quantity, unit_price, total
    from invoice_items where invoice_id = ${id} order by position
  `) as { name: string; quantity: string; unit_price: string; total: string }[];

  const meta = extra[0];
  return {
    ...toRow(rows[0]),
    sentAt: meta.sent_at,
    scope: meta.scope,
    supplyDate: meta.supply_date?.slice(0, 10) ?? null,
    place: meta.place,
    paymentMethod: meta.payment_method,
    bankAccount: meta.bank_account,
    totalRsd: meta.total_rsd ? Number(meta.total_rsd) : null,
    fxRate: meta.fx_rate ? Number(meta.fx_rate) : null,
    vatNote: meta.vat_note,
    note: meta.note,
    paidAt: meta.paid_at,
    clientId: meta.client_id,
    buyer: meta.buyer ?? {},
    items: items.map((item) => ({
      name: item.name,
      quantity: Number(item.quantity),
      unitPrice: Number(item.unit_price),
      total: Number(item.total),
    })),
  };
}

export type BillingSummary = {
  issuedThisYear: number;
  billedThisYear: number;
  unpaidCount: number;
  unpaidTotal: number;
  overdueCount: number;
  mrr: number;
};

/** Dinar figures only: mixing currencies into one number would be a lie, and
 *  every recurring contract is currently in RSD. */
export async function getBillingSummary(): Promise<BillingSummary> {
  const sql = getSql();
  const year = new Date().getFullYear();

  const rows = (await sql`
    select
      (select count(*) from invoices
        where invoice_year = ${year} and kind = 'invoice' and status <> 'cancelled') as issued_count,
      (select coalesce(sum(total), 0) from invoices
        where invoice_year = ${year} and kind = 'invoice' and status <> 'cancelled'
          and currency = 'RSD') as billed_total,
      (select count(*) from invoices
        where status = 'issued' and kind = 'invoice') as unpaid_count,
      (select coalesce(sum(total), 0) from invoices
        where status = 'issued' and kind = 'invoice' and currency = 'RSD') as unpaid_total,
      (select count(*) from invoices
        where status = 'issued' and kind = 'invoice' and due_date < current_date) as overdue_count,
      (select coalesce(sum(monthly_price * quantity), 0) from subscriptions
        where active and currency = 'RSD') as mrr
  `) as Record<string, string>[];

  const row = rows[0];
  return {
    issuedThisYear: Number(row.issued_count),
    billedThisYear: Number(row.billed_total),
    unpaidCount: Number(row.unpaid_count),
    unpaidTotal: Number(row.unpaid_total),
    overdueCount: Number(row.overdue_count),
    mrr: Number(row.mrr),
  };
}
