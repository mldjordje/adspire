"use client";

import styles from "./HomeV3.module.css";

/** Film grain overlay — adds texture/depth so flat dark areas feel alive. */
export function Grain() {
  return <div className={styles.grain} aria-hidden="true" />;
}
