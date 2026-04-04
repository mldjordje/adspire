export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs").replace(/\/$/, "");
}

/** LinkedIn, Instagram, itd. — env: NEXT_PUBLIC_ORG_SAME_AS="https://...,https://..." */
export function getOrgSameAs(): string[] {
  const raw = process.env.NEXT_PUBLIC_ORG_SAME_AS;
  if (!raw?.trim()) {
    return [];
  }
  return raw
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s.startsWith("http"));
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
