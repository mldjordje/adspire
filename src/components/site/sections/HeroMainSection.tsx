"use client";

import { useTheme } from "@/components/site/ThemeProvider";
import { RAYO_V10_ASSET_MAP } from "@/lib/rayo-v10-assets";
import type { LocaleCode } from "@/lib/site-config";

type HeroMainSectionProps = {
  locale: LocaleCode;
  line1: string;
  line2: string;
  body: string;
};

function Star() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden>
      <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
    </svg>
  );
}

export function HeroMainSection({
  locale,
  line1,
  line2,
  body,
}: HeroMainSectionProps) {
  const { theme } = useTheme();
  const videoSrc = RAYO_V10_ASSET_MAP.heroMain.videoByTheme[theme];
  const [img1, img2, img3] = RAYO_V10_ASSET_MAP.heroMain.floatingImages;
  const marqueeWords =
    locale === "en"
      ? ["strategy", "design", "development", "growth"]
      : ["strategija", "dizajn", "razvoj", "rast"];
  const rotatingText =
    locale === "en"
      ? "Scroll for more * Scroll for more * Scroll for more * "
      : "Skroluj dalje * Skroluj dalje * Skroluj dalje * ";

  return (
    <section className="mxd-section mxd-hero-section mxd-hero-fullheight">
      <div className="mxd-hero-01">
        <div className="mxd-hero-01__wrap">
          <div className="mxd-hero-01__top">
            <div className="mxd-hero-01__title-wrap">
              <div className="mxd-hero-01__images mxd-floating-img" aria-hidden>
                <div className="hero-01-image image-01 mxd-floating-img__item">
                  <img className="mxd-pulse" src={img1} alt="" />
                </div>
                <div className="hero-01-image image-02 mxd-floating-img__item">
                  <img className="mxd-move" src={img2} alt="" />
                </div>
                <div className="hero-01-image image-03 mxd-floating-img__item">
                  <img className="mxd-rotate" src={img3} alt="" />
                </div>
              </div>

              <div className="mxd-hero-01__marquee" aria-hidden>
                <div className="marquee marquee-right--gsap">
                  <div className="marquee__toright marquee-flex">
                    {Array.from({ length: 6 }, (_, index) => (
                      <div className="marquee__item item-regular text" key={`hero-main-tech-${index}`}>
                        <p>{marqueeWords[index % marqueeWords.length]}</p>
                        <Star />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h1 className="hero-01-title">
                <span className="hero-01-title__row">
                  <em className="hero-01-title__item">{line1}</em>
                  <em className="hero-01-title__item title-item-transparent">
                    {marqueeWords[1]}
                  </em>
                </span>
                <span className="hero-01-title__row">
                  <em className="hero-01-title__item title-item-image">
                    <Star />
                  </em>
                  <em className="hero-01-title__item">{line2}</em>
                </span>
              </h1>
            </div>
          </div>

          <div className="mxd-hero-01__bottom">
            <div className="mxd-hero-01__data-wrap">
              <div className="mxd-hero-01__dash-line dash-line" />
              <div className="mxd-hero-01__data-btn">
                <a href="#projects" className="btn-rotating btn-rotating-120-160" aria-label={locale === "en" ? "Scroll for more" : "Skroluj dalje"}>
                  <svg viewBox="0 0 160 160" className="btn-rotating__text animate-rotation" data-value="360" aria-hidden>
                    <defs>
                      <path id="textPathHeroMain" d="M149.7,80c0,38.5-31.2,69.7-69.7,69.7S10.3,118.5,10.3,80S41.5,10.3,80,10.3S149.7,41.5,149.7,80z" />
                    </defs>
                    <text>
                      <textPath href="#textPathHeroMain">{rotatingText}</textPath>
                    </text>
                  </svg>
                  <img className="btn-rotating__image" src={RAYO_V10_ASSET_MAP.heroMain.rotatingObject} alt="" />
                </a>
              </div>
              <div className="mxd-hero-01__data-descr">
                <p className="t-bright">{body}</p>
              </div>
            </div>

            <div className="mxd-hero-01__video-wrap">
              <video className="mxd-hero-01__video" preload="auto" autoPlay loop muted playsInline>
                <source type="video/mp4" src={videoSrc} />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
