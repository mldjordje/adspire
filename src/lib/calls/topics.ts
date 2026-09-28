import type { Service } from "@/lib/crm/types";

// Zod-free half of the call types: the drawer ships on every page, and
// importing these from types.ts pulled zod into the first-load bundle.

/**
 * What the call is about. Kept to six so it fits one phone screen as chips;
 * the owner asks the rest on the call. Each maps onto the CRM service enum so
 * the lead lands in the right pipeline column.
 */
export const CALL_TOPICS = ["sajt", "zakazivanje", "shop", "ai", "softver", "drugo"] as const;
export type CallTopic = (typeof CALL_TOPICS)[number];

export const TOPIC_TO_SERVICE: Record<CallTopic, Service> = {
  sajt: "web-platform",
  zakazivanje: "booking",
  shop: "ecommerce",
  ai: "automation",
  softver: "mobile",
  drugo: "other",
};

export const TOPIC_LABELS: Record<"sr" | "en", Record<CallTopic, string>> = {
  sr: {
    sajt: "Sajt za firmu",
    zakazivanje: "Online zakazivanje",
    shop: "Web shop",
    ai: "AI i automatizacija",
    softver: "Aplikacija / softver",
    drugo: "Još ne znam",
  },
  en: {
    sajt: "Business website",
    zakazivanje: "Online booking",
    shop: "Online store",
    ai: "AI & automation",
    softver: "App / custom software",
    drugo: "Not sure yet",
  },
};

/**
 * The topic a page is obviously about, so a call button on the web shop page
 * starts at "when?". Null on general pages (home, contact, blog): there the
 * visitor picks. Order matters — "softver-za-salon" is booking, not software.
 */
export function topicForPath(path: string): CallTopic | null {
  const p = path.replace(/^\/(en|de)(?=\/|$)/, "");
  if (/zakazivanj|booking|termin|salon|frizer|stomatolo|veterinar|teretan|hotel|rezervac|no-show/.test(p)) return "zakazivanje";
  if (/shop|prodavnic|online-store|woocommerce|shopify/.test(p)) return "shop";
  if (/(^|\/)ai|chatbot|automatiz/.test(p)) return "ai";
  if (/softver|aplikacij|interni|excel|mobilne/.test(p)) return "softver";
  if (/sajt|website|prezentacion/.test(p)) return "sajt";
  return null;
}

export const CALL_CHANNELS = ["phone", "meet"] as const;
export type CallChannel = (typeof CALL_CHANNELS)[number];
