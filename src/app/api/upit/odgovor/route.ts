import { NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/crm/rateLimit";
import { notifyOwnerOfResponse } from "@/lib/inquiries/notify";
import { respondToQuote } from "@/lib/inquiries/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The buyer's answer to a quote.
 *
 * Authorised by the access token alone — the same private link that was mailed
 * with the quote. That is deliberate: the answer must be one click away for
 * someone who never made an account, and the token is unguessable and scoped to
 * a single upit.
 */

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "unknown";

export async function POST(request: Request) {
  const limit = checkRateLimit(`upit-odgovor:${clientIp(request)}`, { limit: 20 });
  if (!limit.allowed) {
    return NextResponse.json({ message: "Previše pokušaja." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Neispravan zahtev." }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token.trim() : "";
  const answer = body.answer === "accepted" || body.answer === "declined" ? body.answer : null;
  const reason =
    typeof body.reason === "string" ? body.reason.trim().slice(0, 1000) || null : null;

  if (!token || !answer) {
    return NextResponse.json({ message: "Neispravan zahtev." }, { status: 400 });
  }

  const inquiry = await respondToQuote(token, answer, reason);
  if (!inquiry) {
    // Either the link is wrong or the upit is no longer awaiting an answer.
    // Both are the same to a stranger: nothing here to act on.
    return NextResponse.json(
      { message: "Ovaj upit više ne čeka odgovor." },
      { status: 409 },
    );
  }

  await notifyOwnerOfResponse(inquiry).catch((error) => {
    console.error("inquiry_response_notify_failed", { reference: inquiry.reference, error });
  });

  return NextResponse.json({ status: inquiry.status });
}
