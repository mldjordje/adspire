import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/site/JsonLd";
import { AiIndexV4 } from "@/components/site/v4/AiIndexV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { getAiIndex } from "@/content/site/aiPages";
import { aiIndexJsonLd, aiIndexMetadata } from "@/lib/seo/aiPage";
import { defaultLocale, isLocale, prefixedLocales, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

function resolve(locale: string): LocaleCode | null {
  return isLocale(locale) && locale !== defaultLocale ? locale : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = resolve(locale);
  if (!lc) return { title: "404" };
  return aiIndexMetadata(getAiIndex(lc), lc);
}

export default async function LocalizedAiIndexPage({ params }: Props) {
  const { locale } = await params;
  const lc = resolve(locale);
  if (!lc) notFound();

  const index = getAiIndex(lc);

  return (
    <div className={v4FontClass}>
      <JsonLd data={aiIndexJsonLd(index, lc)} />
      <AiIndexV4 locale={lc} />
    </div>
  );
}
