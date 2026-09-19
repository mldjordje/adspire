import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { serviceSlugs } from "@/data/serviceCatalog";
import { servicePath } from "@/lib/seo/ids";
import {
  itemListServicesJsonLd,
  itemListSolutionsJsonLd,
  translationRefs,
  webPageAboutOrganizationJsonLd,
} from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";
import { ServicesV4 } from "@/components/site/v4/ServicesV4";
import { getServicesCopy } from "@/components/site/v4/servicesCopy";
import { v4FontClass } from "@/components/site/v4/fonts";

// Same source as the page body, so the SERP entry and the page cannot drift.
const t = getServicesCopy(defaultLocale);

export const metadata: Metadata = pageMetadata({
  path: "/our-services",
  title: t.metaTitle,
  description: t.metaDescription,
  keywords: [
    "usluge web razvoj",
    "Adspire usluge",
    "izrada sajta Niš",
    "e-commerce Srbija",
    "PWA razvoj",
    "AI automatizacija",
  ],
});

export default function ServicesPage() {
  // servicePath, not a template: the hotel system is catalogued like every
  // other service but lives on its own landing page, so the naive template
  // pointed the list at a URL that is not where the service is described.
  const paths = serviceSlugs.map(servicePath);
  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          {
            ...webPageAboutOrganizationJsonLd("/our-services", t.metaTitle, t.metaDescription, {
              mainEntity: `${absoluteUrl("/our-services")}#itemlist`,
            }),
            ...translationRefs("/our-services", defaultLocale),
          },
          itemListServicesJsonLd(paths),
          // The catalog answers "what does this company do". This answers
          // "which pages deliver it to my trade or to someone like me" — the
          // set an assistant needs before it can name one of them.
          itemListSolutionsJsonLd(),
        ]}
      />
      <ServicesV4 />
    </div>
  );
}
