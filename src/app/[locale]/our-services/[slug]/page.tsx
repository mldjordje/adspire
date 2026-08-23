import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findServiceBySlug } from "@/lib/services";
import { JsonLd } from "@/components/site/JsonLd";
import { v4FontClass } from "@/components/site/v4/fonts";
import { ServiceDetailV4 } from "@/components/site/v4/ServiceDetailV4";
import { findServiceCatalogEntry, serviceSlugs } from "@/data/serviceCatalog";
import { serviceJsonLd, faqPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/site";
import { isLocale, localePath, prefixedLocales, type LocaleCode } from "@/lib/site-config";
import { getServiceDetailTranslation } from "@/content/site/serviceDetail.i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return prefixedLocales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const service = findServiceBySlug(slug, lc);
  if (!service) return { title: "404" };
  // Same source as the body, so a translated page never carries a Serbian SERP entry.
  const t = getServiceDetailTranslation(slug, lc);
  return pageMetadata({
    path: `/our-services/${slug}`,
    title: t?.h1 ?? service.title,
    description: t?.intro ?? service.summary,
    locale: lc,
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const service = findServiceBySlug(slug, lc);
  const catalog = findServiceCatalogEntry(slug);

  if (!service || !catalog) {
    notFound();
  }

  const t = getServiceDetailTranslation(slug, lc);
  const localizedPath = localePath(`/our-services/${slug}`, lc);

  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          serviceJsonLd(
            catalog,
            service.title,
            t
              ? {
                  path: localizedPath,
                  name: t.h1,
                  description: t.intro,
                  serviceType: t.tags.join(", "),
                }
              : undefined,
          ),
          // The answers a crawler quotes must be in the page's own language.
          faqPageJsonLd(t?.faq ?? catalog.faqItems, `${getSiteUrl()}${localizedPath}`),
        ]}
      />
      <ServiceDetailV4 service={service} catalog={catalog} locale={lc} />
    </div>
  );
}
