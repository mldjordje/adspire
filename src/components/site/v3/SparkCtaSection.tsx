"use client";

import { useRef, useState, type PointerEvent } from "react";
import styles from "./HomeV3.module.css";

const HOLD_MS = 1000;
const TARGET = "/contact-us";

export function SparkCtaSection() {
  const [progress, setProgress] = useState(0);
  const [ignited, setIgnited] = useState(false);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const navigate = () => { window.location.href = TARGET; };

  const burst = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    for (let i = 0; i < 26; i++) {
      const s = document.createElement("span");
      s.className = styles.spark;
      const ang = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 110;
      s.style.left = `${r.width / 2}px`;
      s.style.top = `${r.height / 2}px`;
      s.style.setProperty("--tx", `${Math.cos(ang) * dist}px`);
      s.style.setProperty("--ty", `${Math.sin(ang) * dist}px`);
      btn.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    }
  };

  const tick = () => {
    const t = Math.min((performance.now() - startRef.current) / HOLD_MS, 1);
    setProgress(t);
    if (t >= 1) {
      setIgnited(true);
      burst();
      setTimeout(navigate, 520);
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const onDown = (e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  };
  const onUp = () => {
    cancelAnimationFrame(rafRef.current);
    if (ignited) return;
    const held = performance.now() - startRef.current;
    if (held < 160) { navigate(); return; }
    setProgress(0);
  };

  return (
    <section className={styles.sparkCta} aria-label="Kontakt">
      <div className={styles.sparkGlow} aria-hidden="true" />
      <div className={styles.wrap}>
        <span className={`${styles.eyebrow} ${styles.sparkEyebrow}`}>/ Spark · Sledeći korak</span>
        <h2 className={`${styles.display} ${styles.sparkTitle}`}>
          Imaš ideju?<br /><span className={styles.heat}>Hajde da je zapalimo.</span>
        </h2>
        <p className={styles.sparkSub}>
          Drži dugme da raspališ varnicu — vodi te pravo do upita. Bez obaveza, vraćamo konkretan plan i procenu.
        </p>

        <button
          ref={btnRef}
          className={`${styles.igniteBtn} ${ignited ? styles.igniteOn : ""}`}
          onPointerDown={onDown}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          aria-label="Drži da zapališ projekat — vodi na kontakt"
        >
          <span className={styles.igniteFill} style={{ width: `${progress * 100}%` }} aria-hidden="true" />
          <span className={styles.igniteLabel}>{ignited ? "Paljenje…" : "Zapali projekat"}</span>
        </button>
        <span className={styles.igniteHint}>drži da zapališ · ili klikni</span>

        <div className={styles.sparkContacts}>
          <a href="mailto:djordje@adspire.rs">djordje@adspire.rs</a>
          <span aria-hidden="true">·</span>
          <a href="tel:+381601491491">+381 60 149 149 1</a>
        </div>
      </div>
    </section>
  );
}
