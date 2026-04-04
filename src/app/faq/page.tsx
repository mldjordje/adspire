import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteContent } from "@/content/site";
import { faqPageJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";

const faqPage = getSiteContent(defaultLocale).faqPage;

export const metadata: Metadata = pageMetadata({
  path: "/faq",
  title: "FAQ",
  description: `${faqPage.hero.description} ${faqPage.introBody}`,
  keywords: ["Adspire FAQ", "rokovi izrade sajta", "proces saradnje", "web agencija pitanja"],
});

export default function FaqPage() {
  const faqUrl = absoluteUrl("/faq");
  return (
    <>
      <JsonLd data={faqPageJsonLd(faqPage.items, faqUrl)} />
      <AzurioTemplatePage fileName="faq.html" />
    </>
  );
}
