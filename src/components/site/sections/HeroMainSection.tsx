"use client";

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
    <svg viewBox="0 0 80 80" aria-hidden>
      <path d="M78.4,38.4c0,0-11.8,0-15.8,0c-1.6,0-4.8-0.2-7.1-0.8c-2.3-0.6-4.3-0.8-6.3-2.4c-2-1.2-3.5-3.2-4.7-4.8c-1.2-1.6-1.6-3.6-2-5.5c-0.3-1.5-0.7-4.3-0.8-5.9c-0.2-4.3,0-17.4,0-17.4C41.8,0.8,41,0,40.2,0s-1.6,0.8-1.6,1.6c0,0,0,13.1,0,17.4c0,1.6-0.6,4.3-0.8,5.9c-0.3,2-0.8,4-2,5.5c-1.2,2-2.8,3.6-4.7,4.8s-4,1.8-6.3,2.4c-1.9,0.5-4.7,0.6-6.7,0.8c-3.9,0.4-16.6,0-16.6,0C0.8,38.4,0,39.2,0,40c0,0.8,0.8,1.6,1.6,1.6c0,0,12.2,0,16.6,0c1.6,0,4.8,0.3,6.7,0.8c2.3,0.6,4.3,0.8,6.3,2.4c1.6,1.2,3.2,2.8,4.3,4.4c1.2,2,2.1,3.9,2.4,6.3c0.2,1.7,0.7,4.7,0.8,6.7c0.2,4,0,16.2,0,16.2c0,0.8,0.8,1.6,1.6,1.6s1.6-0.8,1.6-1.6c0,0,0-12.3,0-16.2c0-1.6,0.5-5.1,0.8-6.7c0.5-2.3,0.8-4.4,2.4-6.3c1.2-1.6,2.8-3.2,4.3-4.4c2-1.2,3.9-2,6.3-2.4c1.8-0.3,5.1-0.7,7.1-0.8c3.5-0.2,15.8,0,15.8,0c0.8,0,1.6-0.8,1.6-1.6C80,39.2,79.2,38.4,78.4,38.4L78.4,38.4z" />
    </svg>
  );
}

export function HeroMainSection({
  locale,
  line1,
  line2,
  body,
}: HeroMainSectionProps) {
  const videoSrc = RAYO_V10_ASSET_MAP.heroMain.videoByTheme.dark;
  const [img1, img2, img3] = RAYO_V10_ASSET_MAP.heroMain.floatingImages;
  const marqueeWord = locale === "en" ? "tech" : "tech";
  const rotatingText =
    locale === "en"
      ? "Scroll for more * Scroll for more * Scroll for more * "
      : "Skroluj dalje * Skroluj dalje * Skroluj dalje * ";
  const socials =
    locale === "en"
      ? [
          { href: "https://www.instagram.com/adspire.rs", label: "Instagram" },
          { href: "#projects", label: "Portfolio" },
          { href: "#services", label: "Services" },
        ]
      : [
          { href: "https://www.instagram.com/adspire.rs", label: "Instagram" },
          { href: "#projects", label: "Portfolio" },
          { href: "#services", label: "Usluge" },
        ];

  return (
    <section className="mxd-section mxd-hero-section mxd-hero-fullheight">
      <div className="mxd-hero-01">
        <div className="mxd-hero-01__wrap loading-wrap">
          <div className="mxd-hero-01__top">
            <div className="mxd-hero-01__title-wrap">
              <div className="mxd-hero-01__images mxd-floating-img" aria-hidden>
                <div className="hero-01-image image-01 mxd-floating-img__item loading__fade">
                  <img className="mxd-pulse" src={img1} alt="" />
                </div>
                <div className="hero-01-image image-02 mxd-floating-img__item loading__fade">
                  <img className="mxd-move" src={img2} alt="" />
                </div>
                <div className="hero-01-image image-03 mxd-floating-img__item loading__fade">
                  <img className="mxd-rotate" src={img3} alt="" />
                </div>
              </div>

              <div className="mxd-hero-01__marquee loading__item" aria-hidden>
                <div className="marquee marquee-right--gsap">
                  <div className="marquee__toright marquee-flex">
                    {Array.from({ length: 6 }, (_, index) => (
                      <div className="marquee__item item-regular text" key={`hero-main-tech-${index}`}>
                        <p>{marqueeWord}</p>
                        <Star />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h1 className="hero-01-title">
                <span className="hero-01-title__row loading__item">
                  <em className="hero-01-title__item">{line1}</em>
                  <em className="hero-01-title__item title-item-transparent">tech</em>
                </span>
                <span className="hero-01-title__row loading__item">
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
              <div className="mxd-hero-01__dash-line dash-line loading__fade" />
              <div className="mxd-hero-01__data-btn loading__fade">
                <a href="#projects" className="btn-rotating btn-rotating-120-160" aria-label={locale === "en" ? "Scroll for more" : "Skroluj dalje"}>
                  <svg viewBox="0 0 160 160" className="btn-rotating__text animate-rotation" data-value="360" aria-hidden>
                    <defs>
                      <path id="textPathHeroMain" d="M149.7,80c0,38.5-31.2,69.7-69.7,69.7S10.3,118.5,10.3,80S41.5,10.3,80,10.3S149.7,41.5,149.7,80z" />
                    </defs>
                    <g>
                      <text>
                        <textPath href="#textPathHeroMain">{rotatingText}</textPath>
                      </text>
                    </g>
                  </svg>
                  <img className="btn-rotating__image" src={RAYO_V10_ASSET_MAP.heroMain.rotatingObject} alt="" />
                </a>
              </div>
              <div className="mxd-hero-01__data-descr loading__fade">
                <p className="t-bright">{body}</p>
              </div>
              <div className="mxd-hero-01__data-socials loading__fade">
                <ul>
                  {socials.map((item) => (
                    <li key={item.label}>
                      <Star />
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mxd-hero-01__video-wrap loading__item">
              <video className="mxd-hero-01__video" preload="auto" autoPlay loop muted playsInline poster={img3}>
                <source type="video/mp4" src={videoSrc} />
                <source type="video/webm" src="/rayo/video/540x310_video.webm" />
                <source type="video/ogv" src="/rayo/video/540x310_video.ogv" />
              </video>
              <div className="mxd-hero-01__video-btn">
                <a
                  href="#services"
                  className="btn btn-round btn-round-medium btn-accent slide-right anim-no-delay"
                  aria-label={locale === "en" ? "Explore services" : "Pogledaj usluge"}
                >
                  <i className="ph-fill ph-play" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
