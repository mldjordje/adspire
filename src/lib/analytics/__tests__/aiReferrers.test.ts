import { describe, expect, it } from "vitest";

import { aiSourceEngine, isAiSource } from "@/lib/analytics/aiReferrers";
import { CRAWLERS, LIVE_CRAWLER_IDS, crawlerKind } from "@/lib/analytics/crawlers";

describe("aiSourceEngine", () => {
  it("names the assistant behind a referrer", () => {
    expect(aiSourceEngine("chatgpt.com")).toBe("ChatGPT");
    expect(aiSourceEngine("chat.openai.com")).toBe("ChatGPT");
    expect(aiSourceEngine("www.perplexity.ai")).toBe("Perplexity");
    expect(aiSourceEngine("claude.ai")).toBe("Claude");
    expect(aiSourceEngine("gemini.google.com")).toBe("Gemini");
    expect(aiSourceEngine("copilot.microsoft.com")).toBe("Copilot");
  });

  it("matches subdomains but not lookalikes", () => {
    expect(aiSourceEngine("eu.perplexity.ai")).toBe("Perplexity");
    // The check is on a domain boundary, so a host that merely ends with the
    // same letters is not counted as an assistant.
    expect(aiSourceEngine("notperplexity.ai")).toBeNull();
    expect(aiSourceEngine("myclaude.ai")).toBeNull();
  });

  it("leaves ordinary traffic alone", () => {
    for (const source of ["direktno", "www.google.com", "bing.com", "ig", "www.facebook.com", "drigic.rs"]) {
      expect(isAiSource(source), source).toBe(false);
    }
    expect(aiSourceEngine(null)).toBeNull();
    expect(aiSourceEngine("")).toBeNull();
  });

  /**
   * Google and Bing AI summaries send the same referrer an ordinary result
   * does. Counting them would mean reporting organic search clicks as AI
   * traffic, which is the one number on this dashboard that has to stay honest.
   */
  it("does not claim search engines as AI sources", () => {
    expect(isAiSource("www.google.com")).toBe(false);
    expect(isAiSource("bing.com")).toBe(false);
    expect(isAiSource("duckduckgo.com")).toBe(false);
  });
});

describe("crawler kind", () => {
  it("counts only the three live agents as a live fetch", () => {
    expect([...LIVE_CRAWLER_IDS].sort()).toEqual(["chatgpt-user", "claude-user", "perplexity-user"]);
  });

  it("files every other crawler as indexing", () => {
    for (const crawler of CRAWLERS) {
      const expected = crawler.id.endsWith("-user") ? "live" : "index";
      expect(crawlerKind(crawler.id), crawler.id).toBe(expected);
    }
    // An id nothing knows about must not be counted as a live fetch.
    expect(crawlerKind("something-new")).toBe("index");
  });
});
