import type { Metadata } from "next";
import type { PartnerPage } from "@/content/site/partnerPage";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

/**
 * English content at an unprefixed path. Locale stays default (sr) here —
 * pageMetadata's `locale` param drives canonical prefixing and noindex for
 * the sr/en/de site variants, not the page's actual language, and this page
 * doesn't belong to that system at all.
 */
export function partnerPageMetadata(page: PartnerPage): Metadata {
  return pageMetadata({
    path: page.path,
    title: page.title,
    description: page.metaDescription,
    keywords: page.keywords,
  });
}

export function partnerPageJsonLd(page: PartnerPage) {
  const pageUrl = absoluteUrl(page.path);
  return [
    webPageAboutOrganizationJsonLd(
      page.path,
      `${page.title} | Adspire Digital`,
      page.metaDescription,
    ),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: page.h1, path: page.path },
    ]),
    faqPageJsonLd(
      page.faq.map((item) => ({ q: item.q, a: item.a })),
      pageUrl,
    ),
  ];
}
