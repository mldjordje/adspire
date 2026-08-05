"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/os/session";
import { getSql } from "@/lib/db";
import { notifyBuyerOfQuote } from "./notify";
import { getInquiryById, quoteInquiry, setInquiryStatus } from "./store";
import { isInquiryStatus } from "./types";

/**
 * Owner actions on an upit. Every one of them checks the operator session
 * first — these run as server actions, which are public endpoints.
 */

/** Sends the price. The mail carries the buyer's status link, which is where
 *  they accept or decline. */
export async function sendQuote(formData: FormData) {
  if (!(await getSession())) return;

  const id = String(formData.get("id") ?? "");
  const amount = Number(String(formData.get("amount") ?? "").replace(",", "."));
  const currency = String(formData.get("currency") ?? "EUR").trim().toUpperCase();
  const turnaroundRaw = String(formData.get("turnaroundDays") ?? "").trim();
  const validUntil = String(formData.get("validUntil") ?? "").trim() || null;
  const note = String(formData.get("note") ?? "").trim() || null;

  if (!id || !Number.isFinite(amount) || amount <= 0) return;

  const inquiry = await quoteInquiry(id, {
    amount,
    currency: currency || "EUR",
    turnaroundDays: turnaroundRaw ? Number(turnaroundRaw) : null,
    validUntil,
    note,
  });
  if (!inquiry) return;

  // Best effort: the quote is recorded either way, and the owner can see from
  // the row that it was not delivered.
  await notifyBuyerOfQuote(inquiry).catch((error) => {
    console.error("quote_notify_failed", { reference: inquiry.reference, error });
  });

  // Keeps the funnel honest: a quoted brief is a sent proposal in the pipeline.
  if (inquiry.lead_id) {
    const sql = getSql();
    await sql`
      update leads set status = 'proposal_sent', updated_at = now()
      where id = ${inquiry.lead_id} and status not in ('won', 'lost')
    `;
  }

  revalidatePath("/os/upiti");
  revalidatePath(`/os/upiti/${id}`);
}

/** Manual status change and the owner's private note. */
export async function updateInquiry(formData: FormData) {
  if (!(await getSession())) return;

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const adminNote = String(formData.get("adminNote") ?? "").trim() || null;
  if (!id || !isInquiryStatus(status)) return;

  const current = await getInquiryById(id);
  if (!current) return;

  await setInquiryStatus(id, status, adminNote);

  revalidatePath("/os/upiti");
  revalidatePath(`/os/upiti/${id}`);
}
