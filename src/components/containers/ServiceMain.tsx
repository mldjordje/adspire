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
  speed={1200}
  loop={true}
  centeredSlides={false}
  modules={[Autoplay, Navigation]}
  autoplay={{
    delay: 7000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  navigation={{
    nextEl: ".next-service-t",
    prevEl: ".prev-service-t",
  }}
  className="service-t__slider"
  breakpoints={{
  1400: { slidesPerView: 3, spaceBetween: 40 }, // šire slajdove
  1200: { slidesPerView: 2.5, spaceBetween: 30 },
  768: { slidesPerView: 2, spaceBetween: 20 },
}}
>
  {/* 01 Paket Start */}
  <SwiperSlide>
    <div className="service-t-single-wrapper">
      <div className="service-t__slider-single">
        <div className="intro">
          <span className="sub-title">01<i className="fa-solid fa-arrow-right"></i></span>
          <h4><Link href="/services/start">Start paket</Link></h4>
        </div>
        <ul>
          <li>Dizajn besplatan</li>
          <li>Next.js tehnologija</li>
          <li>Brz i optimizovan sajt (server-side renderovanje)</li>
          <li>Do 15 stranica</li>
          <li>Hosting i domen uključeni</li>
          <li>Osnovna SEO optimizacija</li>
          <li>👉 Nema web shop-a</li>
        </ul>
        <div className="cta">
          <div className="intro">
            <span className="sub-title">400–600€</span>
          </div>
          <Link href="/services/start">
            <i className="icon-arrow-top-right"></i><span>detalji usluge</span>
          </Link>
        </div>
      </div>
    </div>
  </SwiperSlide>

  {/* 02 Paket Biznis / Najpopularniji */}
  <SwiperSlide>
    <div className="service-t-single-wrapper">
      <div className="service-t__slider-single">
        <div className="intro">
          <span className="sub-title">02<i className="fa-solid fa-arrow-right"></i></span>
          <h4><Link href="/services/biznis">Biznis / Najpopularniji</Link></h4>
        </div>
        <ul>
          <li>Sve iz Start paketa</li>
          <li>Do 30 stranica</li>
          <li>Napredna SEO optimizacija (ključne reči, analitika)</li>
          <li>Google Analytics + Search Console</li>
          <li>Sigurnost i brza učitavanja (Core Web Vitals)</li>
          <li>📌 Opcija: osnovni web shop (do 50 proizvoda, kartično plaćanje, dostava)</li>
        </ul>
        <div className="cta">
          <div className="intro">
            <span className="sub-title">900–1200€</span>
          </div>
          <Link href="/services/biznis">
            <i className="icon-arrow-top-right"></i><span>detalji usluge</span>
          </Link>
        </div>
      </div>
    </div>
  </SwiperSlide>

  {/* 03 Paket Premium / Enterprise */}
  <SwiperSlide>
    <div className="service-t-single-wrapper">
      <div className="service-t__slider-single">
        <div className="intro">
          <span className="sub-title">03<i className="fa-solid fa-arrow-right"></i></span>
          <h4><Link href="/services/premium">Premium / Enterprise</Link></h4>
        </div>
        <ul>
          <li>Sve iz Biznis paketa</li>
          <li>Web shop bez ograničenja (neograničeno proizvoda)</li>
          <li>Napredna filtracija proizvoda</li>
          <li>Integracija sa ERP/CRM sistemima</li>
          <li>Multijezičnost sajta</li>
          <li>Unlimited stranica</li>
          <li>Performance tuning (CDN, keširanje, skalabilnost)</li>
          <li>Full custom dizajn</li>
          <li>12 meseci podrške i održavanja</li>
          <li>📌 Digitalni marketing uključen (društvene mreže, Google/Meta oglasi)</li>
        </ul>
        <div className="cta">
          <div className="intro">
            <span className="sub-title">2000–3000+ €</span>
          </div>
          <Link href="/services/premium">
            <i className="icon-arrow-top-right"></i><span>detalji usluge</span>
          </Link>
        </div>
      </div>
    </div>
  </SwiperSlide>
  {/* 04 Paket Digitalni marketing / UGC */}
<SwiperSlide>
  <div className="service-t-single-wrapper">
    <div className="service-t__slider-single">
      <div className="intro">
        <span className="sub-title">04<i className="fa-solid fa-arrow-right"></i></span>
        <h4><Link href="/services/digitalni-marketing">Digitalni marketing / UGC</Link></h4>
      </div>
      <ul>
        <li>Kreiranje UGC reklama za društvene mreže</li>
        <li>Profesionalno vođenje Instagram, Facebook i TikTok naloga</li>
        <li>Planiranje i optimizacija objava za viralni efekat</li>
        <li>Strategija rasta i pozicioniranja brenda</li>
        <li>Detaljni mesečni izveštaji i analize uspeha kampanja</li>
      </ul>
      <div className="cta">
        <div className="intro">
          <span className="sub-title">od 400€</span>
        </div>
        <Link href="/services/digitalni-marketing">
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
