import { describe, expect, it } from "vitest";

import { inquiryTurn, osStatusLabel, waitingSince } from "../turn";

const at = (day: number) => `2026-09-${String(day).padStart(2, "0")} 10:00:00+00`;

describe("inquiry turn", () => {
  it("a fresh brief is the owner's move", () => {
    const state = { lastOut: null, lastIn: null };
    expect(inquiryTurn("submitted", state)).toBe("owner");
    expect(osStatusLabel("submitted", state)).toBe("Novi");
  });

  it("a reply without a quote hands the move to the buyer", () => {
    const state = { lastOut: at(20), lastIn: null };
    expect(inquiryTurn("submitted", state)).toBe("buyer");
    expect(osStatusLabel("submitted", state)).toBe("Odgovoreno");
  });

  it("the buyer writing back returns it to the owner, waiting from their message", () => {
    const state = { lastOut: at(20), lastIn: at(21) };
    expect(inquiryTurn("submitted", state)).toBe("owner");
    expect(inquiryTurn("quoted", state)).toBe("owner");
    expect(osStatusLabel("quoted", state)).toBe("Klijent odgovorio");
    expect(waitingSince(at(19), state)).toBe(at(21));
  });

  it("an older buyer message does not reopen an answered thread", () => {
    const state = { lastOut: at(22), lastIn: at(21) };
    expect(inquiryTurn("submitted", state)).toBe("buyer");
    expect(waitingSince(at(19), state)).toBe(at(19));
  });

  it("closed upiti are nobody's move", () => {
    const state = { lastOut: at(20), lastIn: at(21) };
    expect(inquiryTurn("accepted", state)).toBe("closed");
    expect(osStatusLabel("accepted", state)).toBe("Prihvaćen");
  });
});
