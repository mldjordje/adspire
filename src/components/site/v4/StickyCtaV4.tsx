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
};

export function StickyCtaV4({
  title = "Reci šta ti treba — dobićeš ponudu sa fiksnom cenom.",
  note = "Odgovor obično isti dan.",
  ctaLabel = "Pošalji upit",
  ctaHref = "/upit",
  trackingLabel = "sticky-upit",
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
    <aside className={styles.bar} data-shown={shown} aria-hidden={!shown}>
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
