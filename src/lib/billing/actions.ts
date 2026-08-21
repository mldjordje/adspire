"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSql } from "@/lib/db";
import { InvoiceConfigurationError, issueInvoice } from "@/lib/invoices/issue";
import { sendInvoiceMail } from "@/lib/invoices/notify";
import type { InvoiceParty } from "@/lib/invoices/pdf";
import { getInvoiceDetail } from "@/lib/invoices/queries";
import { addDays, belgradeToday, invoiceScope } from "@/lib/invoices/rules";
import { getSession } from "@/lib/os/session";
import { getSettings, updateSettings } from "@/lib/os/settings";
import {
  createClient,
  createSubscription,
  getClient,
  setSubscriptionActive,
  updateClient,
  type ClientInput,
} from "./clients";
import { currentPeriod, issueRecurringForClient, runRecurring } from "./recurring";

/** Server actions are public endpoints. Every one of them starts here. */
async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/os/login");
  return session;
}

const text = (formData: FormData, key: string): string =>
  String(formData.get(key) ?? "").trim();

const optional = (formData: FormData, key: string): string | null => text(formData, key) || null;

/** Accepts both "1234,50" and "1234.50" — the comma is what a Serbian keyboard
 *  produces and what the old invoices were typed with. */
const decimal = (value: string): number => {
  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

function clientInputFrom(formData: FormData): ClientInput {
  return {
    companyName: text(formData, "companyName"),
    contactPerson: optional(formData, "contactPerson"),
    email: optional(formData, "email"),
    emailCc: optional(formData, "emailCc"),
    address: optional(formData, "address"),
    city: optional(formData, "city"),
    country: text(formData, "country") || "Srbija",
    pib: optional(formData, "pib"),
    mb: optional(formData, "mb"),
    phone: optional(formData, "phone"),
    notes: optional(formData, "notes"),
    active: formData.get("active") !== null,
  };
}

export async function saveClientAction(formData: FormData) {
  await requireSession();
  const id = optional(formData, "id");
  const input = clientInputFrom(formData);
  if (!input.companyName) return;

  if (id) {
    await updateClient(id, input);
  } else {
    await createClient(input);
  }

  revalidatePath("/os/klijenti");
  redirect("/os/klijenti");
}

export async function addSubscriptionAction(formData: FormData) {
  await requireSession();
  const clientId = text(formData, "clientId");
  const title = text(formData, "title");
  if (!clientId || !title) return;

  await createSubscription({
    clientId,
    title,
    itemDescription: text(formData, "itemDescription") || title,
    quantity: decimal(text(formData, "quantity")) || 1,
    monthlyPrice: decimal(text(formData, "monthlyPrice")),
    currency: text(formData, "currency") || "RSD",
  });

  revalidatePath(`/os/klijenti/${clientId}`);
}

export async function toggleSubscriptionAction(formData: FormData) {
  await requireSession();
  const id = text(formData, "id");
  const clientId = text(formData, "clientId");
  if (!id) return;

  await setSubscriptionActive(id, text(formData, "active") === "1");
  revalidatePath(`/os/klijenti/${clientId}`);
}

export async function createInvoiceAction(formData: FormData) {
  await requireSession();

  const clientId = optional(formData, "clientId");

  // Parallel arrays, in DOM order: the three inputs of one row always share an
  // index, so a blank name is the signal that the row was never filled in.
  const names = formData.getAll("itemName").map((v) => String(v).trim());
  const quantities = formData.getAll("itemQuantity").map((v) => decimal(String(v)));
  const prices = formData.getAll("itemPrice").map((v) => decimal(String(v)));

  const items = names
    .map((name, index) => ({
      name,
      quantity: quantities[index] || 1,
      unitPrice: prices[index] ?? 0,
    }))
    .filter((item) => item.name !== "");

  if (items.length === 0) redirect("/os/fakture/nova?error=stavke");

  const client = clientId ? await getClient(clientId) : null;
  const today = belgradeToday().iso;

  let invoiceId: string;
  try {
    const issued = await issueInvoice({
      clientId,
      kind: "invoice",
      scope: invoiceScope(client?.country),
      issueDate: text(formData, "issueDate") || today,
      supplyDate: optional(formData, "supplyDate"),
      dueDate: optional(formData, "dueDate"),
      currency: text(formData, "currency") || "RSD",
      items,
      periodLabel: optional(formData, "periodLabel"),
      note: optional(formData, "note"),
    });
    invoiceId = issued.id;
  } catch (error) {
    if (error instanceof InvoiceConfigurationError) {
      redirect(`/os/fakture/nova?error=${encodeURIComponent(error.message)}`);
    }
    throw error;
  }

  revalidatePath("/os/fakture");
  redirect(`/os/fakture/${invoiceId}`);
}

/**
 * Issues the račun that settles one of the legacy predračuni.
 *
 * Predračuni are no longer issued (Đorđe is not in the VAT system, so the
 * client only ever needs the račun). This closes out the ones already sent and
 * retires itself once none are left.
 *
 * Copies the frozen buyer, lines, currency and period rather than re-reading
 * the client: the invoice must agree with the paper the buyer already holds,
 * even if the client record changed in between. Only the dates are new — the
 * promet is the day the work was delivered, which is what the invoice states
 * and the proforma never did.
 *
 * Converting twice is refused by finding the existing invoice instead: two
 * numbers for one job is a bookkeeping error nobody notices until inspection.
 *
 * The usual case is that the money has already arrived — that is what triggers
 * the conversion — so the invoice is issued settled: no due date, no payment
 * instructions, and the proforma is closed at the same time. The screen still
 * offers the unpaid path, because a račun raised before payment is legitimate
 * and dating one as paid would be a false record.
 */
export async function convertProformaAction(formData: FormData) {
  await requireSession();
  const id = text(formData, "id");
  if (!id) return;

  const proforma = await getInvoiceDetail(id);
  if (!proforma || proforma.kind !== "proforma") return;

  if (proforma.converted) redirect(`/os/fakture/${proforma.converted.id}`);
  if (proforma.status === "cancelled") redirect(`/os/fakture/${id}?doc=stornirano`);

  const settings = await getSettings();
  const today = belgradeToday().iso;
  const supplyDate = optional(formData, "supplyDate") ?? today;

  // The proforma's own paid_at wins when it has one: the invoice must state the
  // day the money actually arrived, not the day the paperwork caught up.
  const paid = formData.get("paid") !== null;
  const paidAt = paid ? (proforma.paidAt ?? new Date().toISOString()) : null;

  let issued: { id: string };
  try {
    issued = await issueInvoice({
      clientId: proforma.clientId,
      kind: "invoice",
      scope: proforma.scope,
      issueDate: today,
      supplyDate,
      dueDate: paidAt ? null : addDays(today, settings.invoice_due_days),
      currency: proforma.currency,
      items: proforma.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      periodLabel: proforma.periodLabel,
      note: proforma.note,
      buyer: proforma.buyer as InvoiceParty,
      sourceInvoiceId: proforma.id,
      paidAt,
    });
  } catch (error) {
    if (error instanceof InvoiceConfigurationError) {
      redirect(`/os/fakture/${id}?doc=${encodeURIComponent(error.message)}`);
    }
    throw error;
  }

  // A settled invoice leaves no open proforma behind it.
  if (paidAt && proforma.status !== "paid") {
    const sql = getSql();
    await sql`
      update invoices set status = 'paid', paid_at = ${paidAt}, updated_at = now()
      where id = ${id}
    `;
  }

  revalidatePath("/os/fakture");
  revalidatePath(`/os/fakture/${id}`);
  redirect(`/os/fakture/${issued.id}?doc=${paidAt ? "iz-predracuna-placeno" : "iz-predracuna"}`);
}

/**
 * Monthly maintenance run, from the review screen.
 *
 * Sending is opt-in per run: the checkbox is unticked by default because a
 * wrong figure that was only issued can be cancelled quietly, and one that has
 * been mailed cannot be unmailed.
 */
export async function runRecurringAction(formData: FormData) {
  const session = await requireSession();
  const period = text(formData, "period") || currentPeriod();
  const send = formData.get("send") !== null;

  const outcomes = await runRecurring(period, { send, createdBy: session.email });
  const issued = outcomes.filter((row) => row.status === "issued").length;
  const failed = outcomes.filter((row) => row.status === "failed").length;
  const mailed = outcomes.filter((row) => row.mailed).length;

  revalidatePath("/os/fakture");
  redirect(
    `/os/fakture/mesecno?period=${period}&izdato=${issued}&greska=${failed}&poslato=${mailed}`,
  );
}

/** One client, one currency — the per-row button on the same screen. */
export async function issueRecurringClientAction(formData: FormData) {
  const session = await requireSession();
  const clientId = text(formData, "clientId");
  const currency = text(formData, "currency") || "RSD";
  const period = text(formData, "period") || currentPeriod();
  const send = formData.get("send") !== null;
  if (!clientId) return;

  const outcome = await issueRecurringForClient(clientId, currency, period, {
    send,
    createdBy: session.email,
  });

  revalidatePath("/os/fakture");
  if (outcome?.status === "issued" && outcome.invoiceId) {
    redirect(`/os/fakture/${outcome.invoiceId}?doc=pretplata`);
  }
  redirect(`/os/fakture/mesecno?period=${period}&greska=${outcome ? 1 : 0}`);
}

/**
 * Sends the document to the buyer with its PDF attached.
 *
 * `sent_at` is written only on success, so the screen never claims a delivery
 * that did not happen; the failed attempt is still in the correspondence log
 * with its reason.
 *
 * `correction=1` sends the same document again, worded as a replacement. It
 * exists because the PDF re-renders from current issuer settings: a typo in
 * Podešavanja is fixed by resending, not by cancelling a correct invoice.
 */
export async function sendInvoiceAction(formData: FormData) {
  const session = await requireSession();
  const id = text(formData, "id");
  if (!id) return;

  const correction = text(formData, "correction") === "1";
  const result = await sendInvoiceMail(id, { createdBy: session.email, correction });

  if (result.ok) {
    const sql = getSql();
    await sql`update invoices set sent_at = now(), updated_at = now() where id = ${id}`;
  }

  revalidatePath("/os/fakture");
  revalidatePath(`/os/fakture/${id}`);
  redirect(
    `/os/fakture/${id}?mail=${
      result.ok ? (correction ? "ispravljeno" : "poslato") : result.reason
    }`,
  );
}

export async function setInvoiceStatusAction(formData: FormData) {
  await requireSession();
  const id = text(formData, "id");
  const status = text(formData, "status");
  if (!id || !["issued", "paid", "cancelled"].includes(status)) return;

  const sql = getSql();
  await sql`
    update invoices
    set status = ${status}::invoice_status,
        paid_at = ${status === "paid" ? new Date().toISOString() : null},
        updated_at = now()
    where id = ${id}
  `;

  revalidatePath("/os/fakture");
  revalidatePath(`/os/fakture/${id}`);
}

export async function saveSettingsAction(formData: FormData) {
  await requireSession();

  await updateSettings({
    company_name: text(formData, "company_name"),
    responsible_person: optional(formData, "responsible_person"),
    address: optional(formData, "address"),
    city: text(formData, "city") || "Niš",
    country: text(formData, "country") || "Srbija",
    email: optional(formData, "email"),
    phone: optional(formData, "phone"),
    pib: optional(formData, "pib"),
    mb: optional(formData, "mb"),
    bank_account: optional(formData, "bank_account"),
    eur_account: optional(formData, "eur_account"),
    usd_account: optional(formData, "usd_account"),
    swift: optional(formData, "swift"),
    bank_name: optional(formData, "bank_name"),
    bank_address: optional(formData, "bank_address"),
    vat_note_domestic: text(formData, "vat_note_domestic"),
    vat_note_foreign: text(formData, "vat_note_foreign"),
    payment_method: text(formData, "payment_method") || "Uplata na tekući račun",
    invoice_due_days: Math.max(0, Math.round(decimal(text(formData, "invoice_due_days")))),
    payment_reference_model: text(formData, "payment_reference_model") === "97" ? "97" : "none",
    invoice_seq_offset: Math.max(0, Math.round(decimal(text(formData, "invoice_seq_offset")))),
  });

  revalidatePath("/os/podesavanja");
  redirect("/os/podesavanja?saved=1");
}
