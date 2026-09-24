"use client";

import { useEffect, useRef } from "react";
import styles from "./BgLiteV4.module.css";

/**
 * Lite version of SilkV4 / AuroraV4 for devices that cannot run the shader
 * (no WebGL, software rasteriser, or a GPU that misses the budget at the
 * lowest tier — bgCore decides). It shows a frame rendered from the same
 * shader and moves it like a camera would: a slow dolly, a light sweep, and
 * scroll parallax. Transform-only, so an old phone composites it for free.
 */
export function BgLiteV4({ variant }: { variant: "silk" | "aurora" }) {
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plate = plateRef.current;
    if (!plate) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      // The plate is 135% tall: it travels its spare 35% over the page.
      plate.style.transform = `translate3d(0, ${(-p * 26).toFixed(2)}%, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden="true">
      <div ref={plateRef} className={styles.plate}>
        <div className={`${styles.image} ${styles[variant]}`} />
      </div>
      <div className={styles.sweep} />
      <div className={styles.vignette} />
    </div>
  );
}
