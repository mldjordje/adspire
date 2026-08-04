export const MARKETS = ["rs", "dach", "white-label"] as const;

export const SERVICES = [
  "booking",
  "web-platform",
  "ecommerce",
  "automation",
  "mobile",
  "white-label",
  "other",
] as const;

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "meeting_booked",
  "proposal_sent",
  "negotiation",
  "won",
  "lost",
] as const;

export type Market = (typeof MARKETS)[number];
export type Service = (typeof SERVICES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Serbian labels for the public form — order drives the select options. */
export const SERVICE_LABELS_SR: Record<Service, string> = {
  booking: "Sistem za zakazivanje",
  "web-platform": "Web platforma / sajt",
  ecommerce: "Web shop",
  automation: "Automatizacija / AI",
  mobile: "Mobilna aplikacija",
  "white-label": "White-label za agenciju",
  other: "Nešto drugo",
};
