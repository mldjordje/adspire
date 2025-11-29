/** @type {import('next-i18next').UserConfig} */
const nextI18NextConfig = {
  i18n: {
    defaultLocale: "sr",
    locales: ["sr", "en"],
    localeDetection: true,
  },
  fallbackLng: "sr",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

module.exports = nextI18NextConfig;
