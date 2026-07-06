import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { FAQ_ITEMS } from "@/components/site/v4/faqData";
import { v4FontClass } from "@/components/site/v4/fonts";
import { HomeV4 } from "@/components/site/v4/HomeV4";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

const HOME_TITLE: Partial<Record<LocaleCode, string>> = {
  en: "Adspire Digital | Web development, apps & AI automation",
  de: "Adspire Digital | Webentwicklung, Apps & KI-Automatisierung",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const title = HOME_TITLE[lc] ?? "Adspire Digital | Web, apps & AI automation";
  return {
    ...pageMetadata({
      path: "/",
      title: lc === "de" ? "Start" : "Home",
      description:
        "Adspire Digital builds websites, applications and AI automations that bring leads, save time and support sales.",
      keywords: ["Adspire Digital", "web development", "Next.js", "AI automation", "e-commerce"],
      locale: lc,
    }),
    title: { absolute: title },
    openGraph: { title },
    twitter: { title },
  };
}

export default function LocaleHome() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={[faqJsonLd]} />
      <HomeV4 />
    </div>
  );
}
