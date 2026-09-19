import { describe, expect, it } from "vitest";

import { aiPageJsonLd } from "@/lib/seo/aiPage";
import { guideJsonLd } from "@/lib/seo/guide";
import { hotelJsonLd } from "@/lib/seo/hotel";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  founderJsonLd,
  itemListServicesJsonLd,
  organizationJsonLd,
  serviceJsonLd,
  translationRefs,
  webSiteJsonLd,
} from "@/lib/seo/jsonld";
import { localPageJsonLd } from "@/lib/seo/localPage";
import { coursePackageOffers, parsePriceRange, priceRangeOffersJsonLd } from "@/lib/seo/offers";
import {
  aboutPageJsonLd,
  collectionPageJsonLd,
  contactPageJsonLd,
  inquiryPageJsonLd,
  legalPageJsonLd,
} from "@/lib/seo/pages";
import { softwareProductJsonLd } from "@/lib/seo/products";
import { founderId, orgId, serviceId, servicePath, websiteId } from "@/lib/seo/ids";
import { isoDate } from "@/lib/seo/dates";
import { serviceCatalog } from "@/data/serviceCatalog";
import { aiPages } from "@/content/site/aiPages";
import { guides } from "@/content/site/guides";
import { localPages } from "@/content/site/localPages";
import { pricingGuidePage } from "@/content/site/pricingGuidePage";
import { EDU_PACKAGES } from "@/lib/education/packages";

type Node = Record<string, unknown>;

/**
 * The graph is only worth having if it stays consistent. The bug this file
 * exists to prevent already shipped once: three landing pages published a
 * LocalBusiness under the Organization's own @id with a different `name` on
 * each, so one company asserted four identities and a crawler merging by @id
 * could trust none of them.
 */

/** Every node a page publishes, flattened. */
function nodesOf(data: unknown): Node[] {
  if (Array.isArray(data)) return data.flatMap(nodesOf);
  if (data && typeof data === "object") return [data as Node];
  return [];
}

/** Every `{ "@id": ... }` reference anywhere inside a node tree. */
function refsIn(value: unknown, found: string[] = []): string[] {
  if (Array.isArray(value)) {
    value.forEach((item) => refsIn(item, found));
    return found;
  }
  if (value && typeof value === "object") {
    const node = value as Node;
    const keys = Object.keys(node);
    if (keys.length === 1 && keys[0] === "@id" && typeof node["@id"] === "string") {
      found.push(node["@id"]);
      return found;
    }
    Object.values(node).forEach((item) => refsIn(item, found));
  }
  return found;
}

/** Every page whose schema this suite checks, as (label, nodes). */
function everyPage(): { label: string; nodes: Node[] }[] {
  const pages: { label: string; nodes: Node[] }[] = [
    { label: "layout", nodes: [organizationJsonLd(), founderJsonLd(), webSiteJsonLd()] },
    {
      label: "/contact-us",
      nodes: contactPageJsonLd({ path: "/contact-us", title: "Kontakt", description: "d" }),
    },
    {
      label: "/about-us",
      nodes: aboutPageJsonLd({ path: "/about-us", title: "O nama", description: "d" }),
    },
    {
      label: "/our-projects",
      nodes: collectionPageJsonLd({
        path: "/our-projects",
        title: "Projekti",
        description: "d",
        items: [{ name: "P", path: "/our-projects/p", description: "o" }],
      }),
    },
    {
      label: "/upit",
      nodes: inquiryPageJsonLd({
        path: "/upit",
        title: "Upit",
        description: "d",
        actionName: "Pošalji upit",
      }),
    },
    {
      label: "/politika-privatnosti",
      nodes: legalPageJsonLd({ path: "/politika-privatnosti", title: "Privatnost", description: "d" }),
    },
    { label: "/our-services", nodes: [itemListServicesJsonLd(["/our-services/web-prezentacije"])] },
    { label: "/cena-izrade-sajta", nodes: priceRangeOffersJsonLd(pricingGuidePage.ranges, "https://adspire.rs/cena-izrade-sajta") },
    ...(["sr", "en", "de"] as const).map((locale) => ({
      label: `hotel:${locale}`,
      nodes: nodesOf(hotelJsonLd(locale)),
    })),
    ...guides.map((guide) => ({ label: guide.path, nodes: nodesOf(guideJsonLd(guide)) })),
    ...localPages.map((page) => ({ label: page.path, nodes: nodesOf(localPageJsonLd(page)) })),
    ...aiPages.map((page) => ({ label: `/ai/${page.slug}`, nodes: nodesOf(aiPageJsonLd(page)) })),
  ];
  return pages;
}

describe("JSON-LD graph", () => {
  it("never publishes two different nodes under one @id", () => {
    // Keyed by @id → the (type, name) pairs seen for it across the whole site.
    const identities = new Map<string, Set<string>>();
    for (const { label, nodes } of everyPage()) {
      for (const node of nodes) {
        const id = node["@id"];
        if (typeof id !== "string") continue;
        const identity = `${String(node["@type"])}|${String(node.name ?? "")}`;
        const seen = identities.get(id) ?? new Set<string>();
        seen.add(identity);
        identities.set(id, seen);
        expect(id, `${label} published an @id that is not a URL`).toMatch(/^https?:\/\//);
      }
    }
    const conflicts = Array.from(identities.entries()).filter(([, seen]) => seen.size > 1);
    expect(conflicts.map(([id, seen]) => `${id}: ${Array.from(seen).join(" vs ")}`)).toEqual([]);
  });

  it("gives each page's nodes unique ids within that page", () => {
    for (const { label, nodes } of everyPage()) {
      const ids = nodes.map((node) => node["@id"]).filter((id): id is string => typeof id === "string");
      expect(new Set(ids).size, `${label} repeats an @id in one graph`).toBe(ids.length);
    }
  });

  it("only references the organization and founder by their canonical ids", () => {
    const allowedOrgLike = new Set([orgId(), founderId(), websiteId()]);
    for (const { label, nodes } of everyPage()) {
      for (const ref of refsIn(nodes)) {
        // Catches `${base}//#organization` and `${base}#organization`, both of
        // which existed and silently pointed at nothing.
        if (/#(organization|founder|website)$/.test(ref)) {
          expect(allowedOrgLike.has(ref), `${label} references ${ref}`).toBe(true);
        }
      }
    }
  });

  it("keeps a service's id identical wherever it appears", () => {
    const org = organizationJsonLd();
    const catalogIds = (org.hasOfferCatalog.itemListElement as Node[]).map(
      (entry) => ((entry.item as Node).itemOffered as Node)["@id"],
    );
    expect(catalogIds).toEqual(serviceCatalog.map((entry) => serviceId(entry.slug)));

    const entry = serviceCatalog.find((item) => item.slug === "web-prezentacije")!;
    expect(serviceJsonLd(entry, entry.keywordSr)["@id"]).toBe(serviceId("web-prezentacije"));

    // The /our-services index has to point at the same nodes. It used to build
    // its URLs from a `/our-services/${slug}` template, which sent the hotel
    // system to a page it is not described on and an id nothing else uses.
    const list = itemListServicesJsonLd(serviceCatalog.map((item) => servicePath(item.slug)));
    expect((list.itemListElement as Node[]).map((item) => (item.item as Node)["@id"])).toEqual(
      catalogIds,
    );
  });

  it("marks translated pages as versions of one work, in both directions", () => {
    expect(translationRefs("/about-us", "sr")).toEqual({
      workTranslation: [
        { "@id": "https://adspire.rs/en/about-us#webpage" },
        { "@id": "https://adspire.rs/de/about-us#webpage" },
      ],
    });
    expect(translationRefs("/about-us", "de")).toEqual({
      translationOfWork: { "@id": "https://adspire.rs/about-us#webpage" },
    });
  });

  it("publishes a question and an answer for every FAQ entry", () => {
    const faq = faqPageJsonLd([{ q: "Pitanje?", a: "Odgovor." }], "https://adspire.rs/x");
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe("Odgovor.");
    for (const { label, nodes } of everyPage()) {
      for (const node of nodes) {
        if (node["@type"] !== "FAQPage") continue;
        for (const question of node.mainEntity as Node[]) {
          expect(question.name, `${label} has an empty question`).toBeTruthy();
          expect(
            (question.acceptedAnswer as Node).text,
            `${label} has a question with no answer`,
          ).toBeTruthy();
        }
      }
    }
  });

  it("breadcrumb positions are 1-based and contiguous", () => {
    const crumbs = breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: "Usluge", path: "/our-services" },
    ]);
    expect(crumbs.itemListElement.map((item) => item.position)).toEqual([1, 2]);
    expect(crumbs["@id"]).toBe("https://adspire.rs/our-services#breadcrumb");
  });

  it("parses the published price ranges into numbers", () => {
    expect(parsePriceRange("1.200 – 3.000 €")).toEqual({
      low: 1200,
      high: 3000,
      currency: "EUR",
      perMonth: false,
    });
    expect(parsePriceRange("80 – 300 € / mesec")?.perMonth).toBe(true);
    expect(parsePriceRange("po dogovoru")).toBeUndefined();

    // Every range on the public pricing page has to survive the parse, or the
    // page shows a number the markup silently drops.
    for (const range of pricingGuidePage.ranges) {
      expect(parsePriceRange(range.price), `unparsed range: ${range.price}`).toBeDefined();
    }
  });

  it("publishes the education prices exactly as the page shows them", () => {
    const offers = coursePackageOffers(EDU_PACKAGES, "https://adspire.rs/edukacija");
    expect(offers.map((offer) => offer.price)).toEqual([350, 700]);
    expect(offers.every((offer) => offer.priceCurrency === "EUR")).toBe(true);
    // Each offer must hand over the page where that package is actually bought.
    expect(offers.map((offer) => offer.url)).toEqual([
      "https://adspire.rs/edukacija/porudzbina?paket=8h",
      "https://adspire.rs/edukacija/porudzbina?paket=18h",
    ]);
  });

  it("converts authored dd.mm.yyyy dates to ISO", () => {
    expect(isoDate("03.04.2026")).toBe("2026-04-03");
    expect(isoDate("2026-04-03")).toBe("2026-04-03");
    expect(isoDate("prošle nedelje")).toBeUndefined();
  });

  it("describes a product with an offer and real features", () => {
    const product = softwareProductJsonLd({
      path: "/hotelski-rezervacioni-sistem",
      name: "Hotelski sistem",
      description: "d",
      category: "BusinessApplication",
      featureList: ["Rezervacije"],
      serviceSlug: "sistemi-za-zakazivanje",
    });
    expect(product["@id"]).toBe("https://adspire.rs/hotelski-rezervacioni-sistem#product");
    expect(product.offers.seller).toEqual({ "@id": orgId() });
    expect(product.featureList.length).toBeGreaterThan(0);
  });

  it("gives the founder a profile a crawler can cross-check", () => {
    const person = founderJsonLd();
    expect(person.name).toBe("Đorđe Mladenović");
    expect(person.sameAs.length).toBeGreaterThan(0);
    expect(person.worksFor).toEqual({ "@id": orgId() });
  });
});
