/**
 * Shared vocabulary for upiti (service inquiries).
 *
 * Deliberately free of `server-only` and of any database import: the public
 * form, the write route, the status page and `/os` all read these, and they run
 * in three different places.
 */

export const INQUIRY_STATUSES = [
  "submitted",
  "quoted",
  "accepted",
  "declined",
  "canceled",
] as const;

export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export function isInquiryStatus(value: unknown): value is InquiryStatus {
  return typeof value === "string" && (INQUIRY_STATUSES as readonly string[]).includes(value);
}

export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  submitted: "Poslat",
  quoted: "Ponuda poslata",
  accepted: "Prihvaćen",
  declined: "Odbijen",
  canceled: "Otkazan",
};

export const TIMEFRAMES = ["asap", "1-3m", "3-6m", "flex"] as const;

export type Timeframe = (typeof TIMEFRAMES)[number];

export function isTimeframe(value: unknown): value is Timeframe {
  return typeof value === "string" && (TIMEFRAMES as readonly string[]).includes(value);
}

/** What the owner reads in `/os` and in the notification mail. The buyer picks
 *  from the same four buckets — "kada ti treba" typed free-form comes back as
 *  "što pre" and cannot be scheduled against. */
export const TIMEFRAME_LABEL: Record<Timeframe, string> = {
  asap: "Što pre — hitno",
  "1-3m": "1–3 meseca",
  "3-6m": "3–6 meseci",
  flex: "Fleksibilno",
};

export const BUYER_TYPES = ["individual", "company"] as const;

export type BuyerType = (typeof BUYER_TYPES)[number];

export const BUYER_TYPE_LABEL: Record<BuyerType, string> = {
  individual: "Fizičko lice",
  company: "Pravno lice",
};

/** How many services one brief may cover. More than three is not a brief, it is
 *  a wish list, and it cannot be quoted in one pass. */
export const MAX_SERVICES = 3;

/** Minimum lengths, in one place so the hint text, the live counter and the
 *  server check can never disagree. */
export const MIN = {
  fullName: 2,
  businessName: 2,
  businessDescription: 30,
  idea: 50,
  /** The quick form asks for one sentence, not a brief. Fifty characters is a
   *  wall for someone who only wants to ask whether a thing is possible. */
  quickIdea: 20,
} as const;

/**
 * Which form a brief arrived through.
 *
 * 'full'  — /upit: everything needed to write and send a quote in one pass.
 * 'quick' — /upit/brzo: name, mail, business, service, one sentence. Built for
 *           a cold visitor off an ad, who will abandon rather than look up a
 *           company registration number to ask a question.
 *
 * Both land in the same table and the same queue. The difference is what is
 * missing, which is why `/os` shows it: a quick upit is answered with a
 * question, a full one with a price.
 */
export const INTAKE_MODES = ["full", "quick"] as const;

export type IntakeMode = (typeof INTAKE_MODES)[number];

export function isIntakeMode(value: unknown): value is IntakeMode {
  return typeof value === "string" && (INTAKE_MODES as readonly string[]).includes(value);
}

export const INTAKE_LABEL: Record<IntakeMode, string> = {
  full: "Pun brief",
  quick: "Brzi upit",
};

/** The answers that are specific to a brief. Stored in `inquiries.brief`
 *  because they are free-form and belong to nothing else. */
export type InquiryBrief = {
  idea: string;
  /** Optional extras the buyer listed. Empty string when they skipped it. */
  wishes: string;
  timeframe: Timeframe;
};

/** PIB and matični broj are issued by the Serbian register, so they are only
 *  demanded of a Serbian company. */
export function isSerbia(country: string | null | undefined): boolean {
  const value = (country ?? "").trim().toLowerCase();
  return value === "srbija" || value === "serbia" || value === "rs";
}
