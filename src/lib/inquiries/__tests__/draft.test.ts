import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { clearDraft, readDraft, saveDraft } from "../draft";

const KEY = "adspire.upit.draft.v1";

describe("inquiry draft", () => {
  beforeEach(() => clearDraft());
  afterEach(() => {
    vi.restoreAllMocks();
    clearDraft();
  });

  it("gives back what was typed", () => {
    saveDraft(["web-prezentacije"], { idea: "prodavnica" });
    const draft = readDraft<{ idea: string }>();
    expect(draft?.services).toEqual(["web-prezentacije"]);
    expect(draft?.form.idea).toBe("prodavnica");
  });

  it("drops a draft older than two weeks instead of restoring it", () => {
    saveDraft(["web-prezentacije"], { idea: "stari projekat" });
    const stored = JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ ...stored, savedAt: Date.now() - 15 * 24 * 60 * 60 * 1000 }),
    );

    expect(readDraft()).toBeNull();
    // And it is gone, so it cannot be re-read on the next visit either.
    expect(window.localStorage.getItem(KEY)).toBeNull();
  });

  it("survives junk in storage", () => {
    window.localStorage.setItem(KEY, "{not json");
    expect(readDraft()).toBeNull();
  });

  it("clears on demand", () => {
    saveDraft([], { idea: "x" });
    clearDraft();
    expect(readDraft()).toBeNull();
  });

  it("stays quiet when storage refuses to write", () => {
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => saveDraft([], { idea: "x" })).not.toThrow();
  });
});
