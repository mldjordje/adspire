/**
 * The AI crawlers we allow, and how to recognise one from a user agent.
 *
 * The list used to live inside robots.ts. Measuring the same crawlers meant a
 * second copy, and two copies of a list like this drift within a quarter — a
 * bot gets allowed in robots.txt and stays invisible in the dashboard, or the
 * reverse. One list, two consumers.
 */

export type CrawlerFamily = {
  /** Stable key stored in the database and shown in /os/analitika. */
  id: string;
  /** Human label for the dashboard. */
  label: string;
  /** Token as it appears in the user agent, lowercase. */
  token: string;
  /** Which assistant this crawler feeds, for grouping. */
  engine: string;
};

export const CRAWLERS: CrawlerFamily[] = [
  // OpenAI splits its crawlers by purpose: GPTBot trains, OAI-SearchBot indexes
  // for ChatGPT search, ChatGPT-User is a live fetch during someone's chat.
  // The third one is the interesting one — it means a real person asked.
  { id: "gptbot", label: "GPTBot", token: "gptbot", engine: "OpenAI" },
  { id: "oai-searchbot", label: "OAI-SearchBot", token: "oai-searchbot", engine: "OpenAI" },
  { id: "chatgpt-user", label: "ChatGPT-User", token: "chatgpt-user", engine: "OpenAI" },
  { id: "claudebot", label: "ClaudeBot", token: "claudebot", engine: "Anthropic" },
  { id: "claude-searchbot", label: "Claude-SearchBot", token: "claude-searchbot", engine: "Anthropic" },
  { id: "claude-user", label: "Claude-User", token: "claude-user", engine: "Anthropic" },
  { id: "anthropic-ai", label: "anthropic-ai", token: "anthropic-ai", engine: "Anthropic" },
  { id: "perplexitybot", label: "PerplexityBot", token: "perplexitybot", engine: "Perplexity" },
  { id: "perplexity-user", label: "Perplexity-User", token: "perplexity-user", engine: "Perplexity" },
  { id: "google-extended", label: "Google-Extended", token: "google-extended", engine: "Google" },
  { id: "googleother", label: "GoogleOther", token: "googleother", engine: "Google" },
  { id: "applebot-extended", label: "Applebot-Extended", token: "applebot-extended", engine: "Apple" },
  { id: "applebot", label: "Applebot", token: "applebot", engine: "Apple" },
  { id: "amazonbot", label: "Amazonbot", token: "amazonbot", engine: "Amazon" },
  { id: "bingbot", label: "Bingbot", token: "bingbot", engine: "Microsoft" },
  { id: "cohere-ai", label: "cohere-ai", token: "cohere-ai", engine: "Cohere" },
  { id: "youbot", label: "YouBot", token: "youbot", engine: "You.com" },
  { id: "ccbot", label: "CCBot", token: "ccbot", engine: "Common Crawl" },
  { id: "meta-externalagent", label: "Meta-ExternalAgent", token: "meta-externalagent", engine: "Meta" },
  { id: "bytespider", label: "Bytespider", token: "bytespider", engine: "ByteDance" },
  { id: "duckassistbot", label: "DuckAssistBot", token: "duckassistbot", engine: "DuckDuckGo" },
  { id: "diffbot", label: "Diffbot", token: "diffbot", engine: "Diffbot" },
];

/** User-agent tokens for robots.txt, in the casing each vendor documents. */
export const CRAWLER_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "Bingbot",
  "cohere-ai",
  "YouBot",
  "CCBot",
  "Meta-ExternalAgent",
  "Bytespider",
  "DuckAssistBot",
  "Diffbot",
];

/**
 * The crawler family a user agent belongs to, or null for a human browser.
 *
 * Longest token first, because "Applebot-Extended" contains "applebot" and
 * "Claude-User" contains neither of the other two Anthropic tokens — matching
 * in list order would file every Extended hit under the plain bot.
 */
const BY_LENGTH = [...CRAWLERS].sort((a, b) => b.token.length - a.token.length);

export function identifyCrawler(userAgent: string | null | undefined): CrawlerFamily | null {
  if (!userAgent) return null;
  const ua = userAgent.toLowerCase();
  return BY_LENGTH.find((crawler) => ua.includes(crawler.token)) ?? null;
}


/**
 * Tokens that mean "not a person", beyond the AI crawlers above.
 *
 * `identifyCrawler` answers a narrower question — which assistant does this
 * feed — and deliberately knows only the families worth charting. The funnel
 * needs the wider one: Baiduspider-render executed the page JavaScript and
 * wrote itself a row in `site_events`, and a headless scraper does the same.
 * Anything matching here is not counted as a visit.
 *
 * Kept as substrings because that is how every one of these identifies itself,
 * and deliberately short of clever heuristics: a false positive here silently
 * deletes a real visitor from the funnel, which is worse than a bot slipping
 * through.
 */
const NON_HUMAN_TOKENS = [
  "bot", // covers bingbot, baiduspider-render's sibling agents, semrushbot…
  "crawler",
  "spider",
  "slurp",
  "headlesschrome",
  "phantomjs",
  "puppeteer",
  "playwright",
  "selenium",
  "lighthouse",
  "python-requests",
  "aiohttp",
  "httpx",
  "curl/",
  "wget",
  "go-http-client",
  "node-fetch",
  "axios",
  "okhttp",
  "scrapy",
  "prerender",
  "pingdom",
  "uptimerobot",
  "statuscake",
  "censys",
  "expanse",
  "facebookexternalhit",
  "vercel",
];

/**
 * True when a request should not be counted as a human visit.
 *
 * A missing user agent counts as non-human too: every real browser sends one,
 * and a beacon without one is a script.
 */
export function isLikelyBot(userAgent: string | null | undefined): boolean {
  if (!userAgent || !userAgent.trim()) return true;
  if (identifyCrawler(userAgent)) return true;
  const ua = userAgent.toLowerCase();
  return NON_HUMAN_TOKENS.some((token) => ua.includes(token));
}

export const crawlerLabel = (id: string) =>
  CRAWLERS.find((crawler) => crawler.id === id)?.label ?? id;

export const crawlerEngine = (id: string) =>
  CRAWLERS.find((crawler) => crawler.id === id)?.engine ?? "Nepoznato";
