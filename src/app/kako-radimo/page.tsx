import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { GuideV4 } from "@/components/site/v4/GuideV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { howWeWorkPage as guide } from "@/content/site/companyPages";
import { guideJsonLd, guideMetadata } from "@/lib/seo/guide";

export const metadata: Metadata = guideMetadata(guide);

export default function HowWeWorkPage() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={guideJsonLd(guide)} />
      <GuideV4 guide={guide} />
    </div>
  );
}
