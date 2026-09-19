import { orgRef } from "@/lib/seo/ids";
import { absoluteUrl } from "@/lib/seo/metadata";

/**
 * Prices as structured data, for the two places the site publishes a number.
 *
 * The no-public-pricelist rule still holds: everything here already appears as
 * text on its own page (the /cena-izrade-sajta ranges approved 2026-08-09, the
 * edukacija packages approved 2026-09-14). Markup that repeats a visible price
 * is what an assistant quotes; a price that exists only in prose is one it
 * either omits or guesses at, and a guess is worse for us than silence.
 */

/** `"850 – 2.100 €"` and `"55 – 210 € / mesec"` as authored on the page. */
export function parsePriceRange(input: string):
  | { low: number; high: number; currency: "EUR"; perMonth: boolean }
  | undefined {
  const perMonth = /mesec/i.test(input);
  // Serbian thousands separator is a dot, and there is no decimal part here.
  const numbers = input.match(/\d[\d.]*/g)?.map((n) => Number(n.replace(/\./g, "")));
  if (!numbers || numbers.length < 2) return undefined;
  const [low, high] = numbers;
  if (!Number.isFinite(low) || !Number.isFinite(high) || low <= 0 || high < low) return undefined;
  return { low, high, currency: "EUR", perMonth };
}

export type PriceRangeInput = {
  label: string;
  price: string;
  note: string;
  /** Service page the range belongs to — gives the offer something to be an offer *of*. */
  href: string;
};

/**
 * One AggregateOffer per project type. `priceCurrency` + low/high is the shape
 * an answer engine can compare; a "850 – 2.100 €" string is not.
 */
export function priceRangeOffersJsonLd(ranges: readonly PriceRangeInput[], pageUrl: string) {
  const offers = ranges.flatMap((range, index) => {
    const parsed = parsePriceRange(range.price);
    if (!parsed) return [];
    return [
      {
        "@type": "AggregateOffer",
        "@id": `${pageUrl}#offer-${index + 1}`,
        name: range.label,
        description: range.note,
        lowPrice: parsed.low,
        highPrice: parsed.high,
        priceCurrency: parsed.currency,
        offerCount: 1,
        availability: "https://schema.org/InStock",
        seller: orgRef(),
        url: absoluteUrl(range.href),
        itemOffered: {
          "@type": "Service",
          "@id": `${absoluteUrl(range.href)}#service`,
          name: range.label,
          url: absoluteUrl(range.href),
        },
        ...(parsed.perMonth
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                priceCurrency: parsed.currency,
                minPrice: parsed.low,
                maxPrice: parsed.high,
                unitCode: "MON",
                billingIncrement: 1,
                referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
              },
            }
          : {}),
      },
    ];
  });

  if (offers.length === 0) return [];

  return [
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "@id": `${pageUrl}#pricing`,
      name: "Rasponi cena — Adspire",
      url: pageUrl,
      provider: orgRef(),
      itemListElement: offers.map((offer, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: offer,
      })),
    },
  ];
}

export type CoursePackage = {
  id: string;
  hours: number;
  priceEur: number;
  label: string;
  note: string;
};

/** Course offers for the edukacija packages — the only fixed prices on the site. */
export function coursePackageOffers(packages: readonly CoursePackage[], pageUrl: string) {
  return packages.map((pkg) => ({
    "@type": "Offer",
    "@id": `${pageUrl}#offer-${pkg.id}`,
    name: `${pkg.label} — ${pkg.hours} sati`,
    description: pkg.note,
    price: pkg.priceEur,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    seller: orgRef(),
    // The page an assistant should hand over: the order step for that exact
    // package. `#paketi` pointed at a section id that does not exist.
    url: absoluteUrl(`/edukacija/porudzbina?paket=${pkg.id}`),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: pkg.priceEur,
      priceCurrency: "EUR",
      referenceQuantity: {
        "@type": "QuantitativeValue",
        value: pkg.hours,
        unitCode: "HUR",
      },
    },
  }));
}
