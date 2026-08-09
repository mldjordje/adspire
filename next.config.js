const fs = require("fs");
const path = require("path");

function resolveExistingPath(...segmentsOptions) {
  for (const segments of segmentsOptions) {
    const candidate = path.join(__dirname, ...segments);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return path.join(__dirname, ...segmentsOptions[0]);
}

const TEMPLATE_LIGHT_ROOT = resolveExistingPath(
  ["new template", "HTML"],
  ["NEW TEMPLATE", "HTML"]
);
const TEMPLATE_EXCLUDED_PREFIXES = [
  "wp-content",
  "wp-includes",
  "wp-json",
];
const MIGRATED_SITE_PATHS = new Set([
  "/",
  "/about-us",
  "/blog",
  "/blog-single",
  "/contact-us",
  "/faq",
  "/our-projects",
  "/our-services",
  "/portfolio",
  "/project-single",
  "/team-single",
  "/usluge",
]);

function isMigratedSitePath(routePath) {
  return MIGRATED_SITE_PATHS.has(routePath) || routePath.startsWith("/usluge/");
}

function normalizeTemplateRouteFromRelativePath(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");

  if (normalized === "index.html") {
    return "/";
  }

  if (normalized === "404-error.html") {
    return "/404-error";
  }

  if (normalized.endsWith("/index.html")) {
    return `/${normalized.slice(0, -"/index.html".length)}`;
  }

  return null;
}

function collectTemplatePublicRoutes(rootDir, currentDir = rootDir, routes = new Set()) {
  if (!fs.existsSync(rootDir)) {
    return [];
  }

  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const absolutePath = path.join(currentDir, entry.name);
    const relativePath = path.relative(rootDir, absolutePath).replace(/\\/g, "/");

    if (
      TEMPLATE_EXCLUDED_PREFIXES.some(
        (prefix) => relativePath === prefix || relativePath.startsWith(`${prefix}/`)
      )
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      collectTemplatePublicRoutes(rootDir, absolutePath, routes);
      continue;
    }

    const routePath = normalizeTemplateRouteFromRelativePath(relativePath);
    if (routePath) {
      routes.add(routePath);
    }
  }

  return Array.from(routes).sort((left, right) => left.localeCompare(right));
}

function buildTemplateRewrites() {
  const publicRoutes = collectTemplatePublicRoutes(TEMPLATE_LIGHT_ROOT);
  const exact = publicRoutes
    .filter((routePath) => routePath !== "/" && !isMigratedSitePath(routePath))
    .map((routePath) => ({
      source: routePath,
      destination: `/rayo/light${routePath}`,
      locale: false,
    }));

  return [
    { source: "/light", destination: "/rayo/light", locale: false },
    { source: "/light/:path*", destination: "/rayo/light/:path*", locale: false },
    { source: "/rayo-light", destination: "/rayo/light", locale: false },
    { source: "/rayo-light/:path*", destination: "/rayo/light/:path*", locale: false },
    { source: "/dark", destination: "/rayo/dark", locale: false },
    { source: "/dark/:path*", destination: "/rayo/dark/:path*", locale: false },
    { source: "/rayo-dark", destination: "/rayo/dark", locale: false },
    { source: "/rayo-dark/:path*", destination: "/rayo/dark/:path*", locale: false },
    ...exact,
  ];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
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
    // The locale segment must be an actual locale. Unconstrained ":locale"
    // matched any first segment, so /usluge/web-pozivnice-za-veselja was read
    // as locale="usluge" and bounced to /usluge/usluge/... — a 404 where a
    // two-year-old indexed URL used to be.
    const localeRedirects = (source, destination) => [
      {
        source,
        destination,
        permanent: true,
      },
      {
        source: `/:locale(en|de)${source}`,
        destination: destination === "/" ? "/:locale" : `/:locale${destination}`,
        permanent: true,
      },
    ];

    // Pre-redesign Serbian URLs. They are still in Google's index and still
    // hold whatever link equity the site earned; without these they answer 404
    // and that equity is discarded instead of passed to the current route.
    const LEGACY_SERVICE_SLUGS = {
      "performance-marketing": "seo-digitalni-marketing",
      "digitalni-marketing": "seo-digitalni-marketing",
      "seo-optimizacija": "seo-digitalni-marketing",
      "izrada-sajtova": "web-prezentacije",
      "izrada-web-sajtova": "web-prezentacije",
      "web-dizajn": "web-prezentacije",
      "web-pozivnice-za-veselja": "web-prezentacije",
      "web-shop": "e-commerce-web-shop",
      "online-prodavnica": "e-commerce-web-shop",
      "mobilne-aplikacije": "mobilne-aplikacije",
      "veb-aplikacije": "interne-poslovne-aplikacije",
      "ai-automatizacija": "ai-integracije-automatizacija",
      "hosting": "hosting-infrastruktura",
      "zakazivanje": "sistemi-za-zakazivanje",
    };

    const legacyServiceRedirects = Object.entries(LEGACY_SERVICE_SLUGS).flatMap(
      ([from, to]) => localeRedirects(`/usluge/${from}`, `/our-services/${to}`)
    );

    return [
      // Legacy Serbian route scheme → current English scheme.
      ...legacyServiceRedirects,
      ...localeRedirects("/usluge/:slug*", "/our-services"),
      ...localeRedirects("/usluge", "/our-services"),
      ...localeRedirects("/kontakt", "/contact-us"),
      ...localeRedirects("/o-nama", "/about-us"),
      ...localeRedirects("/reference", "/our-projects"),
      ...localeRedirects("/radovi", "/our-projects"),
      ...localeRedirects("/cenovnik", "/our-services"),
      ...localeRedirects("/web-pozivnice-za-veselja", "/our-services/web-prezentacije"),

      // Leftover theme-template routes that never became real pages.
      ...localeRedirects("/our-story", "/about-us"),
      ...localeRedirects("/our-teams", "/about-us"),
      ...localeRedirects("/team-single", "/about-us"),
      ...localeRedirects("/client-feedback", "/about-us"),
      ...localeRedirects("/service-single", "/our-services"),
      ...localeRedirects("/portfolio", "/our-projects"),
      ...localeRedirects("/project-single", "/our-projects"),
      ...localeRedirects("/blog-single", "/blog"),
      ...localeRedirects("/404-error", "/"),
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
    return {
      beforeFiles: [
        ...buildTemplateRewrites(),
      ],
      afterFiles: [
        // Serve Kopex static site without locale prefix
        { source: "/kopex", destination: "/kopex/index.html", locale: false },
        { source: "/kopex/", destination: "/kopex/index.html", locale: false },
        { source: "/kopex/:path*", destination: "/kopex/:path*", locale: false },

        // Support locale-prefixed URLs (e.g. /en/kopex) by stripping locale
        { source: "/:locale/kopex", destination: "/kopex/index.html", locale: false },
        { source: "/:locale/kopex/", destination: "/kopex/index.html", locale: false },
        { source: "/:locale/kopex/:path*", destination: "/kopex/:path*", locale: false },
      ],
    };
  },
};

module.exports = nextConfig;
