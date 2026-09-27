import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { GuideV4 } from "@/components/site/v4/GuideV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { howInternalSoftwareSavesTimeGuideDe as guide } from "@/content/site/guidesGeo.de";
import { guideJsonLd, guideMetadata } from "@/lib/seo/guide";

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "de" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  return guideMetadata(guide, "de");
}

export default async function GermanHowInternalSoftwareSavesTimePage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  return (
    <div className={v4FontClass}>
      <JsonLd data={guideJsonLd(guide, "de")} />
      <GuideV4 guide={guide} locale="de" />
    </div>
  );
}
