import { z } from "zod";

import type { Service } from "@/lib/crm/types";

/**
 * What the call is about. Kept to six so it fits one phone screen as chips;
 * the owner asks the rest on the call. Each maps onto the CRM service enum so
 * the lead lands in the right pipeline column.
 */
export const CALL_TOPICS = ["sajt", "zakazivanje", "shop", "ai", "softver", "drugo"] as const;
export type CallTopic = (typeof CALL_TOPICS)[number];

export const TOPIC_TO_SERVICE: Record<CallTopic, Service> = {
  sajt: "web-platform",
  zakazivanje: "booking",
  shop: "ecommerce",
  ai: "automation",
  softver: "mobile",
  drugo: "other",
};

export const TOPIC_LABELS: Record<"sr" | "en", Record<CallTopic, string>> = {
  sr: {
    sajt: "Sajt za firmu",
    zakazivanje: "Online zakazivanje",
    shop: "Web shop",
    ai: "AI i automatizacija",
    softver: "Aplikacija / softver",
    drugo: "Još ne znam",
  },
  en: {
    sajt: "Business website",
    zakazivanje: "Online booking",
    shop: "Online store",
    ai: "AI & automation",
    softver: "App / custom software",
    drugo: "Not sure yet",
  },
};

/**
 * The topic a page is obviously about, so a call button on the web shop page
 * starts at "when?". Null on general pages (home, contact, blog): there the
 * visitor picks. Order matters — "softver-za-salon" is booking, not software.
 */
export function topicForPath(path: string): CallTopic | null {
  const p = path.replace(/^\/(en|de)(?=\/|$)/, "");
  if (/zakazivanj|booking|termin|salon|frizer|stomatolo|veterinar|teretan|hotel|rezervac|no-show/.test(p)) return "zakazivanje";
  if (/shop|prodavnic|online-store|woocommerce|shopify/.test(p)) return "shop";
  if (/(^|\/)ai|chatbot|automatiz/.test(p)) return "ai";
  if (/softver|aplikacij|interni|excel|mobilne/.test(p)) return "softver";
  if (/sajt|website|prezentacion/.test(p)) return "sajt";
  return null;
}

export const CALL_CHANNELS = ["phone", "meet"] as const;
export type CallChannel = (typeof CALL_CHANNELS)[number];

export const CALL_STATUSES = ["zakazano", "odrzano", "otkazano", "nije_se_javio"] as const;
export type CallStatus = (typeof CALL_STATUSES)[number];

export const CALL_STATUS_LABEL: Record<CallStatus, string> = {
  zakazano: "Zakazano",
  odrzano: "Održano",
  otkazano: "Otkazano",
  nije_se_javio: "Nije se javio",
};

/** Digits, spaces and the usual separators; at least 6 digits so "123" is refused. */
const phonePattern = /^\+?[\d\s()./-]{6,30}$/;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value ? value : null));

export const callSubmissionSchema = z
  .object({
    requestId: z.string().trim().min(10).max(100),
    topic: z.enum(CALL_TOPICS),
    channel: z.enum(CALL_CHANNELS),
    asap: z.boolean(),
    date: z.string().trim().max(10).optional().nullable(),
    slot: z.string().trim().max(5).optional().nullable(),
    fullName: z.string().trim().min(2).max(120),
    phone: optionalText(40),
    email: z
      .string()
      .trim()
      .max(254)
      .optional()
      .transform((value) => (value ? value.toLowerCase() : null))
      .pipe(z.email().nullable()),
    company: optionalText(180),
    note: optionalText(600),
    locale: z.enum(["sr", "en", "de"]).default("sr"),
    source: optionalText(300),
    /** Honeypot — real visitors never see this field. */
    website: z.literal("").optional().default(""),
    attribution: z.record(z.string(), z.unknown()).optional().default({}),
  })
  .superRefine((value, ctx) => {
    if (value.channel === "phone") {
      const digits = (value.phone ?? "").replace(/\D/g, "");
      if (!value.phone || !phonePattern.test(value.phone) || digits.length < 6) {
        ctx.addIssue({ code: "custom", path: ["phone"], message: "phone" });
      }
    }
    if (value.channel === "meet" && !value.email) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "email" });
    }
    if (!value.asap && (!value.date || !value.slot)) {
      ctx.addIssue({ code: "custom", path: ["slot"], message: "slot" });
    }
  });

export type CallSubmission = z.infer<typeof callSubmissionSchema>;

export type CallBookingResult =
  | { ok: true; id: string; asap: boolean }
  | { ok: false; code: "invalid" | "closed" | "past" | "taken"; message: string };
