"use client";

import { useEffect } from "react";

export function VideoController() {
  useEffect(() => {
    // ── Autoplay all ambient/background videos ───────────────────────────────
    document
      .querySelectorAll<HTMLVideoElement>(
        ".adspire-video-ambient, .adspire-craft-video, .adspire-scroll-cinema__video",
      )
      .forEach((v) => { v.muted = true; v.loop = true; v.play().catch(() => {}); });

    // ── Scroll-cinema: text slides only (no scrub) ───────────────────────────
    setupScrollSlides(
      ".adspire-scroll-cinema",
      ".adspire-scroll-cinema__slide",
      "--cinema-progress",
    );

    // ── Projects cinema: video switching + text slides ───────────────────────
    setupProjectsCinema();

  }, []);

  return null;
}

function setupScrollSlides(
  sectionSel: string,
  slideSel: string,
  cssVar: string,
) {
  const section = document.querySelector<HTMLElement>(sectionSel);
  if (!section) return;
  const slides = Array.from(section.querySelectorAll<HTMLElement>(slideSel));
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
    section.style.setProperty(cssVar, String(p));
    slides.forEach((s) => {
      const from = parseFloat(s.dataset.from ?? "0");
      const to   = parseFloat(s.dataset.to   ?? "1");
      s.classList.toggle("is-active", p >= from && p < to);
    });
  };

  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener("scroll", onScroll, { passive: true });
  update();
  // return cleanup — not wired here for brevity; page reload cleans up
}

function setupProjectsCinema() {
  const section = document.querySelector<HTMLElement>(".adspire-projects-cinema");
  if (!section) return;

  const slides  = Array.from(section.querySelectorAll<HTMLElement>(".adspire-projects-cinema__slide"));
  const videos  = Array.from(section.querySelectorAll<HTMLVideoElement>(".adspire-projects-cinema__video"));

  // Preload first video, start playing
  if (videos[0]) { videos[0].preload = "auto"; videos[0].play().catch(() => {}); }

  let activeIdx = 0;
  let raf = 0;
  let last = -1;

  const activateIdx = (idx: number) => {
    if (idx === activeIdx) return;

    // Fade out old video, fade in new
    videos[activeIdx]?.classList.remove("is-active");
    videos[idx]?.classList.add("is-active");

    // Ensure new video is playing
    if (videos[idx]) {
      videos[idx].preload = "auto";
      videos[idx].play().catch(() => {});
    }

    activeIdx = idx;
  };

  // Activate first immediately
  videos[0]?.classList.add("is-active");
  slides[0]?.classList.add("is-active");

  const update = () => {
    raf = 0;
    const rect = section.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;
    const p = Math.max(0, Math.min(1, -rect.top / scrollable));
    if (Math.abs(p - last) < 0.002) return;
    last = p;

    section.style.setProperty("--projects-progress", String(p));

    const total = slides.length;
    slides.forEach((slide, i) => {
      const from = parseFloat(slide.dataset.from ?? "0");
      const to   = parseFloat(slide.dataset.to   ?? "1");
      const active = p >= from && p < to;
      slide.classList.toggle("is-active", active);
      if (active) activateIdx(i);
    });

    // Handle last slide edge (p = 1.0)
    if (p >= (total - 1) / total) {
      slides[total - 1]?.classList.add("is-active");
      activateIdx(total - 1);
    }
  };

  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener("scroll", onScroll, { passive: true });
  update();
}
