import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * The campaign carried by an event is what every paid-traffic number is read
 * off, so these cover the case that used to break it: the tag lives on the
 * landing URL, the conversion happens a page later.
 */

type Sent = { events: { name: string; utmSource: string | null }[] };

/** Fresh module state per test — the queue and the flush timer are module-level. */
async function loadTrack() {
  vi.resetModules();
  return (await import("../track")).track;
}

function sentEvents(fetchMock: ReturnType<typeof vi.fn>): Sent["events"] {
  return fetchMock.mock.calls.flatMap((call) => {
    const body = (call[1] as RequestInit).body as string;
    return (JSON.parse(body) as Sent).events;
  });
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.useFakeTimers();
  fetchMock = vi.fn(() => Promise.resolve(new Response(null, { status: 202 })));
  vi.stubGlobal("fetch", fetchMock);
  window.sessionStorage.clear();
  window.history.replaceState({}, "", "/");
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("track — campaign attribution", () => {
  it("tags an event fired on the landing URL", async () => {
    const track = await loadTrack();
    window.history.replaceState({}, "", "/?utm_source=google&utm_medium=cpc");
    track("page_view");
    await vi.advanceTimersByTimeAsync(2000);

    expect(sentEvents(fetchMock)[0].utmSource).toBe("google");
  });

  it("keeps the campaign after the parameters leave the URL", async () => {
    const track = await loadTrack();
    window.history.replaceState({}, "", "/?utm_source=google&utm_medium=cpc");
    track("page_view");

    // the visitor navigates on; the tag is gone from the address bar
    window.history.replaceState({}, "", "/kontakt");
    track("form_submitted");
    await vi.advanceTimersByTimeAsync(2000);

    const submitted = sentEvents(fetchMock).find((e) => e.name === "form_submitted");
    expect(submitted?.utmSource).toBe("google");
  });

  it("leaves an untagged visit untagged", async () => {
    const track = await loadTrack();
    track("page_view");
    await vi.advanceTimersByTimeAsync(2000);

    expect(sentEvents(fetchMock)[0].utmSource).toBeNull();
  });

  it("does not let a later tag overwrite the one that won the visit", async () => {
    const track = await loadTrack();
    window.history.replaceState({}, "", "/?utm_source=google");
    track("page_view");

    window.history.replaceState({}, "", "/cene?utm_source=newsletter");
    track("cta_click");
    await vi.advanceTimersByTimeAsync(2000);

    const later = sentEvents(fetchMock).find((e) => e.name === "cta_click");
    expect(later?.utmSource).toBe("google");
  });
});
