"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MobileMenuV4.module.css";
import { getShellCopy } from "./shellCopy";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";

/**
 * Shared OBSIDIAN mobile menu — burger + fullscreen overlay.
 * Used by the landing nav (with in-page section links) and the inner-page
 * shell (page links only). `breakpoint` matches whichever width the host
 * nav hides its desktop links at.
 */

type SectionLink = { label: string; onSelect: () => void };

export function MobileMenuV4({
  sections,
  breakpoint = "lg",
  locale = defaultLocale,
}: {
  sections?: SectionLink[];
  breakpoint?: "lg" | "md";
  locale?: LocaleCode;
}) {
  const copy = getShellCopy(locale);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  // lock page scroll while the overlay is up
  useEffect(() => {
    document.documentElement.classList.toggle("v4-locked", open);
    return () => document.documentElement.classList.remove("v4-locked");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const bpClass = breakpoint === "md" ? styles.showMd : styles.showLg;

  return (
    <div className={bpClass}>
      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
        aria-label={open ? copy.menuClose : copy.menuOpen}
        aria-expanded={open}
        aria-controls="v4-mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      {mounted
        ? createPortal(
            <div
              id="v4-mobile-menu"
              className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
              aria-hidden={!open}
              role="dialog"
              aria-modal="true"
              aria-label="Glavni meni"
            >
              <div className={styles.overlayHead}>
                <span className={styles.overlayBrand}>ADSPIRE.</span>
                <span className={styles.overlayIndex}>NAV / 2026</span>
                <button ref={closeRef} className={styles.overlayClose} onClick={close} aria-label={copy.menuClose}>
                  <span />
                  <span />
                </button>
              </div>
              <div className={styles.menuGrid}>
                <nav className={styles.links} aria-label={copy.menuPagesLabel}>
                  <span className={styles.groupLabel}>{copy.menuPagesLabel}</span>
                  {copy.menuPages.map((p, i) => (
                    <a
                      key={p.href}
                      className={styles.link}
                      href={localePath(p.href, locale)}
                      style={{ transitionDelay: open ? `${0.04 + i * 0.04}s` : "0s" }}
                      onClick={close}
                    >
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {p.label}
                    </a>
                  ))}
                </nav>
                {sections?.length ? (
                  <nav className={styles.sectionLinks} aria-label={copy.menuSectionsLabel}>
                    <span className={styles.groupLabel}>{copy.menuSectionsLabel}</span>
                    {sections.map((s, i) => (
                      <button
                        key={s.label}
                        className={styles.sectionLink}
                        style={{ transitionDelay: open ? `${0.1 + i * 0.035}s` : "0s" }}
                        onClick={() => {
                          close();
                          window.setTimeout(s.onSelect, 80);
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </nav>
                ) : null}
              </div>
              <div className={styles.contact}>
                <a href="tel:+381601491491">+381 60 149 149 1</a>
                <a href="mailto:djordje@adspire.rs">djordje@adspire.rs</a>
                <a href="https://wa.me/381601491491" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
