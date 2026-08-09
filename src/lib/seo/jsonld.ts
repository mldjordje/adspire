import { FOUNDER, ORGANIZATION, getOrgSameAs, getSiteUrl } from "@/lib/seo/site";
import { serviceCatalog, type ServiceCatalogEntry } from "@/data/serviceCatalog";

const base = () => getSiteUrl();

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${base()}/#organization`,
    // Wikidata's "software company" — the entity a search or answer engine
    // resolves "IT firma" to. ProfessionalService alone does not say which trade.
    additionalType: "https://www.wikidata.org/wiki/Q1058914",
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    taxID: ORGANIZATION.taxId,
    foundingDate: ORGANIZATION.foundingDate,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Matični broj",
      value: ORGANIZATION.registrationNumber,
    },
    alternateName: ["Adspire", "Adspire Digital Niš", "Adspire IT firma Niš"],
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
      { "@type": "Country", name: "Bosnia and Herzegovina" },
      { "@type": "Country", name: "Croatia" },
      { "@type": "Country", name: "Slovenia" },
    ],
    priceRange: "$$",
    knowsAbout: serviceCatalog.map((s) => s.keywordSr.split(",")[0].trim()),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usluge Adspire Digital",
      itemListElement: serviceCatalog.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.keywordSr.split(",")[0].trim(),
            description: s.metaDescriptionSr,
            url: `${base()}/our-services/${s.slug}`,
          },
        },
      })),
    },
    founder: {
      "@type": "Person",
      "@id": `${base()}/#founder`,
      name: FOUNDER.name,
      jobTitle: FOUNDER.jobTitle,
      url: `${base()}/about-us`,
      worksFor: { "@id": `${base()}/#organization` },
      sameAs: [...FOUNDER.sameAs],
    },
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

export function webPageAboutOrganizationJsonLd(path: string, title: string, description: string) {
  const url = `${base()}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${base()}/#website` },
    about: { "@id": `${base()}/#organization` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${base()}/images/logo.png` },
    inLanguage: "sr-RS",
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
    name: entry.h1Sr ?? title,
    description: entry.metaDescriptionSr,
    url,
    provider: { "@id": `${base()}/#organization` },
    areaServed: { "@type": "Country", name: "Serbia" },
    serviceType: entry.keywordSr,
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
