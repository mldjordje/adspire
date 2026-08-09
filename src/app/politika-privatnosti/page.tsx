import type { Metadata } from "next";
import { LegalPageV4 } from "@/components/site/v4/LegalPageV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { privacySections } from "@/content/site/legalPages";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/politika-privatnosti",
  title: "Politika privatnosti",
  description: "Kako Adspire Digital prikuplja, koristi i štiti podatke posetilaca i pošiljalaca upita.",
});

export default function PrivacyPage() {
  return <div className={v4FontClass}><LegalPageV4 title="POLITIKA PRIVATNOSTI." intro="Jasno objašnjenje podataka koje obrađujemo kada koristite adspire.rs ili nam pošaljete upit." updated="9. avgust 2026." sections={privacySections} /></div>;
}
