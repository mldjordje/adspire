import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuickInquiryV4 } from "../QuickInquiryV4";
import { getQuickInquiryCopy } from "../quickInquiryCopy";
import { hotelService, HOTEL_SLUG } from "@/content/site/hotel";
import { parseInquirySubmission } from "@/lib/inquiries/validation";

vi.mock("@/lib/crm/clientAttribution", () => ({ captureFirstTouch: vi.fn(), createRequestId: () => "123e4567-e89b-42d3-a456-426614174000", getSubmissionAttribution: () => ({ landingPage: "/hotelski-rezervacioni-sistem" }) }));
vi.mock("@/lib/analytics/events", () => ({ trackLeadSubmitted: vi.fn() }));
beforeEach(() => { HTMLElement.prototype.scrollIntoView = vi.fn(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function setup(locale: "sr" | "en" | "de" = "en") {
  const t = getQuickInquiryCopy(locale, true);
  const result = render(<QuickInquiryV4 services={[hotelService(locale)]} initialSlug={HOTEL_SLUG} locale={locale} hotel />);
  const fill = () => {
    fireEvent.change(screen.getByLabelText(t.name), { target: { value: "Test Hotel" } });
    fireEvent.change(screen.getByLabelText(t.email), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(t.business), { target: { value: "Example hotel" } });
    fireEvent.change(screen.getByRole("textbox", { name: new RegExp(t.idea.replace(/[?*]/g, "\\$&")) }), { target: { value: "A hotel with 20 rooms needs direct bookings." } });
    fireEvent.click(screen.getByRole("checkbox"));
  };
  return { ...result, t, fill };
}

describe("hotel inquiry", () => {
  it.each(["sr", "en", "de"] as const)("validates and submits the existing API contract in %s", async locale => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ reference: "TEST-1", statusPath: "/upit/status/test" }) });
    vi.stubGlobal("fetch", fetchMock);
    const { t, fill } = setup(locale);
    fireEvent.click(screen.getByRole("button", { name: t.send }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText(t.nameError)).toBeInTheDocument();
    fill();
    fireEvent.click(screen.getByRole("button", { name: t.send }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(t.sent));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, request] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/upit");
    const payload = JSON.parse(request.body);
    expect(payload.services).toEqual([HOTEL_SLUG]);
    expect(payload.intake).toBe("quick");
    expect(() => parseInquirySubmission(payload)).not.toThrow();
  });

  it("blocks concurrent submits and keeps the request id on retry", async () => {
    let resolve!: (value: unknown) => void;
    const fetchMock = vi.fn().mockImplementationOnce(() => new Promise(r => { resolve = r; })).mockResolvedValue({ ok: true, json: async () => ({ reference: "TEST-2", statusPath: "/upit/status/test" }) });
    vi.stubGlobal("fetch", fetchMock);
    const { container, t, fill } = setup(); fill();
    const form = container.querySelector("form")!;
    fireEvent.submit(form); fireEvent.submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    resolve({ ok: false, status: 500, json: async () => ({ message: "Internal error" }) });
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(t.error));
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).requestId).toBe(JSON.parse(fetchMock.mock.calls[1][1].body).requestId);
  });

  it("keeps localized network and rate limit errors readable", async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error("offline")).mockResolvedValue({ ok: false, status: 429, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);
    const { t, fill } = setup("de"); fill();
    fireEvent.click(screen.getByRole("button", { name: t.send }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(t.network));
    fireEvent.click(screen.getByRole("button", { name: t.send }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(t.rateLimit));
  });
});
