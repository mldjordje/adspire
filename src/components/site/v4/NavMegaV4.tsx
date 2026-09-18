"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./NavMegaV4.module.css";
import { getNavMenu, isCurrentPath } from "./navMenu";
import { shellPath } from "./shellCopy";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";

/**
 * Desktop header bar: a "Services" dropdown with every page grouped, plus the
 * handful of pages people ask for by name. Shared by the landing header and
 * the inner-page shell so both show the same map.
 *
 * Opens on hover for mice and on click/Enter for everyone else; the close is
 * delayed so the pointer can cross the gap between the bar and the panel.
 */
export function NavMegaV4({
  locale = defaultLocale,
  hrefFor,
  breakpoint = "lg",
}: {
  locale?: LocaleCode;
  /** Overrides locale prefixing — for standalone pages outside [locale]. */
  hrefFor?: (path: string) => string;
  /** Width below which the burger menu takes over (lg 1200, md 1024). */
  breakpoint?: "lg" | "md";
}) {
  const menu = getNavMenu(locale);
  const pathname = usePathname();
  const href = hrefFor ?? ((path: string) => shellPath(path, locale));
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const closeTimer = useRef(0);
  const hoverOpenedAt = useRef(0);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const megaCurrent = menu.groups.some((g) =>
    g.items.some((i) => i.href !== "/" && isCurrentPath(i.href, pathname)),
  );

  return (
    <nav
      ref={rootRef}
      className={`${styles.bar} ${breakpoint === "md" ? styles.hideMd : styles.hideLg}`}
      aria-label={menu.navLabel}
      onPointerEnter={(e) => e.pointerType === "mouse" && cancelClose()}
      onPointerLeave={(e) => e.pointerType === "mouse" && open && scheduleClose()}
    >
      <button
        type="button"
        className={`${styles.item} ${styles.trigger} ${open || megaCurrent ? styles.itemActive : ""}`}
        aria-expanded={open}
        aria-controls="v4-mega-panel"
        // A mouse click lands right after the hover already opened the panel;
        // toggling then would close it under the cursor.
        onClick={() => setOpen((v) => (v && Date.now() - hoverOpenedAt.current < 600 ? true : !v))}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          cancelClose();
          if (!open) hoverOpenedAt.current = Date.now();
          setOpen(true);
        }}
        data-cursor="on"
      >
        {menu.megaLabel}
        <svg className={styles.chevron} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {menu.top.map((item) => {
        const current = isCurrentPath(item.href, pathname);
        return (
          <a
            key={item.href}
            className={`${styles.item} ${current ? styles.itemActive : ""}`}
            href={href(item.href)}
            aria-current={current ? "page" : undefined}
            data-cursor="on"
          >
            {item.label}
          </a>
        );
      })}

      {/* The way back in for a buyer who already has hours or an open upit.
          Set apart from the page links: it is a door, not a page. */}
      <a
        className={`${styles.item} ${styles.account} ${isCurrentPath(menu.account.href, pathname) ? styles.itemActive : ""}`}
        href={href(menu.account.href)}
        data-cta="nav-nalog"
        data-cursor="on"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="5" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M2.8 13.4c0-2.6 2.3-4.2 5.2-4.2s5.2 1.6 5.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {menu.account.label}
      </a>

      <div
        id="v4-mega-panel"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        inert={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) close();
        }}
      >
        <div className={styles.columns}>
          {menu.groups.map((group) => (
            <div key={group.title} className={styles.column}>
              <span className={styles.groupTitle}>{group.title}</span>
              <ul className={styles.list}>
                {group.items.map((item) => {
                  const current = isCurrentPath(item.href, pathname);
                  return (
                    <li key={item.href}>
                      <a
                        className={`${styles.link} ${current ? styles.linkActive : ""}`}
                        href={href(item.href)}
                        aria-current={current ? "page" : undefined}
                        data-cursor="on"
                      >
                        <span className={styles.linkLabel}>{item.label}</span>
                        {item.hint ? <span className={styles.linkHint}>{item.hint}</span> : null}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <aside className={styles.feature}>
          <span className={styles.groupTitle}>{menu.feature.eyebrow}</span>
          <p className={styles.featureTitle}>{menu.feature.title}</p>
          <p className={styles.featureText}>{menu.feature.text}</p>
          <a className={styles.featureCta} href={href(menu.feature.href)} data-cta="nav-mega-upit" data-cursor="on">
            {menu.feature.cta} <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </nav>
  );
}
