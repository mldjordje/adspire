"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./MobileMenuV4.module.css";

/**
 * Shared OBSIDIAN mobile menu — burger + fullscreen overlay.
 * Used by the landing nav (with in-page section links) and the inner-page
 * shell (page links only). `breakpoint` matches whichever width the host
 * nav hides its desktop links at.
 */

type SectionLink = { label: string; onSelect: () => void };

const PAGES = [
  { href: "/", label: "Početna" },
  { href: "/our-projects", label: "Projekti" },
  { href: "/our-services", label: "Usluge" },
  { href: "/about-us", label: "O nama" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Kontakt" },
];

export function MobileMenuV4({
  sections,
  breakpoint = "lg",
}: {
  sections?: SectionLink[];
  breakpoint?: "lg" | "md";
}) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  // lock page scroll while the overlay is up
  useEffect(() => {
    document.documentElement.classList.toggle("v4-locked", open);
    return () => document.documentElement.classList.remove("v4-locked");
  }, [open]);

  useEffect(() => {
    if (!open) return;
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
        aria-label={open ? "Zatvori meni" : "Otvori meni"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`} aria-hidden={!open}>
        <nav className={styles.links}>
          {sections?.length ? (
            <>
              <span className={styles.groupLabel}>Na ovoj strani</span>
              {sections.map((s, i) => (
                <button
                  key={s.label}
                  className={styles.link}
                  style={{ transitionDelay: open ? `${0.06 + i * 0.045}s` : "0s" }}
                  onClick={() => {
                    close();
                    // let the overlay start lifting before the scroll kicks in
                    window.setTimeout(s.onSelect, 60);
                  }}
                >
                  {s.label}
                </button>
              ))}
              <span className={styles.groupLabel}>Stranice</span>
            </>
          ) : null}
          {PAGES.map((p, i) => (
            <a
              key={p.href}
              className={styles.link}
              href={p.href}
              style={{
                transitionDelay: open ? `${0.06 + ((sections?.length ?? 0) + i) * 0.045}s` : "0s",
              }}
              onClick={close}
            >
              {p.label}
            </a>
          ))}
        </nav>
        <div className={styles.contact}>
          <a href="tel:+381601491491">+381 60 149 149 1</a>
          <a href="mailto:djordje@adspire.rs">djordje@adspire.rs</a>
          <a href="https://wa.me/381601491491" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
