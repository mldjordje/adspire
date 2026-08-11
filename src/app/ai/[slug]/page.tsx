import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/site/JsonLd";
import { AiPageV4 } from "@/components/site/v4/AiPageV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { aiPages, getAiPage } from "@/content/site/aiPages";
import { aiPageJsonLd, aiPageMetadata } from "@/lib/seo/aiPage";

type Props = { params: Promise<{ slug: string }> };

/** Static set — the pages are content, so they prerender and land in the sitemap. */
export function generateStaticParams() {
  return aiPages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getAiPage(slug);
  if (!page) return { title: "Stranica nije pronađena" };
  return aiPageMetadata(page);
}

export default async function AiIndustryPage({ params }: Props) {
  const { slug } = await params;
  const page = getAiPage(slug);
  if (!page) notFound();

  return (
    <div className={v4FontClass}>
      <JsonLd data={aiPageJsonLd(page)} />
      <AiPageV4 page={page} />
    </div>
  );
}
