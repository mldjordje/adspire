import { z } from "zod";
import { MARKETS, SERVICES } from "./types";

const trimmed = (max: number) => z.string().trim().min(1).max(max);

export const attributionSchema = z.object({
  landingPage: z.string().trim().min(1).max(500),
  referrer: z.string().trim().max(500).nullable().optional(),
  utmSource: z.string().trim().max(200).nullable().optional(),
  utmMedium: z.string().trim().max(200).nullable().optional(),
  utmCampaign: z.string().trim().max(200).nullable().optional(),
  utmContent: z.string().trim().max(200).nullable().optional(),
  utmTerm: z.string().trim().max(200).nullable().optional(),
  gclid: z.string().trim().max(500).nullable().optional(),
  gbraid: z.string().trim().max(500).nullable().optional(),
  wbraid: z.string().trim().max(500).nullable().optional(),
  msclkid: z.string().trim().max(500).nullable().optional(),
});

export const leadSubmissionSchema = z.object({
  fullName: trimmed(120),
  // Trim and lowercase before the format check so " ANA@EXAMPLE.COM " is valid.
  email: z
    .string()
    .trim()
    .max(254)
    .transform((value) => value.toLowerCase())
    .pipe(z.email()),
  company: z.string().trim().max(180).optional().default(""),
  phone: z.string().trim().max(60).optional().default(""),
  market: z.enum(MARKETS),
  service: z.enum(SERVICES),
  message: trimmed(4000),
  budgetRange: z.string().trim().max(80).optional(),
  timeline: z.string().trim().max(80).optional(),
  consent: z.literal(true),
  /** Honeypot — real users never see this field, so it must stay empty. */
  website: z.literal("").optional().default(""),
  requestId: z.string().trim().min(10).max(100),
  attribution: attributionSchema,
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
