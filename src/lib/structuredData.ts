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
        "Website development",
        "Web applications",
        "E-commerce",
        "Booking systems",
        "Web invitations for events",
        "Presentation sites",
        "SEO",
        "Digital marketing",
        "Maintenance",
      ]
    : [
        "Web sajtovi",
        "Web aplikacije",
        "Web shopovi",
        "Booking sistemi",
        "Web pozivnice za veselja",
        "Prezentacije",
        "SEO",
        "Digitalni marketing",
        "Odrzavanje",
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
          ? "Websites, web applications, e-commerce, booking systems, web invitations for events, presentation sites, SEO, and digital marketing."
          : "Izrada web sajtova, web aplikacija, web shopova, booking sistema, web pozivnica za veselja, prezentacija, SEO i digitalni marketing.",
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
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service,
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
