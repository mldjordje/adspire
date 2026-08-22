"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PageShellV4.module.css";
import { CursorV4 } from "./CursorV4";
import { SilkV4 } from "./SilkV4";
import { MobileMenuV4 } from "./MobileMenuV4";
import { getShellCopy, type ShellCopy } from "./shellCopy";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";

/**
 * Shared OBSIDIAN chrome for inner pages (Services, About, Contact...).
 * Lighter than the homepage: silk shader background instead of the full
 * particle scene, same nav / cursor / curtain / footer language.
 *
 * `locale` only affects chrome. A page that passes it must also render
 * localized body copy, otherwise it is a translated frame around Serbian text.
 *
 * `copyOverride` is for standalone pages outside the sr/en/de subtree (e.g.
 * /white-label) that want English chrome text without the /en/* href prefix
 * — that prefix only resolves for the handful of routes actually translated
 * under [locale], and would 404 on the rest.
 */

type PageShellProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  locale?: LocaleCode;
  copyOverride?: ShellCopy;
  /** Replaces the default silk shader — a page may bring its own background. */
  background?: React.ReactNode;
  /** Rendered inside the hero, under the intro (CTAs, stat strip, ...). */
  heroExtra?: React.ReactNode;
  children: React.ReactNode;
};

export function PageShellV4({
  eyebrow,
  title,
  intro,
  locale = defaultLocale,
  copyOverride,
  background,
  heroExtra,
  children,
}: PageShellProps) {
  const copy = copyOverride ?? getShellCopy(locale);
  const href = (path: string) => (copyOverride ? path : localePath(path, locale));
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("sr-RS", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Belgrade",
    });
    const update = () => setClock(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  // reveal + curtain nav via GSAP (dynamic import keeps it client-only)
  useEffect(() => {
    const root = rootRef.current;
    const curtain = curtainRef.current;
    if (!root) return;

    let disposed = false;
    let ctxRevert: (() => void) | null = null;

    (async () => {
      const [{ default: gsap }, stMod, splitMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("split-type"),
      ]);
      if (disposed) return;
      const ScrollTrigger = stMod.ScrollTrigger;
      const SplitType = splitMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const heading = root.querySelector<HTMLElement>(`.${styles.heroTitle}`);
        if (heading) {
          const s = new SplitType(heading, { types: "words, chars" });
          heading.style.overflow = "hidden";
          if (s.chars?.length) {
            gsap.from(s.chars, {
              y: "1.1em",
              rotate: 5,
              stagger: 0.03,
              duration: 0.9,
              ease: "power4.out",
              delay: 0.15,
            });
          }
        }
        gsap.from(root.querySelectorAll(`.${styles.heroEyebrow}, .${styles.heroIntro}`), {
          y: 24,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.8,
          delay: 0.45,
          ease: "power3.out",
        });

        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
      }, root);
      ctxRevert = () => ctx.revert();
    })();

    // curtain transition on internal links
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='/']");
      if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("/#")) return;
      e.preventDefault();
      curtain?.classList.add(styles.curtainActive);
      window.setTimeout(() => {
        window.location.href = href;
      }, 480);
    };
    root.addEventListener("click", onClick);

    return () => {
      disposed = true;
      ctxRevert?.();
      root.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} data-standalone-page="v4-inner">
      <CursorV4 />
      <div className={styles.silk}>
        {background ?? <SilkV4 opacity={0.4} />}
      </div>
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.nav}>
        <a className={styles.navLogo} href={href("/")} data-cursor="on">
          ADSPIRE<span className={styles.navDot}>.</span>
        </a>
        <nav className={styles.navLinks}>
          {copy.navLinks.map((link) => (
            <a key={link.href} href={href(link.href)} data-cursor="on">
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.navRight}>
          {/* Not localised on purpose — see navCtaHref in shellCopy. */}
          <a
            className={styles.navCta}
            href={copy.navCtaHref}
            data-cta="nav-upit"
            data-cursor="on"
            data-magnetic
          >
            {copy.navCta}
            <span className={styles.navClock}> · {copy.clockCity} {clock}</span>
          </a>
          <MobileMenuV4 breakpoint="md" locale={locale} />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.heroEyebrow}>{eyebrow}</span>
          <h1 className={styles.heroTitle}>{title}</h1>
          {intro ? <p className={styles.heroIntro}>{intro}</p> : null}
          {heroExtra}
        </section>

        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <a className={styles.footerBrand} href={href("/")} data-cursor="on">
            ADSPIRE<span className={styles.navDot}>.</span>
          </a>
          <nav className={styles.footerLinks}>
            {copy.footerLinks.map((l) => (
              <a key={l.href} href={href(l.href)} data-cursor="on">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <span>{copy.footerRights}</span>
          <a href="mailto:djordje@adspire.rs" data-cursor="on">djordje@adspire.rs</a>
          <a href="tel:+381601491491" data-cursor="on">+381 60 149 149 1</a>
        </div>
      </footer>

      <div ref={curtainRef} className={styles.curtain} aria-hidden="true">
        <span className={styles.curtainLogo}>
          ADSPIRE<span className={styles.navDot}>.</span>
        </span>
      </div>
    </div>
  );
}
