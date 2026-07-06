"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeV3.module.css";

const METRICS = [
  { value: 5, suffix: "+", label: "live produkcijskih sistema" },
  { value: 100, suffix: "", label: "Core Web Vitals score" },
  { value: 48, suffix: "h", label: "do prvog prototipa" },
  { value: 14, suffix: "", label: "usluga pod jednim krovom" },
];

function useCountUp(target: number, run: boolean, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return val;
}

function Metric({ value, suffix, label, run }: { value: number; suffix: string; label: string; run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <div className={styles.pulseMetric}>
      <span className={styles.pulseNum}>
        {n}
        <span className={styles.pulseSuffix}>{suffix}</span>
      </span>
      <span className={styles.pulseLabel}>{label}</span>
    </div>
  );
}

export function PulseSection() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let disposed = false;
    let boost = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onWheel = (e: WheelEvent) => { boost = Math.min(boost + Math.abs(e.deltaY) * 0.04, 26); };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", () => { boost = Math.min(boost + 6, 26); }, { passive: true });

    const start = performance.now();
    const loop = () => {
      if (disposed) return;
      const t = (performance.now() - start) / 1000;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      boost *= 0.94;
      const amp = 14 + boost;
      const mid = h / 2;

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgba(255,90,25,0)");
      grad.addColorStop(0.2, "rgba(255,120,40,0.9)");
      grad.addColorStop(0.5, "#ff8a1e");
      grad.addColorStop(0.8, "rgba(255,120,40,0.9)");
      grad.addColorStop(1, "rgba(255,90,25,0)");

      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const k = x / w;
        const y =
          mid +
          Math.sin(k * 12 + t * 2.2) * amp * Math.sin(k * Math.PI) +
          Math.sin(k * 26 - t * 3.1) * (amp * 0.4) * Math.sin(k * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = "rgba(255,90,25,0.8)";
      ctx.shadowBlur = 14;
      ctx.stroke();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section ref={ref} className={styles.pulse} aria-label="Brojke">
      <div className={styles.wrap}>
        <span className={`${styles.eyebrow} ${styles.pulseEyebrow}`}>/ The Pulse · Brojke koje znače</span>
        <canvas ref={canvasRef} className={styles.pulseCanvas} aria-hidden="true" />
        <div className={styles.pulseRow}>
          {METRICS.map((m) => (
            <Metric key={m.label} {...m} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
