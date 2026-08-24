import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findServiceBySlug } from "@/lib/services";
import { JsonLd } from "@/components/site/JsonLd";
import { v4FontClass } from "@/components/site/v4/fonts";
import { ServiceDetailV4 } from "@/components/site/v4/ServiceDetailV4";
import { findServiceCatalogEntry, serviceSlugs } from "@/data/serviceCatalog";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
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
      title: "Usluga nije pronadjena",
    };
  }

  const title = catalog.seoTitleSr ?? `${service.title} | Adspire Digital`;
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = findServiceBySlug(slug);
  const catalog = findServiceCatalogEntry(slug);

  if (!service || !catalog) {
    notFound();
  }

  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          serviceJsonLd(catalog, service.title),
          faqPageJsonLd(catalog.faqItems, `${getSiteUrl()}/our-services/${slug}`),
          breadcrumbJsonLd([
            { name: "Pocetna", path: "/" },
            { name: "Usluge", path: "/our-services" },
            { name: service.title, path: `/our-services/${slug}` },
          ]),
        ]}
      />
      <ServiceDetailV4 service={service} catalog={catalog} />
    </div>
  );
}
