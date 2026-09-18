import { JsonLd } from "@/components/site/JsonLd";
import { NicheSolutionV4 } from "@/components/site/v4/NicheSolutionV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { nicheJsonLd, nicheMetadata, nichePageBySlug } from "@/lib/seo/niches";

const page = nichePageBySlug("softver-za-salon-lepote");

export const metadata = nicheMetadata(page);

export default function Page() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={nicheJsonLd(page)} />
      <NicheSolutionV4 page={page} />
    </div>
  );
}
