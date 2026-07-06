import type { ReactNode } from "react";
import { getSiteContent } from "@/content/site";
import { getUiStrings } from "@/content/site/ui";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";

/** Iste slike kao u Azurio HTML loaderu (`img/loa_01.webp` … `loa_07.webp` → `public/azurio/img/`). */
const LOADER_IMAGE_PATHS = Array.from({ length: 7 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return `/azurio/img/loa_${n}.webp`;
});

type AzurioChromeProps = {
  children: ReactNode;
  locale?: LocaleCode;
};

export function AzurioChrome({ children, locale = defaultLocale }: AzurioChromeProps) {
  const content = getSiteContent(locale);
  const ui = getUiStrings(locale);
  const menuServiceItems = content.servicesPage.items;
  const lp = (href: string) => localePath(href, locale);

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
          <span className="mxd-loader__caption">{ui.loading}</span>
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
              <a href={lp("/")} className="menu-logo">
                <img
                  className="adspire-menu-logo"
                  src="/images/logo.png"
                  alt="Adspire"
                />
              </a>
            </div>

            <div className="mxd-menu__media">
              <div className="menu-media__wrapper">
                {/* Isti izvor kao hero video u „The power of imagination” (index-design-studio → mxd-hero-06), portrait */}
                <video preload="auto" autoPlay muted loop playsInline poster="/azurio/video/720x1280_hero-06.webp">
                  <source type="video/mp4" src="/azurio/video/720x1280_hero-06.mp4" />
                  <source type="video/webm" src="/azurio/video/720x1280_hero-06.webm" />
                </video>
              </div>
            </div>

            <div className="mxd-menu__navigation">
              <div className="mxd-menu__inner">
                <div className="mxd-menu__shadow shadow-top" />
                <div className="mxd-menu__caption">
                  <p>{ui.menuCaption}</p>
                </div>

                <div className="mxd-menu__left">
                  <div className="main-menu">
                    <div className="main-menu__content">
                      <ul id="main-menu" className="main-menu__accordion">
                        <li className="main-menu__item">
                          <div className="main-menu__divider divider-top" />
                          <div className="main-menu__toggle">
                            <a className="main-menu__link" href={lp("/")}>
                              <span className="main-menu__number">/ 01</span>
                              <span className="main-menu__caption">{ui.nav.home}</span>
                            </a>
                          </div>
                          <div className="main-menu__divider divider-bottom" />
                        </li>
                        <li className="main-menu__item">
                          <div className="main-menu__toggle">
                            <p className="main-menu__link">
                              <span className="main-menu__number">/ 02</span>
                              <span className="main-menu__caption">{ui.nav.services}</span>
                            </p>
                          </div>
                          <ul className="submenu">
                            <li className="submenu__item">
                              <a href={lp("/our-services")}>{ui.nav.servicesOverview}</a>
                            </li>
                            {menuServiceItems.map((item) => (
                              <li key={item.slug} className="submenu__item">
                                <a href={lp(item.href)}>{item.title}</a>
                              </li>
                            ))}
                          </ul>
                          <div className="main-menu__divider divider-bottom" />
                        </li>
                        <li className="main-menu__item">
                          <div className="main-menu__toggle">
                            <a className="main-menu__link" href={lp("/our-projects")}>
                              <span className="main-menu__number">/ 03</span>
                              <span className="main-menu__caption">{ui.nav.projects}</span>
                            </a>
                          </div>
                          <div className="main-menu__divider divider-bottom" />
                        </li>
                        <li className="main-menu__item">
                          <div className="main-menu__toggle">
                            <p className="main-menu__link">
                              <span className="main-menu__number">/ 04</span>
                              <span className="main-menu__caption">{ui.nav.pages}</span>
                            </p>
                          </div>
                          <ul className="submenu">
                            <li className="submenu__item">
                              <a href={lp("/about-us")}>{ui.nav.about}</a>
                            </li>
                            <li className="submenu__item">
                              <a href={lp("/faq")}>{ui.nav.faq}</a>
                            </li>
                            <li className="submenu__item">
                              <a href={lp("/izrada-sajta-i-aplikacija-nis")}>{ui.nav.nisDev}</a>
                            </li>
                          </ul>
                          <div className="main-menu__divider divider-bottom" />
                        </li>
                        <li className="main-menu__item">
                          <div className="main-menu__toggle">
                            <a className="main-menu__link" href={lp("/blog")}>
                              <span className="main-menu__number">/ 05</span>
                              <span className="main-menu__caption">{ui.nav.blog}</span>
                            </a>
                          </div>
                          <div className="main-menu__divider divider-bottom" />
                        </li>
                        <li className="main-menu__item">
                          <div className="main-menu__toggle">
                            <a className="main-menu__link" href={lp("/contact-us")}>
                              <span className="main-menu__number">/ 06</span>
                              <span className="main-menu__caption">{ui.nav.contact}</span>
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
                            <span>Dimitrija Leka 66,<br />Niš,<br />Srbija</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="menu-contact__item">
                      <ul className="menu-contact__list">
                        <li>
                          <a className="tag tag-m" href={lp("/our-services")}>
                            <span className="mxd-scramble">{ui.nav.services}</span>
                          </a>
                        </li>
                        <li>
                          <a className="tag tag-m" href={lp("/our-projects")}>
                            <span className="mxd-scramble">{ui.nav.projects}</span>
                          </a>
                        </li>
                        <li>
                          <a className="tag tag-m" href={lp("/blog")}>
                            <span className="mxd-scramble">{ui.nav.blog}</span>
                          </a>
                        </li>
                        <li>
                          <a className="tag tag-m" href={lp("/contact-us")}>
                            <span className="mxd-scramble">{ui.nav.contact}</span>
                          </a>
                        </li>
                      </ul>
                      <div className="menu-contact__lang">
                        <LanguageSwitcher current={locale} />
                      </div>
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
          <a className="mxd-logo" href={lp("/")}>
            <img className="adspire-header-logo" src="/images/logo.png" alt="Adspire" />
          </a>
        </div>
        <div className="mxd-header__controls loading-fade">
          <LanguageSwitcher current={locale} />
          <a className="btn mxd-header__link slide-right-up" href={lp("/contact-us")} aria-label={content.headerCta.label}>
            <span className="btn-caption mxd-scramble">{content.headerCta.label}</span>
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
            aria-label="Svetla ili tamna tema"
            aria-checked="true"
          >
            {/* Sadržaj puni mxdColorSwitcher u app.js (Dan/Noć + ikone) */}
          </button>
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
                      <a className="anim-uni-slide-down" href={lp(item.href)}>
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
                    <span>Dimitrija Leka 66, Niš</span>
                  </p>
                </div>
              </div>
              <div className="footer-blocks__column mxd-grid-item justify-end">
                <div className="footer-blocks__data justify-end">
                  <p className="footer-data anim-uni-slide-down">
                    <span className="mxd-slide-down">Copyright 2026</span>
                  </p>
                  <p className="footer-data anim-uni-slide-down">
                    <span className="mxd-slide-down">Adspire. {ui.copyrightReserved}</span>
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
                    <li><a className="mxd-socials-line__link" href={lp("/our-services")}><span className="mxd-scramble">{ui.nav.services}</span></a></li>
                    <li><a className="mxd-socials-line__link" href={lp("/our-projects")}><span className="mxd-scramble">{ui.nav.projects}</span></a></li>
                    <li><a className="mxd-socials-line__link" href={lp("/blog")}><span className="mxd-scramble">{ui.nav.blog}</span></a></li>
                    <li><a className="mxd-socials-line__link" href={lp("/faq")}><span className="mxd-scramble">{ui.nav.faq}</span></a></li>
                    <li>
                      <a className="mxd-socials-line__link" href={lp("/izrada-sajta-i-aplikacija-nis")}>
                        <span className="mxd-scramble">{ui.nav.nisDev}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-blocks__column mxd-grid-item justify-end">
                <div className="footer-blocks__controls anim-uni-fade-in">
                  <a id="to-top" className="btn btn-line-icon btn-line-default slide-up" href="#">
                    <span className="btn-caption mxd-scramble">{ui.backToTop}</span>
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
