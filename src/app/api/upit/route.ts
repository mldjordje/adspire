import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { isDatabaseConfigured } from "@/lib/db";
import { normalizeAttribution } from "@/lib/crm/attribution";
import { checkRateLimit } from "@/lib/crm/rateLimit";
import { createInquiry } from "@/lib/inquiries/store";
import { notifyBuyerOfInquiry, notifyOwnerOfInquiry } from "@/lib/inquiries/notify";
import { parseInquirySubmission } from "@/lib/inquiries/validation";
import { getPortalSession } from "@/lib/portal/session";
import { upsertPortalUser } from "@/lib/portal/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A service brief from /upit or /upit/[slug].
 *
 * NO LOGIN. An account is optional everywhere in this flow — if the buyer
 * happens to have a portal session the upit is attached to it, and if not they
 * get a private status link by mail. Requiring a login before a price is how
 * the brief gets abandoned instead of sent.
 *
 * Unlike /api/leads, this route needs the database: an upit that is only an
 * email cannot be quoted, tracked or accepted, so there is nothing to fall back
 * to and a failed write is an honest 503.
 */

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "unknown";

export async function POST(request: Request) {
  const requestId = request.headers.get("x-request-id") ?? `upit_${crypto.randomUUID()}`;

  const limit = checkRateLimit(`upit:${clientIp(request)}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { message: "Previše pokušaja. Probajte ponovo za koji minut.", requestId },
      { status: 429, headers: { "retry-after": String(limit.retryAfterSeconds) } },
    );
  }

  let parsed;
  try {
    const raw = (await request.json()) as Record<string, unknown>;
    parsed = parseInquirySubmission({
      ...raw,
      requestId: typeof raw.requestId === "string" && raw.requestId ? raw.requestId : requestId,
      attribution: normalizeAttribution((raw.attribution as Record<string, unknown>) ?? {}),
    });
  } catch (error) {
    const fields =
      error instanceof ZodError
        ? Object.fromEntries(
            error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]),
          )
        : {};
    console.error("inquiry_invalid", { requestId, fields });
    return NextResponse.json(
      { message: "Proverite unete podatke.", fields, requestId },
      { status: 400 },
    );
  }

  if (!isDatabaseConfigured()) {
    console.error("inquiry_db_missing", { requestId });
    return NextResponse.json(
      { message: "Slanje trenutno ne radi. Pišite na djordje@adspire.rs.", requestId },
      { status: 503 },
    );
  }

  // A brief that arrives while signed in belongs to that account. Signed out,
  // the account is created only when the buyer asks for one.
  const session = await getPortalSession();
  let portalUserId: string | null = null;
  if (session) {
    try {
      const user = await upsertPortalUser(session.email, {
        fullName: parsed.fullName,
        phone: parsed.phone,
      });
      portalUserId = user.id;
    } catch (error) {
      console.error("inquiry_portal_link_failed", { requestId, error });
    }
  }

  let inquiry;
  try {
    inquiry = await createInquiry(parsed, { portalUserId });
  } catch (error) {
    console.error("inquiry_store_failed", { requestId, error });
    return NextResponse.json(
      { message: "Upit nije sačuvan. Pišite na djordje@adspire.rs.", requestId },
      { status: 500 },
    );
  }

  // Mail is best effort: the brief is already stored and visible in /os.
  await Promise.allSettled([
    notifyBuyerOfInquiry(parsed, inquiry),
    notifyOwnerOfInquiry(parsed, inquiry),
  ]);

  return NextResponse.json(
    {
      reference: inquiry.reference,
      statusPath: `/upit/status/${inquiry.accessToken}`,
      requestId,
    },
    { status: inquiry.created ? 201 : 200, headers: { "x-request-id": requestId } },
  );
}
