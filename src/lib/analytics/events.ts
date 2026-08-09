export const LEAD_SUBMITTED_EVENT = "adspire:lead-submitted";

export type LeadSubmittedDetail = {
  source: "contact" | "inquiry";
  service?: string;
  requestId?: string;
};

export function trackLeadSubmitted(detail: LeadSubmittedDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<LeadSubmittedDetail>(LEAD_SUBMITTED_EVENT, { detail }));
}
