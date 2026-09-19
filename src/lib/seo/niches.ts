import { getNichePage, nichePath, type NichePage } from "@/content/site/nichePages";
import { absoluteUrl, pageMetadata } from "./metadata";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "./jsonld";
import { orgRef, serviceId } from "./ids";

/** Custom development services with the same evidence links shown on the page. */

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

  return [
    {
      ...webPageAboutOrganizationJsonLd(path, `${page.seo.title} | Adspire`, page.seo.metaDescription, {
        mainEntity: `${url}#service`,
        citations: page.proof.map((item) => item.external ? item.href : absoluteUrl(item.href)),
        speakable: ["[data-answer]"],
      }),
    },
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
