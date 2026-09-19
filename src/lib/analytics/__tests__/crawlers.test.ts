import { describe, expect, it } from "vitest";

import {
  CRAWLERS,
  CRAWLER_USER_AGENTS,
  crawlerEngine,
  crawlerLabel,
  identifyCrawler,
  isLikelyBot,
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

describe("isLikelyBot", () => {
  const humans = [
    // The Android phone that arrived from an Instagram link — the one real
    // visit in the log export this filter was written from.
    "Mozilla/5.0 (Linux; Android 12; S100Pro Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15",
    // In-app browsers: these are real people and must survive the filter.
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 322.0.0.0",
    "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 [FBAN/FB4A;FBAV/450.0]",
  ];

  const bots = [
    // Executes JavaScript, so it fires the beacon like a browser would.
    "Mozilla/5.0 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.7390.0 Safari/537.36",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
    "Python/3.11 aiohttp/3.14.3",
    "Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)",
    "Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)",
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    "VercelDrain/1.0 (+https://vercel.com/docs/drains)",
  ];

  it("keeps real browsers, including in-app ones", () => {
    for (const ua of humans) expect(isLikelyBot(ua), ua.slice(0, 50)).toBe(false);
  });

  it("drops crawlers, headless browsers and scripts", () => {
    for (const ua of bots) expect(isLikelyBot(ua), ua.slice(0, 50)).toBe(true);
  });

  it("treats a missing user agent as non-human", () => {
    // Every browser sends one. A beacon without one is a script.
    expect(isLikelyBot(null)).toBe(true);
    expect(isLikelyBot("")).toBe(true);
    expect(isLikelyBot("   ")).toBe(true);
  });
});
