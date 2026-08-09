import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { GuideV4 } from "@/components/site/v4/GuideV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { bookingSystemsGuide as guide } from "@/content/site/guides";
import { guideJsonLd, guideMetadata } from "@/lib/seo/guide";

export const metadata: Metadata = guideMetadata(guide);

export default function BookingGuidePage() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={guideJsonLd(guide)} />
      <GuideV4 guide={guide} />
    </div>
  );
}
