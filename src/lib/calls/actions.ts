"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isDate } from "@/lib/education/slots";
import { getSession } from "@/lib/os/session";
import { setCallStatus, setClosedDay } from "./store";
import { CALL_STATUSES, type CallStatus } from "./types";

/** Server actions are public endpoints. Every one of them starts here. */
async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/os/login");
  return session;
}

const text = (formData: FormData, key: string): string => String(formData.get(key) ?? "").trim();

function back(formData: FormData, params: Record<string, string>): never {
  const raw = text(formData, "back");
  // Only ever a page under /os/razgovori, so a crafted form cannot redirect elsewhere.
  const url = new URL(raw.startsWith("/os/razgovori") ? raw : "/os/razgovori", "http://os.local");
  for (const key of ["poruka", "greska"]) url.searchParams.delete(key);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  revalidatePath("/os/razgovori");
  redirect(`${url.pathname}${url.search}`);
}

export async function setCallStatusAction(formData: FormData) {
  await requireSession();
  const status = text(formData, "status");
  if (!(CALL_STATUSES as readonly string[]).includes(status)) {
    back(formData, { greska: "Nepoznat status." });
  }
  const ok = await setCallStatus(text(formData, "id"), status as CallStatus, text(formData, "ownerNote") || null);
  back(formData, ok ? { poruka: "Sačuvano." } : { greska: "Razgovor nije pronađen." });
}

export async function setClosedDayAction(formData: FormData) {
  await requireSession();
  const date = text(formData, "date");
  if (!isDate(date)) back(formData, { greska: "Neispravan datum." });
  const closed = text(formData, "closed") === "1";
  await setClosedDay(date, closed, text(formData, "note") || null);
  back(formData, { poruka: closed ? `${date} zatvoren za razgovore.` : `${date} ponovo otvoren.` });
}
