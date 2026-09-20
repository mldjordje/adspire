import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { FaqV4 } from "@/components/site/v4/FaqV4";
import { getFaqCopy } from "@/components/site/v4/faqCopy";
import { v4FontClass } from "@/components/site/v4/fonts";
import {
  faqPageJsonLd,
  SCHEMA_LANG,
  translationRefs,
  webPageAboutOrganizationJsonLd,
} from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";

const copy = getFaqCopy(defaultLocale);

export const metadata: Metadata = pageMetadata({
  path: "/faq",
  title: "FAQ",
  description: copy.intro,
  keywords: ["Adspire FAQ", "rokovi izrade sajta", "proces saradnje", "web agencija pitanja"],
});

export default function FaqPage() {
  const faqUrl = absoluteUrl("/faq");
  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          {
            ...webPageAboutOrganizationJsonLd("/faq", "FAQ", copy.intro, {
              inLanguage: SCHEMA_LANG[defaultLocale],
              speakable: ["[data-answer]"],
            }),
            ...translationRefs("/faq", defaultLocale),
          },
          // Same six items the accordion renders. The schema used to read from
          // sr.ts while the page rendered faqData.ts, so a crawler was offered
          // answers no visitor could see.
          faqPageJsonLd([...copy.items], faqUrl),
        ]}
      />
      <FaqV4 />
    </div>
  );
}
