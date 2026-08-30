import type { Metadata } from "next";
import type { LocalPage } from "@/content/site/localPages";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { ORGANIZATION, getOrgSameAs, getSiteUrl } from "@/lib/seo/site";

export function localPageMetadata(page: LocalPage): Metadata {
  return pageMetadata({
    path: page.path,
    title: page.title,
    description: page.metaDescription,
    keywords: page.keywords,
  });
}

/**
 * LocalBusiness for a Niš landing page, tied back to the single Organization
 * node by @id. It is a second description of the same business, not a second
 * business — a standalone LocalBusiness per page would read as several
 * companies at one address, which is exactly the pattern local search filters.
 */
function localBusinessJsonLd(page: LocalPage) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/#organization`,
    name: page.businessName,
    url: absoluteUrl(page.path),
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
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
    areaServed: { "@type": "City", name: "Niš" },
    priceRange: "$$",
    currenciesAccepted: "RSD, EUR",
    paymentAccepted: "Bank Transfer, Invoice, Cash",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    ...(getOrgSameAs().length > 0 ? { sameAs: getOrgSameAs() } : {}),
  };
}

export function localPageJsonLd(page: LocalPage) {
  return [
    webPageAboutOrganizationJsonLd(
      page.path,
      `${page.title} | Adspire Digital`,
      page.metaDescription,
    ),
    localBusinessJsonLd(page),
    breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: page.h1, path: page.path },
    ]),
    faqPageJsonLd(
      page.faq.map((item) => ({ q: item.q, a: item.a })),
      absoluteUrl(page.path),
    ),
  ];
}
