import type { Metadata } from "next";
import { AzurioCompositeHomePage } from "@/components/site/AzurioCompositeHomePage";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

const HOME_TITLE: Partial<Record<LocaleCode, string>> = {
  en: "Adspire Digital | Web development, apps & e-commerce",
  de: "Adspire Digital | Webentwicklung, Apps & E-Commerce",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const content = getSiteContent(lc);
  const title = HOME_TITLE[lc] ?? content.siteTitle;
  return {
    ...pageMetadata({
      path: "/",
      title: lc === "de" ? "Start" : "Home",
      description: content.siteDescription,
      keywords: ["Adspire Digital", "web development", "Next.js", "PWA", "e-commerce"],
      locale: lc,
    }),
    title: { absolute: title },
    openGraph: { title },
    twitter: { title },
  };
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  return <AzurioCompositeHomePage locale={locale as LocaleCode} />;
}
