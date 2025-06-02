import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import one from "public/images/portfolio/one.png";
import two from "public/images/portfolio/two.png";
import three from "public/images/portfolio/three.png";
import four from "public/images/portfolio/four.png";
import five from "public/images/portfolio/five.png";
import six from "public/images/portfolio/six.png";
import seven from "public/images/portfolio/seven.png";
import dot from "public/images/portfolio/dot.png";

const PortfolioText = () => {
  const [hover, setHover] = useState(0);
  return (
    <section className="section portfolio pb-0 fade-wrapper position-relative">
      <div className="portfolio__text-slider-w">
        <Swiper
          slidesPerView="auto"
          spaceBetween={40}
          speed={5000}
          loop={true}
          centeredSlides={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
          className="portfolio__text-slider"
        >
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                <Link href="portfolio">
                  Reference
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                <Link href="portfolio">
                  Gotovi Projekti
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                <Link href="portfolio">
                  Izrada web sajtova
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                <Link href="portfolio">
                  Izrada web aplikacija
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                <Link href="portfolio">
                  Izrada web prodavnica
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                <Link href="portfolio">
                  Reference
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                <Link href="portfolio">
                  portfolio
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="container-fluid">
        <div className="row gaper">
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 0 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(0)}
            >
               <a
                href="https://tamitrade.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={one} alt="Image" />
              </a>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <a
                    href="https://tamitrade.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    tamitrade.com
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 1 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(1)}
            >
              <a
                href="https://prevozkop.rs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={two} alt="Image" />
              </a>

              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <a
                    href="https://prevozkop.rs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    prevozkop.rs
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 2 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(2)}
            >
               <a
                href="https://aircoolplus.rs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={three} alt="Image" />
              </a>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <a
                    href="https://aircoolplus.rs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aircoolplus.rs
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 3 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(3)}
            >
               <a
                href="https://infinity-gym.rs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={four} alt="Image" />
              </a>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                 <h4>
                  <a
                    href="https://infinity-gym.rs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    infinity-gym.rs
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 4 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(4)}
            >
              <a
                href="https://autodelic.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={five} alt="Image" />
              </a>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
               <h4>
                  <a
                    href="https://autodelic.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    autodelic.com
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 5 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(5)}
            >
             <a
                href="https://mlgroup.rs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={six} alt="Image" />
              </a>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <a
                    href="https://mlgroup.rs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    mlgroup.rs
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="portfolio__single-alt-wrapper fade-top">
              <div className="portfolio__single-alt topy-tilt">
                <h4>
                  <Link href="portfolio">Pogledaj ostale projekte</Link>
                </h4>
                <Link href="portfolio" className="arr">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <Image src={dot} alt="Image" className="dot-one" />
                <Image src={dot} alt="Image" className="dot-two" />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 6 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(6)}
            >
              <a
                href="https://autocentarivkovic.rs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={seven} alt="Image" />
              </a>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <a
                    href="https://autocentarivkovic.rs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    autocentarivkovic.rs
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lines d-none d-lg-flex">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </section>
  );
};

export default PortfolioText;
