import "server-only";

import nodemailer from "nodemailer";
import { leadNotificationRecipient, readSmtpEnv } from "@/lib/env";
import type { LeadSubmission } from "./validation";

/**
 * Owner notification for a new lead.
 *
 * Interim transport: the existing cPanel SMTP mailbox. Replaced by Resend +
 * the n8n outbox once `send.adspire.rs` is verified — see
 * docs/faza-0-resend-setup.md.
 */

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const row = (label: string, value: string | null | undefined) =>
  value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";

export async function notifyOwnerOfLead(
  submission: LeadSubmission,
  meta: { leadId: string | null; requestId: string },
): Promise<boolean> {
  const smtp = readSmtpEnv();
  const to = leadNotificationRecipient();
  if (!smtp || !to) return false;

  const attribution = submission.attribution;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: true,
    auth: { user: smtp.user, pass: smtp.pass },
    tls: { rejectUnauthorized: false },
  });

  await transporter.sendMail({
    from: `"Adspire sajt" <${smtp.user}>`,
    replyTo: submission.email,
    to,
    subject: `Novi lead — ${submission.fullName}${submission.company ? ` (${submission.company})` : ""}`,
    html: [
      row("Ime", submission.fullName),
      row("Email", submission.email),
      row("Telefon", submission.phone),
      row("Firma", submission.company),
      row("Tržište", submission.market),
      row("Usluga", submission.service),
      row("Budžet", submission.budgetRange),
      row("Rok", submission.timeline),
      "<hr />",
      `<p><strong>Poruka:</strong></p><p>${escapeHtml(submission.message).replace(/\n/g, "<br />")}</p>`,
      "<hr />",
      row("Stranica", attribution.landingPage),
      row("Referrer", attribution.referrer),
      row("UTM source", attribution.utmSource),
      row("UTM medium", attribution.utmMedium),
      row("UTM campaign", attribution.utmCampaign),
      row("Lead ID", meta.leadId),
      row("Request ID", meta.requestId),
      meta.leadId
        ? ""
        : "<p><em>Napomena: Supabase još nije konfigurisan — lead postoji samo u ovom mailu.</em></p>",
    ].join(""),
  });

  return true;
}
