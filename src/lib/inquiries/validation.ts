import { z } from "zod";
import { attributionSchema } from "@/lib/crm/validation";
import { BUYER_TYPES, isSerbia, MAX_SERVICES, MIN, TIMEFRAMES } from "./types";

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
