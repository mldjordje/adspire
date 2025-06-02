import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

const ServiceMain = () => {
  return (
   <section className="section service-t">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="service-t__slider-w">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            slidesPerGroup={1}
            speed={800}
            loop={true}
            centeredSlides={false}
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".next-service-t",
              prevEl: ".prev-service-t",
            }}
            className="service-t__slider"
            breakpoints={{
              1400: { slidesPerView: 4 },
              1200: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
            }}
          >
            <SwiperSlide>
              <div className="service-t-single-wrapper">
                <div className="service-t__slider-single">
                  <div className="intro">
                    <span className="sub-title">01<i className="fa-solid fa-arrow-right"></i></span>
                    <h4><Link href="service-single">Izrada web sajtova</Link></h4>
                  </div>
                  <ul>
                    <li>Unikatan dizajn</li>
                    <li>Mobilna prilagodljivost</li>
                    <li>Brza učitavanja</li>
                    <li>SEO osnovna optimizacija</li>
                    <li>CMS integracija</li>
                  </ul>
                  <div className="cta">
                    <Link href="service-single">
                      <i className="icon-arrow-top-right"></i><span>detalji usluge</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="service-t-single-wrapper">
                <div className="service-t__slider-single">
                  <div className="intro">
                    <span className="sub-title">02<i className="fa-solid fa-arrow-right"></i></span>
                    <h4><Link href="service-single">Web aplikacije</Link></h4>
                  </div>
                  <ul>
                    <li>Frontend i backend razvoj</li>
                    <li>Integracija sa bazama</li>
                    <li>API povezivanje</li>
                    <li>Skalabilna arhitektura</li>
                    <li>Testiranje i sigurnost</li>
                  </ul>
                  <div className="cta">
                    <Link href="service-single">
                      <i className="icon-arrow-top-right"></i><span>detalji usluge</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="service-t-single-wrapper">
                <div className="service-t__slider-single">
                  <div className="intro">
                    <span className="sub-title">03<i className="fa-solid fa-arrow-right"></i></span>
                    <h4><Link href="service-single">Web prodavnice</Link></h4>
                  </div>
                  <ul>
                    <li>WooCommerce / Shopify</li>
                    <li>Online plaćanja</li>
                    <li>Integracija dostave</li>
                    <li>Upravljanje proizvodima</li>
                    <li>SEO i analitika</li>
                  </ul>
                  <div className="cta">
                    <Link href="service-single">
                      <i className="icon-arrow-top-right"></i><span>detalji usluge</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="service-t-single-wrapper">
                <div className="service-t__slider-single">
                  <div className="intro">
                    <span className="sub-title">04<i className="fa-solid fa-arrow-right"></i></span>
                    <h4><Link href="service-single">Vođenje društvenih mreža</Link></h4>
                  </div>
                  <ul>
                    <li>Kreiranje sadržaja</li>
                    <li>Instagram / Facebook</li>
                    <li>Planiranje objava</li>
                    <li>Interakcija sa publikom</li>
                    <li>Izveštaji i analize</li>
                  </ul>
                  <div className="cta">
                    <Link href="service-single">
                      <i className="icon-arrow-top-right"></i><span>detalji usluge</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="service-t-single-wrapper">
                <div className="service-t__slider-single">
                  <div className="intro">
                    <span className="sub-title">05<i className="fa-solid fa-arrow-right"></i></span>
                    <h4><Link href="service-single">Digitalni marketing</Link></h4>
                  </div>
                  <ul>
                    <li>Google oglasi</li>
                    <li>Meta kampanje</li>
                    <li>Analiza tržišta</li>
                    <li>Strategija kampanja</li>
                    <li>Praćenje rezultata</li>
                  </ul>
                  <div className="cta">
                    <Link href="service-single">
                      <i className="icon-arrow-top-right"></i><span>detalji usluge</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="service-t-single-wrapper">
                <div className="service-t__slider-single">
                  <div className="intro">
                    <span className="sub-title">06<i className="fa-solid fa-arrow-right"></i></span>
                    <h4><Link href="service-single">SEO optimizacija</Link></h4>
                  </div>
                  <ul>
                    <li>On-page SEO</li>
                    <li>Tehnička optimizacija</li>
                    <li>Brzina sajta</li>
                    <li>Keyword analiza</li>
                    <li>Link building</li>
                  </ul>
                  <div className="cta">
                    <Link href="service-single">
                      <i className="icon-arrow-top-right"></i><span>detalji usluge</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
  <div className="slide-group">
    <button aria-label="previous item" className="slide-btn prev-service-t">
      <i className="fa-light fa-angle-left"></i>
    </button>
    <button aria-label="next item" className="slide-btn next-service-t">
      <i className="fa-light fa-angle-right"></i>
    </button>
  </div>
</section>
  );
};

export default ServiceMain;
