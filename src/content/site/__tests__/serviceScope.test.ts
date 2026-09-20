import { describe, expect, it } from "vitest";

import { serviceSlugs } from "@/data/serviceCatalog";
import { SERVICE_SCOPE, getServiceScope } from "../serviceScope";

/**
 * These two blocks are the only part of a service page written to be quoted
 * back by an answer engine, so they earn their place only while each line is
 * specific to its own service. A sentence repeated across pages is duplicate
 * text on sixteen URLs, which costs more than the block gains.
 */

describe("service scope blocks", () => {
  it("covers every service in the catalog", () => {
    const missing = serviceSlugs.filter((slug) => !getServiceScope(slug));
    expect(missing).toEqual([]);
  });

  it("has no block for a slug the catalog dropped", () => {
    const orphans = Object.keys(SERVICE_SCOPE).filter((slug) => !serviceSlugs.includes(slug));
    expect(orphans).toEqual([]);
  });

  it("says at least two things in each block", () => {
    for (const [slug, scope] of Object.entries(SERVICE_SCOPE)) {
      expect(scope.notFor.length, slug).toBeGreaterThanOrEqual(2);
      expect(scope.beforeQuote.length, slug).toBeGreaterThanOrEqual(3);
    }
  });

  it("writes whole sentences, not labels", () => {
    for (const [slug, scope] of Object.entries(SERVICE_SCOPE)) {
      for (const line of [...scope.notFor, ...scope.beforeQuote]) {
        expect(line.length, `${slug}: ${line}`).toBeGreaterThan(30);
        expect(line.trim().endsWith("."), `${slug}: ${line}`).toBe(true);
      }
    }
  });

  it("never repeats a line across services", () => {
    const seen = new Map<string, string>();
    for (const [slug, scope] of Object.entries(SERVICE_SCOPE)) {
      for (const line of [...scope.notFor, ...scope.beforeQuote]) {
        const previous = seen.get(line);
        expect(previous, `"${line}" appears on both ${previous} and ${slug}`).toBeUndefined();
        seen.set(line, slug);
      }
    }
  });
});
