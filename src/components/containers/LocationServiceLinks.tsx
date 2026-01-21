import React from "react";
import Link from "next/link";

const LocationServiceLinks = () => {
  return (
    <section className="section light location-links fade-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className="section__header text-center">
              <p className="sub-title">Izrada sajtova</p>
              <h3 className="title">Adspire iz Niša radi projekte za klijente u Srbiji</h3>
              <p className="primary-text">
                Adspire je digitalna agencija iz Niša koja planira, dizajnira i razvija
                web sajtove i web aplikacije. Saradnju nudimo kompanijama iz Niša i
                organizacijama širom Srbije koje traže pouzdan tim za dugoročne digitalne
                projekte.
              </p>
            </div>
          </div>
        </div>
        <div className="row gaper justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="service-card topy-tilt fade-top">
              <div className="service-card__head d-flex align-items-center justify-content-between">
                <span className="sub-title">Niš</span>
                <i className="icon-arrow-top-right"></i>
              </div>
              <h4 className="mt-2">Izrada sajtova u Nišu</h4>
              <p className="mt-2">
                Radimo sa timovima iz Niša na izradi korporativnih sajtova, prodavnica i
                web aplikacija koje su prilagođene lokalnom tržištu.
              </p>
              <Link href="/izrada-sajtova-nis" className="btn btn--secondary mt-3">
                Detaljno o radu u Nišu
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <div className="service-card topy-tilt fade-top">
              <div className="service-card__head d-flex align-items-center justify-content-between">
                <span className="sub-title">Srbija</span>
                <i className="icon-arrow-top-right"></i>
              </div>
              <h4 className="mt-2">Izrada sajtova u Srbiji</h4>
              <p className="mt-2">
                Pomažemo kompanijama iz različitih gradova Srbije da dobiju stabilne web
                sajtove i prilagođene web aplikacije sa jasnim ciljevima i mernim
                rezultatima.
              </p>
              <Link href="/izrada-sajtova-srbija" className="btn btn--secondary mt-3">
                Pogledaj ponudu za Srbiju
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationServiceLinks;
