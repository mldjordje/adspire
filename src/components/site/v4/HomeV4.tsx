"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./HomeV4.module.css";
import { ClientLogosV4 } from "./ClientLogosV4";
import { SceneV4 } from "./SceneV4";
import { PreloaderV4 } from "./PreloaderV4";
import { CursorV4 } from "./CursorV4";
import { AiDemoV4 } from "./AiDemoV4";
import { TechCarouselV4 } from "./TechCarouselV4";
import { SilkV4 } from "./SilkV4";
import { EventHorizonV4 } from "./EventHorizonV4";
import ProjectPlanesV4 from "./ProjectPlanesV4";
import { MobileMenuV4 } from "./MobileMenuV4";
import { getV4Copy } from "./copy";
import {
  defaultLocale,
  localePath,
  locales,
  splitLocaleFromPath,
  type LocaleCode,
} from "@/lib/site-config";

// ─── Structural content (all text is localized in copy.ts, zipped by index) ──

// title = brand name (same across locales); cat/summary come from copy
const PROJECTS = [
  { title: "Dr Igić Clinic", image: "/images/case-studies/drigic-mobileview.webp", href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike", accent: "#f3f5ff", meta: "2025 · Next.js · Supabase · Booking" },
  { title: "Prevoz Kop", image: "/images/case-studies/prevozkop-desktop.webp", href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem", accent: "#7890ff", meta: "2025 · Next.js · CRM · SEO" },
  { title: "Santos & Santorini", image: "/images/case-studies/santos-desktop.webp", href: "/our-projects/santos-santorini-web-shop-admin-platforma", accent: "#b8c5ff", meta: "2024 · E-commerce · Admin · Lager" },
  { title: "TeachFromHome", image: "/images/case-studies/teachfromhome-desktop.webp", href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike", accent: "#607cff", meta: "2024 · Onboarding · Audio · Funnel" },
  { title: "Doctor Barber", image: "/images/case-studies/doctorbarber.webp", href: "/our-projects/doctor-barber-online-booking-sistem", accent: "#dce3ff", meta: "2024 · Booking 24/7 · PWA" },
];

// section rail keys — labels come from copy.rail by index
const RAIL_KEYS = ["hero", "manifesto", "value", "projects", "services", "aiDemo", "process", "faq", "cta"] as const;

// gen = SceneV4 shape the cloud re-knits into while the row is hovered
// (0 sphere · 1 torus knot · 2 galaxy · 3 crystal · 4 neural · 5 wave · 6 "A")
// title/desc/tags come from copy; num is derived from index
// gen → story shape: 0 idea-core · 1 blueprint · 2 devices · 3 service-hub ·
//   4 neural · 5 pipeline · 6 growth · 7 "A". Each service morphs the cloud
//   into the form that best pictures it.
const SERVICES = [
  { href: "/our-services/web-prezentacije", gen: 2, c1: [0.34, 0.46, 1], c2: [0.8, 0.86, 1] },
  { href: "/our-services/e-commerce-web-shop", gen: 2, c1: [0.24, 0.34, 0.88], c2: [0.66, 0.74, 1] },
  { href: "/our-services/mobilne-aplikacije", gen: 2, c1: [0.46, 0.58, 1], c2: [0.88, 0.91, 1] },
  { href: "/our-services/cms-sistemi", gen: 1, c1: [0.2, 0.28, 0.72], c2: [0.58, 0.68, 0.96] },
  { href: "/our-services/ai-integracije-automatizacija", gen: 4, c1: [0.38, 0.5, 1], c2: [0.76, 0.82, 1] },
  { href: "/our-services/seo-digitalni-marketing", gen: 6, c1: [0.28, 0.4, 0.92], c2: [0.7, 0.78, 1] },
  { href: "/our-services/cyber-security-gdpr", gen: 1, c1: [0.22, 0.3, 0.78], c2: [0.64, 0.72, 0.98] },
  { href: "/our-services/interaktivne-web-tehnologije", gen: 0, c1: [0.5, 0.62, 1], c2: [0.92, 0.94, 1] },
];

// num/suffix are locale-agnostic; label comes from copy.metrics by index
const METRICS = [
  { num: 13, suffix: "" },
  { num: 5, suffix: "+" },
  { num: 48, suffix: "h" },
  { num: 24, suffix: "/7" },
];

const hexTo01 = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
];

// ─── Component ───────────────────────────────────────────────────────────────

export function HomeV4({ locale = defaultLocale }: { locale?: LocaleCode } = {}) {
  const t = getV4Copy(locale);
  const rootRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [clock, setClock] = useState("");
  const [activeSection, setActiveSection] = useState(0);
  // the scene reports the first real grab; the drag prompt retires after it
  const [grabbed, setGrabbed] = useState(false);

  useEffect(() => {
    const onGrab = () => setGrabbed(true);
    window.addEventListener("v4:grabbed", onGrab, { once: true });
    return () => window.removeEventListener("v4:grabbed", onGrab);
  }, []);
  const curtainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const { basePath } = splitLocaleFromPath(pathname);

  // live Niš clock in the nav — studio feels staffed
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("sr-RS", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Belgrade",
    });
    const update = () => setClock(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  // one-time console signature
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      "%cADSPIRE %c— OBSIDIAN v4\n%cRučno kodirano u Nišu. WebGL, GSAP, 16.000 čestica.\nTražiš ovakav sajt? djordje@adspire.rs",
      "font-size:20px;font-weight:800;color:#f2efe6",
      "font-size:20px;font-weight:300;color:#f2f1ec",
      "font-size:12px;color:#8a8a92",
    );
  }, []);

  // curtain page transition for internal navigation
  useEffect(() => {
    const root = rootRef.current;
    const curtain = curtainRef.current;
    if (!root || !curtain) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='/']");
      if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("/#")) return;
      e.preventDefault();
      curtain.classList.add(styles.curtainActive);
      // prefetch while the curtain drops, then client-navigate — no full reload
      router.prefetch(href);
      window.setTimeout(() => {
        router.push(href);
      }, 480);
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [router]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      // ── Hero intro (fires when preloader lifts) ─────────────────────
      const heroTitle = q<HTMLElement>(`.${styles.heroTitle}`)[0];
      // words,chars — words stay atomic so char inline-blocks can't wrap mid-word
      const split = heroTitle ? new SplitType(heroTitle, { types: "words, chars" }) : null;

      const intro = gsap.timeline({ paused: true });
      if (split?.chars?.length) {
        // em-based y, not yPercent — percent transforms on these inline-block
        // chars get resolved against glyph width and corrupt X
        intro.from(split.chars, {
          y: "1.15em",
          stagger: 0.028,
          duration: 1.1,
          ease: "power4.out",
        });
      }
      intro
        .from(
          q(`.${styles.heroBadge}, .${styles.heroCtas}`),
          { y: 26, autoAlpha: 0, stagger: 0.09, duration: 0.8, ease: "power3.out" },
          "-=0.55",
        )
        .from(
          q(`.${styles.heroScrollHint}, .${styles.nav}`),
          { autoAlpha: 0, duration: 0.6 },
          "-=0.4",
        );

      let introPlayed = false;
      const playIntro = () => {
        if (introPlayed) return;
        introPlayed = true;
        intro.play();
      };
      window.addEventListener("v4:ready", playIntro, { once: true });
      const introFallback = window.setTimeout(playIntro, 2600);

      // The hero exits as one composed frame so the particle scene keeps focus.
      gsap.to(q(`.${styles.heroInner}`)[0], {
        yPercent: -6,
        scale: 0.96,
        autoAlpha: 0,
        ease: "power1.in",
        scrollTrigger: {
          trigger: q(`.${styles.hero}`)[0],
          start: "18% top",
          end: "78% top",
          scrub: 0.9,
        },
      });

      // ── Marquee: one slow editorial movement ────────────────────────
      const marqueeRows = q<HTMLElement>(`.${styles.marqueeRow}`);
      marqueeRows.forEach((row, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.to(row, {
          xPercent: dir * 50,
          repeat: -1,
          duration: 52,
          ease: "none",
        });
      });

      // ── Manifesto: free scroll-through word-fill (no pin — the page never
      // locks here, so the visitor scrubs the background freely) ───────────
      const manifestoWords = q<HTMLElement>(`.${styles.manifestoWord}`);
      if (manifestoWords.length) {
        gsap.fromTo(
          manifestoWords,
          { opacity: 0.3 },
          {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: q(`.${styles.manifesto}`)[0],
              start: "top 80%",
              end: "bottom 55%",
              scrub: 0.4,
            },
          },
        );
      }

      // ── Projects: pinned horizontal scroll ──────────────────────────
      const track = q<HTMLElement>(`.${styles.projectsTrack}`)[0];
      const projectsSection = q<HTMLElement>(`.${styles.projects}`)[0];
      if (track && projectsSection) {
        const getDistance = () => track.scrollWidth - window.innerWidth;
        const horizontal = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: projectsSection,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 0.7,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Restrained parallax adds depth without distorting the work.
        q<HTMLElement>(`.${styles.projectImg}`).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -2 },
            {
              xPercent: 2,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                containerAnimation: horizontal,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        // progress bar
        const bar = q<HTMLElement>(`.${styles.projectsBar}`)[0];
        if (bar) {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: projectsSection,
                start: "top top",
                end: () => `+=${getDistance()}`,
                scrub: true,
              },
            },
          );
        }

        // The horizontal chapter shifts the sculpture's material tone per case.
        q<HTMLElement>(`.${styles.projectPanel}`).forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: horizontal,
            start: "left 68%",
            end: "right 32%",
            onToggle: (self) => {
              if (!self.isActive) return;
              window.dispatchEvent(
                new CustomEvent("v4:tint", {
                  detail: {
                    color: hexTo01(PROJECTS[i].accent),
                    color2: [0.84, 1, 0.94],
                  },
                }),
              );
            },
          });
        });
        ScrollTrigger.create({
          trigger: projectsSection,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (!self.isActive) {
              window.dispatchEvent(new CustomEvent("v4:tint", { detail: null }));
            }
          },
        });
      }

      // ── Services: editorial index — rows rise in, borders draw ──────
      const svcRows = q<HTMLElement>(`.${styles.svcRow}`);
      svcRows.forEach((row, i) => {
        gsap.from(row, {
          y: 60,
          autoAlpha: 0,
          duration: 0.85,
          delay: (i % 4) * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });
      });

      // On touch, the centered service becomes the active WebGL sculpture.
      if (window.matchMedia("(pointer: coarse)").matches && svcRows.length) {
        svcRows.forEach((row, i) => {
          ScrollTrigger.create({
            trigger: row,
            start: "top 62%",
            end: "bottom 38%",
            onToggle: (self) => {
              row.classList.toggle(styles.svcRowActive, self.isActive);
              if (!self.isActive) return;
              const s = SERVICES[i];
              window.dispatchEvent(
                new CustomEvent("v4:morph", {
                  detail: { gen: s.gen, color: s.c1, color2: s.c2 },
                }),
              );
            },
          });
        });
      }

      // ── Process: line draws down, steps light up ────────────────────
      const processTrack = q<HTMLElement>(`.${styles.processTrack}`)[0];
      if (processTrack) {
        gsap.fromTo(
          q(`.${styles.processLine}`)[0],
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: processTrack,
              start: "top 70%",
              end: "bottom 45%",
              scrub: 0.4,
            },
          },
        );
        q<HTMLElement>(`.${styles.processStep}`).forEach((step) => {
          gsap.from(step, {
            x: -36,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 78%", once: true },
          });
        });
      }

      // ── Value cards stagger in ──────────────────────────────────────
      const valueCards = q<HTMLElement>(`.${styles.valueCard}`);
      if (valueCards.length) {
        gsap.from(valueCards, {
          y: 60,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: valueCards[0], start: "top 82%", once: true },
        });
      }

      // ── Metrics count-up ────────────────────────────────────────────
      q<HTMLElement>(`.${styles.metricNum}`).forEach((el) => {
        const target = Number(el.dataset.num ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(state.v)}${suffix}`;
          },
        });
      });

      // ── Generic reveals: words for display type, lines for body copy
      q<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.dataset.reveal === "chars") {
          const s = new SplitType(el, { types: "words" });
          if (!s.words?.length) return;
          el.style.overflow = "hidden";
          gsap.from(s.words, {
            y: "0.75em",
            autoAlpha: 0,
            duration: 0.95,
            stagger: 0.055,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
          return;
        }
        const s = new SplitType(el, { types: "lines" });
        if (!s.lines?.length) return;
        s.lines.forEach((line) => {
          const wrap = document.createElement("div");
          wrap.style.overflow = "hidden";
          line.parentNode?.insertBefore(wrap, line);
          wrap.appendChild(line);
        });
        gsap.from(s.lines, {
          y: "1.15em",
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // ── CTA: one deliberate entrance, then the section stays calm
      const ctaTitle = q<HTMLElement>(`.${styles.ctaTitle}`)[0];
      if (ctaTitle) {
        gsap.from(ctaTitle, {
          y: 48,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ctaTitle, start: "top 82%", once: true },
        });
      }

      // ── Section rail tracking ───────────────────────────────────────
      RAIL_KEYS.forEach((key, i) => {
        const el = q<HTMLElement>(`.${styles[key]}`)[0];
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) setActiveSection(i);
          },
        });
      });

      // page scroll progress
      const pageBar = q<HTMLElement>(`.${styles.pageProgress}`)[0];
      if (pageBar) {
        gsap.fromTo(
          pageBar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
          },
        );
      }

      return () => {
        window.removeEventListener("v4:ready", playIntro);
        window.clearTimeout(introFallback);
        split?.revert();
      };
    }, root);

    // Pins were measured while the preloader held `html.v4-locked`
    // (overflow:hidden) — so every ScrollTrigger start/end is stale and pinned
    // sections snap. The preloader fires v4:ready ~950ms BEFORE it drops the
    // lock, so refreshing on that event is still too early — watch for the
    // class actually being removed, then recompute.
    const htmlEl = document.documentElement;
    const syncScroll = () => {
      ScrollTrigger.refresh();
    };
    const trySync = () => {
      if (htmlEl.classList.contains("v4-locked")) return;
      unlockObserver.disconnect();
      window.clearTimeout(syncFallback);
      syncScroll();
    };
    const unlockObserver = new MutationObserver(trySync);
    unlockObserver.observe(htmlEl, { attributes: true, attributeFilter: ["class"] });
    // Force a sync just past the shortened preloader hard cap + lift.
    const syncFallback = window.setTimeout(() => {
      unlockObserver.disconnect();
      syncScroll();
    }, 4700);
    trySync(); // handle an already-unlocked page (e.g. hot reload)
    // late-loading project screenshots shift layout → refresh on window load too
    window.addEventListener("load", syncScroll);

    // magnetic buttons (outside gsap.context — plain listeners)
    const magnets = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const magnetCleanups = magnets.map((el) => {
      const strength = 0.12;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: mx * strength, y: my * strength, duration: 0.55, ease: "power3.out" });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "power3.out" });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    // Subtle project tilt is a hover detail, never a competing animation.
    const tiltCleanups: (() => void)[] = [];
    if (!window.matchMedia("(pointer: coarse)").matches) {
      root.querySelectorAll<HTMLElement>(`.${styles.projectMedia}`).forEach((media) => {
        const onMove = (e: MouseEvent) => {
          const r = media.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(media, {
            rotateY: nx * 3,
            rotateX: ny * -2,
            transformPerspective: 1200,
            duration: 0.7,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(media, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
        };
        media.addEventListener("mousemove", onMove);
        media.addEventListener("mouseleave", onLeave);
        tiltCleanups.push(() => {
          media.removeEventListener("mousemove", onMove);
          media.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // Service rows directly sculpt the scene; the interface itself stays quiet.
    const svcMorphCleanups: (() => void)[] = [];
    if (!window.matchMedia("(pointer: coarse)").matches) {
      const list = root.querySelector<HTMLElement>(`.${styles.svcList}`);
      const rows = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.svcRow}`));
      if (list && rows.length) {
        const rowCleanups = rows.map((row, i) => {
          const onEnter = () => {
            const s = SERVICES[i];
            window.dispatchEvent(
              new CustomEvent("v4:morph", {
                detail: { gen: s.gen, color: s.c1, color2: s.c2 },
              }),
            );
          };
          row.addEventListener("pointerenter", onEnter);
          return () => row.removeEventListener("pointerenter", onEnter);
        });
        const clearMorph = () => {
          window.dispatchEvent(new CustomEvent("v4:morph", { detail: null }));
        };
        list.addEventListener("pointerleave", clearMorph);
        svcMorphCleanups.push(() => {
          rowCleanups.forEach((fn) => fn());
          list.removeEventListener("pointerleave", clearMorph);
          clearMorph();
        });
      }
    }

    // cursor spotlight on value cards — radial glow tracks the pointer
    const spotCleanups: (() => void)[] = [];
    root.querySelectorAll<HTMLElement>(`.${styles.valueCard}`).forEach((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      el.addEventListener("pointermove", onMove, { passive: true });
      spotCleanups.push(() => el.removeEventListener("pointermove", onMove));
    });

    return () => {
      unlockObserver.disconnect();
      window.removeEventListener("load", syncScroll);
      window.clearTimeout(syncFallback);
      ctx.revert();
      magnetCleanups.forEach((fn) => fn());
      tiltCleanups.forEach((fn) => fn());
      svcMorphCleanups.forEach((fn) => fn());
      spotCleanups.forEach((fn) => fn());
    };
  }, []);

  // Keep section navigation native and deterministic. The explicit header
  // offset avoids landing underneath the fixed navigation on touch devices.
  const scrollToSection = (el: HTMLElement) => {
    const top = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  };

  return (
    <div ref={rootRef} className={styles.root} data-standalone-page="v4">
      <PreloaderV4 />
      <CursorV4 />
      <SceneV4 />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.cinemaFrame} aria-hidden="true" />
      <div className={styles.pageProgress} aria-hidden="true" />
      <div ref={curtainRef} className={styles.curtain} aria-hidden="true">
        <span className={styles.curtainLogo}>
          ADSPIRE<span className={styles.navLogoDot}>.</span>
        </span>
      </div>

      {/* ── Nav ── */}
      <header className={styles.nav}>
        <a className={styles.navLogo} href={localePath("/", locale)} data-cursor="on">
          ADSPIRE<span className={styles.navLogoDot}>.</span>
        </a>
        {/* Real pages, not in-page anchors. The header used to scroll to
            landing sections only, which left every actual route — services,
            work, pricing, guides — reachable from the footer alone.
            `/cena-izrade-sajta` has no localized route yet, so it is SR-only. */}
        <nav
          className={styles.desktopNav}
          aria-label={
            locale === "sr" ? "Glavna navigacija" : locale === "de" ? "Hauptnavigation" : "Main navigation"
          }
        >
          {[
            { href: "/our-services", label: t.nav.links.services },
            { href: "/our-projects", label: t.nav.links.work },
            ...(locale === "sr" ? [{ href: "/cena-izrade-sajta", label: t.nav.links.pricing }] : []),
            { href: "/blog", label: t.nav.links.blog },
            { href: "/about-us", label: t.nav.links.about },
          ].map((item) => (
            <Link
              key={item.href}
              className={styles.desktopNavItem}
              href={localePath(item.href, locale)}
              data-cursor="on"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.navRight}>
          <div className={styles.navHud} aria-hidden="true">
            <span className={styles.navHudDot} />
            <span>NIŠ&nbsp;·&nbsp;{clock}</span>
            <span className={styles.navHudSep}>—</span>
            <span className={styles.navHudLabel}>{t.rail[activeSection]}</span>
          </div>
          <div className={styles.langSwitch} role="group" aria-label="Language">
            {locales.map((lc) => (
              <Link
                key={lc}
                href={localePath(basePath, lc)}
                className={`${styles.langItem} ${lc === locale ? styles.langItemActive : ""}`}
                hrefLang={lc}
                aria-current={lc === locale ? "true" : undefined}
                data-cursor="on"
              >
                {lc.toUpperCase()}
              </Link>
            ))}
          </div>
          <a className={styles.navCta} href="/upit" data-cursor="on" data-magnetic data-scramble>
            {t.nav.cta}
          </a>
          <MobileMenuV4
            sections={RAIL_KEYS.map((key, i) => ({ key, label: t.rail[i] }))
              .filter((r) => r.key !== "hero" && r.key !== "manifesto" && r.key !== "value")
              .map((r) => ({
                label: r.label,
                onSelect: () => {
                  const el = rootRef.current?.querySelector<HTMLElement>(`.${styles[r.key]}`);
                  if (!el) return;
                  scrollToSection(el);
                },
              }))}
          />
        </div>
      </header>

      {/* section rail — desktop navigation spine */}
      <aside className={styles.rail} aria-label="Sekcije">
        {RAIL_KEYS.map((key, i) => (
          <button
            key={key}
            className={`${styles.railItem} ${i === activeSection ? styles.railItemActive : ""}`}
            data-cursor="on"
            aria-label={t.rail[i]}
            onClick={() => {
              const el = rootRef.current?.querySelector<HTMLElement>(`.${styles[key]}`);
              if (el) scrollToSection(el);
            }}
          >
            <span className={styles.railNum}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.railLabel}>{t.rail[i]}</span>
          </button>
        ))}
      </aside>

      <main className={styles.main}>
        {/* ── 01 · Hero ── */}
        <section className={styles.hero}>
          <div className={`${styles.heroAura} ${styles.heroAuraA}`} aria-hidden="true" />
          <div className={`${styles.heroAura} ${styles.heroAuraB}`} aria-hidden="true" />
          <div className={styles.heroInner}>
            <span className={styles.heroSheen} aria-hidden="true" />
            <p className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              {t.hero.badge}
            </p>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroLine}>{t.hero.title[0]}</span>
              <span className={`${styles.heroLine} ${styles.heroLineOutline}`}>{t.hero.title[1]}</span>
              <span className={styles.heroLine}>
                {t.hero.title[2]}<span className={styles.heroAccentDot}>.</span>
              </span>
            </h1>
            <div className={styles.heroCtas}>
              <a className={styles.btnPrimary} href="/contact-us" data-cursor="on" data-magnetic>
                {t.hero.ctaPrimary}
              </a>
              <a className={styles.btnGhost} href="/our-projects" data-cursor="on" data-scramble>
                {t.hero.ctaGhost}
              </a>
            </div>
            <div
              className={styles.sceneGestureHint}
              data-grabbed={grabbed ? "true" : undefined}
              aria-hidden="true"
            >
              <span className={styles.sceneGestureIcon}>↔</span>
              <span>{t.hero.drag}</span>
            </div>
          </div>
          <div className={styles.heroScrollHint} aria-hidden="true">
            <span>{t.hero.scroll}</span>
            <span className={styles.heroScrollLine} />
          </div>
        </section>

        {/* ── 02 · Marquee ── */}
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeRow}>
            <span>{t.marquee.repeat(4)}</span>
          </div>
          <div className={`${styles.marqueeRow} ${styles.marqueeRowAlt}`}>
            <span>{t.marquee.repeat(4)}</span>
          </div>
        </div>

        {/* ── 03 · Manifesto ── */}
        <section className={styles.manifesto}>
          <p className={styles.manifestoText} aria-label={t.manifesto}>
            {t.manifesto.split(" ").map((w, i) => (
              <span key={i} className={styles.manifestoWord} aria-hidden="true">
                {w}{" "}
              </span>
            ))}
          </p>
        </section>

        <ClientLogosV4 locale={locale} />

        {/* ── 03b · Value props — šta tačno plaćate ── */}
        <section className={styles.value}>
          <SilkV4 opacity={0.55} />
          <div className={styles.valueHead}>
            <span className={styles.sectionEyebrow}>{t.value.eyebrow}</span>
            <h2 className={styles.sectionTitle} data-reveal="chars">
              {t.value.title}
            </h2>
          </div>
          <div className={styles.valueGrid}>
            {t.value.items.map((v, i) => (
              <div key={i} className={styles.valueCard} data-cursor="on">
                <span className={styles.valueNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04 · Projects — horizontal cinema ── */}
        <section className={styles.projects} aria-label="Odabrani projekti">
          <div className={styles.projectsTrack}>
            <div className={styles.projectsIntro}>
              <span className={styles.sectionEyebrow}>{t.projects.eyebrow}</span>
              <h2 className={styles.projectsIntroTitle} data-reveal="chars">
                {t.projects.title}
              </h2>
              <p className={styles.projectsIntroHint}>{t.projects.hint}</p>
            </div>
            {PROJECTS.map((p, i) => (
              <article
                key={p.title}
                className={styles.projectPanel}
                style={{ "--accent": p.accent } as React.CSSProperties}
              >
                <span className={styles.projectIndex}>{String(i + 1).padStart(2, "0")}</span>
                <div className={styles.projectMedia} data-cursor={t.projects.open}>
                  <a href={p.href} className={styles.projectMediaLink} aria-label={p.title}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.projectImg} src={p.image} alt={p.title} loading="lazy" />
                  </a>
                </div>
                <div className={styles.projectInfo}>
                  <span className={styles.projectCat}>{t.projects.items[i].cat}</span>
                  <span className={styles.projectMetaRow}>{p.meta}</span>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <p className={styles.projectSummary}>{t.projects.items[i].summary}</p>
                  <a className={styles.projectLink} href={p.href} data-cursor="on" data-scramble>
                    {t.projects.link}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <ProjectPlanesV4
            className={styles.projectGL}
            panelClass={styles.projectPanel}
            mediaClass={styles.projectMedia}
            linkClass={styles.projectMediaLink}
            imgClass={styles.projectImg}
          />
          <div className={styles.projectsProgress} aria-hidden="true">
            <span className={styles.projectsBar} />
          </div>
        </section>

        {/* ── 05 · Services — editorial index, hover morphs the scene ── */}
        <section className={styles.services}>
          <div className={styles.servicesHead}>
            <span className={styles.sectionEyebrow}>{t.services.eyebrow}</span>
            <h2 className={styles.sectionTitle} data-reveal="chars">
              {t.services.title}
            </h2>
          </div>
          <div className={styles.svcList}>
            {SERVICES.map((s, i) => (
              <a
                key={s.href}
                className={styles.svcRow}
                href={s.href}
                data-cursor="on"
                style={{ "--sa": "#7890ff" } as React.CSSProperties}
              >
                <span className={styles.svcNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.svcTitleWrap} aria-hidden="true">
                  <span className={styles.svcTitle}>{t.services.items[i].title}</span>
                  <span className={`${styles.svcTitle} ${styles.svcTitleGhost}`}>{t.services.items[i].title}</span>
                </span>
                <span className={styles.svcTitleSr}>{t.services.items[i].title}</span>
                <p className={styles.svcDesc}>{t.services.items[i].desc}</p>
                <span className={styles.svcMeta}>
                  {t.services.items[i].tags.map((tag) => (
                    <span key={tag} className={styles.svcTag}>
                      {tag}
                    </span>
                  ))}
                </span>
                <span className={styles.svcArrow} aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── 06 · AI agent live demo ── */}
        <section className={styles.aiDemo}>
          <div className={styles.aiDemoHead}>
            <span className={styles.sectionEyebrow}>{t.aiDemo.eyebrow}</span>
            <h2 className={styles.sectionTitle} data-reveal="chars">
              {t.aiDemo.title}
            </h2>
            <p className={styles.aiDemoNote}>{t.aiDemo.note}</p>
          </div>
          <AiDemoV4 locale={locale} />
        </section>

        {/* ── 07 · Process ── */}
        <section className={styles.process}>
          <div className={styles.processHead}>
            <span className={styles.sectionEyebrow}>{t.process.eyebrow}</span>
            <h2 className={styles.sectionTitle} data-reveal="chars">
              {t.process.title}
            </h2>
          </div>
          <div className={styles.processTrack}>
            <span className={styles.processLine} aria-hidden="true" />
            {t.process.items.map((p, i) => (
              <div key={i} className={styles.processStep}>
                <span className={styles.processNum}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className={styles.processTitle}>{p.title}</h3>
                  <p className={styles.processDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 08 · Tech — infinite carousel ── */}
        <section className={styles.tech}>
          <div className={styles.techHead}>
            <span className={styles.sectionEyebrow}>{t.tech.eyebrow}</span>
            <h2 className={styles.sectionTitle} data-reveal="chars">
              {t.tech.title}
            </h2>
          </div>
          <TechCarouselV4 />
        </section>

        {/* ── 09 · Metrics ── */}
        <section className={styles.metrics}>
          {METRICS.map((m, i) => (
            <div key={i} className={styles.metric}>
              <span className={styles.metricNum} data-num={m.num} data-suffix={m.suffix}>
                0
              </span>
              <span className={styles.metricLabel}>{t.metrics[i]}</span>
            </div>
          ))}
        </section>

        {/* ── 10 · FAQ ── */}
        <section className={styles.faq}>
          <div className={styles.faqHead}>
            <span className={styles.sectionEyebrow}>{t.faq.eyebrow}</span>
            <h2 className={styles.sectionTitle} data-reveal="chars">
              {t.faq.title}
            </h2>
          </div>
          <div className={styles.faqList}>
            {t.faq.items.map((item, i) => (
              <div key={item.q} className={styles.faqItem}>
                <button
                  className={styles.faqQ}
                  data-cursor="on"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ""}`}>
                    +
                  </span>
                </button>
                <div className={`${styles.faqA} ${openFaq === i ? styles.faqAOpen : ""}`}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 11 · CTA ── */}
        <section className={styles.cta}>
          <EventHorizonV4 />
          <div className={styles.ctaVeil} aria-hidden="true" />
          <span className={styles.sectionEyebrow}>{t.cta.eyebrow}</span>
          <h2 className={styles.ctaTitle}>
            {t.cta.titleLine1}
            <br />
            {t.cta.titleLine2Pre}<span className={styles.ctaAccent}>{t.cta.titleAccent}</span>
          </h2>
          <a
            className={styles.ctaButton}
            href="mailto:djordje@adspire.rs"
            data-cursor="on"
            data-magnetic
          >
            djordje@adspire.rs
          </a>
          <div className={styles.ctaAlt}>
            <span>{t.cta.altPrefix}</span>
            <a href="tel:+381601491491" data-cursor="on">+381 60 149 149 1</a>
            <span className={styles.ctaAltSep}>·</span>
            <a href="https://wa.me/381601491491" target="_blank" rel="noreferrer" data-cursor="on">
              WhatsApp
            </a>
          </div>
          <p className={styles.ctaNote}>{t.cta.note}</p>
          <div className={styles.wordmark} aria-hidden="true">
            <span className={styles.wordmarkText} data-reveal="chars">
              ADSPIRE
            </span>
          </div>
          <footer className={styles.footer}>
            <div className={styles.footerGrid}>
              <div className={styles.footerCol}>
                <span className={styles.footerBrand}>
                  ADSPIRE<span className={styles.navLogoDot}>.</span>
                </span>
                <p className={styles.footerBlurb}>{t.footer.blurb}</p>
              </div>
              <div className={styles.footerCol}>
                <span className={styles.footerColTitle}>{t.footer.mapTitle}</span>
                <a href="/our-projects" data-cursor="on">{t.footer.map[0]}</a>
                <a href="/our-services" data-cursor="on">{t.footer.map[1]}</a>
                <a href="/blog" data-cursor="on">{t.footer.map[2]}</a>
                {/* Serbian only — the pricing guide has no en/de translation yet,
                    and a footer link into Serbian copy from /en would read as broken. */}
                {locale === "sr" && (
                  <>
                    <a href="/vodici" data-cursor="on">Vodiči</a>
                    <a href="/cena-izrade-sajta" data-cursor="on">Cene</a>
                    <a href="/politika-privatnosti" data-cursor="on">Privatnost</a>
                    <a href="/politika-kolacica" data-cursor="on">Kolačići</a>
                    <a href="/uslovi-koriscenja" data-cursor="on">Uslovi</a>
                  </>
                )}
                <a href="/contact-us" data-cursor="on">{t.footer.map[3]}</a>
              </div>
              <div className={styles.footerCol}>
                <span className={styles.footerColTitle}>{t.footer.contactTitle}</span>
                <a href="mailto:djordje@adspire.rs" data-cursor="on">djordje@adspire.rs</a>
                <a href="tel:+381601491491" data-cursor="on">+381 60 149 149 1</a>
                <span>{t.footer.location}</span>
              </div>
              <div className={styles.footerCol}>
                <span className={styles.footerColTitle}>{t.footer.statusTitle}</span>
                <span className={styles.footerStatus}>
                  <span className={styles.footerStatusDot} />
                  {t.footer.status}
                </span>
                <span className={styles.footerVersion}>OBSIDIAN · v4.0</span>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <span>{t.footer.copyright}</span>
              <span>{t.footer.credit}</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
