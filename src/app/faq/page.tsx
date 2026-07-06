import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { FaqV4 } from "@/components/site/v4/FaqV4";
import { v4FontClass } from "@/components/site/v4/fonts";
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
    <div className={v4FontClass}>
      <JsonLd data={faqPageJsonLd(faqPage.items, faqUrl)} />
      <FaqV4 />
    </div>
  );
}
