import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslation } from "next-i18next";
import banneronethumb from "public/images/banner/banner-one-thumb.png";
import star from "public/images/star.png";
import YoutubeEmbed from "@/components/youtube/YoutubeEmbed";

gsap.registerPlugin(ScrollTrigger);

const HomeOneBanner = () => {
  const [videoActive, setVideoActive] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const deviceWidth = window.innerWidth;

      if (
        document.querySelectorAll(".g-ban-one").length > 0 &&
        deviceWidth > 576
      ) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".banner",
            start: "center center",
            end: "+=100%",
            scrub: true,
            pin: false,
          },
        });

        tl.set(".g-ban-one", {
          y: "-10%",
        });

        tl.to(".g-ban-one", {
          opacity: 0,
          scale: 2,
          y: "100%",
          zIndex: -1,
          duration: 2,
        });
      }
    }
  }, []);

  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="banner__content">
                <h1 className="text-uppercase text-start fw-9 mb-0 title-anim">
                  {t("hero.titlePrefix")}
                  <span className="text-stroke"> {t("hero.titleHighlight")}</span>
                  <span className="interval">
                    <i className="icon-arrow-top-right"></i>{" "}
                    {t("hero.titleSuffix")}
                  </span>
                </h1>
                <div className="banner__content-inner">
                  <p>{t("hero.body")}</p>
                  <div className="section__content-cta">
                    <Link href="tel:0601491491" className="btn btn--primary">
                      {t("hero.ctaPrimary")}
                    </Link>
                    <Link href="#contact" className="btn btn--secondary">
                      {t("hero.ctaSecondary")}
                    </Link>
                  </div>
                  <div className="cta section__content-cta">
                    <div className="single">
                      <h5 className="fw-7">{t("hero.metrics.years")}</h5>
                      <p className="fw-5">{t("hero.metrics.yearsLabel")}</p>
                    </div>
                    <div className="single">
                      <h5 className="fw-7">{t("hero.metrics.projects")}</h5>
                      <p className="fw-5">{t("hero.metrics.projectsLabel")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={banneronethumb}
          alt="Image"
          className="banner-one-thumb d-none d-sm-block g-ban-one"
        />
        <Image src={star} alt="Image" className="star" />
        <div className="banner-left-text banner-social-text d-none d-md-flex">
          <Link href="mailto:djordje@adspire.rs">{t("hero.ctaMail")}</Link>
          <Link href="tel:0601491491">{t("hero.ctaPhone")}</Link>
        </div>

        <div className="banner-right-text banner-social-text d-none d-md-flex">
          <Link href="https://www.instagram.com/" target="_blank">
            instagram
          </Link>
          <Link href="https://www.pinterest.com/" target="_blank">
            Linkedin
          </Link>
          <Link href="https://www.facebook.com/" target="_blank">
            facebook
          </Link>
        </div>

        <div className="lines d-none d-lg-flex">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </section>
      <div
        className={`${videoActive ? " video-zoom-in" : " "} video-backdrop`}
        onClick={() => setVideoActive(false)}
      >
        <div className="video-inner">
          <div
            className="video-container"
            onClick={(e: any) => e.stopPropagation()}
          >
            {videoActive && <YoutubeEmbed embedId="fSv6UgCkuTU" />}
            <button
              aria-label="close video popup"
              className="close-video-popup"
              onClick={() => setVideoActive(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeOneBanner;
