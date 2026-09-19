import { describe, expect, it } from "vitest";

import {
  EDU_PACKAGES,
  findPackage,
  formatEur,
  packageOrderHref,
  pricePerHour,
} from "../packages";
import { safeNextPath } from "@/lib/portal/next";

describe("edukacija packages", () => {
  it("keeps the two approved packages and their public prices", () => {
    expect(EDU_PACKAGES.map((p) => [p.id, p.hours, p.priceEur])).toEqual([
      ["8h", 8, 350],
      ["18h", 18, 700],
    ]);
  });

  it("resolves a package only by an id that exists", () => {
    expect(findPackage("18h")?.hours).toBe(18);
    expect(findPackage("100h")).toBeNull();
    expect(findPackage(undefined)).toBeNull();
  });

  /**
   * The package button and the login round trip have to agree: a buyer who
   * signs in from a package must come back to that package. safeNextPath is
   * what would silently drop it.
   */
  it("produces an order link the login flow is allowed to return to", () => {
    for (const pkg of EDU_PACKAGES) {
      const href = packageOrderHref(pkg);
      expect(href).toBe(`/edukacija/porudzbina?paket=${pkg.id}`);
      expect(safeNextPath(href)).toBe(href);
    }
  });

  it("prices per hour the way the page prints them", () => {
    expect(pricePerHour(EDU_PACKAGES[0])).toBe(43.8);
    expect(pricePerHour(EDU_PACKAGES[1])).toBe(38.9);
    expect(formatEur(700)).toBe("700 €");
    expect(formatEur(1000)).toBe("1.000 €");
  });
});
