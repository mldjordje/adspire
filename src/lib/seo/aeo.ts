import { aeoPage as page, AEO_PATH } from "@/content/site/aeoPage";
import { absoluteUrl, pageMetadata } from "./metadata";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "./jsonld";
import { orgRef, serviceId } from "./ids";

/**
 * Markup for the AEO page.
 *
 * The audience here is not a trade, it is a situation: a business that wants
 * to be the answer to a question. So `audience` carries the trades the page
 * names and the Service description stays the outcome, never the method — the
 * markup is as public as the copy is, and the one thing this page does not
 * publish is how the work is done.
 *
 * The FAQ node matters more here than on any other page: "can you guarantee
 * ChatGPT will recommend me" is the first question every buyer asks, and the
 * honest no is the part we want carried into an answer verbatim.
 */

export function aeoMetadata() {
  return pageMetadata({
    path: AEO_PATH,
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: [...page.seo.keywords],
  });
}

export function aeoJsonLd() {
  const url = absoluteUrl(AEO_PATH);

  return [
    webPageAboutOrganizationJsonLd(AEO_PATH, `${page.seo.title} | Adspire`, page.seo.metaDescription, {
      mainEntity: `${url}#service`,
      speakable: ["[data-answer]"],
    }),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.seo.title,
      serviceType: "AEO — priprema firme za preporuku u AI odgovorima",
      description: page.summary,
      provider: orgRef(),
      // The catalog entry is the entity; this page is one delivery of it.
      isRelatedTo: { "@id": serviceId("ai-preporuka") },
      audience: page.niches.items.map((item) => ({
        "@type": "BusinessAudience",
        audienceType: item.trade,
      })),
      areaServed: [
        { "@type": "Country", name: "Serbia" },
        { "@type": "AdministrativeArea", name: "Niš" },
        { "@type": "AdministrativeArea", name: "Beograd" },
      ],
      availableLanguage: ["sr", "en"],
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: absoluteUrl(page.cta.primary.href),
      },
      url,
    },
    breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: "Da vas AI preporuči", path: AEO_PATH },
    ]),
    faqPageJsonLd([...page.faq], url),
  ];
}
