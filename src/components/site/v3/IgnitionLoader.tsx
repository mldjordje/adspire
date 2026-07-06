"use client";

import { useEffect, useState } from "react";
import styles from "./HomeV3.module.css";

/** Ignition loader — a spark grows and ignites the ADSPIRE wordmark, then lifts away. */
export function IgnitionLoader() {
  const [phase, setPhase] = useState<"on" | "lift" | "off">("on");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("off");
      return;
    }
    const t1 = setTimeout(() => setPhase("lift"), 1500);
    const t2 = setTimeout(() => setPhase("off"), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "off") return null;

  return (
    <div className={`${styles.loader} ${phase === "lift" ? styles.loaderLift : ""}`} aria-hidden="true">
      <div className={styles.loaderSpark} />
      <span className={styles.loaderWord}>ADSPIRE</span>
    </div>
  );
}
