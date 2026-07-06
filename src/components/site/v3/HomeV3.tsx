"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeV3.module.css";
import { EmberCanvas } from "./EmberCanvas";
import { SparkCursor } from "./SparkCursor";
import { IgnitionLoader } from "./IgnitionLoader";
import { Grain } from "./Grain";
import { ForgeSection } from "./ForgeSection";
import { KilnSection } from "./KilnSection";
import { NightMapSection } from "./NightMapSection";
import { PulseSection } from "./PulseSection";
import { SparkCtaSection } from "./SparkCtaSection";
import { NavV3 } from "./NavV3";
import { FooterV3 } from "./FooterV3";

export function HomeV3() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const [lenisMod, gsapMod, stMod] = await Promise.all([
        import("@studio-freight/lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      const Lenis = lenisMod.default;
      const gsap = (gsapMod as { default?: unknown }).default ?? gsapMod;
      const ScrollTrigger = (stMod as { ScrollTrigger?: unknown }).ScrollTrigger ?? (stMod as { default?: unknown }).default;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const G = gsap as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ST = ScrollTrigger as any;
      G.registerPlugin(ST);

      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenis.on("scroll", ST.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      G.ticker.add(tick);
      G.ticker.lagSmoothing(0);

      cleanup = () => {
        G.ticker.remove(tick);
        lenis.destroy();
        ST.getAll().forEach((t: { kill: () => void }) => t.kill());
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={rootRef} className={`${styles.root} ${isTouch ? styles.touch : ""}`}>
      <IgnitionLoader />
      <Grain />
      <SparkCursor />
      <EmberCanvas />
      <NavV3 />

      <main className={styles.content}>
        {/* ===== 01 · EMBER hero ===== */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <span className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} /> Web agencija iz Niša · dostupni za nove projekte
            </span>
            <h1 className={`${styles.display} ${styles.heroTitle}`}>
              Zapali svoj<br />
              <span className={styles.heat}>digitalni nastup.</span>
            </h1>
            <p className={styles.heroSub}>
              Adspire gradi brze, žive web sisteme i aplikacije za biznise u Nišu i celoj Srbiji — sajtove koji ne stoje, nego donose upite, rezervacije i prodaju.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.btnPrimary} href="/contact-us">Zapali projekat →</a>
              <a className={styles.btnGhost} href="/our-projects">Pogledaj radove</a>
            </div>
            <div className={styles.heroTrust}>
              <div className={styles.heroTrustItem}>
                <span className={styles.heroTrustNum}>5+</span>
                <span className={styles.heroTrustLabel}>live produkcijskih sistema</span>
              </div>
              <div className={styles.heroTrustItem}>
                <span className={styles.heroTrustNum}>100</span>
                <span className={styles.heroTrustLabel}>Core Web Vitals score</span>
              </div>
              <div className={styles.heroTrustItem}>
                <span className={styles.heroTrustNum}>48h</span>
                <span className={styles.heroTrustLabel}>do prvog prototipa</span>
              </div>
            </div>
          </div>
          <div className={styles.scrollHint}>
            <span>skroluj</span>
            <span className={styles.scrollHintLine} />
          </div>
        </section>

        {/* ===== 02 · THE FORGE ===== */}
        <ForgeSection />

        {/* ===== 04 · KILN GALLERY ===== */}
        <KilnSection />

        {/* ===== 06 · NIGHT MAP ===== */}
        <NightMapSection />

        {/* ===== 07 · THE PULSE ===== */}
        <PulseSection />

        {/* ===== 08 · SPARK CTA ===== */}
        <SparkCtaSection />

        <FooterV3 />
      </main>
    </div>
  );
}
