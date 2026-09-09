import { describe, expect, it } from "vitest";
import { hotelJsonLd, hotelMetadata } from "../hotel";
import { hotelCopy, HOTEL_PATH, HOTEL_SLUG } from "@/content/site/hotel";
import { getInquiryServices } from "@/lib/inquiries/catalog";
import { getServicesCopy } from "@/components/site/v4/servicesCopy";

describe("hotel discovery and SEO", () => {
  it.each(["sr", "en", "de"] as const)("has canonical, hreflang and matching visible FAQ in %s", locale => {
    const meta = hotelMetadata(locale);
    const expectedPath = `${locale === "sr" ? "" : `/${locale}`}${HOTEL_PATH}`;
    expect(String(meta.alternates?.canonical)).toContain(expectedPath);
    expect(Object.keys(meta.alternates?.languages ?? {})).toEqual(["sr", "en", "de", "x-default"]);
    expect(meta.robots).toBeUndefined();
    const schema = hotelJsonLd(locale);
    const faq = schema.find(x => x["@type"] === "FAQPage") as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(faq.mainEntity.map(x => ({ q: x.name, a: x.acceptedAnswer.text }))).toEqual(hotelCopy[locale].faq);
    expect(getInquiryServices(locale).find(x => x.slug === HOTEL_SLUG)?.title).toBe(hotelCopy[locale].title);
    const cards = getServicesCopy(locale).groups.flatMap(g => g.services);
    expect(cards.find(x => x.slug === HOTEL_SLUG)?.href).toBe(HOTEL_PATH);
  });
});
