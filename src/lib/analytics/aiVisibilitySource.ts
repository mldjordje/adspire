const AI_SOURCES = [
  { name: "ChatGPT", hosts: ["chatgpt.com", "chat.openai.com"], tags: ["chatgpt", "openai"] },
  { name: "Perplexity", hosts: ["perplexity.ai"], tags: ["perplexity"] },
  { name: "Claude", hosts: ["claude.ai"], tags: ["claude"] },
  { name: "Gemini", hosts: ["gemini.google.com"], tags: ["gemini"] },
  { name: "Copilot", hosts: ["copilot.microsoft.com"], tags: ["copilot"] },
] as const;

export function aiSourceName(utmSource: string | null, referrerHost: string | null): string | null {
  const tag = utmSource?.trim().toLowerCase() ?? "";
  const host = referrerHost?.trim().toLowerCase().replace(/\.$/, "") ?? "";
  const tagged = AI_SOURCES.find(source => source.tags.some(value => value === tag) || source.hosts.some(value => value === tag));
  if (tagged) return tagged.name;
  const referred = AI_SOURCES.find(source => source.hosts.some(value => host === value || host.endsWith(`.${value}`)));
  if (referred) return referred.name;
  return null;
}

/** A user-agent match describes the request's claimed purpose, not a citation. */
export function crawlerPurpose(bot: string): string {
  if (["gptbot", "claudebot", "ccbot"].includes(bot)) return "Obuka modela";
  if (["oai-searchbot", "claude-searchbot", "perplexitybot", "bingbot"].includes(bot)) return "Pretraga";
  if (["chatgpt-user", "claude-user", "perplexity-user"].includes(bot)) return "Otvaranje na zahtev";
  return "Ostalo";
}
