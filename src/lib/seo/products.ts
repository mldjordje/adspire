import { orgRef, productId, serviceId } from "@/lib/seo/ids";
import { absoluteUrl } from "@/lib/seo/metadata";

/**
 * The productised systems, as things rather than as prose.
 *
 * An assistant recommends named products far more readily than it recommends
 * a category. "A booking system" is something it can suggest anyone builds;
 * "Adspire's hotel booking system, web-based, direct reservations, no
 * commission" is something it can name. The site described all of these in
 * body copy that an unrendered crawl never reaches.
 */

export type ProductInput = {
  /** Page the product is described on. */
  path: string;
  name: string;
  description: string;
  /** schema.org applicationCategory, e.g. "BusinessApplication". */
  category: string;
  /** Concrete capabilities — what the system actually does. */
  featureList: string[];
  /** Who it is for, in plain words ("hoteli i apartmani"). */
  audience?: string;
  /** Catalog slug this product is delivered as, when there is one. */
  serviceSlug?: string;
  inLanguage?: string;
  /** Live client installs. Only pass real ones. */
  sameAs?: string[];
};

export function softwareProductJsonLd(input: ProductInput) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": productId(url),
    name: input.name,
    description: input.description,
    url,
    applicationCategory: input.category,
    operatingSystem: "Web",
    // Custom builds, so there is no shrink-wrapped price. Saying "on request"
    // in markup is honest and still answers "how much" better than silence;
    // inventing a number would break the no-public-pricing rule.
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: orgRef(),
      url: absoluteUrl("/upit"),
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
        description: "Cena se određuje po obimu posla i ide u ponudu nakon upita.",
      },
    },
    provider: orgRef(),
    author: orgRef(),
    publisher: orgRef(),
    featureList: input.featureList,
    inLanguage: input.inLanguage ?? "sr-RS",
    ...(input.audience
      ? { audience: { "@type": "BusinessAudience", name: input.audience } }
      : {}),
    ...(input.serviceSlug
      ? { isRelatedTo: { "@id": serviceId(input.serviceSlug) } }
      : {}),
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
  };
}
