import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { JsonLd } from "@/components/site/JsonLd";
import { projectCaseStudies, getCaseStudyV4Content } from "@/data/projectCaseStudies";
import { serviceCatalog } from "@/data/serviceCatalog";
import { nichePages } from "@/content/site/nichePages";
import { caseStudyEntities } from "../caseStudy";
import { hotelJsonLd } from "../hotel";
import { nicheJsonLd } from "../niches";
import { founderJsonLd, organizationJsonLd, serviceJsonLd } from "../jsonld";
import { orgRef } from "../ids";

describe("structured data accuracy", () => {
  it("cannot terminate its script element with authored content", () => {
    const data = { "@type": "Thing", name: '</script><script>alert("x")</script><b>Đorđe</b>' };
    const html = renderToStaticMarkup(<JsonLd data={data} />);
    const document = new DOMParser().parseFromString(html, "text/html");
    expect(document.querySelectorAll("script")).toHaveLength(1);
    expect(document.querySelector("b")).toBeNull();
    expect(JSON.parse(document.querySelector("script")!.textContent!)).toEqual(data);
  });

  it.each(["sr", "en", "de"] as const)("sells custom hotel development, not stock software (%s)", locale => {
    const nodes = hotelJsonLd(locale);
    const service = nodes.find(node => node["@type"] === "Service")!;
    const page = nodes.find(node => node["@type"] === "WebPage")!;
    expect(service).toBeDefined();
    expect(page).toHaveProperty("mainEntity", { "@id": service["@id"] });
    expect(service).toHaveProperty("provider", orgRef());
    expect(nodes.some(node => node["@type"] === "SoftwareApplication")).toBe(false);
    expect(JSON.stringify(nodes)).not.toContain("InStock");
  });

  it("describes niche development services and cites the visible evidence", () => {
    for (const niche of nichePages) {
      const nodes = nicheJsonLd(niche);
      expect(nodes.some(node => node["@type"] === "SoftwareApplication")).toBe(false);
      expect(nodes[0]).toHaveProperty("mainEntity", { "@id": `https://adspire.rs/${niche.slug}#service` });
      expect(nodes[0]).toHaveProperty("citation", niche.proof.map(item => item.external ? item.href : `https://adspire.rs${item.href}`));
    }
  });

  it("keeps personal profiles off the organization and uses the supported founder relationship", () => {
    const org = organizationJsonLd();
    const person = founderJsonLd();
    expect(org.sameAs).not.toContain("https://github.com/mldjordje");
    expect(person.sameAs).toContain("https://github.com/mldjordje");
    expect(person).not.toHaveProperty("founderOf");
    expect(org.founder).toEqual({ "@id": person["@id"] });
    expect(org.knowsLanguage).toEqual(["sr", "en"]);
    expect(org.contactPoint[0].availableLanguage).toEqual(["sr", "en"]);
  });

  it("does not restrict translated services to Serbia", () => {
    for (const entry of serviceCatalog) {
      const local = serviceJsonLd(entry, entry.keywordSr);
      const translated = serviceJsonLd(entry, entry.keywordSr, { path: `/de/our-services/${entry.slug}`, name: "Service", description: "Beschreibung" });
      expect(translated.areaServed).toEqual(local.areaServed);
      expect(translated.areaServed.map(area => area.name)).toEqual(expect.arrayContaining(["Serbia", "Germany", "Austria", "Switzerland"]));
    }
  });

  it("describes delivered features from the case study, not its technology stack", () => {
    for (const project of projectCaseStudies) {
      const content = getCaseStudyV4Content(project);
      const [article, work] = caseStudyEntities(project, content);
      expect(work["@type"]).toBe(project.deliveredType);
      expect(work).not.toHaveProperty("sameAs");
      expect(work).not.toHaveProperty("offers");
      expect(work.subjectOf).toEqual({ "@id": article["@id"] });
      const features = Array.from(new Set(content.features.flatMap(group => group.items)));
      if (features.length) expect(work.featureList).toEqual(features);
      else expect(work).not.toHaveProperty("featureList");
    }
  });

  it("can describe a presentation website without advertising software features", () => {
    const project = { ...projectCaseStudies[0], deliveredType: "WebSite" as const };
    const [, work] = caseStudyEntities(project, getCaseStudyV4Content(project));
    expect(work["@type"]).toBe("WebSite");
    expect(work).not.toHaveProperty("featureList");
    expect(work).not.toHaveProperty("operatingSystem");
  });
});
