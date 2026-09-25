"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ServicesExplorerV4.module.css";
import { servicesExplorer } from "./servicesExplorer";

/**
 * The SR services index as a navigator, built on the mobile menu's pattern:
 * two action cards up top, then named groups that open one at a time.
 *
 * ~60 pages on one screen buried the one a visitor came for, so they see
 * eight group titles with a one-line summary each and open only the one that
 * matches. On desktop the groups are tabs with the open panel beside them; on
 * a phone the same markup is an accordion. Every link stays in the HTML
 * whichever group is open, so crawlers and assistants still see the full list.
 * A search box covers the visitor who already knows the word they want.
 */

const fold = (s: string) =>
  s
    .toLowerCase()
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const DESKTOP = "(min-width: 960px)";

export function ServicesExplorerV4() {
  const groups = useMemo(() => servicesExplorer(), []);
  const [openId, setOpenId] = useState<string | null>(groups[0]?.id ?? null);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<typeof import("gsap").default | null>(null);

  // A phone starts with everything closed, like the menu; a hash (#ai) opens that group.
  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (groups.some((g) => g.id === fromHash)) setOpenId(fromHash);
    else if (!window.matchMedia(DESKTOP).matches) setOpenId(null);
  }, [groups]);

  // Entrance: tabs slide in from the left, cards drop into place.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      gsapRef.current = gsap;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 85%", once: true } });
        tl.from(`.${styles.action}`, { y: 40, autoAlpha: 0, rotateX: 12, transformPerspective: 800, stagger: 0.1, duration: 0.9, ease: "expo.out" })
          .from(`.${styles.search}`, { scaleX: 0.6, autoAlpha: 0, transformOrigin: "0 50%", duration: 0.8, ease: "power4.out" }, "-=0.6")
          .from(`.${styles.tab}`, { x: -30, autoAlpha: 0, stagger: 0.05, duration: 0.7, ease: "power3.out" }, "-=0.5")
          .from(`.${styles.panelOpen} .${styles.link}`, { y: 24, autoAlpha: 0, stagger: 0.03, duration: 0.6, ease: "power3.out", clearProps: "transform,opacity,visibility" }, "-=0.5");
      }, root);
      revert = () => ctx.revert();
    });
    return () => {
      disposed = true;
      revert?.();
    };
  }, []);

  // Switching groups re-deals the cards instead of swapping them in one frame.
  useEffect(() => {
    const gsap = gsapRef.current;
    const root = rootRef.current;
    if (!gsap || !root || !openId) return;
    const links = root.querySelectorAll(`#svc-panel-${openId} .${styles.link}`);
    gsap.fromTo(
      links,
      { y: 18, autoAlpha: 0, scale: 0.97 },
      { y: 0, autoAlpha: 1, scale: 1, stagger: 0.025, duration: 0.5, ease: "power3.out", clearProps: "transform,opacity,visibility" },
    );
  }, [openId]);

  const q = fold(query.trim());
  const results = q
    ? groups.flatMap((g) =>
        [...g.items, ...(g.more ? [g.more] : [])]
          .filter((i) => fold(`${i.label} ${i.hint ?? ""} ${g.title}`).includes(q))
          .map((i) => ({ ...i, group: g.title })),
      )
    : [];

  const toggle = (id: string) => {
    const desktop = window.matchMedia(DESKTOP).matches;
    setOpenId((cur) => (cur === id && !desktop ? null : id));
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <section ref={rootRef} className={styles.root} data-reveal-skip aria-label="Sve usluge">
      <div className={styles.actions}>
        <a className={`${styles.action} ${styles.actionPrimary}`} href="/upit/brzo" data-cta="usluge-explorer-upit" data-cursor="on">
          <span className={styles.actionLabel}>Pošalji upit</span>
          <span className={styles.actionHint}>Opišite u jednoj rečenici šta vam treba. Pet polja, bez naloga.</span>
          <span className={styles.actionArrow} aria-hidden="true">→</span>
        </a>
        <a className={styles.action} href="/besplatan-pregled-sajta" data-cta="usluge-explorer-pregled" data-cursor="on">
          <span className={styles.actionLabel}>Ne znate šta vam treba?</span>
          <span className={styles.actionHint}>Besplatno pregledamo vaš sajt i kažemo gde gubite upite.</span>
          <span className={styles.actionArrow} aria-hidden="true">→</span>
        </a>
      </div>

      <label className={styles.search}>
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="7.5" cy="7.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M11.8 11.8 16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className={styles.srOnly}>Pretraži usluge</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pretražite: web shop, frizer, AI video…"
          autoComplete="off"
        />
      </label>

      {q ? (
        <div className={styles.results} aria-live="polite">
          {results.length ? (
            <div className={styles.linkGrid}>
              {results.map((r) => (
                <a key={`${r.group}-${r.href}`} className={styles.link} href={r.href} data-cursor="otvori">
                  <span className={styles.linkLabel}>{r.label}</span>
                  <span className={styles.linkHint}>{r.hint ?? r.group}</span>
                  <span className={styles.linkArrow} aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>
              Nema pogotka za „{query.trim()}“. <a href="/upit/brzo" data-cta="usluge-explorer-nema">Opišite nam šta tražite</a> — javljamo se lično.
            </p>
          )}
        </div>
      ) : null}

      <div className={styles.groups} hidden={Boolean(q)}>
        {groups.map((g) => {
          const open = openId === g.id;
          return (
            <div key={g.id} className={styles.group}>
              <button
                type="button"
                id={`svc-tab-${g.id}`}
                className={`${styles.tab} ${open ? styles.tabOpen : ""}`}
                aria-expanded={open}
                aria-controls={`svc-panel-${g.id}`}
                onClick={() => toggle(g.id)}
                data-cursor="on"
              >
                <span className={styles.tabTitle}>{g.title}</span>
                <span className={styles.tabHint}>{g.hint}</span>
                <span className={styles.tabCount}>{g.items.length}</span>
                <span className={styles.tabChevron} aria-hidden="true" />
              </button>
              <div
                id={`svc-panel-${g.id}`}
                className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
                role="region"
                aria-labelledby={`svc-tab-${g.id}`}
              >
                <div className={styles.panelInner}>
                  <h2 className={styles.panelTitle}>{g.title}</h2>
                  <p className={styles.panelLead}>{g.lead}</p>
                  <div className={styles.linkGrid}>
                    {g.items.map((item) => (
                      <a key={item.href} className={styles.link} href={item.href} data-cursor="otvori">
                        <span className={styles.linkLabel}>{item.label}</span>
                        {item.hint ? <span className={styles.linkHint}>{item.hint}</span> : null}
                        <span className={styles.linkArrow} aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                  {g.more ? (
                    <a className={styles.more} href={g.more.href} data-cursor="on">
                      {g.more.label} →
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
