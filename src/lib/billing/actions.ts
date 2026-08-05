"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSql } from "@/lib/db";
import { InvoiceConfigurationError, issueInvoice } from "@/lib/invoices/issue";
import { sendInvoiceMail } from "@/lib/invoices/notify";
import { belgradeToday, invoiceScope, type InvoiceKind } from "@/lib/invoices/rules";
import { getSession } from "@/lib/os/session";
import { updateSettings } from "@/lib/os/settings";
import {
  createClient,
  createSubscription,
  getClient,
  setSubscriptionActive,
  updateClient,
  type ClientInput,
} from "./clients";

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
  const kind = (text(formData, "kind") === "proforma" ? "proforma" : "invoice") as InvoiceKind;

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
      kind,
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
 * Sends the document to the buyer with its PDF attached.
 *
 * `sent_at` is written only on success, so the screen never claims a delivery
 * that did not happen; the failed attempt is still in the correspondence log
 * with its reason.
 */
export async function sendInvoiceAction(formData: FormData) {
  const session = await requireSession();
  const id = text(formData, "id");
  if (!id) return;

  const result = await sendInvoiceMail(id, { createdBy: session.email });

  if (result.ok) {
    const sql = getSql();
    await sql`update invoices set sent_at = now(), updated_at = now() where id = ${id}`;
  }

  revalidatePath("/os/fakture");
  revalidatePath(`/os/fakture/${id}`);
  redirect(
    `/os/fakture/${id}?mail=${result.ok ? "poslato" : result.reason}`,
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
