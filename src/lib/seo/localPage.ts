import type { Metadata } from "next";
import type { LocalPage } from "@/content/site/localPages";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { localBusinessId, orgRef, serviceId } from "@/lib/seo/ids";
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

/** The @id of the Service node a local page publishes, when it is one service. */
export function localServiceId(page: LocalPage): string | null {
  return page.catalogService ? `${absoluteUrl(page.path)}#service` : null;
}

/**
 * The page as an offer, not just as a place.
 *
 * LocalBusiness answers "where are they"; it never answered "what do they sell
 * here", so an assistant reading the organization could not enumerate these
 * pages among its solutions. The Service node points back at the catalog entry
 * it delivers, so this is the Niš delivery of an existing service rather than
 * a second copy of it.
 */
function localServiceJsonLd(page: LocalPage) {
  const id = localServiceId(page);
  if (!id || !page.catalogService) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": id,
    name: page.title,
    serviceType: page.keywords[0],
    description: page.metaDescription,
    provider: orgRef(),
    isRelatedTo: { "@id": serviceId(page.catalogService) },
    areaServed: [
      { "@type": "City", name: "Niš" },
      { "@type": "Country", name: "Serbia" },
    ],
    availableLanguage: ["sr"],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(page.cta.href),
    },
  };
}

export function localPageJsonLd(page: LocalPage) {
  const service = localServiceJsonLd(page);
  return [
    webPageAboutOrganizationJsonLd(
      page.path,
      `${page.title} | Adspire`,
      page.metaDescription,
      {
        mainEntity: localBusinessId(absoluteUrl(page.path)),
        // The lead paragraph is the page's own answer to the query it is for.
        speakable: ["[data-answer]"],
      },
    ),
    localBusinessJsonLd(page),
    ...(service ? [service] : []),
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
