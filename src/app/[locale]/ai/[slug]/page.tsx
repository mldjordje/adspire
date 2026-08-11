import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/site/JsonLd";
import { AiPageV4 } from "@/components/site/v4/AiPageV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { aiPages, getAiPageFor } from "@/content/site/aiPages";
import { aiPageJsonLd, aiPageMetadata } from "@/lib/seo/aiPage";
import { defaultLocale, isLocale, prefixedLocales, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Slugs are shared across locales, so the prefixed set is the same nine pages. */
export function generateStaticParams() {
  return prefixedLocales.flatMap((locale) =>
    aiPages.map((page) => ({ locale, slug: page.slug })),
  );
}

export const dynamicParams = false;

function resolve(locale: string): LocaleCode | null {
  return isLocale(locale) && locale !== defaultLocale ? locale : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const lc = resolve(locale);
  if (!lc) return { title: "404" };
  const page = getAiPageFor(slug, lc);
  if (!page) return { title: "404" };
  return aiPageMetadata(page, lc);
}

export default async function LocalizedAiIndustryPage({ params }: Props) {
  const { locale, slug } = await params;
  const lc = resolve(locale);
  if (!lc) notFound();

  const page = getAiPageFor(slug, lc);
  if (!page) notFound();

  return (
    <div className={v4FontClass}>
      <JsonLd data={aiPageJsonLd(page, lc)} />
      <AiPageV4 page={page} locale={lc} />
    </div>
  );
}
