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

/** Where lead notifications land until Resend + n8n take over. */
export function leadNotificationRecipient(): string | null {
  return read("LEAD_NOTIFICATION_TO") ?? read("SMTP_USER");
}
