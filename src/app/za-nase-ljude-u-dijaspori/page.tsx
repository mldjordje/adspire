import { JsonLd } from "@/components/site/JsonLd";
import { DiasporaV4 } from "@/components/site/v4/DiasporaV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { diasporaJsonLd, diasporaMetadata } from "@/lib/seo/diaspora";

export const metadata = diasporaMetadata();

export default function Page() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={diasporaJsonLd()} />
      <DiasporaV4 />
    </div>
  );
}
