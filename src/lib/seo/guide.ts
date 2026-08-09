import type { Metadata } from "next";
import type { Guide } from "@/content/site/guides";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

/** Metadata for a guide route — keeps every guide page's SEO block identical. */
export function guideMetadata(guide: Guide): Metadata {
  return pageMetadata({
    path: guide.path,
    title: guide.title,
    description: guide.metaDescription,
    keywords: guide.keywords,
  });
}

/**
 * JSON-LD for a guide route. The FAQ ships as FAQPage because those answers are
 * what answer engines quote; leaving them only in the body makes them invisible
 * to anything that does not render the page.
 */
export function guideJsonLd(guide: Guide) {
  const pageUrl = absoluteUrl(guide.path);
  return [
    webPageAboutOrganizationJsonLd(
      guide.path,
      `${guide.title} | Adspire Digital`,
      guide.metaDescription,
    ),
    breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: guide.h1, path: guide.path },
    ]),
    faqPageJsonLd(
      guide.faq.map((item) => ({ q: item.q, a: item.a })),
      pageUrl,
    ),
  ];
}
