import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import { HomeV4 } from "@/components/site/v4/HomeV4";
import { JsonLd } from "@/components/site/JsonLd";
import { FAQ_ITEMS } from "@/components/site/v4/faqData";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display-v4",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-v4",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adspire V4 — OBSIDIAN (preview)",
  robots: { index: false, follow: false },
};

export default function V4Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <JsonLd data={[faqJsonLd]} />
      <HomeV4 />
    </div>
  );
}
