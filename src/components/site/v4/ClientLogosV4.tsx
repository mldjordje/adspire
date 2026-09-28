"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LocaleCode } from "@/lib/site-config";
import styles from "./ClientLogosV4.module.css";

type Client = {
  name: string;
  href?: string;
  logo?: string;
  /** White artwork on a transparent or dark source should not be inverted. */
  direct?: boolean;
  /** Compensates for generous whitespace in a source brand file. */
  zoom?: boolean;
  kind?: string;
};

/**
 * Only authentic brand assets sourced from live client websites are used.
 * When a project has no public logo, its typographic mark is deliberate:
 * never fabricate a client identity or substitute a template logo.
 */
const CLIENTS: Client[] = [
  { name: "Dr Igić", href: "https://drigic.rs", logo: "/images/clients/dr-igic-authentic.png", direct: true },
  { name: "Prevoz Kop", href: "https://prevozkop.rs", logo: "/images/clients/prevoz-kop-authentic.webp" },
  { name: "Doctor Barber", href: "https://doctorbarber.rs", logo: "/images/clients/doctor-barber-authentic.png", direct: true, zoom: true },
  { name: "TeachFromHome", href: "https://teachfromhome.app", logo: "/images/clients/teach-from-home-authentic.jpg", direct: true },
  { name: "Toza AI", href: "https://toza-ai.rs", logo: "/images/clients/toza-ai.svg", direct: true },
  { name: "Dropz Tattoo", href: "https://dropz.rs", logo: "/images/clients/dropz.svg" },
  { name: "Eduka / DentalX", href: "https://eduka.co.rs", logo: "/images/clients/eduka-authentic.png", zoom: true },
  { name: "Auto Delić", href: "https://autodelic.com", logo: "/images/clients/auto-delic-authentic.png", direct: true, zoom: true },
  { name: "Hidromont Jovančić", href: "https://hidromontjovancic.rs", logo: "/images/clients/hidromont-authentic.jpg", zoom: true },
  { name: "Kopex MIN", href: "https://kopexmin.rs", logo: "/images/clients/kopex-min-authentic.png" },
  { name: "Salon Srđan", href: "https://frizerskisalonsrdjan.com", logo: "/images/clients/salon-srdjan-authentic.png", zoom: true },
  { name: "ProTruck", href: "https://protruck.rs", logo: "/images/clients/protruck-authentic.png", direct: true, zoom: true },
  // The production domain is currently offline, so this remains evidence in
  // the project grid without sending visitors to a broken external URL.
  { name: "Restoran Madera", kind: "Hospitality platform" },
  { name: "Santos & Santorini", href: "https://santos.rs", logo: "/images/clients/santos-dark-authentic.png", direct: true },
  { name: "ML Group", href: "https://mlgroup.rs", logo: "/images/clients/ml-group-authentic.png", direct: true, zoom: true },
  { name: "Mergentheim Demo Hub", kind: "12 connected landing experiences" },
];

const COPY: Record<LocaleCode, { eyebrow: string; title: string; linkLabel: string }> = {
  sr: {
    eyebrow: "Odabrani sistemi",
    title: "Produkcija, ne portfolio dekoracija.",
    linkLabel: "Posetite sajt klijenta",
  },
  en: {
    eyebrow: "Selected systems",
    title: "Production work, not portfolio decoration.",
    linkLabel: "Visit the client website",
  },
  de: {
    eyebrow: "Ausgewählte Systeme",
    title: "Produktionsarbeit statt Portfolio-Dekoration.",
    linkLabel: "Website des Kunden besuchen",
  },
};

/** How long each logo holds the spotlight before it moves on. */
const SPOT_MS = 1500;

export function ClientLogosV4({ locale = "sr" }: { locale?: LocaleCode }) {
  const copy = COPY[locale];
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const cells = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.client}`));
    let timer: number | undefined;
    let spot = -1;
    let inView = false;
    let revealed = false;
    let paused = false;

    // The spotlight walks the grid one logo at a time. On a phone there is
    // no hover, so this is the only way every logo gets its own moment.
    const step = () => {
      if (spot >= 0) cells[spot]?.classList.remove(styles.lit);
      spot = (spot + 1) % cells.length;
      cells[spot]?.classList.add(styles.lit);
    };
    const run = () => {
      window.clearInterval(timer);
      timer = undefined;
      if (!revealed || !inView || paused || document.hidden) return;
      timer = window.setInterval(step, SPOT_MS);
    };

    const ctx = gsap.context(() => {
      // heading: eyebrow fades, title rises out of its mask
      gsap
        .timeline({ scrollTrigger: { trigger: root, start: "top 78%", once: true } })
        .from(`.${styles.eyebrow}`, { opacity: 0, y: 12, duration: 0.6, ease: "power2.out" })
        .from(`.${styles.titleInner}`, { yPercent: 105, duration: 0.95, ease: "power4.out" }, 0.1);

      gsap.set(cells, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(root.querySelectorAll(`.${styles.logoFrame}`), { opacity: 0, scale: 0.72, y: 18 });
      gsap.set(root.querySelectorAll(`.${styles.meta}, .${styles.index}`), { opacity: 0, y: 8 });

      // cells reveal row by row as each row reaches the viewport — the grid is
      // eight rows tall on a phone, so one trigger for all would fire blind
      ScrollTrigger.batch(cells, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          const els = batch as HTMLElement[];
          const tl = gsap.timeline();
          tl.to(els, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power3.inOut", stagger: 0.09 })
            .to(
              els.map((c) => c.querySelector(`.${styles.logoFrame}`)),
              { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.6)", stagger: 0.09 },
              0.25,
            )
            .to(
              els.flatMap((c) => Array.from(c.querySelectorAll(`.${styles.meta}, .${styles.index}`))),
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.04 },
              0.45,
            );
          // each logo flashes once as it lands, then settles
          els.forEach((c, i) => {
            gsap.delayedCall(0.55 + i * 0.09, () => c.classList.add(styles.lit));
            gsap.delayedCall(1.25 + i * 0.09, () => c.classList.remove(styles.lit));
          });
        },
      });
      // the spotlight starts once the first rows have landed
      ScrollTrigger.create({
        trigger: root,
        start: "top 60%",
        once: true,
        onEnter: () => gsap.delayedCall(2.4, () => {
          revealed = true;
          run();
        }),
      });
    }, root);

    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      run();
    });
    io.observe(root);

    // a hovered logo takes over from the spotlight. Mouse only: a tap fires
    // pointerenter but never pointerleave, which would stop it for good
    const grid = root.querySelector<HTMLElement>(`.${styles.grid}`);
    const pause = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      paused = true;
      if (spot >= 0) cells[spot]?.classList.remove(styles.lit);
      run();
    };
    const resume = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      paused = false;
      run();
    };
    grid?.addEventListener("pointerenter", pause);
    grid?.addEventListener("pointerleave", resume);
    document.addEventListener("visibilitychange", run);

    return () => {
      window.clearInterval(timer);
      io.disconnect();
      grid?.removeEventListener("pointerenter", pause);
      grid?.removeEventListener("pointerleave", resume);
      document.removeEventListener("visibilitychange", run);
      ctx.revert();
    };
  }, []);

  return (
    // data-reveal-skip: the page-wide revealV4 pass would double-animate this
    <section ref={rootRef} className={styles.section} aria-labelledby="client-logos-title" data-reveal-skip>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="client-logos-title" className={styles.title}>
          <span className={styles.titleMask}>
            <span className={styles.titleInner}>{copy.title}</span>
          </span>
        </h2>
      </div>
      <div className={styles.grid}>
        {CLIENTS.map((client, index) => {
          const content = (
            <>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.logoFrame}>
                {client.logo ? (
                  <Image
                    className={[
                      styles.logo,
                      client.direct ? styles.logoDirect : "",
                      client.zoom ? styles.logoZoom : "",
                    ].filter(Boolean).join(" ")}
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="(max-width: 700px) 50vw, 25vw"
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.wordmark} aria-hidden="true">{client.name}</span>
                )}
              </span>
              <span className={styles.meta}>
                <span className={styles.name}>{client.name}</span>
                {client.kind ? <span className={styles.kind}>{client.kind}</span> : null}
              </span>
            </>
          );

          return client.href ? (
            <a
              key={client.name}
              className={styles.client}
              href={client.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${copy.linkLabel}: ${client.name}`}
            >
              {content}
            </a>
          ) : (
            <article key={client.name} className={`${styles.client} ${styles.project}`}>
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}
