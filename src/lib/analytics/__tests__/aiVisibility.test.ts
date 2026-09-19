import { describe, expect, it } from "vitest";
import { aiSourceName, crawlerPurpose } from "../aiVisibilitySource";
import { groupAiSources } from "../aiVisibility";

describe("AI visibility attribution", () => {
  it("recognizes tagged and referred visits without counting ordinary Google or Bing searches", () => {
    expect(aiSourceName("perplexity", "chatgpt.com")).toBe("Perplexity");
    expect(aiSourceName("chatgpt.com", null)).toBe("ChatGPT");
    expect(aiSourceName(null, "www.perplexity.ai")).toBe("Perplexity");
    expect(aiSourceName(null, "CHATGPT.COM.")).toBe("ChatGPT");
    expect(aiSourceName(null, "gemini.google.com")).toBe("Gemini");
    expect(aiSourceName(null, "google.com")).toBeNull();
    expect(aiSourceName(null, "bing.com")).toBeNull();
    expect(aiSourceName(null, "chatgpt.com.example.org")).toBeNull();
    expect(aiSourceName(null, "fakechatgpt.com")).toBeNull();
    expect(aiSourceName(null, null)).toBeNull();
  });

  it("merges sources while preserving measured session and submission counts", () => {
    expect(groupAiSources([
      { utm_source: "chatgpt", referrer_host: null, sessions: 3, submits: 1 },
      { utm_source: null, referrer_host: "chatgpt.com", sessions: 2, submits: 0 },
      { utm_source: null, referrer_host: "google.com", sessions: 90, submits: 9 },
    ])).toEqual([{ source: "ChatGPT", sessions: 5, submits: 1 }]);
  });

  it("distinguishes training, search and user-initiated fetching", () => {
    expect(crawlerPurpose("gptbot")).toBe("Obuka modela");
    expect(crawlerPurpose("oai-searchbot")).toBe("Pretraga");
    expect(crawlerPurpose("chatgpt-user")).toBe("Otvaranje na zahtev");
    expect(crawlerPurpose("unknown")).toBe("Ostalo");
  });
});
