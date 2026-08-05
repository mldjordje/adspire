import "server-only";

import nodemailer from "nodemailer";
import { mailReplyTo, readResendEnv, readSmtpEnv } from "@/lib/env";

/**
 * One outbound mail, over whichever transport is configured.
 *
 * Order is Resend first, cPanel SMTP second. Resend gives deliverability
 * (SPF/DKIM on send.adspire.rs) and a message id worth logging; the SMTP
 * mailbox is what already works today and stays as the fallback so nothing
 * stops while DNS propagates.
 *
 * Callers get a result rather than a throw: a mailbox that is down must never
 * turn a stored lead, upit or quote into a 500. `sendMail` keeps returning a
 * boolean for the callers that only care whether it left.
 */

export type MailAttachment = {
  filename: string;
  /** PDF bytes. Base64-encoded for Resend, passed through for nodemailer. */
  content: Buffer;
  contentType?: string;
};

export type MailInput = {
  to: string;
  subject: string;
  /** Plain text. Rendered into simple HTML so line breaks survive every client. */
  text: string;
  replyTo?: string;
  cc?: string | null;
  /** A copy for the owner. SMTP leaves nothing in the cPanel "Sent" folder, so
   *  a Bcc to self is the only way a sent document also lands in webmail. */
  bcc?: string | null;
  attachments?: MailAttachment[];
};

export type MailResult = {
  ok: boolean;
  /** null when no transport is configured at all. */
  provider: "resend" | "smtp" | null;
  id: string | null;
  error: string | null;
};

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const toHtml = (text: string) =>
  `<div style="font:15px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#111">${escapeHtml(
    text,
  ).replace(/\n/g, "<br />")}</div>`;

async function sendViaResend(input: MailInput): Promise<MailResult | null> {
  const resend = readResendEnv();
  if (!resend) return null;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resend.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resend.from,
        to: [input.to],
        cc: input.cc ? [input.cc] : undefined,
        bcc: input.bcc ? [input.bcc] : undefined,
        subject: input.subject,
        text: input.text,
        html: toHtml(input.text),
        reply_to: input.replyTo ?? mailReplyTo() ?? undefined,
        attachments: input.attachments?.map((file) => ({
          filename: file.filename,
          content: file.content.toString("base64"),
        })),
      }),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (!response.ok) {
      return {
        ok: false,
        provider: "resend",
        id: null,
        error: payload.message ?? `Resend ${response.status}`,
      };
    }
    return { ok: true, provider: "resend", id: payload.id ?? null, error: null };
  } catch (error) {
    return { ok: false, provider: "resend", id: null, error: String(error) };
  }
}

async function sendViaSmtp(input: MailInput): Promise<MailResult | null> {
  const smtp = readSmtpEnv();
  if (!smtp) return null;

  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: { user: smtp.user, pass: smtp.pass },
      tls: { rejectUnauthorized: false },
    });

    const info = await transporter.sendMail({
      from: `"Adspire Digital" <${smtp.user}>`,
      to: input.to,
      cc: input.cc ?? undefined,
      bcc: input.bcc ?? undefined,
      replyTo: input.replyTo ?? mailReplyTo() ?? undefined,
      subject: input.subject,
      text: input.text,
      html: toHtml(input.text),
      attachments: input.attachments?.map((file) => ({
        filename: file.filename,
        content: file.content,
        contentType: file.contentType ?? "application/pdf",
      })),
    });

    return { ok: true, provider: "smtp", id: info.messageId ?? null, error: null };
  } catch (error) {
    return { ok: false, provider: "smtp", id: null, error: String(error) };
  }
}

/** Full outcome, for callers that log the send (the /os correspondence log). */
export async function deliverMail(input: MailInput): Promise<MailResult> {
  if (!input.to.trim()) {
    return { ok: false, provider: null, id: null, error: "Nema adrese primaoca." };
  }

  const viaResend = await sendViaResend(input);
  // A configured Resend that failed still falls through to SMTP: the point of
  // keeping the mailbox is that the message goes out either way.
  if (viaResend?.ok) return viaResend;

  const viaSmtp = await sendViaSmtp(input);
  if (viaSmtp) return viaSmtp;

  return (
    viaResend ?? {
      ok: false,
      provider: null,
      id: null,
      error: "Nijedan mejl transport nije podešen (RESEND_API_KEY ili SMTP_*).",
    }
  );
}

export async function sendMail(input: MailInput): Promise<boolean> {
  const result = await deliverMail(input);
  if (!result.ok && result.error) {
    console.error("mail_failed", { to: input.to, subject: input.subject, error: result.error });
  }
  return result.ok;
}

/** What `/os/podešavanja` shows about mail: which transport is live. */
export function mailTransportStatus(): {
  provider: "resend" | "smtp" | null;
  from: string | null;
  replyTo: string | null;
} {
  const resend = readResendEnv();
  if (resend) return { provider: "resend", from: resend.from, replyTo: mailReplyTo() };
  const smtp = readSmtpEnv();
  if (smtp) return { provider: "smtp", from: smtp.user, replyTo: mailReplyTo() ?? smtp.user };
  return { provider: null, from: null, replyTo: null };
}
