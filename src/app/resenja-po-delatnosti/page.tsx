import { JsonLd } from "@/components/site/JsonLd";
import { IndustryHubV4 } from "@/components/site/v4/IndustryHubV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { INDUSTRY_HUB_PATH } from "@/content/site/industries";
import { industryHubJsonLd } from "@/lib/seo/industries";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  path: INDUSTRY_HUB_PATH,
  title: "Rešenja po delatnosti — softver po meri za vaš posao",
  description:
    "Spisak delatnosti sa opisom šta digitalno može da se uradi u svakoj: sajt, web aplikacija, mobilna aplikacija i interni sistem za firmu, kroz stvarne radne tokove tog posla.",
  keywords: [
    "softver po delatnosti",
    "digitalizacija poslovanja po branši",
    "web aplikacija za firmu",
    "interni sistem za firmu",
    "izrada sajta po delatnosti",
  ],
});

export default function Page() {
  return (
    <div className={v4FontClass}>
      <JsonLd data={industryHubJsonLd()} />
      <IndustryHubV4 />
    </div>
  );
}
