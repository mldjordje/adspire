"use client";

import { useEffect, useRef } from "react";

/** Spark cursor with fading ember trail. Desktop only (hidden on touch). */
export function SparkCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let disposed = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type Pt = { x: number; y: number; life: number };
    const trail: Pt[] = [];
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      trail.push({ x: mx, y: my, life: 1 });
      if (trail.length > 26) trail.shift();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      if (disposed) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.life *= 0.9;
        const r = 6 * p.life + 1;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        g.addColorStop(0, `rgba(255,180,80,${0.5 * p.life})`);
        g.addColorStop(0.4, `rgba(255,77,18,${0.3 * p.life})`);
        g.addColorStop(1, "rgba(255,77,18,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      // bright core
      ctx.fillStyle = "rgba(255,220,150,0.95)";
      ctx.beginPath();
      ctx.arc(mx, my, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none" }}
    />
  );
}
