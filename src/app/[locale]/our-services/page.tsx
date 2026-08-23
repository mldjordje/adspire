import type { Metadata } from "next";
import { ServicesV4 } from "@/components/site/v4/ServicesV4";
import { getServicesCopy } from "@/components/site/v4/servicesCopy";
import { v4FontClass } from "@/components/site/v4/fonts";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

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
  return (
    <div className={v4FontClass}>
      <ServicesV4 locale={lc} />
    </div>
  );
}
