"use client";

import { useEffect, useRef } from "react";
import styles from "./HomeV3.module.css";

const PROJECTS = [
  { img: "/images/case-studies/drigic-mobileview.webp", cat: "Estetska klinika · Booking", name: "Dr Igić Clinic", outcome: "Javni sajt, online zakazivanje, Beauty Pass zona i admin kalendar — marketing i operativa u jednom sistemu.", href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike" },
  { img: "/images/case-studies/doctorbarber.webp", cat: "Barber studio · Booking", name: "Doctor Barber", outcome: "Booking aplikacija sa online terminima, klijentskim nalogom i admin kalendarom — raspored radi 24/7.", href: "/our-projects/doctor-barber-online-booking-sistem" },
  { img: "/images/case-studies/prevozkop-desktop.webp", cat: "Transport · SEO + operativa", name: "Prevoz Kop", outcome: "SEO sajt, katalog i interni admin za leadove, ponude i vozila — upiti ulaze pravo u prodajni tok.", href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem" },
  { img: "/images/case-studies/santos-desktop.webp", cat: "Modni brend · E-commerce", name: "Santos & Santorini", outcome: "Web shop i admin platforma — katalog, checkout, lager i marketplace tokovi iz jednog mesta.", href: "/our-projects/santos-santorini-web-shop-admin-platforma" },
  { img: "/images/case-studies/teachfromhome-desktop.webp", cat: "EdTech · Onboarding", name: "TeachFromHome", outcome: "Onboarding platforma za remote nastavnike — Google prijava, audio intervju, admin review i referral.", href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike" },
];

export function KilnSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let kill: (() => void) | null = null;

    (async () => {
      const [gsapMod, stMod] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gsap = ((gsapMod as any).default ?? gsapMod) as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ScrollTrigger = ((stMod as any).ScrollTrigger ?? (stMod as any).default) as any;
      gsap.registerPlugin(ScrollTrigger);

      const getScrollLen = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollLen(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getScrollLen(),
          scrub: 0.6,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      kill = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      disposed = true;
      kill?.();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.kiln} aria-label="Projekti">
      <div ref={pinRef} className={styles.kilnPin}>
        <div ref={trackRef} className={styles.kilnTrack}>
          <div className={styles.kilnIntro}>
            <span className={styles.eyebrow}>/ Kiln · Radovi</span>
            <h2 className={`${styles.display} ${styles.kilnIntroTitle}`}>Iz naše<br />kalionice</h2>
            <p className={styles.kilnIntroLead}>Sistemi koji su završili u stvarnoj upotrebi. Skroluj — projekti izlaze jedan za drugim.</p>
            <span className={styles.kilnIntroHint}>skroluj →</span>
          </div>

          {PROJECTS.map((p, i) => (
            <a key={p.name} href={p.href} className={styles.kilnPanel}>
              <div className={styles.kilnShot}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.name} loading="lazy" />
                <span className={styles.kilnHeat} aria-hidden="true" />
              </div>
              <div className={styles.kilnInfo}>
                <span className={styles.kilnCounter}>{String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
                <span className={styles.kilnCat}>{p.cat}</span>
                <h3 className={styles.kilnName}>{p.name}</h3>
                <p className={styles.kilnOutcome}>{p.outcome}</p>
                <span className={styles.kilnLink}>Pogledaj projekat <span>→</span></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
