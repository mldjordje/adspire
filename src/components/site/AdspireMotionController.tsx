"use client";

import { useEffect } from "react";

export function AdspireMotionController() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("adspire-motion-ready");
    const interactive = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".adspire-kinetic-hero, .adspire-signal-stage, .adspire-ai-core",
      ),
    );
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".adspire-service-tile, .adspire-case-card, .adspire-case-feature",
      ),
    );

    let raf = 0;
    const updateScrollVars = () => {
      raf = 0;
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      root.style.setProperty("--adspire-scroll", `${window.scrollY / max}`);
    };
    const requestScrollUpdate = () => {
      if (!raf) raf = window.requestAnimationFrame(updateScrollVars);
    };

    const setPointerVars = (target: HTMLElement, x: number, y: number) => {
      const rect = target.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (x - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (y - rect.top) / rect.height));
      target.style.setProperty("--mx", `${px}`);
      target.style.setProperty("--my", `${py}`);
      target.classList.add("is-interacting");
    };

    const cleanups = interactive.map((target) => {
      const onPointerMove = (event: PointerEvent) => {
        setPointerVars(target, event.clientX, event.clientY);
      };
      const onPointerLeave = () => target.classList.remove("is-interacting");
      const onTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (touch) setPointerVars(target, touch.clientX, touch.clientY);
      };

      target.addEventListener("pointermove", onPointerMove, { passive: true });
      target.addEventListener("pointerleave", onPointerLeave);
      target.addEventListener("touchmove", onTouchMove, { passive: true });

      return () => {
        target.removeEventListener("pointermove", onPointerMove);
        target.removeEventListener("pointerleave", onPointerLeave);
        target.removeEventListener("touchmove", onTouchMove);
      };
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in-view");
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));

    updateScrollVars();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      cleanups.forEach((cleanup) => cleanup());
      observer.disconnect();
      root.classList.remove("adspire-motion-ready");
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
    };
  }, []);

  return null;
}
