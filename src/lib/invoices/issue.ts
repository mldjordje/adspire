import "server-only";

import { getSql } from "@/lib/db";
import { getSettings, type SettingsRow } from "@/lib/os/settings";
import { getMiddleRate } from "./fx";
import { renderInvoicePdf, type InvoiceDocumentData, type InvoiceParty } from "./pdf";
import {
  addDays,
  belgradeToday,
  itemTotals,
  paymentReferenceFor,
  referenceModel,
  type InvoiceItemInput,
  type InvoiceKind,
  type InvoiceScope,
} from "./rules";

/**
 * Issuing a document: allocate the number, freeze the figures, store the items.
 *
 * Everything the PDF states is written to the row — the buyer as printed, the
 * lines, the total, the rate, the VAT sentence in force that day. The PDF is
 * then rendered on demand rather than stored, so there is no file to lose and
 * no second source of truth; the row alone decides what the document says.
 */

export class InvoiceConfigurationError extends Error {}

export type IssueInvoiceInput = {
  clientId: string | null;
  kind: InvoiceKind;
  scope?: InvoiceScope;
  issueDate: string;
  /** Datum prometa. Editable because an invoice raised after the fact must
   *  state the month the work was actually delivered. */
  supplyDate: string | null;
  dueDate: string | null;
  currency: string;
  items: InvoiceItemInput[];
  periodLabel: string | null;
  note: string | null;
  /** Overrides the client's stored billing details, for a one-off buyer. */
  buyer?: InvoiceParty | null;
};

export type IssuedInvoice = { id: string; number: string };

type ClientRow = {
  id: string;
  company_name: string;
  contact_person: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  pib: string | null;
  mb: string | null;
  phone: string | null;
};

function buyerFromClient(row: ClientRow): InvoiceParty {
  return {
    companyName: row.company_name,
    name: row.contact_person,
    address: row.address,
    city: row.city,
    country: row.country,
    pib: row.pib,
    mb: row.mb,
    email: row.email,
    phone: row.phone,
  };
}

function sellerFrom(settings: SettingsRow) {
  return {
    companyName: settings.company_name,
    address: settings.address,
    city: settings.city,
    country: settings.country,
    email: settings.email,
    phone: settings.phone,
    pib: settings.pib,
    mb: settings.mb,
    bankAccount: settings.bank_account,
    eurAccount: settings.eur_account,
    swift: settings.swift,
    bankName: settings.bank_name,
    bankAddress: settings.bank_address,
  };
}

/**
 * The payment fields for one document: the reference the bank will accept, the
 * purpose line, and the dinar settlement note where one is needed.
 *
 * Shared by issuing and re-rendering so the two can never disagree about what
 * the buyer was told to pay.
 */
function paymentFields(args: {
  number: string;
  scope: InvoiceScope;
  currency: string;
  rsdAmount: number | null;
  model: string | null;
}): Pick<InvoiceDocumentData, "reference" | "paymentPurpose" | "settlementNote"> {
  const reference = paymentReferenceFor(args.number, referenceModel(args.model));
  const foreignCurrency = args.currency.trim().toUpperCase() !== "RSD";

  let settlementNote: string | null = null;
  if (args.scope === "domestic" && foreignCurrency) {
    const rsd = args.rsdAmount
      ? `${args.rsdAmount.toLocaleString("sr-RS", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} RSD`
      : null;
    settlementNote = rsd
      ? `Uplata se vrši u dinarima na navedeni račun, u iznosu od ${rsd}.`
      : "Uplata se vrši u dinarima na navedeni račun, po srednjem kursu NBS na dan uplate.";
  }

  return { reference, paymentPurpose: args.number, settlementNote };
}

export async function issueInvoice(input: IssueInvoiceInput): Promise<IssuedInvoice> {
  const sql = getSql();
  const settings = await getSettings();

  if (input.items.length === 0) {
    throw new InvoiceConfigurationError("Faktura mora imati bar jednu stavku.");
  }

  let buyer: InvoiceParty | null = input.buyer ?? null;
  if (!buyer && input.clientId) {
    const rows = (await sql`
      select id, company_name, contact_person, email, address, city, country, pib, mb, phone
      from clients where id = ${input.clientId}
    `) as ClientRow[];
    if (!rows[0]) throw new InvoiceConfigurationError("Klijent nije pronađen.");
    buyer = buyerFromClient(rows[0]);
  }
  if (!buyer) throw new InvoiceConfigurationError("Nedostaje kupac.");

  const scope: InvoiceScope = input.scope ?? "domestic";
  const currency = input.currency.trim().toUpperCase() || "RSD";
  const { lines, total } = itemTotals(input.items);

  if (scope === "domestic" && !settings.bank_account) {
    throw new InvoiceConfigurationError("Unesi tekući račun u Podešavanjima pre izdavanja.");
  }

  const rate = await getMiddleRate(currency);
  const totalRsd = rate ? Math.round(total * rate.rate * 100) / 100 : null;

  const issueDate = input.issueDate || belgradeToday().iso;
  const year = Number(issueDate.slice(0, 4));
  const dueDate = input.dueDate || addDays(issueDate, settings.invoice_due_days);
  // A proforma has no supply yet. An invoice with no stated promet date is the
  // one missing a mandatory element, so it falls back to the issue date rather
  // than to null — for same-day work the two genuinely coincide.
  const supplyDate =
    input.kind === "invoice" ? (input.supplyDate || issueDate) : null;
  const vatNote = scope === "foreign" ? settings.vat_note_foreign : settings.vat_note_domestic;

  // Number and row are written in ONE statement, so the MAX and the INSERT
  // cannot be separated by another issue. Two concurrent callers can still read
  // the same MAX under READ COMMITTED; the unique index on (year, seq, kind)
  // rejects the loser rather than letting two documents share a number.
  //
  // greatest(...) with the offset is what lets a fresh database continue an
  // existing paper series instead of restarting at 1/2026.
  const rows = (await sql`
    with next_seq as (
      select greatest(
        coalesce((
          select max(i.invoice_seq) from invoices i
          where i.invoice_year = ${year} and i.kind = ${input.kind}::invoice_kind
        ), 0) + 1,
        ${settings.invoice_seq_offset}::int + 1
      ) as seq
    ), new_invoice as (
      insert into invoices (
        client_id, kind, scope, invoice_year, invoice_seq, number,
        issue_date, supply_date, due_date, place, payment_method, bank_account,
        currency, total, total_rsd, fx_rate, fx_date, buyer, vat_note,
        period_label, note
      )
      select ${input.clientId}::uuid, ${input.kind}::invoice_kind, ${scope},
             ${year}, next_seq.seq,
             -- The two series are numbered independently, so without a prefix a
             -- predračun and a račun would both be "1/2026" and collide on
             -- unique(number). "PR-" also tells the client at a glance that the
             -- document is not yet a tax document.
             ${input.kind === "proforma" ? "PR-" : ""} || next_seq.seq || '/' || ${year}::text,
             ${issueDate}::date, ${supplyDate}::date, ${dueDate}::date,
             ${settings.city}, ${settings.payment_method},
             ${scope === "domestic" ? settings.bank_account : (settings.eur_account ?? settings.bank_account)},
             ${currency}, ${total}, ${totalRsd}, ${rate?.rate ?? null}, ${rate?.date ?? null}::date,
             ${JSON.stringify(buyer)}::jsonb, ${vatNote},
             ${input.periodLabel}, ${input.note}
      from next_seq
      returning id, number
    ), new_items as (
      insert into invoice_items (invoice_id, position, name, quantity, unit_price, total)
      select new_invoice.id, item.ord::int, item.value->>'name',
             (item.value->>'quantity')::numeric,
             (item.value->>'unitPrice')::numeric,
             (item.value->>'total')::numeric
      from new_invoice,
           jsonb_array_elements(${JSON.stringify(lines)}::jsonb)
             with ordinality as item(value, ord)
      returning 1
    )
    select id, number from new_invoice
  `) as { id: string; number: string }[];

  const issued = rows[0];
  if (!issued) throw new Error("Faktura nije upisana.");
  return issued;
}

type StoredInvoiceRow = {
  id: string;
  kind: InvoiceKind;
  scope: InvoiceScope;
  number: string;
  issue_date: string;
  supply_date: string | null;
  due_date: string | null;
  place: string;
  payment_method: string;
  bank_account: string | null;
  currency: string;
  total: string;
  total_rsd: string | null;
  fx_rate: string | null;
  fx_date: string | null;
  buyer: InvoiceParty;
  vat_note: string;
  note: string | null;
};

const asDate = (iso: string | null) => (iso ? new Date(`${iso.slice(0, 10)}T12:00:00Z`) : null);

/** Re-renders an issued document from its stored snapshot. The only renderer
 *  the download route uses, so what the client downloads today is what the row
 *  said on the day it was issued. */
export async function renderStoredInvoice(
  invoiceId: string,
): Promise<{ bytes: Uint8Array; number: string } | null> {
  const sql = getSql();
  const rows = (await sql`
    select id, kind, scope, number, issue_date::text, supply_date::text,
           due_date::text, place, payment_method, bank_account, currency, total,
           total_rsd, fx_rate, fx_date::text, buyer, vat_note, note
    from invoices where id = ${invoiceId}
  `) as StoredInvoiceRow[];
  const row = rows[0];
  if (!row) return null;

  const items = (await sql`
    select name, quantity, unit_price, total
    from invoice_items where invoice_id = ${invoiceId}
    order by position
  `) as { name: string; quantity: string; unit_price: string; total: string }[];

  const settings = await getSettings();
  const seller = sellerFrom(settings);
  const totalRsd = row.total_rsd ? Number(row.total_rsd) : null;

  const bytes = await renderInvoicePdf({
    kind: row.kind,
    scope: row.scope,
    number: row.number,
    issueDate: asDate(row.issue_date)!,
    supplyDate: asDate(row.supply_date),
    dueDate: asDate(row.due_date),
    placeOfIssue: row.place,
    paymentMethod: row.payment_method,
    currency: row.currency,
    items: items.map((item) => ({
      name: item.name,
      quantity: Number(item.quantity),
      unitPrice: Number(item.unit_price),
      total: Number(item.total),
    })),
    total: Number(row.total),
    rsd:
      totalRsd && row.fx_rate
        ? {
            amount: totalRsd,
            rate: Number(row.fx_rate),
            date: row.fx_date?.slice(0, 10) ?? "",
          }
        : null,
    // The account printed is the one frozen on the row, falling back to the
    // current setting only when the row predates that column.
    seller: { ...seller, bankAccount: row.bank_account ?? seller.bankAccount },
    buyer: row.buyer ?? {},
    ...paymentFields({
      number: row.number,
      scope: row.scope,
      currency: row.currency,
      rsdAmount: totalRsd,
      model: settings.payment_reference_model,
    }),
    vatNote: row.vat_note,
    note: row.note,
  });

  return { bytes, number: row.number };
}
