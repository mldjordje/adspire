import { normalizeAttribution, type NormalizedAttribution } from "./attribution";

/**
 * First-party attribution captured in the browser.
 *
 * The first touch is kept for the whole session, so a visitor who lands on a
 * campaign URL and submits from /contact-us three pages later is still
 * attributed to the campaign.
 */

const FIRST_TOUCH_KEY = "adspire_first_touch";

function readCurrentTouch(): NormalizedAttribution {
  const params = new URLSearchParams(window.location.search);
  return normalizeAttribution({
    landingPage: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmContent: params.get("utm_content"),
    utmTerm: params.get("utm_term"),
  });
}

function hasCampaign(touch: NormalizedAttribution) {
  return Boolean(touch.utmSource || touch.utmMedium || touch.utmCampaign);
}

/** Call once per page load. Safe to call repeatedly. */
export function captureFirstTouch(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(FIRST_TOUCH_KEY)) return;
    window.sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(readCurrentTouch()));
  } catch {
    // Private mode or blocked storage — attribution degrades to last touch.
  }
}

/**
 * Attribution to send with a lead: the stored first touch, unless the current
 * page itself carries campaign parameters.
 */
export function getSubmissionAttribution(): NormalizedAttribution {
  if (typeof window === "undefined") return normalizeAttribution({});
  const current = readCurrentTouch();
  if (hasCampaign(current)) return current;

  try {
    const stored = window.sessionStorage.getItem(FIRST_TOUCH_KEY);
    if (stored) {
      const first = normalizeAttribution(JSON.parse(stored) as Record<string, unknown>);
      // Keep the campaign from the first touch, but record where they actually
      // submitted from.
      return { ...first, landingPage: current.landingPage };
    }
  } catch {
    // fall through to current
  }
  return current;
}

/** Idempotency key so a double submit cannot create two leads. */
export function createRequestId(): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  return `web_${Date.now().toString(36)}_${random}`;
}
