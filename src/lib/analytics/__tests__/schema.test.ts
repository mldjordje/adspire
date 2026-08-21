import { describe, expect, it } from "vitest";
import { siteEventBatchSchema, siteEventSchema } from "../schema";

const valid = {
  name: "page_view" as const,
  sessionId: "01234567-89ab-cdef",
  path: "/cena-izrade-sajta",
};

describe("siteEventSchema", () => {
  it("accepts a minimal event", () => {
    expect(siteEventSchema.parse(valid).name).toBe("page_view");
  });

  it("rejects an unknown event name", () => {
    expect(() => siteEventSchema.parse({ ...valid, name: "buy_now" })).toThrow();
  });

  it("rejects a session id short enough to be a collision", () => {
    expect(() => siteEventSchema.parse({ ...valid, sessionId: "abc" })).toThrow();
  });

  it("caps free-text fields so a payload cannot be used as storage", () => {
    expect(() => siteEventSchema.parse({ ...valid, label: "x".repeat(201) })).toThrow();
  });
});

describe("siteEventBatchSchema", () => {
  it("rejects an empty batch", () => {
    expect(() => siteEventBatchSchema.parse({ events: [] })).toThrow();
  });

  it("rejects a batch larger than the browser ever sends", () => {
    const events = Array.from({ length: 21 }, () => valid);
    expect(() => siteEventBatchSchema.parse({ events })).toThrow();
  });

  it("accepts a normal batch", () => {
    expect(siteEventBatchSchema.parse({ events: [valid, valid] }).events).toHaveLength(2);
  });
});
