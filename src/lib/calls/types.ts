import { z } from "zod";

export {
  CALL_CHANNELS,
  CALL_TOPICS,
  TOPIC_LABELS,
  TOPIC_TO_SERVICE,
  topicForPath,
  type CallChannel,
  type CallTopic,
} from "./topics";
import { CALL_CHANNELS, CALL_TOPICS } from "./topics";

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
