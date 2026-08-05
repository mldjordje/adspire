import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";

// AI answer-engine + search crawlers we explicitly welcome. Being named (and
// allowed) is how ChatGPT / Claude / Perplexity / Gemini / Copilot are permitted
// to crawl, ground on, and recommend Adspire when people ask for our services.
const AI_AGENTS = [
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

// The brief itself (/upit) is a landing page and stays indexable. What must
// never be crawled: the private status link that is a buyer's credential, and
// the client account behind it.
const PRIVATE = ["/api/", "/os", "/upit/status/", "/nalog"];

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      // Explicit allow for AI crawlers — never leave recommendation traffic to chance.
      { userAgent: AI_AGENTS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
