import { z } from "zod";
import { attributionSchema } from "@/lib/crm/validation";
import { BUYER_TYPES, INTAKE_MODES, isSerbia, MAX_SERVICES, MIN, TIMEFRAMES } from "./types";

/**
 * The brief, as it arrives from the form.
 *
 * The client-side form validates the same rules for feedback; this is the one
 * that decides. Company-only rules live in the refinement at the bottom so an
 * individual is never asked for a PIB.
 *
 * WHY BUDGET IS OPTIONAL. Someone asking for a web shop usually cannot estimate
 * one, and a required number is how that brief gets abandoned rather than sent.
 * Blank is an answer — it is a question for the first call.
 */

const trimmed = (max: number, min = 1) => z.string().trim().min(min).max(max);
const optional = (max: number) => z.string().trim().max(max).optional().default("");

export const inquirySubmissionSchema = z
  .object({
    services: z.array(z.string().trim().min(1).max(120)).min(1).max(MAX_SERVICES),
    buyerType: z.enum(BUYER_TYPES),
    // Absent means the long form, which is the only thing that existed before
    // /upit/brzo — an old client that never sends the field still validates.
    intake: z.enum(INTAKE_MODES).optional().default("full"),

    fullName: trimmed(120, MIN.fullName),
    email: z
      .string()
      .trim()
      .max(254)
      .transform((value) => value.toLowerCase())
      .pipe(z.email()),
    phone: optional(60),

    companyName: optional(180),
    pib: optional(20),
    mb: optional(20),
    address: optional(200),
    city: optional(120),
    country: trimmed(80),

    businessName: trimmed(180, MIN.businessName),
    businessDescription: trimmed(2000, MIN.businessDescription),
    idea: trimmed(6000, MIN.idea),
    wishes: optional(4000),
    timeframe: z.enum(TIMEFRAMES),

    // Blank, null and absent all mean "the buyer did not say". Only a value
    // that was actually supplied has to be a sane number — a zero would read in
    // `/os` as a real answer.
    budgetEur: z
      .union([z.number(), z.string(), z.null()])
      .optional()
      .transform((value) => {
        if (value === null || value === undefined) return null;
        const raw = typeof value === "string" ? value.trim() : value;
        if (raw === "") return null;
        return Number(raw);
      })
      .refine(
        (value) =>
          value === null || (Number.isFinite(value) && value > 0 && value <= 10_000_000),
        { message: "Budžet mora biti broj veći od nule, ili ostavi prazno." },
      ),

    consent: z.literal(true),
    /** Honeypot — real users never see this field, so it must stay empty. */
    website: z.literal("").optional().default(""),
    requestId: z.string().trim().min(10).max(100),
    attribution: attributionSchema,
  })
  .superRefine((value, ctx) => {
    if (value.buyerType !== "company") return;

    const require = (field: "companyName" | "address" | "city", message: string) => {
      if (value[field].trim().length < 2) {
        ctx.addIssue({ code: "custom", path: [field], message });
      }
    };
    require("companyName", "Upiši pun naziv firme.");
    require("address", "Upiši adresu.");
    require("city", "Upiši grad.");

    // A company abroad is not held up by a format it cannot meet.
    if (!isSerbia(value.country)) return;
    if (!/^\d{9}$/.test(value.pib.trim())) {
      ctx.addIssue({ code: "custom", path: ["pib"], message: "PIB mora imati 9 cifara." });
    }
    if (!/^\d{8}$/.test(value.mb.trim())) {
      ctx.addIssue({ code: "custom", path: ["mb"], message: "Matični broj mora imati 8 cifara." });
    }
  });

export type InquirySubmission = z.infer<typeof inquirySubmissionSchema>;

/**
 * The quick brief — /upit/brzo.
 *
 * Five answers: who, where to reply, what business, which service, what they
 * need. Everything the long form asks beyond that is billing detail, and a
 * stranger who arrived from an ad has no reason to hand it over before they
 * know whether the thing is even possible. Those answers are collected in the
 * reply instead.
 *
 * It parses into the exact same shape as the long brief so the route, the
 * store, the mails and `/os` stay one code path — the blanks are blank, and
 * `intake: "quick"` is what tells the owner why.
 */
export const quickInquirySchema = z
  .object({
    intake: z.literal("quick"),
    services: z.array(z.string().trim().min(1).max(120)).min(1).max(MAX_SERVICES),

    fullName: trimmed(120, MIN.fullName),
    email: z
      .string()
      .trim()
      .max(254)
      .transform((value) => value.toLowerCase())
      .pipe(z.email()),
    phone: optional(60),

    businessName: trimmed(180, MIN.businessName),
    idea: trimmed(6000, MIN.quickIdea),

    consent: z.literal(true),
    website: z.literal("").optional().default(""),
    requestId: z.string().trim().min(10).max(100),
    attribution: attributionSchema,
  })
  .transform((value): InquirySubmission => ({
    ...value,
    // Someone naming a business is quoted as one. The legal name, PIB and
    // address are asked for when there is a quote to issue, not before.
    buyerType: "company",
    companyName: "",
    pib: "",
    mb: "",
    address: "",
    city: "",
    country: "",
    businessDescription: "",
    wishes: "",
    // Not asked, so the least presumptuous bucket. "Hitno" would put a
    // stranger's question ahead of a paying client's deadline.
    timeframe: "flex",
    budgetEur: null,
  }));

/** Picks the schema by the `intake` field the form declares. Anything that does
 *  not say `quick` is held to the full brief's rules. */
export function parseInquirySubmission(raw: unknown): InquirySubmission {
  const intake = (raw as { intake?: unknown } | null)?.intake;
  return intake === "quick"
    ? quickInquirySchema.parse(raw)
    : inquirySubmissionSchema.parse(raw);
}
