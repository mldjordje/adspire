import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { GuideV4 } from "@/components/site/v4/GuideV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { websiteMaintenanceCostGuideEn as guide } from "@/content/site/guidesGeo.en";
import { guideJsonLd, guideMetadata } from "@/lib/seo/guide";

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return guideMetadata(guide, "en");
}

export default async function EnglishWebsiteMaintenanceCostPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return (
    <div className={v4FontClass}>
      <JsonLd data={guideJsonLd(guide, "en")} />
      <GuideV4 guide={guide} locale="en" languagePath="/en/website-maintenance-cost-monthly" />
    </div>
  );
}
