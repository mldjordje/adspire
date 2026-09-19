import { JsonLd } from "@/components/site/JsonLd";
import { AeoVisibilityV4 } from "@/components/site/v4/AeoVisibilityV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { aeoJsonLd, aeoMetadata } from "@/lib/seo/aeo";

export const metadata = aeoMetadata();

export default function Page() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={aeoJsonLd()} />
      <AeoVisibilityV4 />
    </div>
  );
}
