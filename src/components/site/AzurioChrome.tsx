import type { ReactNode } from "react";
import { getSiteContent } from "@/content/site";
import { defaultLocale } from "@/lib/site-config";

const content = getSiteContent(defaultLocale);

/** Iste slike kao u Azurio HTML loaderu (`img/loa_01.webp` … `loa_07.webp` → `public/azurio/img/`). */
const LOADER_IMAGE_PATHS = Array.from({ length: 7 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return `/azurio/img/loa_${n}.webp`;
});

type AzurioChromeProps = {
  children: ReactNode;
};

export function AzurioChrome({ children }: AzurioChromeProps) {
  return (
    <>
      <div className="mxd-page-transition" />
      <div className="mxd-loader">
        <div className="mxd-loader__top">
          <span>Adspire Digital</span>
        </div>
        <div className="mxd-loader__images">
          {LOADER_IMAGE_PATHS.map((src) => (
            <img key={src} src={src} alt="" />
          ))}
        </div>
        <div className="mxd-loader__bottom">
          <div className="mxd-loader__count">
            <span className="count__text">0</span>
            <span className="count__percent">%</span>
          </div>
          <span className="mxd-loader__caption">Loading</span>
        </div>
      </div>

      <div className="mxd-menu__contain loading-fade">
        <div className="mxd-menu__toggle">
          <a href="#0" className="mxd-menu__hamburger" aria-label="Menu">
            <div className="hamburger__line" />
            <div className="hamburger__line" />
          </a>
        </div>
      </div>

      <nav className="mxd-menu">
        <div className="mxd-menu__backdrop" />
        <div className="mxd-menu__overlay">
          <div className="mxd-menu__content" data-lenis-prevent>
            <div className="mxd-menu__logo">
              <a href="/" className="menu-logo">
                <img
                  className="adspire-menu-logo"
                  src="/images/logo.png"
                  alt="Adspire"
                />
              </a>
            </div>

            <div className="mxd-menu__media">
              <div className="menu-media__wrapper">
                <video preload="auto" autoPlay muted loop playsInline poster="/images/banner/video-bg.png">
                  <source type="video/mp4" src="/azurio/video/900x1280.mp4" />
                  <source type="video/webm" src="/azurio/video/900x1280.webm" />
                </video>
              </div>
            </div>

            <div className="mxd-menu__navigation">
              <div className="mxd-menu__inner">
                <div className="mxd-menu__shadow shadow-top" />
                <div className="mxd-menu__caption">
                  <p>
                    Razvojni i tehnološki partner iz Niša — web, mobilne aplikacije, poslovni sistemi i AI automatizacija.
                  </p>
                </div>

                <div className="mxd-menu__left">
                  <div className="main-menu">
                    <div className="main-menu__content">
                      <ul id="main-menu" className="main-menu__accordion">
                        <li className="main-menu__item">
                          <div className="main-menu__divider divider-top" />
                          <div className="main-menu__toggle">
                            <p className="main-menu__link">
                              <span className="main-menu__number">/ 01</span>
                              <span className="main-menu__caption">Pocetna</span>
                            </p>
                          </div>
                          <ul className="submenu">
                            <li className="submenu__item active">
                              <a href="/">Početna</a>
                            </li>
                          </ul>
                          <div className="main-menu__divider divider-bottom" />
                        </li>
                        <li className="main-menu__item">
                          <div className="main-menu__toggle">
                            <p className="main-menu__link">
                              <span className="main-menu__number">/ 02</span>
                              <span className="main-menu__caption">Projekti</span>
                            </p>
                          </div>
                          <ul className="submenu">
                            <li className="submenu__item">
                              <a href="/our-projects">Svi projekti</a>
                            </li>
                            <li className="submenu__item">
                              <a href="/project-single">Detalj projekta</a>
                            </li>
                          </ul>
                          <div className="main-menu__divider divider-bottom" />
                        </li>
                        <li className="main-menu__item">
                          <div className="main-menu__toggle">
                            <p className="main-menu__link">
                              <span className="main-menu__number">/ 03</span>
                              <span className="main-menu__caption">Stranice</span>
                            </p>
                          </div>
                          <ul className="submenu">
                            <li className="submenu__item">
                              <a href="/about-us">O nama</a>
                            </li>
                            <li className="submenu__item">
                              <a href="/our-services">Usluge</a>
                            </li>
                            <li className="submenu__item">
                              <a href="/faq">FAQ</a>
                            </li>
                          </ul>
                          <div className="main-menu__divider divider-bottom" />
                        </li>
                        <li className="main-menu__item">
                          <div className="main-menu__toggle">
                            <p className="main-menu__link">
                              <span className="main-menu__number">/ 04</span>
                              <span className="main-menu__caption">Sadrzaj</span>
                            </p>
                          </div>
                          <ul className="submenu">
                            <li className="submenu__item">
                              <a href="/blog">Blog</a>
                            </li>
                            <li className="submenu__item">
                              <a href="/blog-single">Detalj teksta</a>
                            </li>
                          </ul>
                          <div className="main-menu__divider divider-bottom" />
                        </li>
                        <li className="main-menu__item">
                          <div className="main-menu__toggle">
                            <a className="main-menu__link" href="/contact-us">
                              <span className="main-menu__number">/ 05</span>
                              <span className="main-menu__caption">Kontakt</span>
                            </a>
                          </div>
                          <div className="main-menu__divider divider-bottom" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mxd-menu__right">
                  <div className="menu-contact">
                    <div className="menu-contact__item">
                      <ul className="menu-contact__list">
                        <li>
                          <a className="tag tag-m" href="mailto:djordje@adspire.rs">
                            <span className="mxd-scramble">djordje@adspire.rs</span>
                          </a>
                        </li>
                        <li>
                          <a className="tag tag-m" href="tel:+381601491491">
                            <span className="mxd-scramble">+381 60 149 149 1</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="menu-contact__item">
                      <ul className="menu-contact__list">
                        <li>
                          <a className="tag tag-m" href="https://maps.google.com/?q=Dimitrija+Leka+66+Nis" target="_blank">
                            <span>Dimitrija Leka 66,<br />Nis,<br />Srbija</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="menu-contact__item">
                      <ul className="menu-contact__list">
                        <li>
                          <a className="tag tag-m" href="/our-services">
                            <span className="mxd-scramble">Usluge</span>
                          </a>
                        </li>
                        <li>
                          <a className="tag tag-m" href="/our-projects">
                            <span className="mxd-scramble">Projekti</span>
                          </a>
                        </li>
                        <li>
                          <a className="tag tag-m" href="/blog">
                            <span className="mxd-scramble">Blog</span>
                          </a>
                        </li>
                        <li>
                          <a className="tag tag-m" href="/contact-us">
                            <span className="mxd-scramble">Kontakt</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mxd-menu__shadow" />
                <div className="mxd-menu__data">
                  <div className="menu-data__left">
                    <p className="menu-data__text">Adspire Digital · Niš · Next.js</p>
                  </div>
                  <div className="menu-data__right">
                    <p className="menu-data__text">Copyright Adspire</p>
                    <p className="menu-data__text">Copyright 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header id="header" className="mxd-header mxd-header-permanent">
        <div className="mxd-header__logo loading-fade">
          <a className="mxd-logo" href="/">
            <img className="adspire-header-logo" src="/images/logo.png" alt="Adspire" />
          </a>
        </div>
        <div className="mxd-header__controls loading-fade">
          <a className="btn mxd-header__link slide-right-up" href="/contact-us" aria-label="Say Hello">
            <span className="btn-caption mxd-scramble">Pokreni projekat</span>
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                <path d="M18,0v14.4h-3.6v-7.2h-3.6v-3.6H3.6V0h14.4ZM7.2,10.8h3.6v-3.6h-3.6s0,3.6,0,3.6ZM3.6,14.4h3.6v-3.6h-3.6v3.6ZM0,18h3.6v-3.6H0v3.6Z" />
              </svg>
            </i>
          </a>
          <button
            id="color-switcher"
            className="btn mxd-color-switcher"
            type="button"
            role="switch"
            aria-label="light/dark mode"
            aria-checked="true"
          />
        </div>
      </header>

      <main id="mxd-page-content" className="mxd-page-content">
        <div className="blur-container">
          <div className="blur-layer blur-1" />
          <div className="blur-layer blur-2" />
          <div className="blur-layer blur-3" />
          <div className="blur-layer blur-4" />
          <div className="blur-layer blur-5" />
          <div className="blur-layer blur-6" />
          <div className="blur-layer blur-7" />
          <div className="blur-layer blur-8" />
        </div>
        {children}
      </main>

      <footer id="mxd-footer" className="mxd-footer blur-section">
        <div className="mxd-container grid-l-container">
          <div className="mxd-block">
            <div className="mxd-footer__footer-blocks mxd-grid-item">
              <div className="footer-blocks__nav-v01">
                <ul className="footer-nav-v01">
                  {content.nav.map((item) => (
                    <li key={item.href} className="footer-nav-v01__item">
                      <a className="anim-uni-slide-down" href={item.href}>
                        <span className="mxd-scramble mxd-slide-down">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mxd-block">
            <div className="mxd-footer__footer-blocks">
              <div className="footer-blocks__column mxd-grid-item justify-start">
                <div className="footer-blocks__data justify-start">
                  <p className="footer-data">
                    <a className="anim-uni-slide-down" href="mailto:djordje@adspire.rs">
                      <span className="mxd-scramble">djordje@adspire.rs</span>
                    </a>
                  </p>
                  <p className="footer-data">
                    <a className="anim-uni-slide-down" href="tel:+381601491491">
                      <span className="mxd-scramble">+381 60 149 149 1</span>
                    </a>
                  </p>
                  <p className="footer-data anim-uni-slide-down">
                    <span>Dimitrija Leka 66, Nis</span>
                  </p>
                </div>
              </div>
              <div className="footer-blocks__column mxd-grid-item justify-end">
                <div className="footer-blocks__data justify-end">
                  <p className="footer-data anim-uni-slide-down">
                    <span className="mxd-slide-down">Copyright 2026</span>
                  </p>
                  <p className="footer-data anim-uni-slide-down">
                    <span className="mxd-slide-down">Copyright Adspire. Sva prava zadrzana</span>
                  </p>
                  <p className="footer-data anim-uni-slide-down">
                    <span className="mxd-slide-down">{content.footer.tagline}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mxd-block">
            <div className="mxd-footer__fw-mark mxd-grid-item">
              <div className="fw-mark__wrap">
                <div className="fw-mark__content">
                  <span className="anim-uni-chars">Adspire</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mxd-block">
            <div className="mxd-footer__footer-blocks bottom-blocks">
              <div className="footer-blocks__column mxd-grid-item justify-start">
                <div className="footer-blocks__socials">
                  <ul className="mxd-socials-line anim-uni-fade-in">
                    <li><a className="mxd-socials-line__link" href="/our-services"><span className="mxd-scramble">Usluge</span></a></li>
                    <li><a className="mxd-socials-line__link" href="/our-projects"><span className="mxd-scramble">Projekti</span></a></li>
                    <li><a className="mxd-socials-line__link" href="/blog"><span className="mxd-scramble">Blog</span></a></li>
                    <li><a className="mxd-socials-line__link" href="/faq"><span className="mxd-scramble">FAQ</span></a></li>
                  </ul>
                </div>
              </div>
              <div className="footer-blocks__column mxd-grid-item justify-end">
                <div className="footer-blocks__controls anim-uni-fade-in">
                  <a id="to-top" className="btn btn-line-icon btn-line-default slide-up" href="#">
                    <span className="btn-caption mxd-scramble">Nazad na vrh</span>
                    <i>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                        <path d="M0,7.2h3.6v3.6H0V7.2z M10.8,3.6V0H7.2v3.6H3.6v3.6h3.6V18h3.6V7.2h3.6V3.6H10.8z M14.4,7.2v3.6H18V7.2H14.4z" />
                      </svg>
                    </i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div id="mxd-cursor" className="mxd-cursor">
        <div id="mxd-cursor__dot" className="mxd-cursor__dot" />
        <p id="mxd-cursor__text" className="mxd-cursor__text" />
        <div id="mxd-cursor__image" className="mxd-cursor__image" />
      </div>
    </>
  );
}
