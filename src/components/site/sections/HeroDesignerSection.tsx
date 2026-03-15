"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { RAYO_V10_ASSET_MAP } from "@/lib/rayo-v10-assets";
import type { LocaleCode } from "@/lib/site-config";

type HeroDesignerSectionProps = {
  locale: LocaleCode;
  title: string;
  status: string;
  body: string;
};

export function HeroDesignerSection({
  locale,
  title,
  status,
  body,
}: HeroDesignerSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const fadeOutEls = section.querySelectorAll(".hero-08-slide-out-scroll");
      const scaleOutEls = section.querySelectorAll(".hero-08-scale-out-scroll");
      const trigger = section.querySelector(".mxd-hero-08__tl-trigger");

      if (!trigger) {
        return;
      }

      fadeOutEls.forEach((element) => {
        gsap.fromTo(
          element,
          { transform: "translate3d(0, 0, 0)", opacity: 1 },
          {
            transform: "translate3d(0, -5rem, 0)",
            opacity: 0,
            scrollTrigger: {
              trigger,
              start: "top 80%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });

      scaleOutEls.forEach((element) => {
        gsap.fromTo(
          element,
          { transform: "translate3d(0, 0, 0)", scaleY: 1, opacity: 1 },
          {
            transform: "translate3d(0, -5rem, 0)",
            scaleY: 1.2,
            opacity: 0,
            scrollTrigger: {
              trigger,
              start: "top 40%",
              end: "top 10%",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mxd-section" ref={sectionRef}>
      <div className="mxd-hero-08">
        <div className="mxd-hero-08__wrap loading-wrap">
          <div className="mxd-hero-08__center">
            <div className="mxd-hero-08__headline">
              <div className="mxd-container">
                <div className="hero-08-headline__image">
                  <img className="mxd-rotate-slow" src={RAYO_V10_ASSET_MAP.heroDesigner.image} alt={title} />
                </div>
                <div className="hero-08-headline__title hero-08-slide-out-scroll">
                  <h2>{title}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="mxd-hero-08__bottom">
            <div className="mxd-hero-08__data-wrap hero-08-scale-out-scroll">
              <div className="mxd-hero__mark">
                <span className="mark-icon" />
                <span className="mark-text">{status}</span>
              </div>
              <div className="mxd-hero-08__descr">
                <p className="t-large t-bright t-medium t-120">{body}</p>
              </div>
            </div>
            <div className="mxd-hero-08__video-wrap hero-08-scale-out-scroll">
              <video
                className="mxd-hero-08__video"
                preload="auto"
                autoPlay
                loop
                muted
                playsInline
                poster={RAYO_V10_ASSET_MAP.heroDesigner.poster}
                aria-label={locale === "en" ? "Adspire project reel" : "Adspire pregled projekata"}
              >
                <source type="video/mp4" src={RAYO_V10_ASSET_MAP.heroDesigner.video} />
              </video>
            </div>
          </div>
          <div className="mxd-hero-08__tl-trigger" />
        </div>
      </div>
    </section>
  );
}
