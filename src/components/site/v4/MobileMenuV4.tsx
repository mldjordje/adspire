"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import styles from "./MobileMenuV4.module.css";
import { getShellCopy, shellPath } from "./shellCopy";
import { getNavMenu, isCurrentPath } from "./navMenu";
import { v4FontClass } from "./fonts";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";

/**
 * Shared OBSIDIAN mobile menu — burger + fullscreen overlay.
 *
 * The two things visitors come for (send an inquiry, AI education) are cards
 * at the top, so they are on screen the moment the menu opens. Everything else
 * is a short grouped list instead of one long column of display-size links.
 * `breakpoint` matches whichever width the host nav hides its desktop bar at.
 */

type SectionLink = { label: string; onSelect: () => void };

export function MobileMenuV4({
  sections,
  breakpoint = "lg",
  locale = defaultLocale,
  hrefFor,
}: {
  sections?: SectionLink[];
  breakpoint?: "lg" | "md";
  locale?: LocaleCode;
  /** Overrides locale prefixing — for standalone pages outside [locale]. */
  hrefFor?: (path: string) => string;
}) {
  const copy = getShellCopy(locale);
  const menu = getNavMenu(locale);
  const pathname = usePathname();
  const href = hrefFor ?? ((path: string) => shellPath(path, locale));
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
  const groups = [...menu.groups, menu.company];

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
              // Portalled to <body>, outside the page's font wrapper.
              className={`${v4FontClass} ${styles.overlay} ${open ? styles.overlayOpen : ""}`}
              aria-hidden={!open}
              inert={!open}
              role="dialog"
              aria-modal="true"
              aria-label={menu.menuLabel}
            >
              <div className={styles.overlayHead}>
                <a className={styles.overlayBrand} href={href("/")} onClick={close}>
                  ADSPIRE<span>.</span>
                </a>
                <button ref={closeRef} className={styles.overlayClose} onClick={close} aria-label={copy.menuClose}>
                  <span />
                  <span />
                </button>
              </div>

              <div className={styles.body}>
                <div className={styles.actions}>
                  {menu.actions.map((action, i) => (
                    <a
                      key={action.href}
                      className={`${styles.action} ${i === 0 ? styles.actionPrimary : ""}`}
                      href={href(action.href)}
                      data-cta={action.cta}
                      onClick={close}
                    >
                      <span className={styles.actionLabel}>{action.label}</span>
                      <span className={styles.actionHint}>{action.hint}</span>
                      <span className={styles.actionArrow} aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>

                {/* A door, not a page: a buyer with hours or an open upit
                    should not have to read the whole menu to find the way in. */}
                <a
                  className={styles.account}
                  href={href(menu.account.href)}
                  data-cta="menu-nalog"
                  onClick={close}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <circle cx="8" cy="5" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M2.8 13.4c0-2.6 2.3-4.2 5.2-4.2s5.2 1.6 5.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  {menu.account.label} — sati, termini i upiti
                </a>

                <div className={styles.groups}>
                  {groups.map((group) => (
                    <nav key={group.title} className={styles.group} aria-label={group.title}>
                      <span className={styles.groupLabel}>{group.title}</span>
                      {group.items.map((item) => {
                        const current = isCurrentPath(item.href, pathname);
                        return (
                          <a
                            key={item.href}
                            className={`${styles.link} ${current ? styles.linkActive : ""}`}
                            href={href(item.href)}
                            aria-current={current ? "page" : undefined}
                            onClick={close}
                          >
                            {item.label}
                          </a>
                        );
                      })}
                    </nav>
                  ))}
                </div>

                {sections?.length ? (
                  <nav className={styles.sections} aria-label={menu.sectionsLabel}>
                    <span className={styles.groupLabel}>{menu.sectionsLabel}</span>
                    <div className={styles.chips}>
                      {sections.map((s) => (
                        <button
                          key={s.label}
                          className={styles.chip}
                          onClick={() => {
                            close();
                            window.setTimeout(s.onSelect, 80);
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
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
