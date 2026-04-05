const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs";
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: false,
  autoLastmod: false,
  exclude: [
    "/api/*",
    "/404",
    "/500",
    "/server-sitemap.xml",
    "/sr",
    "/sr/*",
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
      "/izrada-sajta-i-aplikacija-nis",
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
