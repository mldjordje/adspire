"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";
import { LocaleSwitcher } from "@/components/site/LocaleSwitcher";
import { useTheme } from "@/components/site/ThemeProvider";
import { withLocalePrefix } from "@/lib/locale";
import type { LocaleCode } from "@/lib/site-config";
import { RAYO_V10_ASSET_MAP } from "@/lib/rayo-v10-assets";

type HeaderProps = {
  locale: LocaleCode;
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    contact: string;
    blog: string;
    faq: string;
    portfolio: string;
  };
};

type MenuGroup = {
  key: string;
  label: string;
  items: Array<{ href: string; label: string }>;
};

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" version="1.1" viewBox="0 0 20 20" aria-hidden>
      <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
    </svg>
  );
}

export function SiteHeader({ locale, nav }: HeaderProps) {
  const defaultGroup = "agency";
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(defaultGroup);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);

  const groups: MenuGroup[] = [
    {
      key: "agency",
      label: locale === "en" ? "Agency" : "Agencija",
      items: [
        { href: "/", label: nav.home },
        { href: "/about-us", label: nav.about },
        { href: "/our-projects", label: nav.projects },
      ],
    },
    {
      key: "solutions",
      label: locale === "en" ? "Solutions" : "Resenja",
      items: [
        { href: "/our-services", label: nav.services },
        { href: "/portfolio", label: nav.portfolio },
        { href: "/contact-us", label: nav.contact },
      ],
    },
    {
      key: "insights",
      label: locale === "en" ? "Insights" : "Uvidi",
      items: [
        { href: "/blog", label: nav.blog },
        { href: "/faq", label: nav.faq },
      ],
    },
  ];

  useEffect(() => {
    if (!wrapRef.current) {
      return;
    }

    gsap.registerPlugin(Flip);

    const root = wrapRef.current;
    const hamburgerEl = root.querySelector<HTMLElement>(".mxd-nav__hamburger");
    const navLineEls = root.querySelectorAll<HTMLElement>(".hamburger__line");
    const menuContainEl = root.querySelector<HTMLElement>(".mxd-menu__contain");
    const flipItemEl = root.querySelector<HTMLElement>(".hamburger__base");
    const menuWrapEl = root.querySelector<HTMLElement>(".mxd-menu__wrapper");
    const menuBaseEl = root.querySelector<HTMLElement>(".mxd-menu__base");
    const menuItemEls = root.querySelectorAll<HTMLElement>(".main-menu__item");
    const videoEl = root.querySelector<HTMLElement>(".menu-promo__video");
    const fadeInEls = root.querySelectorAll<HTMLElement>(".menu-fade-in");

    if (!hamburgerEl || navLineEls.length < 2 || !menuContainEl || !flipItemEl || !menuWrapEl || !menuBaseEl) {
      return;
    }

    const flip = (forwards: boolean) => {
      const state = Flip.getState(flipItemEl);
      if (forwards) {
        menuContainEl.appendChild(flipItemEl);
      } else {
        hamburgerEl.appendChild(flipItemEl);
      }
      Flip.from(state, { ease: "power4.inOut", duration: 0.8 });
    };

    const tl = gsap.timeline({ paused: true });
    tl.set(menuWrapEl, { display: "flex" })
      .from(menuBaseEl, {
        opacity: 0,
        duration: 0.6,
        ease: "none",
        onStart: () => flip(true),
      })
      .to(navLineEls[0], { y: 5, duration: 0.16 }, "<")
      .to(navLineEls[1], { y: -5, duration: 0.16 }, "<")
      .to(navLineEls[0], { rotate: 45, duration: 0.16 }, 0.2)
      .to(navLineEls[1], { rotate: -45, duration: 0.16 }, 0.2)
      .add("fade-in-up")
      .from(
        menuItemEls,
        {
          opacity: 0,
          yPercent: 50,
          duration: 0.2,
          stagger: { amount: 0.2 },
          onReverseComplete: () => {
            flip(false);
          },
        },
        "fade-in-up"
      )
      .from(
        videoEl,
        {
          opacity: 0,
          yPercent: 20,
          duration: 0.2,
        },
        "fade-in-up"
      )
      .from(fadeInEls, { opacity: 0, duration: 0.3 });

    menuTlRef.current = tl;

    return () => {
      menuTlRef.current = null;
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const onUnload = () => setMenuOpen(false);

    if (menuOpen) {
      document.body.classList.add("mxd-menu-open");
      menuTlRef.current?.play();
    } else {
      document.body.classList.remove("mxd-menu-open");
      menuTlRef.current?.reverse();
    }

    window.addEventListener("keydown", onEscape);
    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("keydown", onEscape);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenGroup(defaultGroup);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => {
      if (!current) {
        setOpenGroup(defaultGroup);
      }
      return !current;
    });
  };

  const isActiveLink = (href: string) => {
    const localizedHref = withLocalePrefix(locale, href);
    return pathname === localizedHref || pathname === href;
  };

  return (
    <>
      <div className="mxd-nav__wrap" ref={wrapRef}>
        <nav className="mxd-nav__contain" data-lenis-prevent="">
          <button
            type="button"
            className={`mxd-nav__hamburger ${menuOpen ? "is-active nav-open" : ""}`}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label={locale === "en" ? "Toggle menu" : "Otvori meni"}
          >
            <span className="hamburger__base" />
            <span className="hamburger__line" />
            <span className="hamburger__line" />
          </button>
        </nav>

        <div className={`mxd-menu__wrapper ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
          <button type="button" className="mxd-menu__base" onClick={closeMenu} aria-label={locale === "en" ? "Close menu" : "Zatvori meni"} />
          <div className="mxd-menu__contain">
            <div className="mxd-menu__inner">
              <div className="mxd-menu__left">
                <p className="mxd-menu__caption menu-fade-in">
                  {locale === "en"
                    ? "Web systems, SEO foundations and growth workflows for ambitious businesses."
                    : "Web sistemi, SEO osnova i growth workflow za biznise koji zele jasan rezultat."}
                </p>
                <div className="main-menu">
                  <nav className="main-menu__content">
                    <ul id="main-menu" className="main-menu__accordion">
                      {groups.map((group) => (
                        <li className={`main-menu__item ${openGroup === group.key ? "open" : ""}`} key={group.key}>
                          <button
                            type="button"
                            className="main-menu__toggle"
                            onClick={() => setOpenGroup((prev) => (prev === group.key ? null : group.key))}
                          >
                            <span className="main-menu__link btn btn-anim">
                              <span className="btn-caption">{group.label}</span>
                            </span>
                            <PlusIcon />
                          </button>
                          <ul className="submenu" style={{ display: openGroup === group.key ? "block" : "none" }}>
                            {group.items.map((item) => (
                              <li className={`submenu__item ${isActiveLink(item.href) ? "active" : ""}`} key={item.href}>
                                <Link href={withLocalePrefix(locale, item.href)} locale={false} onClick={closeMenu}>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                      <li className="main-menu__item">
                        <Link className="main-menu__link btn btn-anim" href={withLocalePrefix(locale, "/contact-us")} locale={false} onClick={closeMenu}>
                          <span className="btn-caption">{nav.contact}</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="mxd-menu__right">
                <div className="menu-promo">
                  <div className="menu-promo__content">
                    <p className="menu-promo__caption menu-fade-in">
                      {locale === "en"
                        ? "From discovery to launch, Adspire combines design, development, automation and measurement in one delivery loop."
                        : "Od discovery faze do lansiranja, Adspire spaja dizajn, development, automatizaciju i merenje u jednom sistemu isporuke."}
                    </p>
                    <div className="menu-promo__video">
                      <video
                        className="menu-video"
                        src={RAYO_V10_ASSET_MAP.menu.promoVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={RAYO_V10_ASSET_MAP.menu.promoPoster}
                      />
                    </div>
                    <div className="menu-fade-in">
                      <LocaleSwitcher locale={locale} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mxd-menu__data menu-fade-in">
                <p className="t-xsmall">{locale === "en" ? "Based in Nis, Serbia" : "Baza u Nisu, Srbija"}</p>
                <p className="t-xsmall">{new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header id="header" className={`mxd-header ${menuOpen ? "menu-is-visible" : ""}`}>
        <div className="mxd-header__logo">
          <Link href={withLocalePrefix(locale, "/")} locale={false} className="mxd-logo" aria-label="Adspire home">
            <span className="mxd-logo__badge">A</span>
            <span className="mxd-logo__text">
              adspire
              <br />
              digital
            </span>
          </Link>
        </div>

        <div className="mxd-header__controls">
          <button
            id="color-switcher"
            className="mxd-color-switcher"
            type="button"
            role="switch"
            onClick={toggleTheme}
            aria-label={locale === "en" ? "Light and dark mode" : "Svetla i tamna tema"}
            aria-checked={theme === "dark"}
          />
          <Link href={withLocalePrefix(locale, "/contact-us")} locale={false} className="mxd-contact-chip" aria-label={nav.contact}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M14.5 5h4.5v4.5a1 1 0 11-2 0V8.41l-8.8 8.8a1 1 0 11-1.4-1.42l8.79-8.79H14.5a1 1 0 110-2z" />
            </svg>
          </Link>
        </div>
      </header>
    </>
  );
}
