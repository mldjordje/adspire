/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  async rewrites() {
    return [
      {
        source: "/kopex",
        destination: "/kopex/index.html",
      },
      {
        source: "/kopex/",
        destination: "/kopex/index.html",
      },
    ];
  },
};

module.exports = nextConfig;
