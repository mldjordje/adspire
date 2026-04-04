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
    slug: "web-prezentacije",
    keywordSr: "izrada sajta Niš, web prezentacija, Next.js sajt, SEO sajt",
    keywordEn: "corporate website, Next.js development, SEO website Niš",
    aiSummarySr:
      "Moderne web prezentacije: korporativni sajtovi, landing stranice, blog, CMS, PWA i Core Web Vitals optimizacija.",
    aiSummaryEn:
      "Modern marketing websites: corporate sites, landing pages, CMS, PWA, and Core Web Vitals optimization.",
    searchPhrasesSr: ["izrada web sajta niš", "next.js agencija", "seo optimizacija sajta"],
    searchPhrasesEn: ["web agency serbia", "next.js website", "technical seo"],
  },
  {
    slug: "e-commerce-web-shop",
    keywordSr: "web shop, e-commerce razvoj, headless shop, online prodavnica",
    keywordEn: "e-commerce development, headless commerce, online store",
    aiSummarySr:
      "Custom i headless e-commerce: plaćanja, lagerm, subscription, loyalty, CRM i AI preporuke proizvoda.",
    aiSummaryEn:
      "Custom and headless e-commerce with payments, inventory, subscriptions, loyalty, and CRM integrations.",
    searchPhrasesSr: ["izrada internet prodavnice", "web shop srbija", "headless ecommerce"],
    searchPhrasesEn: ["ecommerce development", "shopify headless", "checkout optimization"],
  },
  {
    slug: "mobilne-aplikacije",
    keywordSr: "PWA aplikacija, Flutter aplikacija, React Native, mobilni razvoj",
    keywordEn: "PWA development, Flutter app, React Native mobile app",
    aiSummarySr:
      "PWA za brzo lansiranje i native aplikacije (Flutter/React Native) za App Store i Google Play.",
    aiSummaryEn:
      "Progressive web apps and native mobile apps with payments, push, GPS, and store deployment.",
    searchPhrasesSr: ["pwa razvoj", "flutter niš", "mobilna aplikacija android ios"],
    searchPhrasesEn: ["pwa development", "flutter agency", "react native app"],
  },
  {
    slug: "cms-sistemi",
    keywordSr: "custom CMS, admin panel, upravljanje sadržajem",
    keywordEn: "custom CMS, admin panel, content management",
    aiSummarySr: "Custom CMS sa ulogama, blogom, galerijom i dashboardima za klijente bez tehničkog znanja.",
    aiSummaryEn: "Custom CMS with roles, blog, gallery, and client-friendly dashboards.",
    searchPhrasesSr: ["custom cms sistem", "admin panel razvoj", "upravljanje blogom"],
    searchPhrasesEn: ["headless cms", "custom admin panel", "content management system"],
  },
  {
    slug: "interne-poslovne-aplikacije",
    keywordSr: "CRM sistem, interna aplikacija, ERP mini, poslovni softver",
    keywordEn: "CRM system, internal business app, lightweight ERP",
    aiSummarySr:
      "Interni CRM, termini, task manager, evidencija, fakturisanje i integracije sa postojećim API-jima.",
    aiSummaryEn:
      "Internal CRM, scheduling, task management, invoicing, and API integrations for operations.",
    searchPhrasesSr: ["crm razvoj", "interni softver firme", "digitalizacija poslovanja"],
    searchPhrasesEn: ["custom crm development", "internal tools", "business automation"],
  },
  {
    slug: "ai-integracije-automatizacija",
    keywordSr: "AI chatbot, AI automatizacija, n8n, veštačka inteligencija biznis",
    keywordEn: "AI chatbot, workflow automation, n8n, AI integration",
    aiSummarySr:
      "AI u prodaji, podršci, sadržaju i SEO-u; lead scoring, voice agenti i n8n workflow automatizacija.",
    aiSummaryEn:
      "AI for sales, support, content, and SEO plus lead scoring, voice agents, and n8n workflows.",
    searchPhrasesSr: ["ai chatbot za sajt", "n8n automatizacija", "ai integracija"],
    searchPhrasesEn: ["ai customer support", "n8n workflows", "llm integration business"],
  },
  {
    slug: "business-intelligence-analitika",
    keywordSr: "poslovna analitika, BI dashboard, KPI praćenje",
    keywordEn: "business intelligence, KPI dashboard, analytics",
    aiSummarySr: "Dashboardi za vlasnike, KPI, prodaja, CRM analitika i automatizovani izveštaji.",
    aiSummaryEn: "Owner dashboards, KPI tracking, sales analytics, and automated reporting.",
    searchPhrasesSr: ["bi dashboard", "analitika prodaje", "kpi izveštaji"],
    searchPhrasesEn: ["business intelligence dashboard", "sales analytics", "kpi reporting"],
  },
  {
    slug: "seo-digitalni-marketing",
    keywordSr: "SEO optimizacija, Google Ads, Meta Ads, digitalni marketing Niš",
    keywordEn: "technical SEO, Google Ads, Meta Ads, performance marketing",
    aiSummarySr:
      "Tehnički i on-page SEO, AI sadržaj, Google/Meta kampanje, CRO i A/B testiranje.",
    aiSummaryEn:
      "Technical and on-page SEO, paid search and social, CRO, and structured experimentation.",
    searchPhrasesSr: ["seo agencija niš", "google ads setup", "meta ads srbija"],
    searchPhrasesEn: ["seo agency", "ppc management", "cro optimization"],
  },
  {
    slug: "cyber-security-gdpr",
    keywordSr: "security audit, GDPR, zaštita podataka, backup sajt",
    keywordEn: "security audit, GDPR compliance, data protection",
    aiSummarySr: "Security audit, GDPR i cookie consent, backup, monitoring i enkripcija podataka.",
    aiSummaryEn: "Security audits, GDPR readiness, backups, monitoring, and encryption.",
    searchPhrasesSr: ["gdpr sajt", "security audit", "backup infrastruktura"],
    searchPhrasesEn: ["gdpr compliance website", "security audit web", "disaster recovery"],
  },
  {
    slug: "hosting-infrastruktura",
    keywordSr: "cloud hosting, Vercel deploy, SSL, domen email server",
    keywordEn: "cloud hosting, deployment, SSL, domain setup",
    aiSummarySr: "Cloud i custom server deployment, email server, SSL, backup i cloud storage.",
    aiSummaryEn: "Cloud and custom server deployment, mail, SSL, backups, and object storage.",
    searchPhrasesSr: ["hosting sajt", "cloud deployment", "ssl instalacija"],
    searchPhrasesEn: ["vercel deployment", "managed hosting", "email server setup"],
  },
  {
    slug: "saas-razvoj",
    keywordSr: "SaaS razvoj, subscription softver, white label SaaS",
    keywordEn: "SaaS development, subscription product, white-label SaaS",
    aiSummarySr: "Booking, CRM i subscription SaaS, white-label i industrijski SaaS proizvodi.",
    aiSummaryEn: "Booking, CRM, and subscription SaaS products including white-label models.",
    searchPhrasesSr: ["saas produkt razvoj", "subscription platforma", "mvp saas"],
    searchPhrasesEn: ["saas mvp development", "b2b saas", "multi-tenant app"],
  },
  {
    slug: "industrijska-resenja",
    keywordSr: "softver za kliniku, teretanu, restoran, građevinu, advokata",
    keywordEn: "vertical software, clinic gym restaurant industry solutions",
    aiSummarySr:
      "Specijalizovana rešenja za klinike, teretane, restorane, građevinu, fabrike, advokate i nekretnine.",
    aiSummaryEn:
      "Vertical solutions for clinics, gyms, restaurants, construction, factories, legal, and real estate.",
    searchPhrasesSr: ["booking klinika", "softver za restoran", "digitalna evidencija firma"],
    searchPhrasesEn: ["industry specific software", "vertical saas", "booking platform"],
  },
  {
    slug: "interaktivne-web-tehnologije",
    keywordSr: "3D web prezentacija, virtual showroom, 360 proizvod",
    keywordEn: "3D web, virtual showroom, 360 product view",
    aiSummarySr: "3D web prezentacije, virtual showroom, 360° prikaz i napredne animacije.",
    aiSummaryEn: "3D web experiences, virtual showrooms, 360 product views, and advanced motion.",
    searchPhrasesSr: ["3d prezentacija proizvoda", "interaktivni sajt", "360 prikaz"],
    searchPhrasesEn: ["3d product configurator", "virtual showroom web", "interactive webgl"],
  },
];

export const serviceSlugs = serviceCatalog.map((service) => service.slug);

export const findServiceCatalogEntry = (slug: string) =>
  serviceCatalog.find((service) => service.slug === slug) ?? null;
