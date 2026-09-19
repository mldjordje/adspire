/**
 * Which traffic sources are an AI assistant sending a person here.
 *
 * The crawler log answers "did an assistant read the page". This answers the
 * other half — "did a person then click through" — and the two are different
 * outcomes that were both filed under one word before this existed. A hundred
 * crawls with nobody arriving is a very different business situation from two
 * crawls and a visitor who sent an inquiry.
 *
 * The signal is the referrer host the browser reports, plus the utm_source some
 * assistants stamp onto links they hand out (ChatGPT appends
 * `?utm_source=chatgpt.com`). Both already live on every `site_events` row, so
 * nothing new has to be collected.
 *
 * Deliberately not included: Google, Bing and DuckDuckGo. Their AI summaries
 * send a referrer indistinguishable from an ordinary search result, so counting
 * them as AI traffic would inflate the number with plain organic clicks. If it
 * cannot be told apart, it does not go in.
 */

export type AiSource = { host: string; engine: string };

export const AI_SOURCES: AiSource[] = [
  { host: "chatgpt.com", engine: "ChatGPT" },
  { host: "chat.openai.com", engine: "ChatGPT" },
  { host: "perplexity.ai", engine: "Perplexity" },
  { host: "claude.ai", engine: "Claude" },
  { host: "gemini.google.com", engine: "Gemini" },
  { host: "bard.google.com", engine: "Gemini" },
  { host: "aistudio.google.com", engine: "Gemini" },
  { host: "copilot.microsoft.com", engine: "Copilot" },
  { host: "m365.cloud.microsoft", engine: "Copilot" },
  { host: "you.com", engine: "You.com" },
  { host: "poe.com", engine: "Poe" },
  { host: "grok.com", engine: "Grok" },
  { host: "chat.mistral.ai", engine: "Le Chat" },
];

/**
 * The engine behind a source string, or null when it is not an assistant.
 *
 * `source` is whatever the funnel stored: a utm_source, a referrer host, or
 * "direktno". Matched on the registrable part so `www.perplexity.ai` and
 * `perplexity.ai` are one engine rather than two rows.
 */
export function aiSourceEngine(source: string | null | undefined): string | null {
  if (!source) return null;
  const value = source.trim().toLowerCase().replace(/^www\./, "").replace(/\.$/, "");
  if (!value || value === "direktno") return null;
  const match = AI_SOURCES.find((entry) => value === entry.host || value.endsWith(`.${entry.host}`));
  return match?.engine ?? null;
}

export const isAiSource = (source: string | null | undefined): boolean =>
  aiSourceEngine(source) !== null;

/** Every host, for the SQL filter that counts these sessions in one pass. */
export const AI_SOURCE_HOSTS = AI_SOURCES.map((entry) => entry.host);
