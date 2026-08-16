import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { PartnerV4 } from "@/components/site/v4/PartnerV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { whiteLabelPartnerPage as page } from "@/content/site/partnerPage";
import { partnerPageJsonLd, partnerPageMetadata } from "@/lib/seo/partnerPage";

export const metadata: Metadata = partnerPageMetadata(page);

export default function WhiteLabelPage() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={partnerPageJsonLd(page)} />
      <PartnerV4 page={page} />
    </div>
  );
}
