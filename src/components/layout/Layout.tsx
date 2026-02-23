import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import VanillaTilt from "vanilla-tilt";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Header from "./header/Header";
import HeaderTwo from "./header/HeaderTwo";
import HeaderThree from "./header/HeaderThree";
import HeaderFour from "./header/HeaderFour";
import HeaderFive from "./header/HeaderFive";
import Footer from "./footer/Footer";
import FooterTwo from "./footer/FooterTwo";
import FooterThree from "./footer/FooterThree";
import FooterFour from "./footer/FooterFour";
import FooterFive from "./footer/FooterFive";
import VideoModal from "./VideoModal";
import ScrollProgressBtn from "./ScrollProgressBtn";
import CustomCursor from "./CustomCursor";
import SplitType from "split-type";
import toJsonLdList from "@/lib/structuredData";

type LayoutProps = {
  children: React.ReactNode;
  handleMouseEnterTitle?: any;
  handleMouseLeaveTitle?: any;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  video?: React.ReactNode;
};

const Layout = ({
  children,
  header,
  footer,
  handleMouseEnterTitle,
  handleMouseLeaveTitle,
  video,
}: LayoutProps) => {
  // tilt effect
  useEffect(() => {
    const tiltElements = document.querySelectorAll(".topy-tilt");

    tiltElements.forEach((element) => {
      const tiltElement = element as HTMLElement;
      VanillaTilt.init(tiltElement, {
        max: 5,
        speed: 3000,
      });
    });
  }, []);

  // navbar
  const [openNav, setOpenNav] = useState(false);

  const handleNav = () => {
    setOpenNav(!openNav);
  };

  const router = useRouter();
  const { t } = useTranslation("common");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs";
  const cleanPath =
    (router?.asPath?.split("#")[0]?.split("?")[0] as string) || "/";
  const canonicalUrl = cleanPath === "/" ? siteUrl : `${siteUrl}${cleanPath}`;
  const locales = router.locales || ["sr", "en"];
  const defaultLocale = router.defaultLocale || "sr";
  const localePrefixPattern = new RegExp(
    `^/(?:${locales.join("|")})(?=/|$)`,
    "i"
  );
  const pathWithoutLocale = cleanPath.replace(localePrefixPattern, "") || "/";
  const getLocalizedHref = (locale: string) => {
    const localePrefix = locale === defaultLocale ? "" : `/${locale}`;
    const suffix = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
    return `${siteUrl}${localePrefix}${suffix}`;
  };
  const hreflangLinks = locales.map((locale) => ({
    locale,
    href: getLocalizedHref(locale),
  }));
  const xDefaultHref = getLocalizedHref(defaultLocale);
  const ogImage = `${siteUrl}/images/banner/banner-one-thumb.png`;
  const ogLocale = router.locale === "en" ? "en_US" : "sr_RS";
  const ogLocaleAlternates = locales
    .filter((locale) => locale !== (router.locale || defaultLocale))
    .map((locale) => (locale === "en" ? "en_US" : "sr_RS"));
  const structuredData = toJsonLdList({
    siteUrl,
    canonicalUrl,
    locale: router.locale || "sr",
  });

  const metaTitle = t("meta.title") as string;
  const metaKeywords = t("meta.keywords") as string;
  const metaDescription = t("meta.description") as string;

  const classMappings: Record<string, string> = {
    "/index-light": "home-light",
    "/index-two-light": "home-two-light",
    "/index-three-light": "home-three-light",
    "/index-four-light": "home-four-light",
    "/index-five-light": "home-five-light",
  };

  const classNameForCurrentPath = classMappings[router.pathname] || "";

  const combinedClasses = ` my-app`;

  const combinedClassName = `${combinedClasses}${
    openNav ? " body-active" : ""
  } ${classNameForCurrentPath}`;

  // fade animation
  useEffect(() => {
    const fadeWrapperRefs = document.querySelectorAll(".fade-wrapper");

    fadeWrapperRefs.forEach((fadeWrapperRef) => {
      const fadeItems = fadeWrapperRef.querySelectorAll(".fade-top");

      fadeItems.forEach((element, index) => {
        const delay = index * 0.15;

        gsap.set(element, {
          opacity: 0,
          y: 100,
        });

        ScrollTrigger.create({
          trigger: element,
          start: "top 100%",
          end: "bottom 20%",
          scrub: 0.5,
          onEnter: () => {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: delay,
            });
          },
          once: true,
        });
      });
    });
  }, []);

  // appear down
  useEffect(() => {
    const appearDownSections = document.querySelectorAll(".appear-down");

    appearDownSections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: section,
            scrub: 1,
            start: "top bottom",
            end: "bottom center",
            markers: false,
          },
        }
      );
    });
  }, []);

  // split text animation
  useEffect(() => {
    const myText = new SplitType(".title-anim");
    const titleAnims = document.querySelectorAll(".title-anim");

    titleAnims.forEach((titleAnim) => {
      const charElements = titleAnim.querySelectorAll(".char");

      charElements.forEach((char, index) => {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: char,
            start: "top 90%",
            end: "bottom 60%",
            scrub: false,
            markers: false,
            toggleActions: "play none none none",
          },
        });

        const charDelay = index * 0.03;

        tl2.from(char, {
          duration: 0.8,
          x: 70,
          delay: charDelay,
          autoAlpha: 0,
        });
      });
    });
  }, []);

  return (
    <Fragment>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="shortcut icon"
          href="/images/favicon.png"
          type="image/x-icon"
        />
        <title key="title">{metaTitle}</title>
        <meta key="keywords" name="keywords" content={metaKeywords} />
        <meta key="description" name="description" content={metaDescription} />
        <meta name="author" content="Adspire" />
        <meta name="format-detection" content="telephone=no,address=no,email=no" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          key="robots"
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
        <meta
          key="googlebot"
          name="googlebot"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
        <link key="canonical" rel="canonical" href={canonicalUrl} />
        {hreflangLinks.map(({ locale, href }) => (
          <link
            key={`alt-${locale}`}
            rel="alternate"
            hrefLang={locale}
            href={href}
          />
        ))}
        <link key="alt-x-default" rel="alternate" hrefLang="x-default" href={xDefaultHref} />
        <link rel="alternate" type="text/plain" href="/llms.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" />
        <meta name="geo.region" content="RS" />
        <meta name="geo.placename" content="Nis" />
        <meta name="geo.position" content="43.3091683;21.8642094" />
        <meta name="ICBM" content="43.3091683, 21.8642094" />
        <meta key="og-locale" property="og:locale" content={ogLocale} />
        {ogLocaleAlternates.map((locale) => (
          <meta
            key={`og-locale-alt-${locale}`}
            property="og:locale:alternate"
            content={locale}
          />
        ))}
        <meta key="og-title" property="og:title" content={metaTitle} />
        <meta key="og-description" property="og:description" content={metaDescription} />
        <meta key="og-url" property="og:url" content={canonicalUrl} />
        <meta key="og-site-name" property="og:site_name" content="Adspire" />
        <meta key="og-image" property="og:image" content={ogImage} />
        <meta key="og-image-width" property="og:image:width" content="1200" />
        <meta key="og-image-height" property="og:image:height" content="630" />
        <meta key="og-image-alt" property="og:image:alt" content={metaTitle} />
        <meta key="og-type" property="og:type" content="website" />
        <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter-title" name="twitter:title" content={metaTitle} />
        <meta key="twitter-description" name="twitter:description" content={metaDescription} />
        <meta key="twitter-image" name="twitter:image" content={ogImage} />
        {structuredData.map((item, index) => (
          <script
            key={`jsonld-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </Head>

      <div className={combinedClassName}>
        {header === 1 && (
          <Header
            openNav={openNav}
            handleNav={handleNav}
            setOpenNav={setOpenNav}
          />
        )}
        {header === 2 && (
          <HeaderTwo
            openNav={openNav}
            handleNav={handleNav}
            setOpenNav={setOpenNav}
          />
        )}
        {header === 3 && (
          <HeaderThree
            openNav={openNav}
            handleNav={handleNav}
            setOpenNav={setOpenNav}
          />
        )}
        {header === 4 && (
          <HeaderFour
            openNav={openNav}
            handleNav={handleNav}
            setOpenNav={setOpenNav}
          />
        )}
        {header === 5 && (
          <HeaderFive
            openNav={openNav}
            handleNav={handleNav}
            setOpenNav={setOpenNav}
          />
        )}
        <main>{children}</main>
        {footer === 1 && <Footer />}
        {footer === 2 && <FooterTwo />}
        {footer === 3 && <FooterThree />}
        {footer === 4 && <FooterFour />}
        {footer === 5 && <FooterFive />}
        {video ? <VideoModal /> : null}
        <ScrollProgressBtn />
        <CustomCursor
          onTitleMouseEnter={handleMouseEnterTitle}
          onTitleMouseLeave={handleMouseLeaveTitle}
        />
      </div>
    </Fragment>
  );
};

export default Layout;
