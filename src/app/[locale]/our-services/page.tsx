import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { itemListServicesJsonLd, SCHEMA_LANG, translationRefs, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { serviceCatalog } from "@/data/serviceCatalog";
import { servicePath } from "@/lib/seo/ids";
import { ServicesV4 } from "@/components/site/v4/ServicesV4";
import { getServicesCopy } from "@/components/site/v4/servicesCopy";
import { v4FontClass } from "@/components/site/v4/fonts";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, localePath, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  // Same source as the page body, so the SERP entry and the page cannot drift.
  const t = getServicesCopy(lc);
  return pageMetadata({
    path: "/our-services",
    title: t.metaTitle,
    description: t.metaDescription,
    locale: lc,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const t = getServicesCopy(lc);
  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          {
            ...webPageAboutOrganizationJsonLd(
              localePath("/our-services", lc),
              t.metaTitle,
              t.metaDescription,
              { inLanguage: SCHEMA_LANG[lc] },
            ),
            ...translationRefs("/our-services", lc),
          },
          itemListServicesJsonLd(serviceCatalog.map((s) => servicePath(s.slug)), lc),
        ]}
      />
      <ServicesV4 locale={lc} />
    </div>
  );
}
