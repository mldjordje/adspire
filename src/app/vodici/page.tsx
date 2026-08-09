import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { GuidesIndexV4 } from "@/components/site/v4/GuidesIndexV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { guides } from "@/content/site/guides";
import { breadcrumbJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

const PATH = "/vodici";
const TITLE = "Vodiči — cena, izbor tehnologije i šta sistem treba da radi";
const DESCRIPTION =
  "Odgovori na pitanja koja se postavljaju pre nego što se traži ponuda: koliko košta izrada sajta, WordPress ili custom, kako izabrati agenciju, online zakazivanje, web shop, interni softver i AI chatbot.";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "vodič izrada sajta",
    "cena izrade sajta",
    "kako izabrati web agenciju",
    "wordpress ili custom",
    "izrada web shopa",
    "interni softver za firmu",
  ],
});

export default function GuidesIndexPage() {
  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          webPageAboutOrganizationJsonLd(PATH, `${TITLE} | Adspire Digital`, DESCRIPTION),
          breadcrumbJsonLd([
            { name: "Početna", path: "/" },
            { name: "Vodiči", path: PATH },
          ]),
          // ItemList tells a crawler this hub is a real collection, so the guides
          // are discovered as a set rather than seven unrelated orphan pages.
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${absoluteUrl(PATH)}#guides`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Koliko košta izrada sajta?",
                url: absoluteUrl("/cena-izrade-sajta"),
              },
              ...guides.map((guide, index) => ({
                "@type": "ListItem",
                position: index + 2,
                name: guide.h1,
                url: absoluteUrl(guide.path),
              })),
            ],
          },
        ]}
      />
      <GuidesIndexV4 />
    </div>
  );
}
