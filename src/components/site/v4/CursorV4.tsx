"use client";

import { useEffect, useRef } from "react";
import styles from "./HomeV4.module.css";

/**
 * Custom cursor: instant dot + lerped ring. Ring expands over elements
 * marked with [data-cursor]. Disabled entirely on coarse pointers.
 */
export function CursorV4() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // touch devices have no cursor to replace
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("v4-no-cursor");

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let hoverLabel: string | null = null;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const label = target?.dataset.cursor ?? null;
      if (label !== hoverLabel) {
        hoverLabel = label;
        ring.classList.toggle(styles.cursorRingActive, hoverLabel !== null);
        ring.textContent = hoverLabel && hoverLabel !== "on" ? hoverLabel : "";
      }
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      // park the loop once the ring has caught up; the next move restarts it
      if (Math.abs(x - rx) < 0.1 && Math.abs(y - ry) < 0.1) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointermove", wake, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointermove", wake);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("v4-no-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />
      <div ref={ringRef} className={styles.cursorRing} aria-hidden="true" />
    </>
  );
}
