import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AzurioChrome } from "@/components/site/AzurioChrome";
import {
  buildServiceDetailMainHtml,
  findServiceBySlug,
} from "@/components/site/azurioContentTransform";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const html = buildServiceDetailMainHtml(slug);

  if (!html) {
    notFound();
  }

  return (
    <AzurioChrome>
      <div className="azurio-template-root" dangerouslySetInnerHTML={{ __html: html }} />
    </AzurioChrome>
  );
}
