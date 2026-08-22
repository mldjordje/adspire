import type { EventName, SiteEventInput } from "./schema";

/**
 * Browser side of the funnel: queue an event, flush a batch.
 *
 * WHY A QUEUE. A page view, a scroll depth and two CTA clicks on one screen are
 * four rows, and four fetches on a mobile connection cost more than they are
 * worth. Events are buffered and flushed on a short timer, on page hide, and
 * whenever the buffer fills up.
 *
 * Nothing here may throw into the page. Analytics that break a form are worse
 * than no analytics.
 */

const SESSION_KEY = "adspire_session_id";
const ENDPOINT = "/api/events";
const FLUSH_DELAY_MS = 1500;
const MAX_BATCH = 20;

type QueuedEvent = Omit<SiteEventInput, "path"> & { path: string };

let queue: QueuedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let listenersBound = false;

/** Per-tab id. sessionStorage, so it dies with the tab and tracks nobody. */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    // Blocked storage: the visit still reports, it just cannot be grouped.
    return `nostore_${Math.random().toString(36).slice(2, 14)}`;
  }
}

function referrerHost(): string | null {
  try {
    if (!document.referrer) return null;
    const host = new URL(document.referrer).host;
    // Internal navigation is not a referrer worth a row.
    return host && host !== window.location.host ? host : null;
  } catch {
    return null;
  }
}

function localeOf(path: string): "sr" | "en" | "de" {
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/de" || path.startsWith("/de/")) return "de";
  return "sr";
}

const CAMPAIGN_KEY = "adspire_campaign";

type Campaign = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

const EMPTY_CAMPAIGN: Campaign = { utmSource: null, utmMedium: null, utmCampaign: null };

/**
 * The campaign that owns this visit — sticky for the whole tab.
 *
 * WHY IT IS STORED. Ad traffic lands on a tagged URL and converts somewhere
 * else: `/?utm_source=google` first, the form on `/kontakt` two clicks later.
 * Reading the query string alone tagged the page_view and then lost the
 * submit, because by then the parameters are gone from the URL. The funnel
 * query groups per row, so those submits counted as 'direktno' and every paid
 * campaign read as zero conversions — the one number the spend is judged on.
 *
 * First touch wins: a visitor arriving from an ad and later clicking an
 * internal link with its own tag is still that ad's visit.
 */
function campaign(): Campaign {
  try {
    const params = new URLSearchParams(window.location.search);
    const current: Campaign = {
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
    };

    const stored = window.sessionStorage.getItem(CAMPAIGN_KEY);
    if (stored) return JSON.parse(stored) as Campaign;

    if (current.utmSource || current.utmMedium || current.utmCampaign) {
      window.sessionStorage.setItem(CAMPAIGN_KEY, JSON.stringify(current));
    }
    return current;
  } catch {
    // Blocked storage or a malformed query string: the event still reports,
    // it just cannot carry the campaign past the landing page.
    return EMPTY_CAMPAIGN;
  }
}

function flush(useBeacon = false) {
  if (typeof window === "undefined" || queue.length === 0) return;
  const events = queue.slice(0, MAX_BATCH);
  queue = queue.slice(MAX_BATCH);
  const body = JSON.stringify({ events });

  try {
    // On page hide only sendBeacon survives the unload; fetch gets cancelled.
    if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Dropped silently: a lost analytics row is not worth a console error.
  }
}

function bindListeners() {
  if (listenersBound || typeof window === "undefined") return;
  listenersBound = true;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush(true);
  });
  window.addEventListener("pagehide", () => flush(true));
}

export function track(name: EventName, extra: { label?: string | null; requestId?: string | null } = {}) {
  if (typeof window === "undefined") return;
  bindListeners();

  const path = window.location.pathname || "/";
  queue.push({
    name,
    sessionId: getSessionId(),
    path,
    referrerHost: referrerHost(),
    locale: localeOf(path),
    device: window.innerWidth < 768 ? "mobile" : "desktop",
    label: extra.label ?? null,
    requestId: extra.requestId ?? null,
    ...campaign(),
  });

  if (queue.length >= MAX_BATCH) {
    flush();
    return;
  }
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => flush(), FLUSH_DELAY_MS);
}
