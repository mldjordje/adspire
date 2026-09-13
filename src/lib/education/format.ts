// Labels and display helpers for edukacija. Pure, so the portal calendar, /os
// and the mails all say the same thing.

export const EDU_KINDS = ["education", "consulting"] as const;
export type EduKind = (typeof EDU_KINDS)[number];

export const isEduKind = (value: unknown): value is EduKind =>
  typeof value === "string" && (EDU_KINDS as readonly string[]).includes(value);

export const KIND_LABEL: Record<EduKind, string> = {
  education: "Edukacija",
  consulting: "Konsultacije",
};

export type BookingStatus = "zakazano" | "odrzano" | "otkazano";

export const BOOKING_STATUS_LABEL: Record<BookingStatus, string> = {
  zakazano: "Zakazano",
  odrzano: "Održano",
  otkazano: "Otkazano",
};

/** Reasons a human may give for taking hours off a wallet. */
export const DEDUCTION_REASONS = ["offline", "correction"] as const;
export type DeductionReason = (typeof DEDUCTION_REASONS)[number];

export type LedgerReason = "purchase" | "manual" | "booking" | "refund" | DeductionReason;

export const LEDGER_REASON_LABEL: Record<LedgerReason, string> = {
  purchase: "Uplata",
  manual: "Dodato ručno",
  booking: "Termin",
  refund: "Povraćaj",
  offline: "Održano van kalendara",
  correction: "Ispravka",
};

/**
 * The `reason` to store for a hand-written entry.
 *
 * The two ways hours come off by hand mean opposite things read back months
 * later: `offline` is the client using an hour held over the phone,
 * `correction` is erasing a mis-keyed grant. Anything unrecognised falls back to
 * `correction`, which never inflates what the client "used".
 */
export function ledgerReason(hours: number, requested?: unknown, paid = false): LedgerReason {
  if (hours > 0) return paid ? "purchase" : "manual";
  return typeof requested === "string" &&
    (DEDUCTION_REASONS as readonly string[]).includes(requested)
    ? (requested as DeductionReason)
    : "correction";
}

const MONTHS = [
  "januar", "februar", "mart", "april", "maj", "jun",
  "jul", "avgust", "septembar", "oktobar", "novembar", "decembar",
];

/**
 * "2026-09-14" → "14. septembar 2026.". Formatted from the string: a date-only
 * value parsed through `new Date()` lands on UTC midnight and can print as the
 * previous day.
 */
export function formatDay(value: string | null | undefined): string {
  const match = value ? /^(\d{4})-(\d{2})-(\d{2})/.exec(value) : null;
  if (!match) return "—";
  const [, year, month, day] = match;
  return `${Number(day)}. ${MONTHS[Number(month) - 1]} ${year}.`;
}

/** "2026-09" → "septembar 2026." — no Intl, so server and client render alike. */
export function formatMonth(month: string): string {
  const [year, m] = month.split("-");
  return `${MONTHS[Number(m) - 1] ?? ""} ${year}.`;
}

/** "1 sat" / "2 sata" / "5 sati"; the teens and fractions take the plural. */
export function formatHours(hours: number): string {
  const rounded = Math.round(hours * 100) / 100;
  const value = rounded.toLocaleString("sr-RS", { maximumFractionDigits: 2 });
  if (!Number.isInteger(rounded)) return `${value} sati`;
  const whole = Math.abs(rounded) % 100;
  const last = whole % 10;
  const teen = whole >= 11 && whole <= 14;
  const word = teen ? "sati" : last === 1 ? "sat" : last >= 2 && last <= 4 ? "sata" : "sati";
  return `${value} ${word}`;
}

/** A pasted meeting or recording link. Only http(s) — a `javascript:` URL would
 *  be rendered as an anchor on the client's page. */
export function cleanUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString().slice(0, 500);
  } catch {
    return null;
  }
}
