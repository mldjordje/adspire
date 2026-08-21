import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { GuideV4 } from "@/components/site/v4/GuideV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { timelineGuide as guide } from "@/content/site/guidesExtra";
import { guideJsonLd, guideMetadata } from "@/lib/seo/guide";

export const metadata: Metadata = guideMetadata(guide);

export default function TimelineGuidePage() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={guideJsonLd(guide)} />
      <GuideV4 guide={guide} />
    </div>
  );
}
