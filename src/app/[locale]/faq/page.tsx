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
import { pageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/site";
import { isLocale, localePath, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const copy = getFaqCopy(lc);
  return pageMetadata({
    path: "/faq",
    title: "FAQ",
    description: copy.intro,
    locale: lc,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const copy = getFaqCopy(lc);
  const localizedPath = localePath("/faq", lc);

  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          {
            ...webPageAboutOrganizationJsonLd(localizedPath, "FAQ", copy.intro, {
              inLanguage: SCHEMA_LANG[lc],
              speakable: ["[data-answer]"],
            }),
            ...translationRefs("/faq", lc),
          },
          // The answers a crawler quotes must be in the page's own language.
          faqPageJsonLd([...copy.items], `${getSiteUrl()}${localizedPath}`),
        ]}
      />
      <FaqV4 locale={lc} />
    </div>
  );
}
