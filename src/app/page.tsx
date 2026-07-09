import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { getV4Faq } from "@/components/site/v4/copy";
import { v4FontClass } from "@/components/site/v4/fonts";
import { HomeV4 } from "@/components/site/v4/HomeV4";
import { pageMetadata } from "@/lib/seo/metadata";

const homeTitle =
  "Adspire Digital | Web agencija Nis - web, aplikacije i AI automatizacija";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: getV4Faq("sr").map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Pocetna",
    description:
      "Adspire Digital iz Nisa - web sajtovi koji dovode klijente, aplikacije koje stede vreme i AI automatizacija za prodaju i podrsku.",
    keywords: [
      "Adspire Digital",
      "web agencija Nis",
      "izrada sajta",
      "Next.js Srbija",
      "AI automatizacija",
      "e-commerce",
    ],
  }),
  title: { absolute: homeTitle },
  openGraph: { title: homeTitle },
  twitter: { title: homeTitle },
};

export default function Page() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={[faqJsonLd]} />
      <HomeV4 locale="sr" />
    </div>
  );
}
