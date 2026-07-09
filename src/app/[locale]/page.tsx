import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { getV4Faq } from "@/components/site/v4/copy";
import { v4FontClass } from "@/components/site/v4/fonts";
import { HomeV4 } from "@/components/site/v4/HomeV4";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

const HOME_TITLE: Partial<Record<LocaleCode, string>> = {
  en: "Adspire Digital | Web development, apps & AI automation",
  de: "Adspire Digital | Webentwicklung, Apps & KI-Automatisierung",
};

const HOME_DESC: Partial<Record<LocaleCode, string>> = {
  en: "Adspire Digital builds websites, applications and AI automations that bring leads, save time and support sales.",
  de: "Adspire Digital baut Websites, Anwendungen und KI-Automatisierungen, die Anfragen bringen, Zeit sparen und den Vertrieb unterstützen.",
};

function faqJsonLd(lc: LocaleCode) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getV4Faq(lc).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const title = HOME_TITLE[lc] ?? "Adspire Digital | Web, apps & AI automation";
  return {
    ...pageMetadata({
      path: "/",
      title: lc === "de" ? "Start" : "Home",
      description: HOME_DESC[lc] ?? HOME_DESC.en!,
      keywords: ["Adspire Digital", "web development", "Next.js", "AI automation", "e-commerce"],
      locale: lc,
    }),
    title: { absolute: title },
    openGraph: { title },
    twitter: { title },
  };
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  return (
    <div className={v4FontClass}>
      <JsonLd data={[faqJsonLd(lc)]} />
      <HomeV4 locale={lc} />
    </div>
  );
}
