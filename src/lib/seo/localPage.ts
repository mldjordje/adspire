import type { Metadata } from "next";
import type { LocalPage } from "@/content/site/localPages";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { localBusinessId, orgRef } from "@/lib/seo/ids";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { ORGANIZATION, getOrgSameAs } from "@/lib/seo/site";

export function localPageMetadata(page: LocalPage): Metadata {
  return pageMetadata({
    path: page.path,
    title: page.title,
    description: page.metaDescription,
    keywords: page.keywords,
  });
}

/**
 * The Niš storefront of the business, as that landing page presents it.
 *
 * It used to carry the Organization's own @id, which meant three pages each
 * asserted a different `name` for the same node — a crawler merging by @id saw
 * one company with four names and could trust none of them. It now has its own
 * id and points at the Organization as its branch parent: one company, one
 * local presence described per query intent.
 */
function localBusinessJsonLd(page: LocalPage) {
  const url = absoluteUrl(page.path);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": localBusinessId(url),
    parentOrganization: orgRef(),
    name: page.businessName,
    legalName: ORGANIZATION.legalName,
    url,
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
      { mainEntity: localBusinessId(absoluteUrl(page.path)) },
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
