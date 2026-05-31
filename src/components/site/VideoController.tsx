"use client";

import { useEffect } from "react";

// ─── Canvas scrub (Apple-style image sequence) ────────────────────────────────

const FRAME_COUNT = 60;
const FRAME_PREFIX = "/scroll-frames/f";
const FRAME_EXT = ".jpg";

function padNum(n: number) {
  return String(n).padStart(3, "0");
}

function setupCanvasScrub(section: HTMLElement, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Size canvas to fill section
  const resize = () => {
    canvas.width  = canvas.clientWidth  || window.innerWidth;
    canvas.height = canvas.clientHeight || window.innerHeight;
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // Pre-load all frames
  const images: HTMLImageElement[] = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const img = new Image();
    img.src = `${FRAME_PREFIX}${padNum(i + 1)}${FRAME_EXT}`;
    return img;
  });

  let lastIdx = -1;

  const drawFrame = (idx: number) => {
    const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, idx));
    if (clamped === lastIdx) return;
    lastIdx = clamped;
    const img = images[clamped];
    if (!img.complete) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Cover-fit: maintain aspect ratio
    const iw = img.naturalWidth  || 1280;
    const ih = img.naturalHeight || 720;
    const scale = Math.max(canvas.width / iw, canvas.height / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
  };

  // Draw frame 0 as soon as it loads
  if (images[0].complete) drawFrame(0);
  else images[0].onload = () => drawFrame(0);

  let raf = 0;
  let lastProgress = -1;

  const update = () => {
    raf = 0;
    const rect = section.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;
    const p = Math.max(0, Math.min(1, -rect.top / scrollable));
    if (Math.abs(p - lastProgress) < 0.003) return;
    lastProgress = p;

    section.style.setProperty("--cinema-progress", String(p));

    // Update text slides
    section.querySelectorAll<HTMLElement>(".adspire-scroll-cinema__slide").forEach((s) => {
      const from = parseFloat(s.dataset.from ?? "0");
      const to   = parseFloat(s.dataset.to   ?? "1");
      s.classList.toggle("is-active", p >= from && p < to);
    });

    drawFrame(Math.round(p * (FRAME_COUNT - 1)));
  };

  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener("scroll", onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener("scroll", onScroll);
    ro.disconnect();
    if (raf) cancelAnimationFrame(raf);
  };
}

// ─── Projects cinema: video switching + text slides ───────────────────────────

function setupProjectsCinema() {
  const section = document.querySelector<HTMLElement>(".adspire-projects-cinema");
  if (!section) return;

  const slides = Array.from(section.querySelectorAll<HTMLElement>(".adspire-projects-cinema__slide"));
  const videos = Array.from(section.querySelectorAll<HTMLVideoElement>(".adspire-projects-cinema__video"));

  let activeIdx = -1;

  const activate = (idx: number) => {
    if (idx === activeIdx) return;
    videos[activeIdx]?.classList.remove("is-active");
    videos[idx]?.classList.add("is-active");
    if (videos[idx]) {
      videos[idx].preload = "auto";
      videos[idx].play().catch(() => {});
    }
    activeIdx = idx;
  };

  // Activate first
  activate(0);
  slides[0]?.classList.add("is-active");

  let raf = 0;
  let last = -1;

  const update = () => {
    raf = 0;
    const rect = section.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;
    const p = Math.max(0, Math.min(1, -rect.top / scrollable));
    if (Math.abs(p - last) < 0.002) return;
    last = p;

    section.style.setProperty("--projects-progress", String(p));

    const n = slides.length;
    let found = -1;
    slides.forEach((slide, i) => {
      const from = parseFloat(slide.dataset.from ?? "0");
      const to   = parseFloat(slide.dataset.to   ?? "1");
      const active = p >= from && (i === n - 1 ? p <= 1 : p < to);
      slide.classList.toggle("is-active", active);
      if (active) found = i;
    });
    if (found >= 0) activate(found);
  };

  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener("scroll", onScroll, { passive: true });
  update();
}

// ─── Autoplay ambient videos ──────────────────────────────────────────────────

function playAmbient() {
  document
    .querySelectorAll<HTMLVideoElement>(".adspire-video-ambient, .adspire-craft-video")
    .forEach((v) => { v.muted = true; v.loop = true; v.play().catch(() => {}); });
}

// ─── Component ────────────────────────────────────────────────────────────────

export function VideoController() {
  useEffect(() => {
    playAmbient();
    setupProjectsCinema();

    const section = document.querySelector<HTMLElement>(".adspire-scroll-cinema");
    const canvas  = section?.querySelector<HTMLCanvasElement>(".adspire-scroll-cinema__canvas");
    let cleanup: (() => void) | undefined;
    if (section && canvas) cleanup = setupCanvasScrub(section, canvas);

    return () => { cleanup?.(); };
  }, []);

  return null;
}
