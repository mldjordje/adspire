"use client";

import { useEffect, useRef } from "react";
import styles from "./HomeV4.module.css";

/**
 * Infinite draggable carousel — auto-drifts left, drag to throw with
 * momentum, scroll velocity nudges it. Content is duplicated once and the
 * offset wraps at half-width for a seamless loop.
 */

const TECH = [
  { name: "Next.js", tag: "React framework" },
  { name: "TypeScript", tag: "Type-safe kod" },
  { name: "Three.js", tag: "WebGL · 3D" },
  { name: "GSAP", tag: "Motion engine" },
  { name: "Supabase", tag: "Backend · Auth" },
  { name: "PostgreSQL", tag: "Baza podataka" },
  { name: "n8n", tag: "Automatizacija" },
  { name: "Claude API", tag: "AI agenti" },
  { name: "Figma", tag: "Design sistem" },
  { name: "Vercel", tag: "Edge deploy" },
];

export function TechCarouselV4() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let offset = 0;
    let velocity = -0.6; // idle drift, px/frame
    let dragging = false;
    let lastX = 0;
    let raf = 0;

    // scrollWidth forces a layout; cache it instead of reading it per frame
    let half = track.scrollWidth / 2;
    const ro = new ResizeObserver(() => {
      half = track.scrollWidth / 2;
    });
    ro.observe(track);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      wrap.setPointerCapture(e.pointerId);
      wrap.classList.add(styles.techDragging);
    };
    const onMoveP = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      offset += dx;
      velocity = dx; // momentum seed
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      try {
        wrap.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      wrap.classList.remove(styles.techDragging);
    };

    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMoveP);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);

    // wheel/scroll gives the belt a nudge in the scroll direction
    let lastScrollY = window.scrollY;
    const tick = () => {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (!dragging) {
        velocity += dy * -0.06;
        // momentum decays back toward idle drift
        velocity += (-0.6 - velocity) * 0.035;
        offset += velocity;
      }
      if (half > 0) {
        // wrap into (-half, 0]
        offset = ((offset % half) + half) % half;
        track.style.transform = `translate3d(${offset - half}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    // the belt only moves while someone can see it
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) {
        lastScrollY = window.scrollY;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMoveP);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const items = [...TECH, ...TECH];

  return (
    <div ref={wrapRef} className={styles.techWrap} data-cursor="vuci" data-reveal-item>
      <div ref={trackRef} className={styles.techTrack}>
        {items.map((t, i) => (
          <div key={`${t.name}-${i}`} className={styles.techItem} aria-hidden={i >= TECH.length}>
            <span className={styles.techName}>{t.name}</span>
            <span className={styles.techTag}>{t.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
