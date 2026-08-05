import "server-only";

import nodemailer from "nodemailer";
import { readSmtpEnv } from "@/lib/env";

/**
 * One outbound mail.
 *
 * Interim transport: the existing cPanel SMTP mailbox, same as the lead
 * notification. Replaced by Resend + the n8n outbox once `send.adspire.rs` is
 * verified — see docs/faza-0-resend-setup.md. Callers get `false` rather than a
 * throw when SMTP is not configured: a missing mailbox must never lose an upit
 * that is already stored.
 */

export type MailInput = {
  to: string;
  subject: string;
  /** Plain text. Rendered into simple HTML so line breaks survive every client. */
  text: string;
  replyTo?: string;
};

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendMail({ to, subject, text, replyTo }: MailInput): Promise<boolean> {
  const smtp = readSmtpEnv();
  if (!smtp || !to.trim()) return false;

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: true,
    auth: { user: smtp.user, pass: smtp.pass },
    tls: { rejectUnauthorized: false },
  });

  await transporter.sendMail({
    from: `"Adspire Digital" <${smtp.user}>`,
    to,
    replyTo,
    subject,
    text,
    html: `<div style="font:15px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#111">${escapeHtml(
      text,
    ).replace(/\n/g, "<br />")}</div>`,
  });

  return true;
}
