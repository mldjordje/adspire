import { describe, expect, it } from "vitest";

import {
  CRAWLERS,
  CRAWLER_USER_AGENTS,
  crawlerEngine,
  crawlerLabel,
  identifyCrawler,
} from "@/lib/analytics/crawlers";

describe("crawler identification", () => {
  it("recognises the real user agents each vendor documents", () => {
    const cases: [string, string][] = [
      ["Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot", "gptbot"],
      ["Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)", "oai-searchbot"],
      ["Mozilla/5.0 ... ChatGPT-User/1.0; +https://openai.com/bot", "chatgpt-user"],
      ["Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)", "claudebot"],
      ["Mozilla/5.0 (compatible; Claude-SearchBot/1.0; +https://anthropic.com/searchbot)", "claude-searchbot"],
      ["Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)", "perplexitybot"],
      ["Mozilla/5.0 (compatible; Bytespider; spider-feedback@bytedance.com)", "bytespider"],
    ];
    for (const [agent, expected] of cases) {
      expect(identifyCrawler(agent)?.id, agent).toBe(expected);
    }
  });

  it("does not mistake a human browser for a crawler", () => {
    expect(
      identifyCrawler(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36",
      ),
    ).toBeNull();
    expect(identifyCrawler(null)).toBeNull();
    expect(identifyCrawler("")).toBeNull();
  });

  it("matches the longest token, so a suffixed bot is not filed under the base one", () => {
    // "Applebot-Extended" contains "applebot"; list-order matching filed every
    // Extended hit under the plain crawler, which is a different opt-out.
    expect(identifyCrawler("Mozilla/5.0 (compatible; Applebot-Extended/0.1)")?.id).toBe(
      "applebot-extended",
    );
    expect(identifyCrawler("Mozilla/5.0 (compatible; Applebot/0.1)")?.id).toBe("applebot");
  });

  it("keeps robots.txt and the measurement on one list", () => {
    // Every agent robots.txt allows must be one the dashboard can recognise,
    // or a bot gets crawl access and stays invisible.
    for (const agent of CRAWLER_USER_AGENTS) {
      expect(identifyCrawler(`compatible; ${agent}/1.0`), agent).not.toBeNull();
    }
    expect(CRAWLER_USER_AGENTS.length).toBe(CRAWLERS.length);
  });

  it("has unique ids and tokens", () => {
    expect(new Set(CRAWLERS.map((c) => c.id)).size).toBe(CRAWLERS.length);
    expect(new Set(CRAWLERS.map((c) => c.token)).size).toBe(CRAWLERS.length);
  });

  it("labels an unknown id instead of rendering blank", () => {
    expect(crawlerLabel("gptbot")).toBe("GPTBot");
    expect(crawlerLabel("something-new")).toBe("something-new");
    expect(crawlerEngine("claudebot")).toBe("Anthropic");
    expect(crawlerEngine("something-new")).toBe("Nepoznato");
  });
});
