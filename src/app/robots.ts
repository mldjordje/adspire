import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";
import { CRAWLER_USER_AGENTS } from "@/lib/analytics/crawlers";

// AI answer-engine and search crawlers that may use public pages for retrieval.
// An allow rule only permits crawling; it does not guarantee inclusion or citation.
// The list is shared with the crawler measurement so allowing a bot and counting
// it can never fall out of step.
const AI_AGENTS = CRAWLER_USER_AGENTS;

// The brief itself (/upit) is a landing page and stays indexable. What must
// never be crawled: the private status link that is a buyer's credential, and
// the client account behind it.
const PRIVATE = ["/api/", "/os", "/upit/status/", "/nalog", "/dev"];

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      // Explicitly mirror the public/private boundary for known AI crawlers.
      { userAgent: AI_AGENTS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
