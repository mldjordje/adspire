import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { GuideV4 } from "@/components/site/v4/GuideV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { glossaryAsGuide } from "@/content/site/glossary";
import { glossaryJsonLd, glossaryMetadata } from "@/lib/seo/glossary";

export const metadata: Metadata = glossaryMetadata();

const guide = glossaryAsGuide();

/**
 * The glossary reuses the guide layout rather than introducing one of its own —
 * a term with its own heading is what makes a definition separately
 * addressable, and that is all this page needs from a layout.
 */
export default function GlossaryPage() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={glossaryJsonLd()} />
      <GuideV4 guide={guide} />
    </div>
  );
}
