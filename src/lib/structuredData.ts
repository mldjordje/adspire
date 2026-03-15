import { stripLocalePrefix, withLocalePrefix } from "@/lib/locale";

type StructuredDataInput = {
  siteUrl: string;
  canonicalUrl: string;
  locale: string;
};

const routeNameMap: Record<string, { en: string; sr: string }> = {
  "our-services": { en: "Services", sr: "Usluge" },
  "our-projects": { en: "Projects", sr: "Projekti" },
  "contact-us": { en: "Contact", sr: "Kontakt" },
  "about-us": { en: "About us", sr: "O nama" },
  "booking-za-salone-bez-sistema": {
    en: "Salon booking systems",
    sr: "Booking za salone bez sistema",
  },
  "web-pozivnice-za-veselja": {
    en: "Web invitations for events",
    sr: "Web pozivnice za veselja",
  },
  "performance-marketing": {
    en: "Performance marketing",
    sr: "Performance marketing",
  },
  "brending-i-identitet": {
    en: "Branding and identity",
    sr: "Brending i identitet",
  },
  "drustvene-mreze-i-sadrzaj": {
    en: "Social media and content",
    sr: "Drustvene mreze i sadrzaj",
  },
  "odrzavanje-i-podrska": {
    en: "Maintenance and support",
    sr: "Odrzavanje i podrska",
  },
  "analitika-i-cro": {
    en: "Analytics and CRO",
    sr: "Analitika i CRO",
  },
};

function absoluteUrl(siteUrl: string, path: string) {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

const toJsonLdList = ({ siteUrl, canonicalUrl, locale }: StructuredDataInput) => {
  const localeCode = locale === "en" ? "en" : "sr";
  const isEnglish = localeCode === "en";
  const rawCanonicalPath = canonicalUrl.replace(siteUrl, "") || "/";
  const canonicalPath = stripLocalePrefix(rawCanonicalPath);
  const localizedCanonicalPath = withLocalePrefix(localeCode, canonicalPath);
  const canonicalFullUrl = absoluteUrl(siteUrl, localizedCanonicalPath);
  const routeSegments = canonicalPath.split("/").filter(Boolean);
  const fallbackLabel = (segment: string) =>
    decodeURIComponent(segment).replace(/-/g, " ");
  const getSegmentLabel = (segment: string) => {
    const mapped = routeNameMap[segment];
    if (mapped) {
      return isEnglish ? mapped.en : mapped.sr;
    }
    return fallbackLabel(segment);
  };
  const homeLabel = isEnglish ? "Home" : "Pocetna";
  const pageName = routeSegments.length
    ? getSegmentLabel(routeSegments[routeSegments.length - 1])
    : homeLabel;
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: homeLabel,
      item: absoluteUrl(siteUrl, withLocalePrefix(localeCode, "/")),
    },
    ...routeSegments.map((segment, index) => {
      const path = `/${routeSegments.slice(0, index + 1).join("/")}`;
      return {
        "@type": "ListItem",
        position: index + 2,
        name: getSegmentLabel(segment),
        item: absoluteUrl(siteUrl, withLocalePrefix(localeCode, path)),
      };
    }),
  ];

  const description = isEnglish
    ? "Digital agency in Nis, Serbia for advanced web applications, websites, booking systems, SEO, automation and measurable growth."
    : "Digitalna agencija iz Nisa za napredne web aplikacije, sajtove, booking sisteme, SEO, automatizaciju i merljiv rast.";
  const serviceItems = isEnglish
    ? [
        { name: "Web design & development", slug: "web-dizajn-i-razvoj" },
        { name: "Advanced web applications", slug: "web-dizajn-i-razvoj" },
        { name: "E-commerce", slug: "e-commerce" },
        { name: "Booking systems", slug: "booking-sistemi" },
        {
          name: "Booking systems for salons without existing software",
          slug: "booking-za-salone-bez-sistema",
        },
        { name: "Web invitations for events", slug: "web-pozivnice-za-veselja" },
        { name: "SEO & content", slug: "seo-i-sadrzaj" },
        { name: "Performance marketing", slug: "performance-marketing" },
        { name: "Branding & identity", slug: "brending-i-identitet" },
        { name: "Social media & content", slug: "drustvene-mreze-i-sadrzaj" },
        { name: "Maintenance & support", slug: "odrzavanje-i-podrska" },
        { name: "Analytics & CRO", slug: "analitika-i-cro" },
      ]
    : [
        { name: "Web dizajn i razvoj", slug: "web-dizajn-i-razvoj" },
        { name: "Napredne web aplikacije", slug: "web-dizajn-i-razvoj" },
        { name: "E-commerce", slug: "e-commerce" },
        { name: "Booking sistemi", slug: "booking-sistemi" },
        {
          name: "Booking sistemi za salone bez postojeceg sistema",
          slug: "booking-za-salone-bez-sistema",
        },
        { name: "Web pozivnice za veselja", slug: "web-pozivnice-za-veselja" },
        { name: "SEO i sadrzaj", slug: "seo-i-sadrzaj" },
        { name: "Performance marketing", slug: "performance-marketing" },
        { name: "Brending i identitet", slug: "brending-i-identitet" },
        { name: "Drustvene mreze i sadrzaj", slug: "drustvene-mreze-i-sadrzaj" },
        { name: "Odrzavanje i podrska", slug: "odrzavanje-i-podrska" },
        { name: "Analitika i CRO", slug: "analitika-i-cro" },
      ];
  const services = serviceItems.map((service) => service.name);
  const searchPath = withLocalePrefix(localeCode, "/our-services");

  const faq = [
    {
      "@type": "Question",
      name: isEnglish
        ? "What services does ADSPIRE provide?"
        : "Koje usluge pruza ADSPIRE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: isEnglish
          ? "ADSPIRE builds websites, web applications, booking systems, e-commerce, SEO systems, paid campaigns and conversion optimization."
          : "ADSPIRE radi sajtove, web aplikacije, booking sisteme, e-commerce, SEO sisteme, placene kampanje i optimizaciju konverzija.",
      },
    },
    {
      "@type": "Question",
      name: isEnglish
        ? "Do you build web invitations for weddings and birthdays?"
        : "Da li radite web pozivnice za svadbe i rodjendane?",
      acceptedAnswer: {
        "@type": "Answer",
        text: isEnglish
          ? "Yes. ADSPIRE creates custom web invitation pages with RSVP tracking, location map and easy sharing."
          : "Da. ADSPIRE izradjuje personalizovane web pozivnice sa RSVP potvrdama, mapom lokacije i lakim deljenjem.",
      },
    },
    {
      "@type": "Question",
      name: isEnglish
        ? "How can I contact ADSPIRE?"
        : "Kako mogu da kontaktiram ADSPIRE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: isEnglish
          ? "Call +381601491491 or email djordje@adspire.rs."
          : "Pozovite +381601491491 ili pisite na djordje@adspire.rs.",
      },
    },
  ];

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "ADSPIRE",
      url: siteUrl,
      inLanguage: isEnglish ? "en" : "sr",
      description,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${absoluteUrl(siteUrl, searchPath)}?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalFullUrl}#webpage`,
      name: pageName,
      url: canonicalFullUrl,
      inLanguage: isEnglish ? "en" : "sr",
      description,
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
    },
    ...(routeSegments.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs,
          },
        ]
      : []),
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
      "@id": `${siteUrl}/#organization`,
      name: "ADSPIRE",
      url: siteUrl,
      image: `${siteUrl}/images/banner/banner-one-thumb.png`,
      description,
      address: {
        "@type": "PostalAddress",
        streetAddress: "DIMITRIJA LEKA 66",
        addressLocality: "Nis",
        addressRegion: "Nis (Palilula)",
        postalCode: "18000",
        addressCountry: "RS",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.3091683,
        longitude: 21.8642094,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+381601491491",
          contactType: "customer support",
          areaServed: "RS",
          availableLanguage: ["sr", "en"],
        },
      ],
      areaServed: isEnglish ? ["Nis", "Serbia"] : ["Nis", "Srbija"],
      telephone: "+381601491491",
      email: "djordje@adspire.rs",
      availableLanguage: ["sr", "en"],
      priceRange: "$$",
      slogan: isEnglish
        ? "Web systems that convert and scale."
        : "Web sistemi koji konvertuju i skaliraju.",
      knowsAbout: services,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: isEnglish ? "Digital services" : "Digitalne usluge",
        itemListElement: serviceItems.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            url: absoluteUrl(siteUrl, withLocalePrefix(localeCode, `/usluge/${service.slug}`)),
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: isEnglish ? "Web development services" : "Usluge izrade sajtova",
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: isEnglish ? ["Nis", "Serbia"] : ["Nis", "Srbija"],
      serviceType: services,
      url: canonicalFullUrl,
      mainEntityOfPage: canonicalFullUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq,
    },
  ];
};

export default toJsonLdList;
