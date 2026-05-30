"use client";

import { useEffect } from "react";

export function VideoController() {
  useEffect(() => {
    // ── Autoplay all background/ambient videos ───────────────────────────────
    document
      .querySelectorAll<HTMLVideoElement>(
        ".adspire-video-ambient, .adspire-craft-video, .adspire-scroll-cinema__video",
      )
      .forEach((v) => {
        v.muted = true;
        v.loop = true;
        v.play().catch(() => {});
      });

    // ── Scroll-cinema: text slide transitions only (no video scrub) ──────────
    const section = document.querySelector<HTMLElement>(".adspire-scroll-cinema");
    if (!section) return;

    const slides = Array.from(
      section.querySelectorAll<HTMLElement>(".adspire-scroll-cinema__slide"),
    );

    let raf = 0;
    let lastProgress = -1;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      if (Math.abs(progress - lastProgress) < 0.002) return;
      lastProgress = progress;

      section.style.setProperty("--cinema-progress", String(progress));

      slides.forEach((slide) => {
        const from = parseFloat(slide.dataset.from ?? "0");
        const to   = parseFloat(slide.dataset.to   ?? "1");
        slide.classList.toggle("is-active", progress >= from && progress < to);
      });
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
