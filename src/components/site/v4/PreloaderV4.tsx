"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeV4.module.css";

/**
 * Cinematic preloader: percent counter + brand letters, then curtain lift.
 * Dispatches "v4:ready" on window when the curtain starts lifting so the
 * hero intro can start underneath it.
 */
export function PreloaderV4() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      window.dispatchEvent(new CustomEvent("v4:ready"));
      setGone(true);
      return;
    }

    const root = rootRef.current;
    const count = countRef.current;
    if (!root || !count) return;

    document.documentElement.classList.add("v4-locked");

    const DURATION = 1500;
    const start = performance.now();
    let raf = 0;
    let fired = false;

    const step = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // ease-out so numbers sprint early, settle late
      const eased = 1 - Math.pow(1 - t, 3);
      count.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else if (!fired) {
        fired = true;
        window.dispatchEvent(new CustomEvent("v4:ready"));
        root.classList.add(styles.preloaderLift);
        window.setTimeout(() => {
          document.documentElement.classList.remove("v4-locked");
          setGone(true);
        }, 950);
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
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
          <span className={styles.preloaderFill} />
        </div>
      </div>
    </div>
  );
}
