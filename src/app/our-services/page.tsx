import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteContent } from "@/content/site";
import { serviceSlugs } from "@/data/serviceCatalog";
import { itemListServicesJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";

const servicesPage = getSiteContent(defaultLocale).servicesPage;

export const metadata: Metadata = pageMetadata({
  path: "/our-services",
  title: "Usluge",
  description: servicesPage.hero.description,
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
    <>
      <JsonLd data={itemListServicesJsonLd(paths)} />
      <AzurioTemplatePage fileName="services.html" />
    </>
  );
}
