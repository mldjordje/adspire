"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CALL_TOPICS, topicForPath, type CallTopic } from "@/lib/calls/topics";
import { localePath, type LocaleCode } from "@/lib/site-config";
import { CallBookingV4 } from "./CallBookingV4";
import { getCallCopy } from "./callCopy";
import { CALL_OPEN_EVENT } from "./events";
import styles from "./CallDrawerV4.module.css";

/**
 * One drawer per page, opened by any `<a data-call>` anywhere on it.
 *
 * Every razgovor button on the site is a plain link to /razgovor, so it works
 * without JavaScript and search engines see a real page. With JavaScript this
 * catches the click first (capture phase, before the page-transition curtain)
 * and opens the booking in place: a visitor who is reading a service page
 * keeps their place instead of being sent somewhere else to fill a form.
 *
 * `data-call="shop"` pre-selects the topic, so a button on the web shop page
 * starts at "when?" instead of asking what the visitor obviously came for.
 */

type Props = {
  locale?: LocaleCode;
  /** Floating button for pages that have no sticky bar of their own. */
  dock?: boolean;
};

export function CallDrawerV4({ locale = "sr", dock = true }: Props) {
  const t = getCallCopy(locale);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<CallTopic | null>(null);
  const [source, setSource] = useState<string | undefined>();
  const [session, setSession] = useState(0);
  const [dockShown, setDockShown] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const show = useCallback((value: string | null, from: string | undefined) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    // An explicit data-call topic wins; an empty one falls back to what the page is about.
    setTopic(
      value && (CALL_TOPICS as readonly string[]).includes(value)
        ? (value as CallTopic)
        : topicForPath(window.location.pathname),
    );
    setSource(from);
    // A fresh widget each time: a half-filled form from an earlier open is
    // more confusing than helpful when the visitor came from another button.
    setSession((n) => n + 1);
    setOpen(true);
    window.dispatchEvent(new Event(CALL_OPEN_EVENT));
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-call]");
      if (!link) return;
      event.preventDefault();
      event.stopPropagation();
      const cta = link.getAttribute("data-cta");
      show(link.getAttribute("data-call"), `${window.location.pathname}${cta ? `#${cta}` : ""}`);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, close]);

  // The dock appears once the hero is behind the reader, and steps aside
  // when the page already has a sticky bar (which carries its own call button).
  useEffect(() => {
    if (!dock) return;
    const onScroll = () => {
      const hasBar = document.querySelector("[data-sticky-cta]") !== null;
      setDockShown(!hasBar && window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dock]);

  return (
    <>
      {dock ? (
        <a
          className={styles.dock}
          href={localePath("/razgovor", locale)}
          data-call=""
          data-cta="dock-razgovor"
          data-shown={dockShown && !open}
          aria-hidden={!dockShown || open}
          tabIndex={dockShown && !open ? 0 : -1}
        >
          <span className={styles.dockDot} aria-hidden="true" />
          {t.dock}
        </a>
      ) : null}

      <div className={styles.overlay} data-open={open} onClick={close} aria-hidden="true" />
      <div
        className={styles.panel}
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="call-drawer-title"
        aria-hidden={!open}
        // Lenis on the homepage would otherwise swallow the wheel inside the panel.
        data-lenis-prevent=""
      >
        <div className={styles.grab} aria-hidden="true" />
        <header className={styles.head}>
          <div>
            <span className={styles.eyebrow}>
              <span className={styles.live} aria-hidden="true" />
              {t.eyebrow}
            </span>
            <h2 id="call-drawer-title" className={styles.title}>
              {t.title}
            </h2>
          </div>
          <button ref={closeRef} type="button" className={styles.close} onClick={close} aria-label={t.close}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>
        <div className={styles.scroll} data-call-scroll="">
          <p className={styles.lead}>{t.lead}</p>
          {/* Stays mounted after close so the panel does not empty mid-slide. */}
          {session > 0 ? (
            <CallBookingV4 key={session} locale={locale} initialTopic={topic} source={source} onClose={close} />
          ) : null}
        </div>
      </div>
    </>
  );
}
