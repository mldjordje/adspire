import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { isDatabaseConfigured } from "@/lib/db";
import { normalizeAttribution } from "@/lib/crm/attribution";
import { createLeadIntake } from "@/lib/crm/leads";
import { notifyOwnerOfLead } from "@/lib/crm/notify";
import { checkRateLimit } from "@/lib/crm/rateLimit";
import { leadSubmissionSchema } from "@/lib/crm/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "unknown";

export async function POST(request: Request) {
  const requestId = request.headers.get("x-request-id") ?? `web_${crypto.randomUUID()}`;

  const limit = checkRateLimit(clientIp(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { message: "Previše pokušaja. Probajte ponovo za koji minut.", requestId },
      { status: 429, headers: { "retry-after": String(limit.retryAfterSeconds) } },
    );
  }

  let parsed;
  try {
    const raw = (await request.json()) as Record<string, unknown>;
    parsed = leadSubmissionSchema.parse({
      ...raw,
      requestId: typeof raw.requestId === "string" && raw.requestId ? raw.requestId : requestId,
      attribution: normalizeAttribution((raw.attribution as Record<string, unknown>) ?? {}),
    });
  } catch (error) {
    console.error("lead_intake_invalid", { requestId, zod: error instanceof ZodError });
    return NextResponse.json(
      { message: "Proverite unete podatke.", requestId },
      { status: 400 },
    );
  }

  // The database is the record of truth, but until Neon is configured the
  // email notification alone must not let a lead disappear.
  let leadId: string | null = null;
  let stored = false;
  if (isDatabaseConfigured()) {
    try {
      const result = await createLeadIntake(parsed);
      leadId = result.leadId;
      stored = true;
    } catch (error) {
      console.error("lead_intake_db_failed", { requestId, error });
    }
  }

  let notified = false;
  try {
    notified = await notifyOwnerOfLead(parsed, { leadId, requestId });
  } catch (error) {
    console.error("lead_notify_failed", { requestId, error });
  }

  if (!stored && !notified) {
    return NextResponse.json(
      { message: "Upit trenutno nije sačuvan. Pišite na djordje@adspire.rs.", requestId },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { leadId, stored, notified, requestId },
    { status: stored ? 201 : 200, headers: { "x-request-id": requestId } },
  );
}
