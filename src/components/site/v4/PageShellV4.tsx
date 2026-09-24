"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PageShellV4.module.css";
import { CursorV4 } from "./CursorV4";
import { SilkV4 } from "./SilkV4";
import { EventHorizonV4 } from "./EventHorizonV4";
import { FooterV4 } from "./FooterV4";
import { MobileMenuV4 } from "./MobileMenuV4";
import { NavMegaV4 } from "./NavMegaV4";
import { getShellCopy, shellPath, type ShellCopy } from "./shellCopy";
import { defaultLocale, localePath, locales, type LocaleCode } from "@/lib/site-config";

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

/**
 * Shrinks the hero title until its longest word fits the column.
 *
 * The size is one clamp() shared by every page, so a long word — "Zakazivanje",
 * or a German compound — overflows on some of them and not others. The reveal
 * animation masks the heading with overflow:hidden, so the overflow reads as
 * missing letters. Letting the word break instead only moves the problem: a
 * headline split as "Zakaz / ivanje" looks like a bug too.
 *
 * SplitType leaves every word nowrap, which is what makes the overflow
 * measurable: scrollWidth exceeds clientWidth by exactly the ratio the font
 * has to come down by.
 */
/** Below this share of the CSS size the title stops being a title. */
const MIN_HEADING_SCALE = 0.7;

function fitHeading(heading: HTMLElement) {
  heading.style.fontSize = "";
  heading.classList.remove(styles.heroTitleWrap);
  const words = heading.querySelectorAll<HTMLElement>(".word");
  if (!words.length) return;

  let ratio = 1;
  words.forEach((word) => {
    if (word.clientWidth > 0) ratio = Math.max(ratio, word.scrollWidth / word.clientWidth);
  });
  if (ratio <= 1.001) return;

  const base = parseFloat(getComputedStyle(heading).fontSize);
  if (!Number.isFinite(base)) return;

  const scale = 1 / ratio;
  if (scale >= MIN_HEADING_SCALE) {
    // A hair under the exact fit, so sub-pixel rounding cannot re-trigger a break.
    heading.style.fontSize = `${Math.floor(base * scale * 0.99)}px`;
    return;
  }

  // Shrinking the whole title to fit one very long word costs more than the
  // break does: "ONLINE-TERMINBUCHUNG" on a phone would land around 15px. Hold
  // the floor and let that word wrap — at its hyphen where it has one.
  heading.style.fontSize = `${Math.floor(base * MIN_HEADING_SCALE)}px`;
  heading.classList.add(styles.heroTitleWrap);
}

type PageShellProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  /** Marks the intro as the page's answer paragraph, for [data-answer] speakable. */
  introAnswer?: boolean;
  locale?: LocaleCode;
  copyOverride?: ShellCopy;
  /** Replaces the default silk shader — a page may bring its own background. */
  background?: React.ReactNode;
  /** Rendered inside the hero, under the intro (CTAs, stat strip, ...). */
  heroExtra?: React.ReactNode;
  /** Bespoke landing composition, with the shared Adspire navigation/footer. */
  customHero?: React.ReactNode;
  languagePath?: string;
  navCtaHref?: string;
  /** Overrides the header button label — a page whose next step is not an upit. */
  navCtaLabel?: string;
  /** Closing CTA rendered inside the footer zone, on the same event horizon. */
  finale?: React.ReactNode;
  children: React.ReactNode;
};

export function PageShellV4({
  eyebrow,
  title,
  intro,
  introAnswer,
  locale = defaultLocale,
  copyOverride,
  background,
  heroExtra,
  customHero,
  languagePath,
  navCtaHref,
  navCtaLabel,
  finale,
  children,
}: PageShellProps) {
  const copy = copyOverride ?? getShellCopy(locale);
  const href = (path: string) => (copyOverride ? path : shellPath(path, locale));
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
          fitHeading(heading);
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

    // A title is set in one clamp for every page, so the longest word decides
    // whether it fits. ResizeObserver rather than a resize listener: the column
    // also changes width when a scrollbar appears, and the measurement has to
    // happen after layout, not during the event.
    let refitFrame = 0;
    const refit = () => {
      cancelAnimationFrame(refitFrame);
      refitFrame = requestAnimationFrame(() => {
        const heading = root.querySelector<HTMLElement>(`.${styles.heroTitle}`);
        if (heading) fitHeading(heading);
      });
    };
    const ro = new ResizeObserver(refit);
    ro.observe(root);

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
      cancelAnimationFrame(refitFrame);
      ro.disconnect();
      ctxRevert?.();
      root.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} data-standalone-page="v4-inner">
      <CursorV4 />
      <div className={styles.silk}>
        {background ?? <SilkV4 />}
      </div>
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.nav}>
        <a className={styles.navLogo} href={href("/")} data-cursor="on">
          ADSPIRE<span className={styles.navDot}>.</span>
        </a>
        <NavMegaV4 breakpoint="md" locale={locale} hrefFor={copyOverride ? href : undefined} />
        <div className={styles.navRight}>
          {languagePath ? <div className={styles.languages} aria-label="Language">
            {locales.map(lc => <a key={lc} href={localePath(languagePath, lc)} hrefLang={lc} aria-current={locale === lc ? "page" : undefined}>{lc.toUpperCase()}</a>)}
          </div> : null}
          {/* Not localised on purpose — see navCtaHref in shellCopy. */}
          <a
            className={styles.navCta}
            href={navCtaHref ?? copy.navCtaHref}
            data-cta="nav-upit"
            data-cursor="on"
            data-magnetic
          >
            {navCtaLabel ?? copy.navCta}
            <span className={styles.navClock}> · {copy.clockCity} {clock}</span>
          </a>
          <MobileMenuV4 breakpoint="md" locale={locale} hrefFor={copyOverride ? href : undefined} />
        </div>
      </header>

      <main className={styles.main}>
        {customHero ?? <section className={styles.hero}>
          <span className={styles.heroEyebrow}>{eyebrow}</span>
          <h1 className={styles.heroTitle}>{title}</h1>
          {intro ? (
            <p className={styles.heroIntro} {...(introAnswer ? { "data-answer": true } : {})}>
              {intro}
            </p>
          ) : null}
          {heroExtra}
        </section>}

        {children}
      </main>

      <section className={`${styles.footerZone} ${finale ? styles.footerZoneFinale : ""}`}>
        <EventHorizonV4 locale={locale} />
        {finale}
        <div className={styles.footerWordmark} data-horizon-wordmark aria-hidden="true">
          <span className={styles.footerWordmarkText}>ADSPIRE</span>
        </div>
        <FooterV4 locale={locale} href={href} />
      </section>

      <div ref={curtainRef} className={styles.curtain} aria-hidden="true">
        <span className={styles.curtainLogo}>
          ADSPIRE<span className={styles.navDot}>.</span>
        </span>
      </div>
    </div>
  );
}
