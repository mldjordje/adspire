"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";
import styles from "./HomeV4.module.css";
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
  { title: "Dr Igić Clinic", image: "/images/case-studies/drigic-mobileview.png", href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike", accent: "#f2efe6", meta: "2025 · Next.js · Supabase · Booking" },
  { title: "Prevoz Kop", image: "/images/case-studies/prevozkop-desktop.png", href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem", accent: "#2f6bff", meta: "2025 · Next.js · CRM · SEO" },
  { title: "Santos & Santorini", image: "/images/case-studies/santos-desktop.png", href: "/our-projects/santos-santorini-web-shop-admin-platforma", accent: "#5b8bff", meta: "2024 · E-commerce · Admin · Lager" },
  { title: "TeachFromHome", image: "/images/case-studies/teachfromhome-desktop.png", href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike", accent: "#2f6bff", meta: "2024 · Onboarding · Audio · Funnel" },
  { title: "Doctor Barber", image: "/images/case-studies/doctorbarber.png", href: "/our-projects/doctor-barber-online-booking-sistem", accent: "#f2efe6", meta: "2024 · Booking 24/7 · PWA" },
];

// section rail keys — labels come from copy.rail by index
const RAIL_KEYS = ["hero", "manifesto", "value", "projects", "services", "aiDemo", "process", "faq", "cta"] as const;

// gen = SceneV4 shape the cloud re-knits into while the row is hovered
// (0 sphere · 1 torus knot · 2 galaxy · 3 crystal · 4 neural · 5 wave · 6 "A")
// title/desc/tags come from copy; num is derived from index
const SERVICES = [
  { href: "/our-services/web-prezentacije", gen: 0, c1: [0.92, 0.91, 0.98], c2: [1, 0.96, 0.88] },
  { href: "/our-services/e-commerce-web-shop", gen: 3, c1: [0.78, 0.79, 0.9], c2: [1, 0.97, 0.9] },
  { href: "/our-services/mobilne-aplikacije", gen: 1, c1: [0.85, 0.84, 0.92], c2: [0.72, 0.74, 0.86] },
  { href: "/our-services/cms-sistemi", gen: 5, c1: [0.62, 0.65, 0.75], c2: [0.85, 0.87, 0.95] },
  { href: "/our-services/ai-integracije-automatizacija", gen: 4, c1: [0.4, 0.66, 1.0], c2: [0.85, 0.9, 1.0] },
  { href: "/our-services/seo-digitalni-marketing", gen: 2, c1: [0.92, 0.88, 0.82], c2: [0.75, 0.77, 0.9] },
  { href: "/our-services/cyber-security-gdpr", gen: 3, c1: [0.86, 0.78, 0.74], c2: [0.7, 0.72, 0.85] },
  { href: "/our-services/interaktivne-web-tehnologije", gen: 6, c1: [0.78, 0.79, 0.9], c2: [0.95, 0.93, 0.88] },
];

// num/suffix are locale-agnostic; label comes from copy.metrics by index
const METRICS = [
  { num: 100, suffix: "" },
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
      "%cADSPIRE %c— OBSIDIAN v4\n%cRučno kodirano u Nišu. WebGL, GSAP, 24.000 čestica.\nTražiš ovakav sajt? djordje@adspire.rs",
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

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

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
          q(`.${styles.heroBadge}, .${styles.heroSub}, .${styles.heroCtas}, .${styles.heroTrust}`),
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

      // ── Hero scroll-out: title lines drift apart at different speeds.
      // Targets .heroLine wrappers, NOT the chars the intro animates —
      // sharing transform channels between the two tweens corrupts state.
      q<HTMLElement>(`.${styles.heroLine}`).forEach((line, i) => {
        gsap.to(line, {
          yPercent: -(14 + i * 14),
          autoAlpha: 0,
          ease: "power1.in",
          scrollTrigger: {
            trigger: q(`.${styles.hero}`)[0],
            start: "top top",
            end: "75% top",
            scrub: 0.6,
          },
        });
      });
      gsap.to(q(`.${styles.heroInner}`)[0], {
        yPercent: 14,
        scale: 0.9,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: q(`.${styles.hero}`)[0],
          start: "20% top",
          end: "85% top",
          scrub: 0.6,
        },
      });

      // ── Marquee: infinite loop + velocity skew ──────────────────────
      const marqueeRows = q<HTMLElement>(`.${styles.marqueeRow}`);
      marqueeRows.forEach((row, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.to(row, {
          xPercent: dir * 50,
          repeat: -1,
          duration: 28,
          ease: "none",
        });
      });
      const marqueeWrap = q(`.${styles.marquee}`)[0];
      if (marqueeWrap) {
        ScrollTrigger.create({
          trigger: marqueeWrap,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const skew = gsap.utils.clamp(-8, 8, self.getVelocity() / -220);
            gsap.to(marqueeRows, { skewX: skew, duration: 0.4, overwrite: "auto" });
          },
        });
      }

      // ── Manifesto: pinned word-fill ─────────────────────────────────
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
              start: "top top",
              end: "+=115%",
              scrub: 0.4,
              pin: true,
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

        // scroll velocity leans the screenshots — shader-style smear on DOM
        const velImgs = q<HTMLElement>(`.${styles.projectImg}`);
        if (velImgs.length) {
          ScrollTrigger.create({
            trigger: projectsSection,
            start: "top top",
            end: () => `+=${getDistance()}`,
            onUpdate: (self) => {
              const v = gsap.utils.clamp(-6, 6, self.getVelocity() / -260);
              gsap.to(velImgs, {
                skewX: v * 0.7,
                scale: 1 + Math.min(Math.abs(v) * 0.006, 0.035),
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto",
              });
            },
          });
        }

        // inner parallax on each screenshot
        q<HTMLElement>(`.${styles.projectImg}`).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
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

        // cinematic letterbox bars scrub shut as the film strip approaches…
        const bars = q<HTMLElement>(`.${styles.letterbox}`);
        if (bars.length) {
          ScrollTrigger.create({
            trigger: projectsSection,
            start: "top 90%",
            end: "top top",
            scrub: 0.3,
            onUpdate: (self) => gsap.set(bars, { scaleY: self.progress }),
          });
          // …and scrub open again once the next section takes over
          const servicesSection = q<HTMLElement>(`.${styles.services}`)[0];
          if (servicesSection) {
            ScrollTrigger.create({
              trigger: servicesSection,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3,
              onUpdate: (self) => gsap.set(bars, { scaleY: 1 - self.progress }),
            });
          }
        }

        // each project re-tints the particle cloud to its accent while it
        // holds the frame; leaving the strip hands the palette back
        q<HTMLElement>(`.${styles.projectPanel}`).forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: horizontal,
            start: "left 70%",
            end: "right 30%",
            onToggle: (self) => {
              if (self.isActive) {
                window.dispatchEvent(
                  new CustomEvent("v4:tint", {
                    detail: { color: hexTo01(PROJECTS[i].accent), color2: [1, 0.96, 0.88] },
                  }),
                );
              }
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

        // per-panel content stagger as each project enters the frame
        q<HTMLElement>(`.${styles.projectPanel}`).forEach((panel) => {
          const bits = panel.querySelectorAll(
            `.${styles.projectCat}, .${styles.projectMetaRow}, .${styles.projectTitle}, .${styles.projectSummary}, .${styles.projectLink}`,
          );
          gsap.from(bits, {
            y: 44,
            autoAlpha: 0,
            stagger: 0.07,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: "left 72%",
              once: true,
            },
          });
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

      // touch devices have no hover — scroll drives the same experience:
      // the row crossing the center band lights up and morphs the cloud
      if (window.matchMedia("(pointer: coarse)").matches && svcRows.length) {
        svcRows.forEach((row, i) => {
          ScrollTrigger.create({
            trigger: row,
            start: "top 62%",
            end: "bottom 38%",
            onToggle: (self) => {
              if (self.isActive) {
                row.classList.add(styles.svcRowActive);
                const s = SERVICES[i];
                window.dispatchEvent(
                  new CustomEvent("v4:morph", {
                    detail: { gen: s.gen, color: s.c1, color2: s.c2 },
                  }),
                );
              } else {
                row.classList.remove(styles.svcRowActive);
              }
            },
          });
        });
        // leaving the section hands the cloud back to the scroll shapes
        ScrollTrigger.create({
          trigger: q(`.${styles.services}`)[0],
          start: "top 62%",
          end: "bottom 38%",
          onToggle: (self) => {
            if (!self.isActive) {
              window.dispatchEvent(new CustomEvent("v4:morph", { detail: null }));
            }
          },
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

      // ── Generic reveals: lines by default, chars for big titles ─────
      q<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.dataset.reveal === "chars") {
          const s = new SplitType(el, { types: "words, chars" });
          if (!s.chars?.length) return;
          el.style.overflow = "hidden";
          gsap.from(s.chars, {
            y: "1.1em",
            rotate: 6,
            duration: 0.8,
            stagger: 0.035,
            ease: "power4.out",
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

      // ── Scramble/decode hover on marked links ───────────────────────
      const GLYPHS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIKLMNOPRSTUVZ0123456789";
      q<HTMLElement>("[data-scramble]").forEach((el) => {
        const original = el.textContent ?? "";
        let frame = 0;
        let rafId = 0;
        const run = () => {
          frame++;
          const reveal = Math.floor(frame / 2);
          el.textContent = original
            .split("")
            .map((ch, i) => {
              if (ch === " " || i < reveal) return original[i];
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("");
          if (reveal < original.length) rafId = requestAnimationFrame(run);
          else el.textContent = original;
        };
        const onEnter = () => {
          cancelAnimationFrame(rafId);
          frame = 0;
          rafId = requestAnimationFrame(run);
        };
        el.addEventListener("mouseenter", onEnter);
      });

      // ── CTA: giant text zoom + magnetic button ─────────────────────
      const ctaTitle = q<HTMLElement>(`.${styles.ctaTitle}`)[0];
      if (ctaTitle) {
        gsap.fromTo(
          ctaTitle,
          { scale: 0.82, autoAlpha: 0.25 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: q(`.${styles.cta}`)[0],
              start: "top 90%",
              end: "top 25%",
              scrub: 0.5,
            },
          },
        );
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

    // magnetic buttons (outside gsap.context — plain listeners)
    const magnets = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const magnetCleanups = magnets.map((el) => {
      const strength = 0.35;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: mx * strength, y: my * strength, duration: 0.4, ease: "power3.out" });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    // hero chars repel from the cursor — signature interactive detail
    const repelCleanups: (() => void)[] = [];
    if (!window.matchMedia("(pointer: coarse)").matches) {
      const heroEl = root.querySelector<HTMLElement>(`.${styles.hero}`);
      const chars = Array.from(root.querySelectorAll<HTMLElement>("h1 .char"));
      if (heroEl && chars.length) {
        const movers = chars.map((ch) => ({
          el: ch,
          qx: gsap.quickTo(ch, "x", { duration: 0.5, ease: "power3.out" }),
          qr: gsap.quickTo(ch, "rotate", { duration: 0.5, ease: "power3.out" }),
        }));
        const RADIUS = 130;
        // cache untransformed char centers — reading live rects on every
        // pointermove both thrashes layout and feeds the repel offset back
        // into its own distance check
        let centers: { cx: number; cy: number }[] | null = null;
        const buildCenters = () => {
          centers = movers.map((m) => {
            const r = m.el.getBoundingClientRect();
            return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
          });
        };
        const invalidateCenters = () => {
          centers = null;
        };
        window.addEventListener("scroll", invalidateCenters, { passive: true });
        window.addEventListener("resize", invalidateCenters);
        const onRepel = (e: PointerEvent) => {
          if (!centers) buildCenters();
          for (let i = 0; i < movers.length; i++) {
            const m = movers[i];
            const c = centers![i];
            const dx = c.cx - e.clientX;
            const dy = c.cy - e.clientY;
            const dist = Math.hypot(dx, dy);
            if (dist < RADIUS) {
              const force = (1 - dist / RADIUS) * 26;
              m.qx(Math.sign(dx || 1) * force);
              m.qr(Math.sign(dx || 1) * force * 0.28);
            } else {
              m.qx(0);
              m.qr(0);
            }
          }
        };
        const onRepelLeave = () => {
          movers.forEach((m) => {
            m.qx(0);
            m.qr(0);
          });
        };
        heroEl.addEventListener("pointermove", onRepel);
        heroEl.addEventListener("pointerleave", onRepelLeave);
        repelCleanups.push(() => {
          heroEl.removeEventListener("pointermove", onRepel);
          heroEl.removeEventListener("pointerleave", onRepelLeave);
          window.removeEventListener("scroll", invalidateCenters);
          window.removeEventListener("resize", invalidateCenters);
        });
      }
    }

    // 3D tilt on project screenshots (desktop pointers only)
    const tiltCleanups: (() => void)[] = [];
    if (!window.matchMedia("(pointer: coarse)").matches) {
      root.querySelectorAll<HTMLElement>(`.${styles.projectMedia}`).forEach((media) => {
        const onMove = (e: MouseEvent) => {
          const r = media.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(media, {
            rotateY: nx * 10,
            rotateX: ny * -8,
            transformPerspective: 900,
            duration: 0.5,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(media, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
        };
        media.addEventListener("mousemove", onMove);
        media.addEventListener("mouseleave", onLeave);
        tiltCleanups.push(() => {
          media.removeEventListener("mousemove", onMove);
          media.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // services index: hover forces the particle cloud into that service's
    // shape + palette, and a glass preview panel glides after the cursor
    const svcCleanups: (() => void)[] = [];
    if (!window.matchMedia("(pointer: coarse)").matches) {
      const list = root.querySelector<HTMLElement>(`.${styles.svcList}`);
      const panel = root.querySelector<HTMLElement>(`.${styles.svcPanel}`);
      const panelDesc = panel?.querySelector<HTMLElement>(`.${styles.svcPanelDesc}`);
      const rows = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.svcRow}`));
      if (list && panel && panelDesc && rows.length) {
        const px = gsap.quickTo(panel, "x", { duration: 0.45, ease: "power3.out" });
        const py = gsap.quickTo(panel, "y", { duration: 0.45, ease: "power3.out" });
        const onListMove = (e: PointerEvent) => {
          px(e.clientX + 28);
          py(e.clientY - panel.offsetHeight / 2);
        };
        const clearMorph = () => {
          panel.classList.remove(styles.svcPanelOn);
          window.dispatchEvent(new CustomEvent("v4:morph", { detail: null }));
        };
        const enterFns = rows.map((row, i) => {
          const s = SERVICES[i];
          const onEnter = () => {
            panelDesc.textContent = t.services.items[i].desc;
            panel.style.setProperty("--sa", "#2f6bff");
            panel.classList.add(styles.svcPanelOn);
            window.dispatchEvent(
              new CustomEvent("v4:morph", {
                detail: { gen: s.gen, color: s.c1, color2: s.c2 },
              }),
            );
          };
          row.addEventListener("pointerenter", onEnter);
          return () => row.removeEventListener("pointerenter", onEnter);
        });
        list.addEventListener("pointermove", onListMove, { passive: true });
        list.addEventListener("pointerleave", clearMorph);
        svcCleanups.push(() => {
          enterFns.forEach((fn) => fn());
          list.removeEventListener("pointermove", onListMove);
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
      ctx.revert();
      magnetCleanups.forEach((fn) => fn());
      tiltCleanups.forEach((fn) => fn());
      repelCleanups.forEach((fn) => fn());
      svcCleanups.forEach((fn) => fn());
      spotCleanups.forEach((fn) => fn());
      gsap.ticker.remove(tickerFn);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} data-standalone-page="v4">
      <PreloaderV4 />
      <CursorV4 />
      <SceneV4 />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.pageProgress} aria-hidden="true" />
      <div className={`${styles.letterbox} ${styles.letterboxTop}`} aria-hidden="true" />
      <div className={`${styles.letterbox} ${styles.letterboxBottom}`} aria-hidden="true" />
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
        <div className={styles.navHud} aria-hidden="true">
          <span className={styles.navHudDot} />
          <span>NIŠ&nbsp;·&nbsp;{clock}</span>
          <span className={styles.navHudSep}>—</span>
          <span className={styles.navHudLabel}>{t.rail[activeSection]}</span>
        </div>
        <div className={styles.navRight}>
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
          <a className={styles.navCta} href="/contact-us" data-cursor="on" data-magnetic data-scramble>
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
                  if (lenisRef.current) lenisRef.current.scrollTo(el, { duration: 1.2 });
                  else el.scrollIntoView({ behavior: "smooth" });
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
              if (el) lenisRef.current?.scrollTo(el, { offset: 0, duration: 1.4 });
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
            <p className={styles.heroSub}>{t.hero.sub}</p>
            <div className={styles.heroCtas}>
              <a className={styles.btnPrimary} href="/contact-us" data-cursor="on" data-magnetic>
                {t.hero.ctaPrimary}
              </a>
              <a className={styles.btnGhost} href="/our-projects" data-cursor="on" data-scramble>
                {t.hero.ctaGhost}
              </a>
            </div>
            <div className={styles.heroTrust}>
              <span>{t.hero.trust[0]}</span>
              <span className={styles.heroTrustSep} />
              <span>{t.hero.trust[1]}</span>
              <span className={styles.heroTrustSep} />
              <span>{t.hero.trust[2]}</span>
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
                style={{ "--sa": "#2f6bff" } as React.CSSProperties}
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
          <div className={styles.svcPanel} aria-hidden="true">
            <p className={styles.svcPanelDesc} />
            <span className={styles.svcPanelCta}>{t.services.panelCta}</span>
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
