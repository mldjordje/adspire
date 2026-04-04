import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AzurioChrome } from "@/components/site/AzurioChrome";
import {
  buildServiceDetailMainHtml,
  findServiceBySlug,
} from "@/components/site/azurioContentTransform";
import { JsonLd } from "@/components/site/JsonLd";
import { findServiceCatalogEntry, serviceSlugs } from "@/data/serviceCatalog";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findServiceBySlug(slug);
  const catalog = findServiceCatalogEntry(slug);
  const base = getSiteUrl();
  const canonical = `${base}/our-services/${slug}`;

  if (!service || !catalog) {
    return {
      title: "Usluga nije pronađena",
    };
  }

  const title = `${service.title} | Adspire Digital`;
  const description = catalog.metaDescriptionSr;
  const keywords = [
    ...catalog.searchPhrasesSr,
    ...catalog.keywordSr.split(",").map((k) => k.trim()),
  ];

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "sr_RS",
      url: canonical,
      siteName: "Adspire Digital",
      title,
      description,
      images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "Adspire Digital" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/logo.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const html = buildServiceDetailMainHtml(slug);
  const service = findServiceBySlug(slug);
  const catalog = findServiceCatalogEntry(slug);

  if (!html || !service || !catalog) {
    notFound();
  }

  return (
    <AzurioChrome>
      <JsonLd
        data={[
          serviceJsonLd(catalog, service.title),
          breadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: "Usluge", path: "/our-services" },
            { name: service.title, path: `/our-services/${slug}` },
          ]),
        ]}
      />
      <div className="azurio-template-root" dangerouslySetInnerHTML={{ __html: html }} />
    </AzurioChrome>
  );
}
