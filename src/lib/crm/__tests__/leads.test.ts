import { beforeEach, describe, expect, it, vi } from "vitest";
import { createLeadIntake } from "../leads";
import type { LeadSubmission } from "../validation";

// vi.mock is hoisted above the import, so leads.ts gets this stub, not Neon.
const sql = vi.hoisted(() => vi.fn());
vi.mock("@/lib/db", () => ({ getSql: () => sql }));
// "server-only" throws outside a Server Component; under vitest there is none.
vi.mock("server-only", () => ({}));

const submission: LeadSubmission = {
  fullName: "Ana Petrović",
  email: "ana@example.com",
  company: "Klinika Ana",
  phone: "",
  market: "rs",
  service: "booking",
  message: "Booking za dve ordinacije.",
  consent: true,
  website: "",
  requestId: "req_1234567890",
  attribution: { landingPage: "/contact-us" },
};

/** Queues one result per statement, in the order leads.ts issues them. */
const respondWith = (...results: unknown[][]) => {
  sql.mockReset();
  for (const result of results) sql.mockResolvedValueOnce(result);
  sql.mockResolvedValue([]);
};

describe("createLeadIntake", () => {
  beforeEach(() => sql.mockReset());

  it("returns the existing lead for a repeated request id", async () => {
    respondWith([{ id: "lead-1" }]);

    await expect(createLeadIntake(submission)).resolves.toEqual({
      leadId: "lead-1",
      created: false,
    });
    // The lookup alone: nothing is written for a retry.
    expect(sql).toHaveBeenCalledOnce();
  });

  it("writes company, contact, lead and activity for a new submission", async () => {
    respondWith(
      [], // no existing lead
      [{ id: "company-1" }],
      [{ id: "contact-1" }],
      [{ id: "lead-2" }],
      [], // activity
    );

    await expect(createLeadIntake(submission)).resolves.toEqual({
      leadId: "lead-2",
      created: true,
    });
    expect(sql).toHaveBeenCalledTimes(5);
  });

  it("skips the company insert when no company was given", async () => {
    respondWith([], [{ id: "contact-1" }], [{ id: "lead-3" }], []);

    await expect(createLeadIntake({ ...submission, company: "" })).resolves.toEqual({
      leadId: "lead-3",
      created: true,
    });
    expect(sql).toHaveBeenCalledTimes(4);
  });

  it("falls back to the winner's row when a concurrent retry took the request id", async () => {
    respondWith(
      [],
      [{ id: "company-1" }],
      [{ id: "contact-1" }],
      [], // insert … on conflict do nothing
      [{ id: "lead-winner" }],
    );

    await expect(createLeadIntake(submission)).resolves.toEqual({
      leadId: "lead-winner",
      created: false,
    });
  });
});
