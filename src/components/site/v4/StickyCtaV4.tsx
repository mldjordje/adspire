"use client";

import { useEffect, useState } from "react";
import styles from "./StickyCtaV4.module.css";

/**
 * The ask, for people who are still reading.
 *
 * Long pages — guides, case studies, the pricing page — put their call to
 * action at the bottom, which only reaches the minority who finish. This
 * appears once a reader is a quarter of the way down: they are engaged, and
 * the offer is one line and one button away instead of a scroll away.
 *
 * Dismissal is remembered for the session, so it can never become the thing a
 * returning reader has to close on every page.
 */

const DISMISS_KEY = "adspire_sticky_cta_dismissed";
const SHOW_AFTER = 0.25;

type Props = {
  /** Bold line — the promise. */
  title?: string;
  /** Secondary line, hidden on phones. */
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Reported as the CTA name in the funnel. */
  trackingLabel?: string;
  /** Second, quieter door: a 20-minute call. `null` hides it. */
  callLabel?: string | null;
  /** Pre-selected razgovor topic (see lib/calls/types). */
  callTopic?: string;
};

export function StickyCtaV4({
  title = "Reci u jednoj rečenici šta ti treba.",
  note = "Pet polja, bez naloga. Odgovaram lično, obično isti radni dan.",
  ctaLabel = "Postavi pitanje",
  ctaHref = "/upit/brzo",
  trackingLabel = "sticky-upit-brzo",
  callLabel = "Razgovor 20 min",
  callTopic = "",
}: Props) {
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 400) return; // short page: the inline CTA is enough
      setShown(window.scrollY / scrollable >= SHOW_AFTER);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Blocked storage: it will simply reappear on the next page.
    }
  };

  return (
    // data-sticky-cta tells the razgovor dock to step aside: this bar carries
    // its own call button, and two floating things read as clutter.
    <aside className={styles.bar} data-shown={shown} aria-hidden={!shown} data-sticky-cta="">
      <p className={styles.text}>
        <strong>{title}</strong>
        <span>{note}</span>
      </p>
      <a
        className={styles.cta}
        href={ctaHref}
        data-cta={trackingLabel}
        data-cursor="on"
        tabIndex={shown ? 0 : -1}
      >
        {ctaLabel}
      </a>
      {callLabel ? (
        <a
          className={styles.call}
          href="/razgovor"
          data-call={callTopic}
          data-cta={`${trackingLabel}-razgovor`}
          data-cursor="on"
          tabIndex={shown ? 0 : -1}
          aria-label={callLabel}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
          </svg>
          <span>{callLabel}</span>
        </a>
      ) : null}
      <button
        type="button"
        className={styles.close}
        onClick={dismiss}
        aria-label="Sakrij poziv na akciju"
        tabIndex={shown ? 0 : -1}
      >
        ×
      </button>
    </aside>
  );
}
