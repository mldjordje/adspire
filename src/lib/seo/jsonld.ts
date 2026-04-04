import { ORGANIZATION, getOrgSameAs, getSiteUrl } from "@/lib/seo/site";
import type { ServiceCatalogEntry } from "@/data/serviceCatalog";

const base = () => getSiteUrl();

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${base()}/#organization`,
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    description: ORGANIZATION.description,
    image: `${base()}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.address.streetAddress,
      addressLocality: ORGANIZATION.address.addressLocality,
      addressRegion: ORGANIZATION.address.addressRegion,
      postalCode: ORGANIZATION.address.postalCode,
      addressCountry: ORGANIZATION.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ORGANIZATION.geo.latitude,
      longitude: ORGANIZATION.geo.longitude,
    },
    areaServed: [
      { "@type": "Country", name: "Serbia" },
      { "@type": "AdministrativeArea", name: "Niš" },
    ],
    priceRange: "$$",
    ...(getOrgSameAs().length > 0 ? { sameAs: getOrgSameAs() } : {}),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base()}/#website`,
    name: "Adspire Digital",
    url: base(),
    description: ORGANIZATION.description,
    publisher: { "@id": `${base()}/#organization` },
    inLanguage: "sr-RS",
    potentialAction: {
      "@type": "ContactAction",
      name: "Kontakt — Adspire Digital",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base()}/contact-us`,
      },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base()}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export function faqPageJsonLd(
  qa: { q: string; a: string }[],
  pageUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function serviceJsonLd(entry: ServiceCatalogEntry, title: string) {
  const url = `${base()}/our-services/${entry.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: title,
    description: entry.metaDescriptionSr,
    url,
    provider: { "@id": `${base()}/#organization` },
    areaServed: { "@type": "Country", name: "Serbia" },
    serviceType: entry.keywordSr,
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
    },
  };
}

export function itemListServicesJsonLd(serviceUrls: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${base()}/our-services#itemlist`,
    name: "Usluge Adspire Digital",
    itemListElement: serviceUrls.map((path, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${base()}${path}`,
    })),
  };
}
