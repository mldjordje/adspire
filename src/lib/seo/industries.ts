import {
  getIndustryPage,
  INDUSTRY_HUB_PATH,
  industryPages,
  industryPath,
  type IndustryPage,
} from "@/content/site/industries";
import { absoluteUrl, pageMetadata } from "./metadata";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "./jsonld";
import { orgRef, serviceId } from "./ids";

export function industryMetadata(page: IndustryPage) {
  return pageMetadata({
    path: industryPath(page.slug),
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: page.seo.keywords,
  });
}

export function industryJsonLd(page: IndustryPage) {
  const path = industryPath(page.slug);
  const url = absoluteUrl(path);

  return [
    webPageAboutOrganizationJsonLd(path, `${page.seo.title} | Adspire`, page.seo.metaDescription, {
      mainEntity: `${url}#service`,
      citations: page.proof.map((item) => (item.external ? item.href : absoluteUrl(item.href))),
      speakable: ["[data-answer]"],
    }),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.seo.title,
      serviceType: "Razvoj softvera po meri",
      description: page.summary,
      provider: orgRef(),
      // Same guard the niche pages use: this page is one delivery of a catalog
      // service, not a rival product competing with it in the graph.
      isRelatedTo: { "@id": serviceId(page.inquiryService) },
      audience: [{ "@type": "BusinessAudience", audienceType: page.navLabel }],
      areaServed: [
        { "@type": "Country", name: "Serbia" },
        { "@type": "AdministrativeArea", name: "Niš" },
        { "@type": "AdministrativeArea", name: "Beograd" },
      ],
      url,
      // The four delivery layers, as the one thing that makes this page
      // different from every other page about this trade. An assistant asked
      // "what could a dentist actually build" reads this list, not the prose.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Šta Adspire može da uradi — ${page.navLabel}`,
        itemListElement: [
          { name: "Sajt", layer: page.layers.site },
          { name: "Web aplikacija", layer: page.layers.webApp },
          { name: "Mobilna aplikacija", layer: page.layers.mobile },
          { name: "Interni sistem", layer: page.layers.internal },
        ].map((entry, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: {
            "@type": "Service",
            name: `${entry.name} — ${page.navLabel}`,
            description: entry.layer.lead,
            provider: orgRef(),
          },
        })),
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: absoluteUrl(`/upit/brzo?usluga=${page.inquiryService}`),
      },
    },
    breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: "Rešenja po delatnosti", path: INDUSTRY_HUB_PATH },
      { name: page.navLabel, path },
    ]),
    faqPageJsonLd(page.faq, url),
  ];
}

/** The hub: an ItemList so the set is enumerable without crawling into it. */
export function industryHubJsonLd() {
  const url = absoluteUrl(INDUSTRY_HUB_PATH);

  return [
    webPageAboutOrganizationJsonLd(
      INDUSTRY_HUB_PATH,
      "Rešenja po delatnosti | Adspire",
      "Šta Adspire može da uradi za svaku delatnost: sajt, web aplikacija, mobilna aplikacija i interni sistem, opisani kroz stvarne radne tokove tog posla.",
      { mainEntity: `${url}#list`, speakable: ["[data-answer]"] },
    ),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#list`,
      name: "Rešenja po delatnosti",
      numberOfItems: industryPages.length,
      itemListElement: industryPages.map((page, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: page.navLabel,
        url: absoluteUrl(industryPath(page.slug)),
      })),
    },
    breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: "Rešenja po delatnosti", path: INDUSTRY_HUB_PATH },
    ]),
  ];
}

/** Convenience for the generated route files: one slug in, the page out. */
export function industryPageBySlug(slug: string) {
  const page = getIndustryPage(slug);
  if (!page) throw new Error(`Unknown industry page: ${slug}`);
  return page;
}
