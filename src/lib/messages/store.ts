import "server-only";

import { getSql } from "@/lib/db";
import { deliverMail, type MailAttachment } from "@/lib/mail";
import { mailReplyTo } from "@/lib/env";

/**
 * The correspondence log behind `/os`.
 *
 * Everything the owner writes to a lead or an upit goes through `sendAndLog`,
 * so the timeline on the detail screen is the record of what was actually
 * promised — including the sends that failed, which are the ones worth seeing.
 */

export type MessageRow = {
  id: string;
  leadId: string | null;
  inquiryId: string | null;
  direction: "out" | "in";
  channel: string;
  toEmail: string | null;
  subject: string | null;
  body: string;
  status: "sent" | "failed" | "skipped";
  provider: string | null;
  error: string | null;
  createdAt: string;
};

type RawMessage = {
  id: string;
  lead_id: string | null;
  inquiry_id: string | null;
  direction: "out" | "in";
  channel: string;
  to_email: string | null;
  subject: string | null;
  body: string;
  status: MessageRow["status"];
  provider: string | null;
  error: string | null;
  created_at: string;
};

const toRow = (raw: RawMessage): MessageRow => ({
  id: raw.id,
  leadId: raw.lead_id,
  inquiryId: raw.inquiry_id,
  direction: raw.direction,
  channel: raw.channel,
  toEmail: raw.to_email,
  subject: raw.subject,
  body: raw.body,
  status: raw.status,
  provider: raw.provider,
  error: raw.error,
  createdAt: raw.created_at,
});

const SELECT = `
  select id, lead_id, inquiry_id, direction, channel, to_email, subject, body,
         status, provider, error, created_at::text
  from messages
`;

export type LogMessageInput = {
  leadId?: string | null;
  inquiryId?: string | null;
  clientId?: string | null;
  invoiceId?: string | null;
  direction?: "out" | "in";
  channel?: string;
  toEmail?: string | null;
  subject?: string | null;
  body: string;
  status?: MessageRow["status"];
  provider?: string | null;
  providerId?: string | null;
  error?: string | null;
  createdBy?: string | null;
};

export async function logMessage(input: LogMessageInput): Promise<void> {
  const sql = getSql();
  await sql`
    insert into messages (
      lead_id, inquiry_id, client_id, invoice_id, direction, channel, to_email,
      subject, body, status, provider, provider_id, error, created_by
    ) values (
      ${input.leadId ?? null}, ${input.inquiryId ?? null}, ${input.clientId ?? null},
      ${input.invoiceId ?? null},
      ${input.direction ?? "out"}, ${input.channel ?? "email"}, ${input.toEmail ?? null},
      ${input.subject ?? null}, ${input.body}, ${input.status ?? "sent"},
      ${input.provider ?? null}, ${input.providerId ?? null}, ${input.error ?? null},
      ${input.createdBy ?? null}
    )
  `;
}

export type SendAndLogInput = {
  to: string;
  subject: string;
  body: string;
  leadId?: string | null;
  inquiryId?: string | null;
  clientId?: string | null;
  invoiceId?: string | null;
  cc?: string | null;
  bcc?: string | null;
  attachments?: MailAttachment[];
  createdBy?: string | null;
};

export type SendAndLogResult = { ok: boolean; error: string | null };

/** Sends, then records the attempt whatever the outcome. */
export async function sendAndLog(input: SendAndLogInput): Promise<SendAndLogResult> {
  const result = await deliverMail({
    to: input.to,
    subject: input.subject,
    text: input.body,
    replyTo: mailReplyTo() ?? undefined,
    cc: input.cc,
    bcc: input.bcc,
    attachments: input.attachments,
  });

  await logMessage({
    leadId: input.leadId,
    inquiryId: input.inquiryId,
    clientId: input.clientId,
    invoiceId: input.invoiceId,
    // The Cc is part of who was told, so it belongs in the record.
    toEmail: input.cc ? `${input.to}, ${input.cc}` : input.to,
    subject: input.subject,
    body: input.body,
    status: result.ok ? "sent" : result.provider === null ? "skipped" : "failed",
    provider: result.provider,
    providerId: result.id,
    error: result.error,
    createdBy: input.createdBy,
  }).catch((error) => {
    // The mail already left; losing its log line must not fail the action.
    console.error("message_log_failed", error);
  });

  return { ok: result.ok, error: result.error };
}

export async function listMessagesForLead(leadId: string, limit = 50): Promise<MessageRow[]> {
  const sql = getSql();
  const rows = (await sql.query(
    `${SELECT} where lead_id = $1 order by created_at desc limit $2`,
    [leadId, limit],
  )) as RawMessage[];
  return rows.map(toRow);
}

export async function listMessagesForInvoice(
  invoiceId: string,
  limit = 20,
): Promise<MessageRow[]> {
  const sql = getSql();
  const rows = (await sql.query(
    `${SELECT} where invoice_id = $1 order by created_at desc limit $2`,
    [invoiceId, limit],
  )) as RawMessage[];
  return rows.map(toRow);
}

export async function listMessagesForInquiry(
  inquiryId: string,
  limit = 50,
): Promise<MessageRow[]> {
  const sql = getSql();
  const rows = (await sql.query(
    `${SELECT} where inquiry_id = $1 order by created_at desc limit $2`,
    [inquiryId, limit],
  )) as RawMessage[];
  return rows.map(toRow);
}

/** Last outbound mail per lead, for the "did I answer this?" column. */
export async function lastOutboundByLead(): Promise<Map<string, string>> {
  const sql = getSql();
  const rows = (await sql`
    select lead_id, max(created_at)::text as last_at
    from messages
    where lead_id is not null and direction = 'out' and status = 'sent'
    group by lead_id
  `) as { lead_id: string; last_at: string }[];
  return new Map(rows.map((row) => [row.lead_id, row.last_at]));
}

export async function lastOutboundByInquiry(): Promise<Map<string, string>> {
  const sql = getSql();
  const rows = (await sql`
    select inquiry_id, max(created_at)::text as last_at
    from messages
    where inquiry_id is not null and direction = 'out' and status = 'sent'
    group by inquiry_id
  `) as { inquiry_id: string; last_at: string }[];
  return new Map(rows.map((row) => [row.inquiry_id, row.last_at]));
}
