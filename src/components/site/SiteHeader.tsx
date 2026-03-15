"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
    <svg viewBox="0 0 20 20" aria-hidden>
      <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
    </svg>
  );
}

function ThemeIcon({ theme }: { theme: "dark" | "light" }) {
  return <i className={theme === "dark" ? "ph-bold ph-sun" : "ph-bold ph-moon-stars"} aria-hidden />;
}

export function SiteHeader({ locale, nav }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>("main");
  const { theme, toggleTheme } = useTheme();

  const groups: MenuGroup[] = [
    {
      key: "main",
      label: locale === "en" ? "Main" : "Glavno",
      items: [
        { href: "/", label: nav.home },
        { href: "/about-us", label: nav.about },
        { href: "/our-services", label: nav.services },
        { href: "/our-projects", label: nav.projects },
      ],
    },
    {
      key: "explore",
      label: locale === "en" ? "Explore" : "Istrazi",
      items: [
        { href: "/portfolio", label: nav.portfolio },
        { href: "/blog", label: nav.blog },
        { href: "/faq", label: nav.faq },
        { href: "/contact-us", label: nav.contact },
      ],
    },
  ];

  useEffect(() => {
    document.body.classList.toggle("mxd-menu-open", menuOpen);
    return () => document.body.classList.remove("mxd-menu-open");
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenGroup("main");
  };

  const isActiveLink = (href: string) => {
    const localizedHref = withLocalePrefix(locale, href);
    return pathname === localizedHref || pathname === href;
  };

  return (
    <>
      <div className="mxd-nav__wrap" data-lenis-prevent="">
        <nav className="mxd-nav__contain">
          <button
            type="button"
            className={`mxd-nav__hamburger ${menuOpen ? "is-active" : ""}`}
            onClick={() => setMenuOpen((current) => !current)}
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
                    ? "Adspire Digital Agency. Websites, systems, SEO and growth delivery."
                    : "Adspire Digital Agency. Sajtovi, sistemi, SEO i growth isporuka."}
                </p>
                <div className="main-menu">
                  <nav className="main-menu__content">
                    <ul id="main-menu" className="main-menu__accordion">
                      {groups.map((group) => (
                        <li className={`main-menu__item ${openGroup === group.key ? "open" : ""}`} key={group.key}>
                          <button
                            type="button"
                            className="main-menu__toggle"
                            onClick={() => setOpenGroup((current) => (current === group.key ? null : group.key))}
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
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="mxd-menu__right">
                <div className="menu-promo">
                  <div className="menu-promo__content">
                    <p className="menu-promo__caption menu-fade-in">
                      {locale === "en"
                        ? "One team for design, development, automation and measurable growth."
                        : "Jedan tim za dizajn, development, automatizaciju i merljiv rast."}
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
                <p className="t-xsmall">{locale === "en" ? "Nis, Serbia" : "Nis, Srbija"}</p>
                <p className="t-xsmall">{new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header id="header" className={`mxd-header ${menuOpen ? "menu-is-visible" : ""}`}>
        <div className="mxd-header__logo loading__fade">
          <Link href={withLocalePrefix(locale, "/")} locale={false} className="mxd-logo" aria-label="Adspire home">
            <svg className="mxd-logo__image mxd-logo__image--adspire" viewBox="0 0 56 56" aria-hidden>
              <circle cx="28" cy="28" r="28" />
              <text x="28" y="34" textAnchor="middle">A</text>
            </svg>
            <span className="mxd-logo__text">
              adspire
              <br />
              digital
            </span>
          </Link>
        </div>

        <div className="mxd-header__controls loading__fade">
          <button
            id="color-switcher"
            className="mxd-color-switcher"
            type="button"
            role="switch"
            onClick={toggleTheme}
            aria-label={locale === "en" ? "Light and dark mode" : "Svetla i tamna tema"}
            aria-checked={theme === "dark"}
          >
            <ThemeIcon theme={theme} />
          </button>
          <Link
            href={withLocalePrefix(locale, "/contact-us")}
            locale={false}
            className="btn btn-anim btn-default btn-mobile-icon btn-outline slide-right-up"
            aria-label={nav.contact}
          >
            <span className="btn-caption">{nav.contact}</span>
            <i className="ph-bold ph-arrow-up-right" aria-hidden />
          </Link>
        </div>
      </header>
    </>
  );
}
