const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs";
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: [
    "/api/*",
    "/404",
    "/500",
    "/server-sitemap.xml",
    "/en",
    "/en/*",
    "/web-pozivnice-za-veselja",
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
    return {
      loc: cleanPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
