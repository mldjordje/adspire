"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { PortfolioItem } from "@/content/site/types";
import type { LocaleCode } from "@/lib/site-config";
import { withLocalePrefix } from "@/lib/locale";

type PortfolioSectionProps = {
  locale: LocaleCode;
  title: string;
  subtitle: string;
  items: PortfolioItem[];
};

export function PortfolioSection({
  locale,
  title,
  subtitle,
  items,
}: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const animateInUp = sectionRef.current?.querySelectorAll(".anim-uni-in-up");
      animateInUp?.forEach((element) => {
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
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const imagesSmall = sectionRef.current?.querySelectorAll<HTMLElement>(".parallax-img-small");
      imagesSmall?.forEach((element) => {
        gsap.fromTo(
          element,
          { backgroundPositionY: "35%" },
          {
            backgroundPositionY: "62%",
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="mxd-section mxd-portfolio-pinned-section padding-pre-stack" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-pinned-projects">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-5 mxd-pinned-projects__static">
                  <div className="mxd-pinned-projects__static-inner no-margin">
                    <div className="mxd-section-title no-margin-desktop">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__title">
                              <h2 className="reveal-type">{title}</h2>
                            </div>
                          </div>
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__descr">
                              <p className="anim-uni-in-up">{subtitle}</p>
                            </div>
                          </div>
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__controls anim-uni-in-up">
                              <Link className="btn btn-anim btn-default btn-outline slide-right-up" href={withLocalePrefix(locale, "/our-projects")} locale={false}>
                                <span className="btn-caption">{locale === "en" ? "All Projects" : "Svi projekti"}</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-xl-7 mxd-pinned-projects__scroll">
                  <div className="mxd-pinned-projects__scroll-inner mxd-grid-item no-margin">
                    {items.map((item) => (
                      <div className="mxd-project-item" key={item.name}>
                        <a className="mxd-project-item__media anim-uni-in-up" href={item.url} target="_blank" rel="noreferrer">
                          <div
                            className="mxd-project-item__preview parallax-img-small"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                          <div className="mxd-project-item__tags">
                            <span className="tag tag-default tag-permanent">{item.category}</span>
                            <span className="tag tag-default tag-permanent">
                              {locale === "en" ? "Live project" : "Live projekat"}
                            </span>
                          </div>
                        </a>
                        <div className="mxd-project-item__promo">
                          <div className="mxd-project-item__name">
                            <a className="anim-uni-in-up" href={item.url} target="_blank" rel="noreferrer">
                              <span>{item.name}</span> {item.category.toLowerCase()}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
