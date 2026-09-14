import { describe, expect, it } from "vitest";

import { buildGoogleAuthUrl, encodeGoogleState, readGoogleState } from "../google";

describe("google login state", () => {
  const nonce = "abcdefghijklmnopqrstuvwx";

  it("accepts the nonce it issued and returns the landing page", () => {
    const cookie = encodeGoogleState(nonce, "/nalog/edukacija");
    expect(readGoogleState(cookie, nonce)).toEqual({ next: "/nalog/edukacija" });
  });

  it("refuses a missing or mismatched state", () => {
    const cookie = encodeGoogleState(nonce, "/nalog");
    expect(readGoogleState(cookie, "other-state-value-000000")).toBeNull();
    expect(readGoogleState(undefined, nonce)).toBeNull();
    expect(readGoogleState(cookie, null)).toBeNull();
    expect(readGoogleState("short|/nalog", "short")).toBeNull();
  });

  it("builds an auth url with state, scopes and redirect", () => {
    const url = new URL(buildGoogleAuthUrl(nonce, "client-1", "https://adspire.rs/cb"));
    expect(url.origin).toBe("https://accounts.google.com");
    expect(url.searchParams.get("state")).toBe(nonce);
    expect(url.searchParams.get("client_id")).toBe("client-1");
    expect(url.searchParams.get("redirect_uri")).toBe("https://adspire.rs/cb");
    expect(url.searchParams.get("scope")).toBe("openid email profile");
  });
});
