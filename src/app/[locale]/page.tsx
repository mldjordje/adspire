import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { getV4Faq } from "@/components/site/v4/copy";
import { v4FontClass } from "@/components/site/v4/fonts";
import { HomeV4 } from "@/components/site/v4/HomeV4";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd, SCHEMA_LANG, translationRefs, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { isLocale, localePath, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

const HOME_TITLE: Partial<Record<LocaleCode, string>> = {
  en: "Adspire | Web development, apps & AI automation",
  de: "Adspire | Webentwicklung, Apps & KI-Automatisierung",
};

const HOME_DESC: Partial<Record<LocaleCode, string>> = {
  en: "Adspire builds websites, applications and AI automations that bring leads, save time and support sales.",
  de: "Adspire baut Websites, Anwendungen und KI-Automatisierungen, die Anfragen bringen, Zeit sparen und den Vertrieb unterstützen.",
};

function faqJsonLd(lc: LocaleCode) {
  return faqPageJsonLd(getV4Faq(lc), absoluteUrl(localePath("/", lc)));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const title = HOME_TITLE[lc] ?? "Adspire | Web, apps & AI automation";
  const meta = pageMetadata({
    path: "/",
    title: lc === "de" ? "Start" : "Home",
    description: HOME_DESC[lc] ?? HOME_DESC.en!,
    keywords: ["Adspire", "web development", "Next.js", "AI automation", "e-commerce"],
    locale: lc,
  });
  return {
    ...meta,
    title: { absolute: title },
    openGraph: { ...meta.openGraph, title },
    twitter: { ...meta.twitter, title },
  };
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          {
            ...webPageAboutOrganizationJsonLd(
              localePath("/", lc),
              HOME_TITLE[lc] ?? "Adspire",
              HOME_DESC[lc] ?? HOME_DESC.en!,
              {
                inLanguage: SCHEMA_LANG[lc],
                mainEntity: `${absoluteUrl(localePath("/", lc))}#faq`,
              },
            ),
            ...translationRefs("/", lc),
          },
          faqJsonLd(lc),
        ]}
      />
      <HomeV4 locale={lc} />
    </div>
  );
}
