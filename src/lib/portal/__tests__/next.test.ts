import { describe, expect, it } from "vitest";

import { safeNextPath } from "../next";

describe("safeNextPath", () => {
  it("keeps pages inside the account", () => {
    expect(safeNextPath("/nalog")).toBe("/nalog");
    expect(safeNextPath("/nalog/edukacija")).toBe("/nalog/edukacija");
  });

  it("keeps the edukacija order, with its package", () => {
    expect(safeNextPath("/edukacija/porudzbina")).toBe("/edukacija/porudzbina");
    expect(safeNextPath("/edukacija/porudzbina?paket=18h")).toBe("/edukacija/porudzbina?paket=18h");
  });

  it("refuses everything that could leave the account", () => {
    expect(safeNextPath("/edukacija/porudzbina?paket=18h&x=1")).toBe("/nalog");
    expect(safeNextPath("/edukacija")).toBe("/nalog");
    expect(safeNextPath("https://evil.example")).toBe("/nalog");
    expect(safeNextPath("//evil.example")).toBe("/nalog");
    expect(safeNextPath("/nalog/../os")).toBe("/nalog");
    expect(safeNextPath("/os")).toBe("/nalog");
    expect(safeNextPath(null)).toBe("/nalog");
  });
});
