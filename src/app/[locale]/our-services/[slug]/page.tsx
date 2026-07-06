import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AzurioChrome } from "@/components/site/AzurioChrome";
import {
  buildServiceDetailMainHtml,
  findServiceBySlug,
} from "@/components/site/azurioContentTransform";
import { JsonLd } from "@/components/site/JsonLd";
import { findServiceCatalogEntry, serviceSlugs } from "@/data/serviceCatalog";
import { serviceJsonLd, faqPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/site";
import { isLocale, localePath, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
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
  const html = buildServiceDetailMainHtml(slug, lc);
  const service = findServiceBySlug(slug, lc);
  const catalog = findServiceCatalogEntry(slug);

  if (!html || !service || !catalog) {
    notFound();
  }

  return (
    <AzurioChrome locale={lc}>
      <JsonLd
        data={[
          serviceJsonLd(catalog, service.title),
          faqPageJsonLd(
            catalog.faqItems,
            `${getSiteUrl()}${localePath(`/our-services/${slug}`, lc)}`,
          ),
        ]}
      />
      <div className="azurio-template-root" dangerouslySetInnerHTML={{ __html: html }} />
    </AzurioChrome>
  );
}
