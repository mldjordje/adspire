import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import banneronethumb from "public/images/banner/banner-one-thumb.png";
import star from "public/images/star.png";
import videoframe from "public/images/video-frame.png";
import YoutubeEmbed from "@/components/youtube/YoutubeEmbed";

gsap.registerPlugin(ScrollTrigger);
const HomeOneBanner = () => {
  const [videoActive, setVideoActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const device_width = window.innerWidth;

      if (
        document.querySelectorAll(".g-ban-one").length > 0 &&
        device_width > 576
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
                  Mi smo
                  <span className="text-stroke"> Adspire</span>
                  <span className="interval">
                    <i className="icon-arrow-top-right"></i> Digitalna Agencija
                  </span>
                </h1>
                <div className="banner__content-inner">
                  <p>
                    Bavimo se izradom modernih web sajtova i web aplikacija,
                    vođenjem društvenih mreža i kreiranjem sadržaja koji
                    privlači pažnju i gradi prepoznatljivost vašeg brenda. Naš
                    cilj je da pomognemo klijentima da kroz digitalne kanale
                    ostvare konkretne rezultate.
                  </p>
                  <div className="cta section__content-cta">
                    <div className="single">
                      <h5 className="fw-7">2+</h5>
                      <p className="fw-5">godina iskustva</p>
                    </div>
                    <div className="single">
                      <h5 className="fw-7">30+</h5>
                      <p className="fw-5">projekata</p>
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
          <Link href="mailto:djordje@adspire.rs">
            mail : djordje@adspire.rs
          </Link>
          <Link href="tel:0601491491">pozovi : 060 149 149 1</Link>
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
        className={(videoActive ? " video-zoom-in" : " ") + " video-backdrop"}
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
