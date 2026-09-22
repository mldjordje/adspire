import { NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/crm/rateLimit";
import { notifyOwnerOfMessage } from "@/lib/inquiries/notify";
import { getInquiryByToken } from "@/lib/inquiries/store";
import { logMessage } from "@/lib/messages/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The buyer's free-form reply, written on the upit page.
 *
 * Same credential as /api/upit/odgovor: the private token from the mail. The
 * point is that answering a question costs one click and no mailbox — the reply
 * lands on the upit timeline in /os and the owner gets a mail about it.
 */

const MAX_LENGTH = 4000;

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "unknown";

export async function POST(request: Request) {
  const limit = checkRateLimit(`upit-poruka:${clientIp(request)}`, { limit: 10 });
  if (!limit.allowed) {
    return NextResponse.json({ message: "Previše poruka. Pokušaj malo kasnije." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Neispravan zahtev." }, { status: 400 });
  }

  // Honeypot: a filled hidden field is a bot. Pretend it worked.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const token = typeof body.token === "string" ? body.token.trim() : "";
  const text = typeof body.message === "string" ? body.message.trim().slice(0, MAX_LENGTH) : "";
  if (!token || !text) {
    return NextResponse.json({ message: "Poruka je prazna." }, { status: 400 });
  }

  const inquiry = await getInquiryByToken(token);
  if (!inquiry) {
    return NextResponse.json({ message: "Upit nije pronađen." }, { status: 404 });
  }

  const createdAt = new Date().toISOString();
  await logMessage({
    inquiryId: inquiry.id,
    leadId: inquiry.lead_id,
    direction: "in",
    channel: "portal",
    toEmail: null,
    subject: "Odgovor sa strane upita",
    body: text,
    createdBy: inquiry.email,
  });

  await notifyOwnerOfMessage(inquiry, text).catch((error) => {
    console.error("inquiry_message_notify_failed", { reference: inquiry.reference, error });
  });

  return NextResponse.json({ ok: true, createdAt });
}
