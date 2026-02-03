type StructuredDataInput = {
  siteUrl: string;
  canonicalUrl: string;
  locale: string;
};

const toJsonLdList = (input: StructuredDataInput) => {
  const { siteUrl, canonicalUrl, locale } = input;
  const isEnglish = locale === "en";

  const name = "ADSPIRE";
  const description = isEnglish
    ? "Digital agency in Nis, Serbia for websites, web apps, e-commerce, booking systems, and presentation sites."
    : "Digitalna agencija iz Nisa za izradu web sajtova, web aplikacija, web shopova, booking sistema i prezentacija.";

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

  const services = [
    "Web sajtovi",
    "Web aplikacije",
    "Web shopovi",
    "Booking sistemi",
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
          ? "Websites, web applications, e-commerce, booking systems, presentation sites, SEO, and digital marketing."
          : "Izrada web sajtova, web aplikacija, web shopova, booking sistema, prezentacija, SEO i digitalni marketing.",
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
    },
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
      slogan: isEnglish
        ? "Websites and web apps that convert."
        : "Web sajtovi i web aplikacije koje konvertuju.",
      knowsAbout: services,
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq,
    },
  ];
};

export default toJsonLdList;
