import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { AiIndexV4 } from "@/components/site/v4/AiIndexV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { aiIndex } from "@/content/site/aiPages";
import { aiIndexJsonLd, aiIndexMetadata } from "@/lib/seo/aiPage";

export const metadata: Metadata = aiIndexMetadata(aiIndex);

export default function AiIndexPage() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={aiIndexJsonLd(aiIndex)} />
      <AiIndexV4 />
    </div>
  );
}
