import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const faq = getSiteContent(lc).faqPage;
  return pageMetadata({
    path: "/faq",
    title: "FAQ",
    description: faq.hero.description,
    locale: lc,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <AzurioTemplatePage fileName="faq.html" locale={locale as LocaleCode} />;
}
