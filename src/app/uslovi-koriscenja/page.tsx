import type { Metadata } from "next";
import { LegalPageV4 } from "@/components/site/v4/LegalPageV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { termsSections } from "@/content/site/legalPages";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/uslovi-koriscenja",
  title: "Uslovi korišćenja",
  description: "Uslovi korišćenja sajta adspire.rs, slanja projektnog upita i korišćenja objavljenog sadržaja.",
});

export default function TermsPage() {
  return <div className={v4FontClass}><LegalPageV4 title="USLOVI KORIŠĆENJA." intro="Osnovna pravila za korišćenje sajta, sadržaja i formulara za projektni upit." updated="9. avgust 2026." sections={termsSections} /></div>;
}
