import { aiSourceEngine } from "./aiReferrers";

const TAGS: Record<string, string> = {
  chatgpt: "ChatGPT", openai: "ChatGPT", perplexity: "Perplexity",
  claude: "Claude", gemini: "Gemini", copilot: "Copilot",
};

export function aiSourceName(utmSource: string | null, referrerHost: string | null): string | null {
  const tag = utmSource?.trim().toLowerCase() ?? "";
  return (Object.hasOwn(TAGS, tag) ? TAGS[tag] : null) ?? aiSourceEngine(tag) ?? aiSourceEngine(referrerHost);
}

/** A user-agent match describes the request's claimed purpose, not a citation. */
export function crawlerPurpose(bot: string): string {
  if (["gptbot", "claudebot", "ccbot"].includes(bot)) return "Obuka modela";
  if (["oai-searchbot", "claude-searchbot", "perplexitybot", "bingbot"].includes(bot)) return "Pretraga";
  if (["chatgpt-user", "claude-user", "perplexity-user"].includes(bot)) return "Otvaranje na zahtev";
  return "Ostalo";
}
