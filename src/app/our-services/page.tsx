import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { serviceSlugs } from "@/data/serviceCatalog";
import { itemListServicesJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
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
  const paths = serviceSlugs.map((slug) => `/our-services/${slug}`);
  return (
    <div className={v4FontClass}>
      <JsonLd data={itemListServicesJsonLd(paths)} />
      <ServicesV4 />
    </div>
  );
}
