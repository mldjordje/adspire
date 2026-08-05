/**
 * Validated environment access.
 *
 * Nothing here throws at import time — the public site must keep building and
 * serving even before the database exists. Callers that genuinely need a value
 * handle its absence.
 */

const read = (name: string) => {
  const value = process.env[name];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
};

export type SmtpEnv = {
  host: string;
  port: number;
  user: string;
  pass: string;
};

export function readSmtpEnv(): SmtpEnv | null {
  const host = read("SMTP_HOST");
  const port = read("SMTP_PORT");
  const user = read("SMTP_USER");
  const pass = read("SMTP_PASS");
  if (!host || !port || !user || !pass) return null;
  return { host, port: Number(port), user, pass };
}

/** Where lead notifications land: Đorđe's cPanel mailbox unless overridden. */
export function leadNotificationRecipient(): string | null {
  return read("LEAD_NOTIFICATION_TO") ?? read("SMTP_USER") ?? read("MAIL_REPLY_TO");
}

export type ResendEnv = {
  apiKey: string;
  /** Verified sender. Must live on a domain verified in Resend. */
  from: string;
};

/**
 * Resend is the preferred transport once its domain is verified; cPanel SMTP
 * stays as the fallback so mail never stops while DNS propagates. Both keys are
 * required together — an API key without a verified `from` produces a 403 per
 * message, which is worse than staying on SMTP.
 */
export function readResendEnv(): ResendEnv | null {
  const apiKey = read("RESEND_API_KEY") ?? read("RESEND_API_KEY_TRANSACTIONAL");
  const from = read("RESEND_FROM") ?? read("RESEND_FROM_TRANSACTIONAL");
  if (!apiKey || !from) return null;
  return { apiKey, from };
}

/**
 * The address a client's reply should land in. Kept separate from the sender:
 * Resend sends from a verified subdomain (`send.adspire.rs`) while replies must
 * arrive in the cPanel mailbox at `djordje@adspire.rs`.
 */
export function mailReplyTo(): string | null {
  return read("MAIL_REPLY_TO") ?? read("SMTP_USER");
}

