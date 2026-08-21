import { z } from "zod";

/**
 * Shape of the funnel events the public site posts to /api/events.
 *
 * Shared by the browser sender and the route so a renamed event cannot pass
 * typecheck on one side and fail validation on the other.
 */

export const EVENT_NAMES = [
  "page_view",
  "cta_click",
  "form_started",
  "form_submitted",
  "scroll_50",
  "scroll_90",
  "outbound_click",
  "contact_intent",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

/** Anything longer is a bug or an attack, not a real value. */
const short = z.string().trim().max(200);

export const siteEventSchema = z.object({
  name: z.enum(EVENT_NAMES),
  sessionId: z.string().trim().min(8).max(64),
  path: short.min(1),
  referrerHost: short.nullish(),
  utmSource: short.nullish(),
  utmMedium: short.nullish(),
  utmCampaign: short.nullish(),
  locale: z.enum(["sr", "en", "de"]).nullish(),
  device: z.enum(["mobile", "desktop"]).nullish(),
  label: short.nullish(),
  requestId: short.nullish(),
});

export type SiteEventInput = z.infer<typeof siteEventSchema>;

/** Batched: the browser flushes a queue, not one request per click. */
export const siteEventBatchSchema = z.object({
  events: z.array(siteEventSchema).min(1).max(20),
});
