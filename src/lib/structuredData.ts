type StructuredDataInput = {
  siteUrl: string;
  canonicalUrl: string;
  locale: string;
};

const toJsonLdList = (input: StructuredDataInput) => {
  const { siteUrl, canonicalUrl, locale } = input;
  const isEnglish = locale === "en";
  const canonicalPath = canonicalUrl.replace(siteUrl, "") || "/";
  const routeSegments = canonicalPath.split("/").filter(Boolean);
  const routeNameMap: Record<string, { en: string; sr: string }> = {
    "our-services": { en: "Services", sr: "Usluge" },
    "our-projects": { en: "Projects", sr: "Projekti" },
    "contact-us": { en: "Contact", sr: "Kontakt" },
    "about-us": { en: "About us", sr: "O nama" },
    "web-pozivnice-za-veselja": {
      en: "Web invitations for events",
      sr: "Web pozivnice za veselja",
    },
  };
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
      item: siteUrl,
    },
    ...routeSegments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: getSegmentLabel(segment),
      item: `${siteUrl}/${routeSegments.slice(0, index + 1).join("/")}`,
    })),
  ];

  const name = "ADSPIRE";
  const description = isEnglish
    ? "Digital agency in Nis, Serbia for websites, web apps, e-commerce, booking systems, web invitations for events, and presentation sites."
    : "Digitalna agencija iz Nisa za izradu web sajtova, web aplikacija, web shopova, booking sistema, web pozivnica za veselja i prezentacija.";

  const address = {
    "@type": "PostalAddress",
    streetAddress: "DIMITRIJA LEKA 66",
    addressLocality: "Nis",
    addressRegion: "Nis (Palilula)",
    postalCode: "18000",
    addressCountry: "RS",
  };
  const geo = {
    "@type": "GeoCoordinates",
    latitude: 43.3091683,
    longitude: 21.8642094,
  };

  const services = isEnglish
    ? [
        "Web design & development",
        "E-commerce",
        "Booking systems",
        "Web invitations for events",
        "SEO & content",
        "Performance marketing",
        "Branding & identity",
        "Social media & content",
        "Maintenance & support",
        "Analytics & CRO",
      ]
    : [
        "Web dizajn i razvoj",
        "E-commerce",
        "Booking sistemi",
        "Web pozivnice za veselja",
        "SEO i sadrzaj",
        "Performance marketing",
        "Brending i identitet",
        "Drustvene mreze i sadrzaj",
        "Odrzavanje i podrska",
        "Analitika i CRO",
      ];
  const serviceSlugs = [
    "web-dizajn-i-razvoj",
    "e-commerce",
    "booking-sistemi",
    "web-pozivnice-za-veselja",
    "seo-i-sadrzaj",
    "performance-marketing",
    "brending-i-identitet",
    "drustvene-mreze-i-sadrzaj",
    "odrzavanje-i-podrska",
    "analitika-i-cro",
  ];

  const faq = [
    {
      "@type": "Question",
      name: isEnglish
        ? "What services does ADSPIRE provide?"
        : "Koje usluge pruza ADSPIRE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: isEnglish
          ? "Web design, e-commerce, booking systems, web invitations, SEO, performance marketing, branding, social media, maintenance, and analytics."
          : "Web dizajn i razvoj, e-commerce, booking sistemi, web pozivnice, SEO, performance marketing, brending, drustvene mreze, odrzavanje i analitika.",
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
          ? "Yes. ADSPIRE creates custom web invitation pages with RSVP tracking, location map, and easy sharing."
          : "Da. ADSPIRE izradjuje personalizovane web pozivnice sa RSVP potvrdama, mapom lokacije i lakim deljenjem.",
      },
    },
    {
      "@type": "Question",
      name: isEnglish
        ? "Do you have dedicated pages for each service?"
        : "Da li svaka usluga ima posebnu stranicu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: isEnglish
          ? "Yes. Each service has a dedicated URL under /usluge/ with SEO and AI-ready information."
          : "Da. Svaka usluga ima posebnu URL stranicu pod /usluge/ sa SEO i AI optimizovanim sadrzajem.",
      },
    },
    {
      "@type": "Question",
      name: isEnglish
        ? "Where is ADSPIRE located?"
        : "Gde se nalazi ADSPIRE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: isEnglish
          ? "DIMITRIJA LEKA 66, 18000 Nis (Palilula), Serbia."
          : "DIMITRIJA LEKA 66, 18000 Nis (Palilula), Srbija.",
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
          ? "Call 0601491491 or email djordje@adspire.rs."
          : "Pozovite 0601491491 ili pisite na djordje@adspire.rs.",
      },
    },
  ];

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name,
      url: siteUrl,
      inLanguage: isEnglish ? "en" : "sr",
      description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/our-services?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageName,
      url: canonicalUrl,
      inLanguage: isEnglish ? "en" : "sr",
      description,
      isPartOf: {
        "@type": "WebSite",
        name,
        url: siteUrl,
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
      name,
      url: siteUrl,
      image: `${siteUrl}/images/banner/banner-one-thumb.png`,
      description,
      address,
      geo,
      areaServed: ["Nis", "Srbija"],
      telephone: "0601491491",
      email: "djordje@adspire.rs",
      availableLanguage: ["sr", "en"],
      slogan: isEnglish
        ? "Websites and web apps that convert."
        : "Web sajtovi i web aplikacije koje konvertuju.",
      knowsAbout: services,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: isEnglish ? "Digital services" : "Digitalne usluge",
        itemListElement: services.map((service, index) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service,
            url: `${siteUrl}/usluge/${serviceSlugs[index]}`,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: isEnglish ? "Web development services" : "Usluge izrade sajtova",
      provider: {
        "@type": "Organization",
        name,
      },
      areaServed: ["Nis", "Srbija"],
      serviceType: services,
      url: canonicalUrl,
      mainEntityOfPage: canonicalUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq,
    },
  ];
};

export default toJsonLdList;
