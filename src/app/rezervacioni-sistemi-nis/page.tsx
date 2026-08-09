import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { LocalPageV4 } from "@/components/site/v4/LocalPageV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { bookingNisPage as page } from "@/content/site/localPages";
import { localPageJsonLd, localPageMetadata } from "@/lib/seo/localPage";

export const metadata: Metadata = localPageMetadata(page);

export default function BookingNisPage() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={localPageJsonLd(page)} />
      <LocalPageV4 page={page} />
    </div>
  );
}
