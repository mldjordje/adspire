export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs").replace(/\/$/, "");
}

/**
 * Profiles that independently confirm the business exists. Without at least one,
 * `sameAs` is omitted from the Organization schema entirely and there is nothing
 * for search or an answer engine to cross-check the entity against — which is why
 * the verified Google Business Profile lives in code rather than waiting on an
 * env var that was never set in production.
 */
const VERIFIED_PROFILES = [
  // Google Knowledge Graph id for the verified Adspire Digital business profile.
  "https://www.google.com/search?kgmid=/g/11x1sn7rg5",
  "https://www.instagram.com/adspire.rs/",
];

/**
 * Đorđe's personal profiles. They belong to the founder Person node, not to the
 * Organization — a personal LinkedIn listed as the company's sameAs is a claim
 * Google cannot verify, while founder → Person → sameAs is one it can.
 */
export const FOUNDER = {
  name: "Đorđe Mladenović",
  jobTitle: "Osnivač i lead developer",
  sameAs: [
    "https://www.linkedin.com/in/djordje-mladenovic-a546562a2/",
    "https://github.com/mldjordje",
  ],
} as const;

/** Extra profiles (LinkedIn, Instagram, …) — env: NEXT_PUBLIC_ORG_SAME_AS="https://...,https://..." */
export function getOrgSameAs(): string[] {
  const extra = (process.env.NEXT_PUBLIC_ORG_SAME_AS ?? "")
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s.startsWith("http"));
  return Array.from(new Set([...VERIFIED_PROFILES, ...extra]));
}

export const ORGANIZATION = {
  name: "Adspire Digital",
  legalName: "Adspire Digital",
  url: getSiteUrl(),
  email: "djordje@adspire.rs",
  telephone: "+381601491491",
  address: {
    streetAddress: "Dimitrija Leka 66",
    addressLocality: "Niš",
    addressRegion: "Centralna Srbija",
    postalCode: "18000",
    addressCountry: "RS",
  },
  geo: {
    latitude: 43.3209,
    longitude: 21.8958,
  },
  description:
    "Adspire Digital iz Niša — razvojni i tehnološki partner za web platforme, mobilne aplikacije (PWA i native), e-commerce, interne poslovne sisteme, AI automatizaciju, SaaS, SEO i hosting.",
} as const;
