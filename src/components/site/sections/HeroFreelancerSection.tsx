"use client";

import { RAYO_V10_ASSET_MAP } from "@/lib/rayo-v10-assets";
import type { LocaleCode } from "@/lib/site-config";

type HeroFreelancerSectionProps = {
  locale: LocaleCode;
  title: string;
  body: string;
  tags: string[];
};

function Star() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden>
      <path d="M78.4,38.4c0,0-11.8,0-15.8,0c-1.6,0-4.8-0.2-7.1-0.8c-2.3-0.6-4.3-0.8-6.3-2.4c-2-1.2-3.5-3.2-4.7-4.8c-1.2-1.6-1.6-3.6-2-5.5c-0.3-1.5-0.7-4.3-0.8-5.9c-0.2-4.3,0-17.4,0-17.4C41.8,0.8,41,0,40.2,0s-1.6,0.8-1.6,1.6c0,0,0,13.1,0,17.4c0,1.6-0.6,4.3-0.8,5.9c-0.3,2-0.8,4-2,5.5c-1.2,2-2.8,3.6-4.7,4.8s-4,1.8-6.3,2.4c-1.9,0.5-4.7,0.6-6.7,0.8c-3.9,0.4-16.6,0-16.6,0C0.8,38.4,0,39.2,0,40c0,0.8,0.8,1.6,1.6,1.6c0,0,12.2,0,16.6,0c1.6,0,4.8,0.3,6.7,0.8c2.3,0.6,4.3,0.8,6.3,2.4c1.6,1.2,3.2,2.8,4.3,4.4c1.2,2,2.1,3.9,2.4,6.3c0.2,1.7,0.7,4.7,0.8,6.7c0.2,4,0,16.2,0,16.2c0,0.8,0.8,1.6,1.6,1.6s1.6-0.8,1.6-1.6c0,0,0-12.3,0-16.2c0-1.6,0.5-5.1,0.8-6.7c0.5-2.3,0.8-4.4,2.4-6.3c1.2-1.6,2.8-3.2,4.3-4.4c2-1.2,3.9-2,6.3-2.4c1.8-0.3,5.1-0.7,7.1-0.8c3.5-0.2,15.8,0,15.8,0c0.8,0,1.6-0.8,1.6-1.6C80,39.2,79.2,38.4,78.4,38.4L78.4,38.4z" />
    </svg>
  );
}

export function HeroFreelancerSection({
  locale,
  title,
  body,
  tags,
}: HeroFreelancerSectionProps) {
  const leftTags = tags.filter((_, index) => index % 2 === 0);
  const rightTags = tags.filter((_, index) => index % 2 === 1);
  const headlineTags = tags.slice(0, 3);
  const rotatingText =
    locale === "en"
      ? "Start project * Start project * Start project * "
      : "Pokreni projekat * Pokreni projekat * Pokreni projekat * ";
  const statusText =
    locale === "en" ? "Ready for launch and growth" : "Spremno za lansiranje i rast";
  const scrollText = locale === "en" ? "Scroll for more" : "Skroluj dalje";

  return (
    <section className="mxd-section">
      <div className="mxd-hero-06">
        <div className="mxd-hero-06__wrap loading-wrap">
          <div className="mxd-hero-06__top">
            <div className="mxd-hero-06__content">
              <div className="mxd-hero-06__video">
                <video className="video" preload="auto" autoPlay loop muted playsInline poster="/rayo/img/demo/02_card-img.webp">
                  <source type="video/mp4" src={RAYO_V10_ASSET_MAP.heroFreelancer.video} />
                  <source type="video/webm" src="/rayo/video/1920x1080_video.webm" />
                  <source type="video/ogv" src="/rayo/video/1920x1080_video.ogv" />
                </video>
                <div className="hero-06-video__cover" />
              </div>

              <div className="mxd-hero-06__data">
                <div className="mxd-hero-06__list">
                  <div className="mxd-paragraph__lists">
                    <div className="container-fluid p-0">
                      <div className="row g-0">
                        <div className="col-6 col-lg-4 col-xl-2 loading__item">
                          <ul>
                            {leftTags.map((tag) => (
                              <li key={`left-${tag}`}>
                                <p className="t-small">{tag}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-6 col-lg-4 col-xl-2 loading__item">
                          <ul>
                            {rightTags.map((tag) => (
                              <li key={`right-${tag}`}>
                                <p className="t-small">{tag}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mxd-hero-06__headline">
                  <div className="hero-06-headline__descr">
                    <p className="loading__item">{body}</p>
                    <div className="hero-06-headline__btn">
                      <a href="#services" className="btn-rotating btn-rotating-blur-outline ver-04 permanent-desktop loading__item">
                        <svg viewBox="0 0 160 160" className="btn-rotating__text animate-rotation" data-value="360" aria-hidden>
                          <defs>
                            <path id="textPathDownloadCV" d="M149.7,80c0,38.5-31.2,69.7-69.7,69.7S10.3,118.5,10.3,80S41.5,10.3,80,10.3S149.7,41.5,149.7,80z" />
                          </defs>
                          <text>
                            <textPath href="#textPathDownloadCV">{rotatingText}</textPath>
                          </text>
                        </svg>
                        <img className="btn-rotating__image" src={RAYO_V10_ASSET_MAP.heroFreelancer.rotatingObject} alt="" />
                      </a>
                    </div>
                  </div>

                  <div className="hero-06-headline__content">
                    <h2 className="hero-06-headline__title">{title}</h2>
                    <div className="mxd-hero-06__marquee loading__item">
                      <div className="marquee marquee-right--gsap permanent-desktop">
                        <div className="marquee__toright">
                          {Array.from({ length: 2 }, (_, index) => (
                            <div className="marquee__item one-line item-regular text" key={`hero6-marquee-${index}`}>
                              {headlineTags.map((tag) => (
                                <span key={`${index}-${tag}`} style={{ display: "inline-flex", alignItems: "center" }}>
                                  <p className="marquee__text">{tag}</p>
                                  <div className="marquee__image">
                                    <Star />
                                  </div>
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mxd-hero-06__bottom loading__fade">
            <div className="mxd-hero-06__mark">
              <div className="mxd-hero__mark">
                <span className="mark-icon" />
                <span className="mark-text">{statusText}</span>
              </div>
            </div>
            <div className="mxd-hero-06__more">
              <a className="btn btn-line-medium btn-anim btn-anim-medium slide-down" href="#projects">
                <span className="btn-caption">{scrollText}</span>
                <i className="ph-bold ph-arrow-elbow-right-down" aria-hidden />
              </a>
            </div>
          </div>

          <div className="mxd-hero-06__btn-mobile">
            <a href="#services" className="btn-rotating btn-rotating-blur-outline ver-04 permanent-desktop">
              <svg viewBox="0 0 160 160" className="btn-rotating__text animate-rotation" data-value="360" aria-hidden>
                <defs>
                  <path id="textPathDownloadCVMobile" d="M149.7,80c0,38.5-31.2,69.7-69.7,69.7S10.3,118.5,10.3,80S41.5,10.3,80,10.3S149.7,41.5,149.7,80z" />
                </defs>
                <text>
                  <textPath href="#textPathDownloadCVMobile">{rotatingText}</textPath>
                </text>
              </svg>
              <img className="btn-rotating__image" src={RAYO_V10_ASSET_MAP.heroFreelancer.rotatingObject} alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
