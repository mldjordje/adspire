import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findServiceBySlug } from "@/components/site/azurioContentTransform";
import { JsonLd } from "@/components/site/JsonLd";
import { v4FontClass } from "@/components/site/v4/fonts";
import { ServiceDetailV4 } from "@/components/site/v4/ServiceDetailV4";
import { findServiceCatalogEntry, serviceSlugs } from "@/data/serviceCatalog";
import { serviceJsonLd, faqPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/site";
import { isLocale, localePath, prefixedLocales, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return prefixedLocales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const service = findServiceBySlug(slug, lc);
  if (!service) return { title: "404" };
  return pageMetadata({
    path: `/our-services/${slug}`,
    title: service.title,
    description: service.summary,
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

  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          serviceJsonLd(catalog, service.title),
          faqPageJsonLd(
            catalog.faqItems,
            `${getSiteUrl()}${localePath(`/our-services/${slug}`, lc)}`,
          ),
        ]}
      />
      <ServiceDetailV4 service={service} catalog={catalog} />
    </div>
  );
}
