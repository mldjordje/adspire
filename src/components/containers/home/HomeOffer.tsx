import React from "react";
import Image from "next/image";
import Link from "next/link";
import star from "public/images/offer/star.png";

const HomeOffer = () => {
  return (
    <section className="section offer fade-wrapper light">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-lg-5">
            <div className="offer__content section__content">
              <span className="sub-title">
                ŠTA NUDIMO
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">
                Rešenja koja podižu vaš biznis na viši nivo
              </h2>
              <div className="paragraph">
                <p>
                  Pomažemo kompanijama i preduzetnicima da kroz moderan dizajn,
                  efikasne web aplikacije i precizno ciljan digitalni marketing
                  ostvare veći uticaj na tržištu. Naš pristup je uvek strateški,
                  prilagođen vašim ciljevima i potrebama.
                </p>
              </div>
              <div className="section__content-cta">
                <Link href="our-services" className="btn btn--secondary">
                  pogledaj sve usluge
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7 col-xl-6 offset-xl-1">
            <div className="offer__cta">
              <div className="offer__cta-single fade-top">
                <span className="sub-title">
                  01
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="service-single">
                    Izrada web sajtova
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                </h2>
              </div>

              <div className="offer__cta-single fade-top">
                <span className="sub-title">
                  02
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="service-single">
                    Izrada web aplikacija
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                </h2>
              </div>

              <div className="offer__cta-single fade-top">
                <span className="sub-title">
                  03
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="service-single">
                    Izrada web prodavnica
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                </h2>
              </div>

              <div className="offer__cta-single fade-top">
                <span className="sub-title">
                  04
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="service-single">
                    Digitalni marketing
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                </h2>
              </div>

              <div className="offer__cta-single fade-top">
                <span className="sub-title">
                  05
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="service-single">
                    Produkt dizajn
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                </h2>
              </div>

              <div className="offer__cta-single fade-top">
                <span className="sub-title">
                  06
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="/usluge/web-pozivnice-za-veselja">
                    Web pozivnice za veselja
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                </h2>
              </div>

              <div className="offer__cta-single fade-top">
                <span className="sub-title">
                  07
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="service-single">
                    Booking sistemi
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={star} alt="Image" className="star" />
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

export default HomeOffer;
