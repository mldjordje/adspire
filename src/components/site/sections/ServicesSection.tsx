"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { ServiceItem } from "@/content/site/types";
import type { LocaleCode } from "@/lib/site-config";
import { withLocalePrefix } from "@/lib/locale";
import { RAYO_V10_ASSET_MAP } from "@/lib/rayo-v10-assets";

type ServicesSectionProps = {
  locale: LocaleCode;
  title: string;
  subtitle: string;
  items: ServiceItem[];
};

const stylePresets = [
  {
    shell: "showcase-inner bg-base-opp",
    numberClass: "t-opp-muted",
    textClass: "t-opposite",
  },
  {
    shell: "showcase-inner bg-accent",
    numberClass: "t-opp-brigth",
    textClass: "t-opp-bright",
  },
  {
    shell: "radius-dark showcase-inner bg-base-tint",
    numberClass: "t-muted-extra",
    textClass: "t-muted",
  },
  {
    shell: "showcase-inner bg-base-opp",
    numberClass: "t-opp-muted",
    textClass: "t-opposite",
  },
] as const;

export function ServicesSection({
  locale,
  title,
  subtitle,
  items,
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-item", section);
      const stickySpace = section.querySelector<HTMLElement>(".stack-offset");
      const stackWrapper = section.querySelector<HTMLElement>(".stack-wrapper");

      if (!cards.length || !stickySpace || !stackWrapper) {
        return;
      }

      ScrollTrigger.matchMedia({
        "(min-width: 992px)": () => {
          const animation = gsap.timeline();
          let cardHeight = cards[0].offsetHeight;

          const initCards = () => {
            animation.clear();
            cardHeight = cards[0]?.offsetHeight || 0;

            cards.forEach((card, index) => {
              if (index > 0) {
                gsap.set(card, { y: index * cardHeight });
                animation.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0);
              } else {
                gsap.set(card, { y: 0 });
              }
            });
          };

          initCards();

          const trigger = ScrollTrigger.create({
            trigger: ".stack-wrapper",
            start: "top top",
            pin: true,
            end: () => `+=${cards.length * cardHeight + stickySpace.offsetHeight}`,
            scrub: true,
            animation,
            invalidateOnRefresh: true,
          });

          ScrollTrigger.addEventListener("refreshInit", initCards);

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", initCards);
            trigger.kill();
          };
        },
      });

      const animateInUp = section.querySelectorAll(".anim-uni-in-up");
      animateInUp.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: element,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="mxd-section padding-stacked-section mxd-services-stack-section" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-section-head mxd-services-stack-heading">
          <p className="mxd-kicker">{locale === "en" ? "Services" : "Usluge"}</p>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="mxd-block mxd-grid-item no-margin">
          <div className="content__block">
            <div className="stack-wrapper mxd-hero-02-stack">
              <div className="stack-offset" />
              <div className="services-stack">
                {items.map((item, index) => {
                  const preset = stylePresets[index % stylePresets.length];
                  const [imageA, imageB] = RAYO_V10_ASSET_MAP.services[index % RAYO_V10_ASSET_MAP.services.length];
                  const previewTags = item.bullets.slice(0, 2);
                  const supportTags =
                    item.bullets.slice(2).length > 0
                      ? item.bullets.slice(2)
                      : [item.cta, locale === "en" ? "Launch-ready" : "Spremno za lansiranje"];

                  return (
                    <div className="stack-item" key={item.slug}>
                      <div className={`mxd-services-stack__inner ${preset.shell}`}>
                        <div className="mxd-services-stack__container">
                          <div className="mxd-services-stack__title showcase-title">
                            <h3 className={index % 4 === 2 ? "" : "opposite"}>{item.title}</h3>
                            <span className={`mxd-services-stack__number ${preset.numberClass}`}>
                              /{String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="mxd-services-stack__info showcase-info">
                            <p className={preset.textClass}>{item.summary}</p>
                          </div>
                          <div className="mxd-services-stack__works">
                            <Link className="mxd-services-stack__work" href={withLocalePrefix(locale, item.href)} locale={false}>
                              <img className="mxd-services-stack__preview" src={imageA} alt={item.title} />
                              <div className="mxd-services-stack__tags tags-absolute">
                                {previewTags.map((tag) => (
                                  <span key={`${item.slug}-${tag}`} className="tag tag-default tag-permanent">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </Link>
                            <Link className="mxd-services-stack__work" href={withLocalePrefix(locale, item.href)} locale={false}>
                              <img className="mxd-services-stack__preview" src={imageB} alt={item.title} />
                              <div className="mxd-services-stack__tags tags-absolute">
                                {supportTags.map((tag) => (
                                  <span key={`${item.slug}-${tag}`} className="tag tag-default tag-permanent">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
