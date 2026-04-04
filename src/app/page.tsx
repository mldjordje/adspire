import type { Metadata } from "next";
import { AzurioCompositeHomePage } from "@/components/site/AzurioCompositeHomePage";
import { pageMetadata } from "@/lib/seo/metadata";

const homeTitle =
  "Adspire Digital | Web agencija Niš — razvoj sajtova, aplikacija i e-commerce";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Početna",
    description:
      "Adspire Digital iz Niša — web platforme, mobilne aplikacije, e-commerce, poslovni sistemi, AI automatizacija i SaaS. Kontakt: djordje@adspire.rs, +381 60 149 149 1.",
    keywords: ["Adspire Digital", "web agencija Niš", "izrada sajta", "Next.js Srbija", "PWA", "e-commerce"],
  }),
  title: { absolute: homeTitle },
  openGraph: { title: homeTitle },
  twitter: { title: homeTitle },
};

export default function Page() {
  return <AzurioCompositeHomePage />;
}
