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

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // Explicit allow for AI crawlers — never leave recommendation traffic to chance.
      { userAgent: AI_AGENTS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
