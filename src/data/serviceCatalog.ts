export type ServiceCatalogEntry = {
  slug: string;
  keywordSr: string;
  keywordEn: string;
  aiSummarySr: string;
  aiSummaryEn: string;
  searchPhrasesSr: string[];
  searchPhrasesEn: string[];
  secondaryHref?: string;
};

export const serviceCatalog: ServiceCatalogEntry[] = [
  {
    slug: "web-dizajn-i-razvoj",
    keywordSr: "izrada sajtova Nis, web dizajn, next js razvoj",
    keywordEn: "web design nis, next js development, conversion website",
    aiSummarySr:
      "Izrada brzih web sajtova i aplikacija sa fokusom na konverzije, SEO i rast biznisa.",
    aiSummaryEn:
      "Fast website and web app delivery focused on conversion, SEO, and business growth.",
    searchPhrasesSr: ["izrada sajtova nis", "next js razvoj", "seo sajt"],
    searchPhrasesEn: ["web design nis", "next js agency", "seo website"],
  },
  {
    slug: "e-commerce",
    keywordSr: "izrada web shopa, e-commerce razvoj, optimizacija checkout-a",
    keywordEn: "e-commerce development, shopify support, checkout optimization",
    aiSummarySr:
      "E-commerce resenja sa brzim checkout tokom, boljim UX-om i jasnim merenjem prodaje.",
    aiSummaryEn:
      "E-commerce solutions with smoother checkout, better UX, and measurable sales performance.",
    searchPhrasesSr: ["izrada web shopa", "ecommerce nis", "shopify srbija"],
    searchPhrasesEn: ["ecommerce agency", "shopify development", "checkout optimization"],
  },
  {
    slug: "booking-sistemi",
    keywordSr: "booking sistemi, online zakazivanje, rezervacije termina",
    keywordEn: "booking system development, online appointment booking",
    aiSummarySr:
      "Online zakazivanje koje smanjuje no-show i olaksava rad timovima koji rade po terminima.",
    aiSummaryEn:
      "Online booking flows that reduce no-shows and simplify appointment operations.",
    searchPhrasesSr: ["online zakazivanje", "booking sistem", "zakazivanje termina"],
    searchPhrasesEn: ["appointment booking", "reservation system", "booking website"],
  },
  {
    slug: "web-pozivnice-za-veselja",
    keywordSr: "web pozivnice, digitalne pozivnice, RSVP potvrda dolaska",
    keywordEn: "web invitations, digital invitations, RSVP tracking",
    aiSummarySr:
      "Digitalne pozivnice za svadbe i rodjendane sa RSVP pregledom i lakim deljenjem.",
    aiSummaryEn:
      "Digital invitation websites for events with RSVP tracking and instant sharing.",
    searchPhrasesSr: ["web pozivnica za svadbu", "digitalna pozivnica", "pozivnica sa rsvp"],
    searchPhrasesEn: ["web wedding invitation", "digital invitation website", "rsvp invitation"],
    secondaryHref: "https://pozivnica.adspire.rs/",
  },
  {
    slug: "seo-i-sadrzaj",
    keywordSr: "seo optimizacija, tehnicki seo, content plan",
    keywordEn: "seo optimization, technical seo, content strategy",
    aiSummarySr:
      "Tehnicki SEO i content strategija za bolju vidljivost na Google i veci organski saobracaj.",
    aiSummaryEn:
      "Technical SEO and content strategy to improve rankings and organic lead flow.",
    searchPhrasesSr: ["seo optimizacija nis", "tehnicki seo", "seo sadrzaj"],
    searchPhrasesEn: ["seo agency", "technical seo audit", "content strategy seo"],
  },
  {
    slug: "performance-marketing",
    keywordSr: "google ads, meta ads, performance marketing",
    keywordEn: "google ads management, meta ads, performance marketing",
    aiSummarySr:
      "Placene kampanje sa merenjem konverzija i optimizacijom troska po leadu i prodaji.",
    aiSummaryEn:
      "Paid campaigns with conversion tracking and continuous cost-per-result optimization.",
    searchPhrasesSr: ["google ads agencija", "meta ads", "performance marketing"],
    searchPhrasesEn: ["google ads agency", "meta ads management", "performance marketing"],
  },
  {
    slug: "brending-i-identitet",
    keywordSr: "brending, vizuelni identitet, logo i brand poruka",
    keywordEn: "branding, visual identity, brand messaging",
    aiSummarySr:
      "Razvoj brend identiteta i poruke koja povecava prepoznatljivost i poverenje klijenata.",
    aiSummaryEn:
      "Brand identity and messaging work that strengthens recognition and trust.",
    searchPhrasesSr: ["brending agencija", "vizuelni identitet", "logo dizajn"],
    searchPhrasesEn: ["branding agency", "visual identity design", "brand messaging"],
  },
  {
    slug: "drustvene-mreze-i-sadrzaj",
    keywordSr: "vodjenje drustvenih mreza, content produkcija, ugc",
    keywordEn: "social media management, content production, ugc content",
    aiSummarySr:
      "Strategija i produkcija sadrzaja za drustvene mreze sa fokusom na engagement i leadove.",
    aiSummaryEn:
      "Social strategy and content production focused on engagement and qualified leads.",
    searchPhrasesSr: ["vodjenje instagrama", "social media nis", "ugc produkcija"],
    searchPhrasesEn: ["social media agency", "instagram content", "ugc production"],
  },
  {
    slug: "odrzavanje-i-podrska",
    keywordSr: "odrzavanje sajta, tehnicka podrska, sigurnosna azuriranja",
    keywordEn: "website maintenance, technical support, security updates",
    aiSummarySr:
      "Stalna tehnicka podrska i odrzavanje sajta radi stabilnosti, sigurnosti i performansi.",
    aiSummaryEn:
      "Ongoing website maintenance and support for stability, security, and performance.",
    searchPhrasesSr: ["odrzavanje web sajta", "tehnicka podrska sajt", "website maintenance"],
    searchPhrasesEn: ["website maintenance service", "technical support website", "security updates"],
  },
  {
    slug: "analitika-i-cro",
    keywordSr: "ga4, tag manager, cro optimizacija",
    keywordEn: "ga4 setup, tag manager, conversion rate optimization",
    aiSummarySr:
      "Analitika i CRO optimizacija za precizno merenje i povecanje konverzija na sajtu.",
    aiSummaryEn:
      "Analytics and CRO setup that turns traffic data into measurable conversion growth.",
    searchPhrasesSr: ["ga4 postavka", "cro optimizacija", "analitika sajta"],
    searchPhrasesEn: ["ga4 setup", "cro service", "website analytics"],
  },
];

export const serviceSlugs = serviceCatalog.map((service) => service.slug);

export const findServiceCatalogEntry = (slug: string) =>
  serviceCatalog.find((service) => service.slug === slug) ?? null;
