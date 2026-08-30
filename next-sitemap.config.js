const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs";
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: false,
  autoLastmod: false,
  exclude: [
    "/api/*",
    "/os",
    "/os/*",
    // A status link is a credential, and the account is per-buyer. Neither is
    // a page anyone can reach without one.
    "/upit/status/*",
    "/nalog",
    "/nalog/*",
    // Background concept lab: dev-only route, 404s in production anyway.
    "/dev",
    "/dev/*",
    "/404",
    "/500",
    "/robots.txt",
    "/sitemap.xml",
    "/sitemap-*.xml",
    "/llms.txt",
    "/server-sitemap.xml",
    "/sr",
    "/sr/*",
    // Prefixed inner pages are filtered in transform(), not here — a blanket
    // "/en/*" would also drop the localized /ai subtree. See TRANSLATED_PREFIXED.
    // Preview route for the V4 design, now shipped at "/" — pure duplicate.
    "/v4",
    "/web-pozivnice-za-veselja",
    "/our-story",
    "/our-teams",
    "/client-feedback",
    "/index-two",
    "/index-two-light",
    "/index-three",
    "/index-three-light",
    "/index-four",
    "/index-four-light",
    "/index-five",
    "/index-five-light",
    "/index-light",
    "/blog-single",
    "/service-single",
    "/project-single",
    "/team-single",
    "/index-branding-studio",
    "/index-creative-agency",
    "/index-design-studio",
    "/index-digital-agency",
    "/index-digital-designer",
    "/index-freelancer-portfolio",
    "/index-personal-portfolio",
    "/index-software-development-company",
    "/index-web-developer",
    "/index-web-studio",
  ],
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    const cleanPath = path.split("?")[0].split("#")[0];

    // Most prefixed inner routes still render Serbian copy, so pageMetadata marks
    // them noindex; advertising them here would contradict that. Only routes that
    // are localized end to end — body and chrome — may be listed. This list must
    // stay in step with TRANSLATED_PATHS/TRANSLATED_PREFIXES in src/lib/seo/metadata.ts.
    const TRANSLATED_PREFIXED = [
      /^\/(en|de)$/,
      /^\/(en|de)\/ai(\/|$)/,
      /^\/(en|de)\/about-us$/,
      /^\/(en|de)\/our-services(\/|$)/,
    ];
    const isPrefixed = /^\/(en|de)(\/|$)/.test(cleanPath);
    if (isPrefixed && !TRANSLATED_PREFIXED.some((re) => re.test(cleanPath))) {
      return null;
    }

    const isHome = cleanPath === "/";
    const isServicePage =
      cleanPath.startsWith("/usluge/") ||
      cleanPath.startsWith("/en/usluge/") ||
      cleanPath.startsWith("/our-services/");
    const isKeyHub = [
      "/about-us",
      "/contact-us",
      "/faq",
      "/blog",
      "/our-projects",
      "/our-services",
      "/upit",
      "/it-firma-nis",
      "/izrada-sajta-i-aplikacija-nis",
      "/izrada-aplikacija-nis",
      "/rezervacioni-sistemi-nis",
      "/online-zakazivanje-za-salone-i-klinike",
      "/cena-izrade-sajta",
      "/ai-chatbot-za-sajt",
      "/besplatan-pregled-sajta",
    ].includes(cleanPath);

    let priority = config.priority;
    if (isHome) priority = 1.0;
    else if (isServicePage) priority = 0.9;
    else if (isKeyHub) priority = 0.85;

    return {
      loc: cleanPath,
      changefreq: config.changefreq,
      priority,
    };
  },
};
