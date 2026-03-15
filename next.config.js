const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      public: path.join(__dirname, "public"),
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias.public = path.join(__dirname, "public");
    return config;
  },
  async redirects() {
    const localeRedirects = (source, destination) => [
      {
        source,
        destination,
        permanent: true,
      },
      {
        source: `/:locale${source}`,
        destination: `/:locale${destination}`,
        permanent: true,
      },
    ];

    return [
      ...localeRedirects("/web-pozivnice-za-veselja", "/usluge/web-pozivnice-za-veselja"),
      ...localeRedirects("/our-story", "/about-us"),
      ...localeRedirects("/our-teams", "/team-single"),
      ...localeRedirects("/client-feedback", "/about-us"),
      ...localeRedirects("/service-single", "/our-services"),
      ...localeRedirects("/index-light", "/"),
      ...localeRedirects("/index-two", "/"),
      ...localeRedirects("/index-two-light", "/"),
      ...localeRedirects("/index-three", "/"),
      ...localeRedirects("/index-three-light", "/"),
      ...localeRedirects("/index-four", "/"),
      ...localeRedirects("/index-four-light", "/"),
      ...localeRedirects("/index-five", "/"),
      ...localeRedirects("/index-five-light", "/"),
    ];
  },
  async rewrites() {
    return [
      // Serve Kopex static site without locale prefix
      { source: "/kopex", destination: "/kopex/index.html", locale: false },
      { source: "/kopex/", destination: "/kopex/index.html", locale: false },
      { source: "/kopex/:path*", destination: "/kopex/:path*", locale: false },

      // Support locale-prefixed URLs (e.g. /en/kopex) by stripping locale
      { source: "/:locale/kopex", destination: "/kopex/index.html", locale: false },
      { source: "/:locale/kopex/", destination: "/kopex/index.html", locale: false },
      { source: "/:locale/kopex/:path*", destination: "/kopex/:path*", locale: false },
    ];
  },
};

module.exports = nextConfig;
