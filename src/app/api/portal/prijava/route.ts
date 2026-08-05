import { NextResponse } from "next/server";
import { z } from "zod";

import { isDatabaseConfigured } from "@/lib/db";
import { checkRateLimit } from "@/lib/crm/rateLimit";
import { sendPortalLoginLink } from "@/lib/inquiries/notify";
import { isPortalConfigured } from "@/lib/portal/session";
import { createLoginToken, upsertPortalUser } from "@/lib/portal/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Asks for a login link.
 *
 * Always answers the same way, whether or not the address has upiti behind it:
 * a different answer would turn this route into a way to test which of your
 * clients uses Adspire.
 */

const schema = z.object({
  email: z
    .string()
    .trim()
    .max(254)
    .transform((value) => value.toLowerCase())
    .pipe(z.email()),
});

const OK = { message: "Ako nalog postoji, link za prijavu je poslat na tu adresu." };

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "unknown";

export async function POST(request: Request) {
  const limit = checkRateLimit(`portal-login:${clientIp(request)}`, { limit: 5 });
  if (!limit.allowed) {
    return NextResponse.json(
      { message: "Previše pokušaja. Probajte ponovo za koji minut." },
      { status: 429, headers: { "retry-after": String(limit.retryAfterSeconds) } },
    );
  }

  if (!isPortalConfigured() || !isDatabaseConfigured()) {
    return NextResponse.json(
      { message: "Prijava trenutno nije dostupna. Koristite link iz mejla o upitu." },
      { status: 503 },
    );
  }

  let email: string;
  try {
    ({ email } = schema.parse(await request.json()));
  } catch {
    return NextResponse.json({ message: "Unesite ispravnu email adresu." }, { status: 400 });
  }

  try {
    const user = await upsertPortalUser(email);
    const token = await createLoginToken(user.id);
    await sendPortalLoginLink(email, token);
  } catch (error) {
    console.error("portal_login_failed", { error });
  }

  return NextResponse.json(OK);
}
