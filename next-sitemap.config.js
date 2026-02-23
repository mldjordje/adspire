const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs";
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  autoLastmod: false,
  exclude: [
    "/api/*",
    "/404",
    "/500",
    "/server-sitemap.xml",
    "/en",
    "/en/*",
    "/web-pozivnice-za-veselja",
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
  ],
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  transform: async (config, path) => {
    const cleanPath = path.split("?")[0].split("#")[0];
    const isHome = cleanPath === "/";
    const isServicePage = cleanPath.startsWith("/usluge/");

    return {
      loc: cleanPath,
      changefreq: config.changefreq,
      priority: isHome ? 1.0 : isServicePage ? 0.9 : config.priority,
    };
  },
};
