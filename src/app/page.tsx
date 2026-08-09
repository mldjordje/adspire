import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { getV4Faq } from "@/components/site/v4/copy";
import { v4FontClass } from "@/components/site/v4/fonts";
import { HomeV4 } from "@/components/site/v4/HomeV4";
import { pageMetadata } from "@/lib/seo/metadata";

// Keyword-first, brand second: nobody searches "Adspire", so the words that can
// win the click go where the SERP will not truncate them. Written with the
// diacritics people actually type — the old title said "Nis", which matches the
// query "Niš" less well than "Niš" does.
const homeTitle = "IT firma i web agencija iz Niša | Adspire Digital";

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
    title: "Početna",
    description:
      "IT firma iz Niša. Pravimo sajtove koji dovode klijente, aplikacije koje štede vreme i sisteme za zakazivanje, web shopove i internu evidenciju — po meri, ne gotova rešenja.",
    keywords: [
      "IT firma Niš",
      "web agencija Niš",
      "izrada sajta Niš",
      "izrada aplikacija Niš",
      "rezervacioni sistemi Niš",
      "Adspire Digital",
      "AI automatizacija",
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
