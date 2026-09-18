import { getNichePage, nichePath, type NichePage } from "@/content/site/nichePages";
import { absoluteUrl, pageMetadata } from "./metadata";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "./jsonld";
import { orgRef, productId, serviceId } from "./ids";
import { softwareProductJsonLd } from "./products";

/**
 * Markup for the per-niche solution pages, built the way the hotel page is.
 *
 * The hotel page is the one an answer engine keeps quoting, and the difference
 * is not the copy: it carries a SoftwareApplication with a name and a feature
 * list, a Service with an audience, and an FAQPage — so "who builds X for a
 * Serbian business" resolves to a named thing rather than to prose about an
 * agency. Every niche page gets the same three nodes from one builder.
 */

export function nicheMetadata(page: NichePage) {
  return pageMetadata({
    path: nichePath(page.slug),
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: page.seo.keywords,
  });
}

export function nicheJsonLd(page: NichePage) {
  const path = nichePath(page.slug);
  const url = absoluteUrl(path);

  // What the buyer is paying for, as capabilities. The value section is the
  // part people actually ask about ("what am I paying for"), so it belongs in
  // the feature list next to the features themselves.
  const featureList = [
    ...page.features.map((item) => item.title),
    ...page.value.items.map((item) => item.title),
  ];

  return [
    {
      ...webPageAboutOrganizationJsonLd(path, `${page.seo.title} | Adspire Digital`, page.seo.metaDescription, {
        mainEntity: productId(url),
        speakable: ["[data-answer]"],
      }),
    },
    softwareProductJsonLd({
      path,
      name: page.product.name,
      description: page.summary,
      category: page.product.category,
      featureList,
      audience: page.product.audience,
      serviceSlug: page.inquiryService,
    }),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.seo.title,
      serviceType: page.product.name,
      description: page.summary,
      provider: orgRef(),
      // The page sells one delivery of a catalog service, not a rival to it.
      // Without this an assistant merging the graph sees six Adspire products
      // competing for the same job.
      isRelatedTo: { "@id": serviceId(page.inquiryService) },
      audience: page.audience.map((name) => ({ "@type": "BusinessAudience", audienceType: name })),
      areaServed: [
        { "@type": "Country", name: "Serbia" },
        { "@type": "AdministrativeArea", name: "Niš" },
        { "@type": "AdministrativeArea", name: "Beograd" },
      ],
      url,
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: absoluteUrl(`/upit/brzo?usluga=${page.inquiryService}`),
      },
    },
    breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: page.navLabel, path },
    ]),
    faqPageJsonLd(page.faq, url),
  ];
}

/** Convenience for the route files: one slug in, metadata and markup out. */
export function nichePageBySlug(slug: string) {
  const page = getNichePage(slug);
  if (!page) throw new Error(`Unknown niche page: ${slug}`);
  return page;
}
