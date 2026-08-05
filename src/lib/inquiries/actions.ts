"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/os/session";
import { getSql } from "@/lib/db";
import { createClient } from "@/lib/billing/clients";
import { logMessage, sendAndLog } from "@/lib/messages/store";
import { notifyBuyerOfQuote, quoteMailBody, quoteMailSubject } from "./notify";
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

  if (!id || !Number.isFinite(amount) || amount <= 0) {
    redirect(`/os/upiti/${id}?mail=cena`);
  }

  const inquiry = await quoteInquiry(id, {
    amount,
    currency: currency || "EUR",
    turnaroundDays: turnaroundRaw ? Number(turnaroundRaw) : null,
    validUntil,
    note,
  });
  if (!inquiry) redirect(`/os/upiti/${id}?mail=zatvoren`);

  // Best effort: the quote is recorded either way, and the timeline shows from
  // the logged message whether it was actually delivered.
  const sent = await notifyBuyerOfQuote(inquiry).catch((error) => {
    console.error("quote_notify_failed", { reference: inquiry.reference, error });
    return false;
  });

  await logMessage({
    inquiryId: inquiry.id,
    leadId: inquiry.lead_id,
    toEmail: inquiry.email,
    subject: quoteMailSubject(inquiry),
    body: quoteMailBody(inquiry),
    status: sent ? "sent" : "failed",
    error: sent ? null : "Ponuda nije otišla — proveri mejl transport.",
  }).catch((error) => console.error("quote_log_failed", error));

  // Keeps the funnel honest: a quoted brief is a sent proposal in the pipeline.
  if (inquiry.lead_id) {
    const sql = getSql();
    await sql`
      update leads set status = 'proposal_sent', updated_at = now()
      where id = ${inquiry.lead_id} and status not in ('won', 'lost')
    `;
  }

  revalidatePath("/os");
  revalidatePath("/os/upiti");
  revalidatePath(`/os/upiti/${id}`);
  redirect(`/os/upiti/${id}?mail=${sent ? "poslato" : "greska"}`);
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

  revalidatePath("/os");
  revalidatePath("/os/upiti");
  revalidatePath(`/os/upiti/${id}`);
}

/**
 * Free-form reply to the buyer, sent and logged from the upit screen. Most
 * briefs need one question answered before a price makes sense; without this
 * the owner leaves for webmail and the exchange stops being visible here.
 */
export async function sendInquiryReply(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const to = String(formData.get("to") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!id) return;
  const session = await getSession();
  if (!session) return;
  if (!to || !subject || !body) redirect(`/os/upiti/${id}?mail=prazno`);

  const inquiry = await getInquiryById(id);
  if (!inquiry) return;

  const result = await sendAndLog({
    to,
    subject,
    body,
    inquiryId: id,
    leadId: inquiry.lead_id,
    createdBy: session.email,
  });

  revalidatePath("/os");
  revalidatePath(`/os/upiti/${id}`);
  redirect(`/os/upiti/${id}?mail=${result.ok ? "poslato" : "greska"}`);
}

/** Owner's own reminder date on a brief. */
export async function setInquiryFollowUp(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const date = String(formData.get("followUpOn") ?? "").trim() || null;
  if (!id) return;
  if (!(await getSession())) return;

  const sql = getSql();
  await sql`update inquiries set follow_up_on = ${date}, updated_at = now() where id = ${id}`;

  revalidatePath("/os");
  revalidatePath(`/os/upiti/${id}`);
}

/**
 * Turns an accepted brief into a client record. The upit already carries the
 * billing snapshot the invoice needs (PIB, MB, address), so this is the one
 * conversion in the system that does not need retyping.
 */
export async function convertInquiryToClient(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  if (!(await getSession())) return;

  const upit = await getInquiryById(id);
  if (!upit) return;

  const clientId = await createClient({
    companyName: upit.company_name || upit.business_name,
    contactPerson: upit.full_name,
    email: upit.email,
    emailCc: null,
    address: upit.address,
    city: upit.city,
    country: upit.country || "Srbija",
    pib: upit.pib,
    mb: upit.mb,
    phone: upit.phone,
    notes: `Iz upita ${upit.reference}`,
    active: true,
  });

  if (upit.lead_id) {
    const sql = getSql();
    await sql`
      update leads set status = 'won', updated_at = now()
      where id = ${upit.lead_id} and status <> 'won'
    `;
  }

  revalidatePath("/os/klijenti");
  revalidatePath(`/os/upiti/${id}`);
  redirect(`/os/klijenti/${clientId}`);
}
