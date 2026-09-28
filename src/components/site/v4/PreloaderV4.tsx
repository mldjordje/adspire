"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeV4.module.css";

/**
 * The preloader is the first beat of the swarm intro, not a separate screen:
 * black, one LED at the centre of the frame — exactly where the intro's
 * macro shot finds the hero bot — pulsing faster as the scene loads
 * ("v4:scene-progress"). When ready the LED taps twice, in time with the
 * hero bot's own heartbeat (0.2 s and 0.44 s into the intro), and the black
 * dissolves into the scene instead of lifting away. Dispatches "v4:ready"
 * on the first tap, which is t = 0 of the intro.
 */
export function PreloaderV4() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const ledRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const count = countRef.current;
    const led = ledRef.current;
    if (!root || !count || !led) return;
    const isBot =
      typeof navigator !== "undefined" &&
      /bot|crawler|spider|crawling|google|bing|duckduck|baidu|yandex|facebookexternalhit|whatsapp|slack|twitter|perplexity|gptbot/i.test(
        navigator.userAgent,
      );

    let fired = false;
    let real = 0;
    let disp = 0;
    let raf = 0;
    let phase = 0;
    let lastT = performance.now();

    const finish = (instant = false) => {
      if (fired) return;
      fired = true;
      count.textContent = "100";
      window.dispatchEvent(new CustomEvent("v4:ready"));
      if (instant) {
        document.documentElement.classList.remove("v4-locked");
        setGone(true);
        return;
      }
      root.classList.add(styles.preloaderDone);
      window.setTimeout(() => {
        document.documentElement.classList.remove("v4-locked");
      }, 450);
      window.setTimeout(() => setGone(true), 950);
    };

    if (isBot) {
      finish(true);
      return;
    }

    document.documentElement.classList.add("v4-locked");

    const MIN_SHOW = 700;
    const HARD_CAP = 3500; // the first impression belongs to the site, not its loader
    const start = performance.now();

    const onProgress = (e: Event) => {
      const p = Number((e as CustomEvent).detail);
      if (Number.isFinite(p)) real = Math.max(real, Math.min(p, 1));
    };
    window.addEventListener("v4:scene-progress", onProgress);

    const step = (now: number) => {
      const elapsed = now - start;
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      if (elapsed > HARD_CAP) real = 1;

      // time creeps the number; the last stretch belongs to the scene
      const creep = Math.min(elapsed / 1100, 1) * 0.7;
      const target = real >= 1 ? 1 : Math.min(Math.max(creep, real * 0.97), 0.97);
      disp += (target - disp) * 0.09;
      count.textContent = String(Math.round(disp * 100)).padStart(2, "0");

      // a heartbeat that quickens with load: ~0.9 Hz idle → ~2.6 Hz near ready
      phase += dt * (0.9 + disp * 1.7);
      const beat = Math.pow(Math.max(0, Math.sin(phase * Math.PI * 2)), 6);
      led.style.setProperty("--led", (0.25 + beat * 0.75).toFixed(3));

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
      <span ref={ledRef} className={styles.preloaderLed} />
      <span className={styles.preloaderRing} />
      <div className={styles.preloaderMeta}>
        <span className={styles.preloaderBrand}>ADSPIRE</span>
        <span ref={countRef} className={styles.preloaderCount}>
          00
        </span>
      </div>
    </div>
  );
}
