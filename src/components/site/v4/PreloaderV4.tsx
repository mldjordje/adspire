"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeV4.module.css";

/**
 * Cinematic preloader wired to real load progress: SceneV4 reports
 * "v4:scene-progress" milestones (three.js import → geometry → post chain →
 * first compiled frame) and the counter tracks them, with a small time-based
 * creep so the numbers never freeze on slow networks. The overlay has a
 * transparent window over the particle kernel, so preloader → big-bang intro
 * reads as one unbroken shot. Dispatches "v4:ready" when the curtain lifts.
 */
export function PreloaderV4() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      window.dispatchEvent(new CustomEvent("v4:ready"));
      setGone(true);
      return;
    }

    const root = rootRef.current;
    const count = countRef.current;
    const fill = fillRef.current;
    if (!root || !count || !fill) return;

    document.documentElement.classList.add("v4-locked");

    const MIN_SHOW = 1400; // brand letters need their beat even on a hot cache
    const HARD_CAP = 6000; // never hold the page hostage if the scene stalls
    const start = performance.now();
    let raf = 0;
    let fired = false;
    let real = 0;
    let disp = 0;

    const onProgress = (e: Event) => {
      const p = Number((e as CustomEvent).detail);
      if (Number.isFinite(p)) real = Math.max(real, Math.min(p, 1));
    };
    window.addEventListener("v4:scene-progress", onProgress);

    const finish = () => {
      if (fired) return;
      fired = true;
      count.textContent = "100";
      fill.style.transform = "scaleX(1)";
      window.dispatchEvent(new CustomEvent("v4:ready"));
      root.classList.add(styles.preloaderLift);
      window.setTimeout(() => {
        document.documentElement.classList.remove("v4-locked");
        setGone(true);
      }, 950);
    };

    const step = (now: number) => {
      const elapsed = now - start;
      if (elapsed > HARD_CAP) real = 1;

      // time creeps the counter to 60% at most; the last stretch belongs to
      // the scene — 100 only lands once the first shader frame is compiled
      const creep = Math.min(elapsed / 1600, 1) * 0.6;
      const target = real >= 1 ? 1 : Math.min(Math.max(creep, real * 0.97), 0.97);
      disp += (target - disp) * 0.09;

      count.textContent = String(Math.round(disp * 100)).padStart(3, "0");
      fill.style.transform = `scaleX(${disp})`;

      if (real >= 1 && disp > 0.99 && elapsed >= MIN_SHOW) {
        finish();
      } else {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("v4:scene-progress", onProgress);
      document.documentElement.classList.remove("v4-locked");
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className={styles.preloader} aria-hidden="true">
      <div className={styles.preloaderInner}>
        <div className={styles.preloaderBrand}>
          {"ADSPIRE".split("").map((ch, i) => (
            <span
              key={i}
              className={styles.preloaderChar}
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div className={styles.preloaderMeta}>
          <span className={styles.preloaderLabel}>OBSIDIAN / 2026</span>
          <span ref={countRef} className={styles.preloaderCount}>
            000
          </span>
        </div>
        <div className={styles.preloaderTrack}>
          <span ref={fillRef} className={styles.preloaderFill} />
        </div>
      </div>
    </div>
  );
}
