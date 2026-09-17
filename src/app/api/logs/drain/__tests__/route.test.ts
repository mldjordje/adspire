// @vitest-environment node
import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * The signature check is the whole security of this endpoint: it writes to the
 * database on an unauthenticated POST, so a mistake here is an open write. The
 * parsing lives in lib/analytics/drain.ts and is tested separately; this covers
 * only the gate.
 */

const SECRET = "drain-secret-value";

async function loadRoute(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return import("../route");
}

function signed(body: string, secret = SECRET) {
  return new Request("https://adspire.rs/api/logs/drain", {
    method: "POST",
    body,
    headers: { "x-vercel-signature": createHmac("sha1", secret).update(body).digest("hex") },
  });
}

afterEach(() => {
  delete process.env.VERCEL_LOG_DRAIN_SECRET;
  delete process.env.VERCEL_LOG_DRAIN_VERIFY;
});

describe("log drain endpoint", () => {
  it("is invisible until a secret is configured", async () => {
    const route = await loadRoute({
      VERCEL_LOG_DRAIN_SECRET: undefined,
      VERCEL_LOG_DRAIN_VERIFY: undefined,
    });
    expect(route.GET().status).toBe(404);
    expect((await route.POST(signed("{}"))).status).toBe(404);
  });

  it("echoes the verification token Vercel expects on GET", async () => {
    const route = await loadRoute({
      VERCEL_LOG_DRAIN_SECRET: SECRET,
      VERCEL_LOG_DRAIN_VERIFY: "verify-token",
    });
    const response = route.GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("x-vercel-verify")).toBe("verify-token");
  });

  it("accepts a correctly signed delivery", async () => {
    const route = await loadRoute({ VERCEL_LOG_DRAIN_SECRET: SECRET });
    const body = JSON.stringify([
      { proxy: { path: "/cena-izrade-sajta", userAgent: ["GPTBot/1.1"], statusCode: 200 } },
    ]);
    expect((await route.POST(signed(body))).status).toBe(200);
  });

  it("rejects a wrong signature, a missing one, and a tampered body", async () => {
    const route = await loadRoute({ VERCEL_LOG_DRAIN_SECRET: SECRET });
    const body = JSON.stringify([{ proxy: { path: "/", userAgent: ["GPTBot/1.1"] } }]);

    expect((await route.POST(signed(body, "wrong-secret"))).status).toBe(401);

    const unsigned = new Request("https://adspire.rs/api/logs/drain", { method: "POST", body });
    expect((await route.POST(unsigned)).status).toBe(401);

    // Signature computed over a different body than the one delivered.
    const tampered = new Request("https://adspire.rs/api/logs/drain", {
      method: "POST",
      body: JSON.stringify([{ proxy: { path: "/injected", userAgent: ["GPTBot/1.1"] } }]),
      headers: { "x-vercel-signature": createHmac("sha1", SECRET).update(body).digest("hex") },
    });
    expect((await tampered.clone().text()).length).toBeGreaterThan(0);
    expect((await route.POST(tampered)).status).toBe(401);
  });

  it("answers 200 on a signed but unusable body, so Vercel does not retry forever", async () => {
    const route = await loadRoute({ VERCEL_LOG_DRAIN_SECRET: SECRET });
    expect((await route.POST(signed("not json at all"))).status).toBe(200);
  });
});
