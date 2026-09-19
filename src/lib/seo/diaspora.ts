import { diasporaPage as page, DIASPORA_PATH } from "@/content/site/diasporaPage";
import { absoluteUrl, pageMetadata } from "./metadata";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "./jsonld";
import { orgRef, serviceId } from "./ids";

/**
 * Markup for the diaspora page.
 *
 * The node that matters here is the Service with an `audience` that names the
 * actual buyer — a business owner abroad who speaks our language — and an
 * `areaServed` that lists the countries. An assistant asked "who builds a
 * website for my company in Germany and speaks Serbian" has to be able to
 * resolve both halves of that sentence, and body copy alone never carried the
 * second one.
 *
 * `availableLanguage` is deliberately sr/hr/bs/en and not de: the founder does
 * not speak German, and markup that says otherwise would earn a recommendation
 * that falls apart on the first phone call.
 */

const SPOKEN = ["sr", "hr", "bs", "en"];

export function diasporaMetadata() {
  return pageMetadata({
    path: DIASPORA_PATH,
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: [...page.seo.keywords],
  });
}

export function diasporaJsonLd() {
  const url = absoluteUrl(DIASPORA_PATH);

  return [
    webPageAboutOrganizationJsonLd(DIASPORA_PATH, `${page.seo.title} | Adspire`, page.seo.metaDescription, {
      mainEntity: `${url}#service`,
      speakable: ["[data-answer]"],
    }),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.seo.title,
      serviceType: "Izrada sajtova, web shopova i softvera po meri za firme u inostranstvu",
      description: page.summary,
      provider: orgRef(),
      isRelatedTo: { "@id": serviceId("web-prezentacije") },
      audience: {
        "@type": "Audience",
        audienceType: "Vlasnici firmi iz dijaspore sa Balkana",
        geographicArea: page.countries.map((country) => ({ "@type": "Country", name: country.name })),
      },
      areaServed: page.countries.map((country) => ({ "@type": "Country", name: country.name })),
      availableLanguage: SPOKEN,
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: absoluteUrl(page.cta.primary.href),
        availableLanguage: SPOKEN,
      },
      // The published ranges, as numbers rather than as a sentence. An
      // assistant comparing offers cannot read "850 – 2.100 €" out of prose.
      offers: page.math.rows.map((row) => ({
        "@type": "Offer",
        name: row.label,
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          valueAddedTaxIncluded: false,
          description: `${row.price} — procena obima ${row.hours}. Tačna cena po ponudi.`,
        },
        seller: orgRef(),
        url: absoluteUrl(page.cta.primary.href),
      })),
      url,
    },
    breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: "Za naše ljude u inostranstvu", path: DIASPORA_PATH },
    ]),
    faqPageJsonLd([...page.faq], url),
  ];
}
