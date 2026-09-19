import { describe, expect, it } from "vitest";

import { drainEntryToHit, drainHits, parseDrainBody } from "@/lib/analytics/drain";

const gptbot = "Mozilla/5.0 (compatible; GPTBot/1.1; +https://openai.com/gptbot)";
const chrome =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0";

describe("Vercel log drain payload", () => {
  it("reads newline-delimited deliveries", () => {
    const body = [
      JSON.stringify({ proxy: { path: "/cena-izrade-sajta", userAgent: [gptbot], statusCode: 200 } }),
      JSON.stringify({ proxy: { path: "/", userAgent: [chrome], statusCode: 200 } }),
    ].join("\n");
    expect(drainHits(body)).toEqual([
      { bot: "gptbot", path: "/cena-izrade-sajta", status: 200 },
    ]);
  });

  it("reads array deliveries", () => {
    const body = JSON.stringify([
      { proxy: { path: "/llms.txt", userAgent: [gptbot], statusCode: 200 } },
    ]);
    expect(drainHits(body)).toHaveLength(1);
  });

  it("keeps the rest of a batch when one line is malformed", () => {
    const body = [
      "{ not json",
      JSON.stringify({ proxy: { path: "/faq", userAgent: [gptbot], statusCode: 200 } }),
    ].join("\n");
    expect(drainHits(body).map((hit) => hit.path)).toEqual(["/faq"]);
  });

  it("drops the query string", () => {
    const hit = drainEntryToHit({
      proxy: { path: "/upit/brzo?usluga=edukacija&gclid=abc", userAgent: [gptbot] },
    });
    // A gclid in a crawler stat is someone else's parameter stored for nothing.
    expect(hit?.path).toBe("/upit/brzo");
  });

  it("accepts a plain-string user agent as well as the array form", () => {
    expect(drainEntryToHit({ proxy: { path: "/", userAgent: gptbot } })?.bot).toBe("gptbot");
  });

  it("falls back to the top-level path when proxy has none", () => {
    expect(drainEntryToHit({ path: "/blog", proxy: { userAgent: [gptbot] } })?.path).toBe("/blog");
  });

  it("ignores entries with no user agent, no path, or a human agent", () => {
    expect(drainEntryToHit({ proxy: { path: "/", statusCode: 200 } })).toBeNull();
    expect(drainEntryToHit({ proxy: { userAgent: [gptbot] } })).toBeNull();
    expect(drainEntryToHit({ proxy: { path: "/", userAgent: [chrome] } })).toBeNull();
  });

  it("carries the status through, so crawler 404s are visible", () => {
    const hit = drainEntryToHit({ proxy: { path: "/stara-strana", userAgent: [gptbot], statusCode: 404 } });
    expect(hit?.status).toBe(404);
  });


  it("never charts the receiver's own deliveries", () => {
    // The drain endpoint logs itself and the log comes back here. If a future
    // agent token ever matched VercelDrain, the dashboard would show the site
    // crawling itself once every delivery.
    expect(drainEntryToHit({ proxy: { path: "/api/logs/drain", userAgent: [gptbot] } })).toBeNull();
    expect(drainEntryToHit({ proxy: { path: "/api/logs/drain?x=1", userAgent: [gptbot] } })).toBeNull();
    expect(drainEntryToHit({ path: "/api/logs/drain", proxy: { userAgent: [gptbot] } })).toBeNull();
  });

  it("survives an empty or junk body", () => {
    expect(parseDrainBody("")).toEqual([]);
    expect(parseDrainBody("   ")).toEqual([]);
    expect(parseDrainBody("[not json")).toEqual([]);
    expect(drainHits("garbage")).toEqual([]);
  });
});
