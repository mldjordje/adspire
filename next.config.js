/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  async redirects() {
    return [
      // Ensure trailing slash so relative assets resolve from /kopex/
      { source: "/kopex", destination: "/kopex/", permanent: false, locale: false },
      { source: "/:locale/kopex", destination: "/:locale/kopex/", permanent: false, locale: false },
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
