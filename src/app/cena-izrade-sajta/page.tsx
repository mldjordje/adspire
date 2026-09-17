import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { PricingGuideV4 } from "@/components/site/v4/PricingGuideV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { pricingGuidePage } from "@/content/site/pricingGuidePage";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { priceRangeOffersJsonLd } from "@/lib/seo/offers";

const p = pricingGuidePage;
const pageUrl = absoluteUrl(p.path);

export const metadata: Metadata = pageMetadata({
  path: p.path,
  title: p.title,
  description: p.metaDescription,
  keywords: [
    "cena izrade sajta",
    "koliko košta sajt",
    "cena izrade web shopa",
    "cena web sajta Srbija",
    "koliko košta web aplikacija",
    "cena sistema za zakazivanje",
    "izrada sajta cena 2026",
  ],
});

export default function PricingGuidePage() {
  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          webPageAboutOrganizationJsonLd(p.path, `${p.title} | Adspire Digital`, p.metaDescription, {
            mainEntity: `${pageUrl}#pricing`,
          }),
          // The ranges are already public on this page; as AggregateOffer they
          // become a number an assistant can quote instead of a sentence it has
          // to paraphrase — and paraphrasing a price is how wrong ones spread.
          ...priceRangeOffersJsonLd(p.ranges, pageUrl),
          breadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: "Koliko košta izrada sajta", path: p.path },
          ]),
          // The FAQ answers are the part answer engines quote verbatim, so they
          // ship as FAQPage rather than being locked inside the page body.
          faqPageJsonLd(
            p.faq.map((item) => ({ q: item.q, a: item.a })),
            pageUrl,
          ),
        ]}
      />
      <PricingGuideV4 />
    </div>
  );
}
