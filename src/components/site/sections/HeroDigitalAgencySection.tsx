"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { RAYO_V10_ASSET_MAP } from "@/lib/rayo-v10-assets";
import type { LocaleCode } from "@/lib/site-config";

type HeroDigitalAgencySectionProps = {
  locale: LocaleCode;
  title: string;
  body: string;
  bullets: string[];
};

function StarMark() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden>
      <path d="M78.4,38.4c0,0-11.8,0-15.8,0c-1.6,0-4.8-0.2-7.1-0.8c-2.3-0.6-4.3-0.8-6.3-2.4c-2-1.2-3.5-3.2-4.7-4.8c-1.2-1.6-1.6-3.6-2-5.5c-0.3-1.5-0.7-4.3-0.8-5.9c-0.2-4.3,0-17.4,0-17.4C41.8,0.8,41,0,40.2,0s-1.6,0.8-1.6,1.6c0,0,0,13.1,0,17.4c0,1.6-0.6,4.3-0.8,5.9c-0.3,2-0.8,4-2,5.5c-1.2,2-2.8,3.6-4.7,4.8s-4,1.8-6.3,2.4c-1.9,0.5-4.7,0.6-6.7,0.8c-3.9,0.4-16.6,0-16.6,0C0.8,38.4,0,39.2,0,40c0,0.8,0.8,1.6,1.6,1.6c0,0,12.2,0,16.6,0c1.6,0,4.8,0.3,6.7,0.8c2.3,0.6,4.3,0.8,6.3,2.4c1.6,1.2,3.2,2.8,4.3,4.4c1.2,2,2.1,3.9,2.4,6.3c0.2,1.7,0.7,4.7,0.8,6.7c0.2,4,0,16.2,0,16.2c0,0.8,0.8,1.6,1.6,1.6s1.6-0.8,1.6-1.6c0,0,0-12.3,0-16.2c0-1.6,0.5-5.1,0.8-6.7c0.5-2.3,0.8-4.4,2.4-6.3c1.2-1.6,2.8-3.2,4.3-4.4c2-1.2,3.9-2,6.3-2.4c1.8-0.3,5.1-0.7,7.1-0.8c3.5-0.2,15.8,0,15.8,0c0.8,0,1.6-0.8,1.6-1.6C80,39.2,79.2,38.4,78.4,38.4L78.4,38.4z" />
    </svg>
  );
}

export function HeroDigitalAgencySection({
  locale,
  title,
  body,
  bullets,
}: HeroDigitalAgencySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollImages = RAYO_V10_ASSET_MAP.heroDigital.scrollImages;
  const [leftBullets, rightBullets] = useMemo(() => {
    const left = bullets.filter((_, index) => index % 2 === 0);
    const right = bullets.filter((_, index) => index % 2 === 1);
    return [left, right];
  }, [bullets]);
  const rotatingText =
    locale === "en"
      ? "Explore delivery * Explore delivery * Explore delivery * "
      : "Pogledaj isporuku * Pogledaj isporuku * Pogledaj isporuku * ";
  const marqueeText =
    locale === "en" ? "the power of imagination" : "snaga dobre ideje";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const staticTrigger = section.querySelector(".hero-02-static__tl-trigger");
      const pinnedTrigger = section.querySelector(".mxd-pinned-fullscreen__tl-trigger");
      if (!staticTrigger || !pinnedTrigger) {
        return;
      }

      const hero02FadeOutEl = section.querySelectorAll(".hero-02-static-anim-el");
      hero02FadeOutEl.forEach((element) => {
        gsap.fromTo(
          element,
          {
            transform: "translate3d(0, 0, 0)",
            scaleY: 1,
            opacity: 1,
          },
          {
            transform: "translate3d(0, -5rem, 0)",
            scaleY: 1.3,
            opacity: 0,
            scrollTrigger: {
              trigger: staticTrigger,
              start: "top 14%",
              end: "top 0.2%",
              scrub: true,
            },
          }
        );
      });

      const fadeOutEl = section.querySelectorAll(".hero-02-fade-out-scroll");
      fadeOutEl.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 1 },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: pinnedTrigger,
              start: "top 80%",
              end: "top 10%",
              scrub: true,
            },
          }
        );
      });

      const animateInUp = section.querySelectorAll(".mxd-hero-02 .anim-uni-in-up");
      animateInUp.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
          },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mxd-section" ref={sectionRef}>
      <div className="mxd-hero-02 mxd-pinned-fullscreen">
        <div className="mxd-pinned-fullscreen__static hero-02-fade-out-scroll loading-wrap">
          <div className="hero-02-static__tl-trigger" />
          <div className="mxd-hero-02-static__top hero-02-static-anim-el">
            <div className="mxd-container fullwidth-container grid-container">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                    <div className="hero-02-static__caption loading__item">
                      <p className="t-large t-medium t-120 t-bright">{title}</p>
                      <p className="t-large t-medium t-120 t-muted">{body}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mxd-hero-02-static__center">
            <div className="mxd-hero-02-marquee">
              <div className="mxd-hero-02-marquee__image loading__item">
                <img className="mxd-move" src={RAYO_V10_ASSET_MAP.heroDigital.centerObject} alt={title} />
              </div>

              <div className="mxd-hero-02-marquee__line loading__item">
                <div className="marquee marquee-left--gsap">
                  <div className="marquee__toleft">
                    {Array.from({ length: 6 }, (_, index) => (
                      <div className="marquee__item one-line item-regular text" key={`delivery-${index}`}>
                        <p className="marquee__text">{marqueeText}</p>
                        <div className="marquee__image">
                          <StarMark />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mxd-hero-02-static__bottom hero-02-static-anim-el">
            <div className="mxd-container fullwidth-container grid-container">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-md-6 col-xl-4 mxd-grid-item no-margin">
                    <div className="mxd-paragraph__lists loading__fade">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-6 col-xl-5">
                            <ul>
                              {leftBullets.map((bullet) => (
                                <li key={`left-${bullet}`}>
                                  <p className="t-small anim-uni-in-up">{bullet}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="col-6 col-xl-5">
                            <ul>
                              {rightBullets.map((bullet) => (
                                <li key={`right-${bullet}`}>
                                  <p className="t-small anim-uni-in-up">{bullet}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mxd-hero-02-static__btn hero-02-static-anim-el loading__fade">
            <a href="#projects" className="btn-rotating btn-rotating-160" aria-label={locale === "en" ? "Explore projects" : "Pogledaj projekte"}>
              <svg viewBox="0 0 160 160" className="btn-rotating__text mxd-rotate" data-value="360" aria-hidden>
                <defs>
                  <path id="textPathHero02" d="M149.7,80c0,38.5-31.2,69.7-69.7,69.7S10.3,118.5,10.3,80S41.5,10.3,80,10.3S149.7,41.5,149.7,80z" />
                </defs>
                <text>
                  <textPath href="#textPathHero02">{rotatingText}</textPath>
                </text>
              </svg>
              <img className="btn-rotating__image" src={RAYO_V10_ASSET_MAP.heroDigital.starIcon} alt="" />
            </a>
          </div>
        </div>

        <div className="mxd-pinned-fullscreen__scroll">
          <div className="mxd-hero-02-scroll__wrap">
            <div className="mxd-hero-02-scroll__images">
              <div className="mxd-hero-02-images__row mxd-hero-02-images__row-01">
                <a className="mxd-hero-02-image__portrait portrait-01" href="#projects">
                  <div className="mxd-hero-02-image__inner type-01 anim-uni-in-up">
                    <img src={scrollImages[0]} alt="" />
                    <div className="mxd-preview-hover">
                      <i className="mxd-preview-hover__icon icon-small">
                        <img src="/rayo/img/icons/icon-eye.svg" alt="" />
                      </i>
                    </div>
                  </div>
                </a>
                <a className="mxd-hero-02-image__landscape landscape-01" href="#projects">
                  <div className="mxd-hero-02-image__inner type-03 anim-uni-in-up">
                    <img src={scrollImages[1]} alt="" />
                    <div className="mxd-preview-hover">
                      <i className="mxd-preview-hover__icon icon-small">
                        <img src="/rayo/img/icons/icon-eye.svg" alt="" />
                      </i>
                    </div>
                  </div>
                </a>
                <a className="mxd-hero-02-image__portrait portrait-02" href="#projects">
                  <div className="mxd-hero-02-image__inner type-01 anim-uni-in-up">
                    <img src={scrollImages[2]} alt="" />
                    <div className="mxd-preview-hover">
                      <i className="mxd-preview-hover__icon icon-small">
                        <img src="/rayo/img/icons/icon-eye.svg" alt="" />
                      </i>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mxd-hero-02-images__row mxd-hero-02-images__row-02">
                <a className="mxd-hero-02-image__landscape landscape-02" href="#projects">
                  <div className="mxd-hero-02-image__inner type-03 anim-uni-in-up">
                    <img src={scrollImages[3]} alt="" />
                    <div className="mxd-preview-hover">
                      <i className="mxd-preview-hover__icon icon-small">
                        <img src="/rayo/img/icons/icon-eye.svg" alt="" />
                      </i>
                    </div>
                  </div>
                </a>
                <a className="mxd-hero-02-image__portrait portrait-xl portrait-03" href="#projects">
                  <div className="mxd-hero-02-image__inner type-02 anim-uni-in-up">
                    <img src={scrollImages[4]} alt="" />
                    <div className="mxd-preview-hover">
                      <i className="mxd-preview-hover__icon icon-small">
                        <img src="/rayo/img/icons/icon-eye.svg" alt="" />
                      </i>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mxd-hero-02-images__row mxd-hero-02-images__row-03">
                <a className="mxd-hero-02-image__portrait portrait-04" href="#projects">
                  <div className="mxd-hero-02-image__inner type-01 anim-uni-in-up">
                    <img src={scrollImages[5]} alt="" />
                    <div className="mxd-preview-hover">
                      <i className="mxd-preview-hover__icon icon-small">
                        <img src="/rayo/img/icons/icon-eye.svg" alt="" />
                      </i>
                    </div>
                  </div>
                </a>
                <a className="mxd-hero-02-image__landscape landscape-03" href="#projects">
                  <div className="mxd-hero-02-image__inner type-03 anim-uni-in-up">
                    <img src={scrollImages[6]} alt="" />
                    <div className="mxd-preview-hover">
                      <i className="mxd-preview-hover__icon icon-small">
                        <img src="/rayo/img/icons/icon-eye.svg" alt="" />
                      </i>
                    </div>
                  </div>
                </a>
                <a className="mxd-hero-02-image__portrait portrait-05" href="#projects">
                  <div className="mxd-hero-02-image__inner type-01 anim-uni-in-up">
                    <img src={scrollImages[7]} alt="" />
                    <div className="mxd-preview-hover">
                      <i className="mxd-preview-hover__icon icon-small">
                        <img src="/rayo/img/icons/icon-eye.svg" alt="" />
                      </i>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mxd-pinned-fullscreen__tl-trigger" />
      </div>
    </section>
  );
}
