"use client";

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
  return (
    <section className="mxd-section">
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
                poster={RAYO_V10_ASSET_MAP.menu.promoPoster}
                aria-label={locale === "en" ? "Adspire project reel" : "Adspire pregled projekata"}
              >
                <source type="video/mp4" src={RAYO_V10_ASSET_MAP.menu.promoVideo} />
              </video>
            </div>
          </div>
          <div className="mxd-hero-08__tl-trigger" />
        </div>
      </div>
    </section>
  );
}
