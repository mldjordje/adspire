"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LEAD_SUBMITTED_EVENT, type LeadSubmittedDetail } from "@/lib/analytics/events";
import styles from "./GoogleMeasurement.module.css";

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
    adspireGoogleInitialized?: boolean;
  }
}

const CONSENT_KEY = "adspire_google_measurement_consent";
const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID?.trim() ?? "";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? "";
const GOOGLE_ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL?.trim() ?? "";
const LOADER_ID = GOOGLE_TAG_ID || GOOGLE_ADS_ID;

type Consent = "unknown" | "granted" | "denied";

function initializeGoogleTag() {
  if (!LOADER_ID || typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  if (window.adspireGoogleInitialized) return;
  window.adspireGoogleInitialized = true;

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });

  if (!document.querySelector(`script[data-adspire-google-tag="${LOADER_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(LOADER_ID)}`;
    script.dataset.adspireGoogleTag = LOADER_ID;
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  if (GOOGLE_TAG_ID) window.gtag("config", GOOGLE_TAG_ID, { send_page_view: false });
  if (GOOGLE_ADS_ID && GOOGLE_ADS_ID !== GOOGLE_TAG_ID) {
    window.gtag("config", GOOGLE_ADS_ID, { send_page_view: false });
  }
}

function updateGoogleConsent(choice: Exclude<Consent, "unknown">) {
  const value = choice === "granted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

function sendPageView() {
  if (!window.gtag || !GOOGLE_TAG_ID) return;
  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
}

export function GoogleMeasurement() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>("unknown");

  useEffect(() => {
    if (!LOADER_ID) return;
    initializeGoogleTag();
    const stored = window.localStorage.getItem(CONSENT_KEY);
    const next = stored === "granted" || stored === "denied" ? stored : "unknown";
    setConsent(next);
    if (next !== "unknown") updateGoogleConsent(next);
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;
    initializeGoogleTag();
    sendPageView();
  }, [consent, pathname]);

  useEffect(() => {
    if (consent !== "granted") return;

    const onLead = (event: Event) => {
      const detail = (event as CustomEvent<LeadSubmittedDetail>).detail;
      window.gtag?.("event", "generate_lead", {
        lead_source: detail.source,
        service: detail.service ?? "unspecified",
        request_id: detail.requestId,
      });
      if (GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL) {
        window.gtag?.("event", "conversion", {
          send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
          transaction_id: detail.requestId,
        });
      }
    };

    const onContactClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.href;
      const channel = href.startsWith("tel:")
        ? "phone"
        : href.startsWith("mailto:")
          ? "email"
          : href.includes("wa.me/")
            ? "whatsapp"
            : null;
      if (channel) window.gtag?.("event", "contact_click", { channel, link_url: href });
    };

    window.addEventListener(LEAD_SUBMITTED_EVENT, onLead);
    document.addEventListener("click", onContactClick);
    return () => {
      window.removeEventListener(LEAD_SUBMITTED_EVENT, onLead);
      document.removeEventListener("click", onContactClick);
    };
  }, [consent]);

  if (!LOADER_ID || consent !== "unknown") return null;

  const choose = (choice: Exclude<Consent, "unknown">) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setConsent(choice);
    initializeGoogleTag();
    updateGoogleConsent(choice);
  };

  return (
    <aside className={styles.banner} aria-label="Izbor analitike">
      <p>
        Koristimo opciono Google merenje da vidimo koje stranice i kampanje dovode upite.
        Ne učitava se dok ne prihvatiš. <a href="/politika-kolacica">Detalji</a>
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.reject} onClick={() => choose("denied")}>
          Odbij
        </button>
        <button type="button" className={styles.accept} onClick={() => choose("granted")}>
          Prihvati
        </button>
      </div>
    </aside>
  );
}
