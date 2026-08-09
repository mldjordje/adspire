import type { Metadata } from "next";
import { LegalPageV4 } from "@/components/site/v4/LegalPageV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { cookieSections } from "@/content/site/legalPages";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/politika-kolacica",
  title: "Politika kolačića",
  description: "Informacije o neophodnim podacima, analitici i merenju izvora poseta na sajtu Adspire Digital.",
});

export default function CookiePage() {
  return <div className={v4FontClass}><LegalPageV4 title="POLITIKA KOLAČIĆA." intro="Koje podatke pregledač čuva, zašto ih koristimo i kako možete da ih kontrolišete." updated="9. avgust 2026." sections={cookieSections} /></div>;
}
