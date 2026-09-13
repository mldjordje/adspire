"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/os/session";
import { cleanUrl, isEduKind } from "./format";
import { isDate, weekday, monthCells } from "./slots";
import {
  cancelBookingAsStudio,
  grantHours,
  markBookingHeld,
  setAvailability,
  setBookingLink,
} from "./store";

/** Server actions are public endpoints. Every one of them starts here. */
async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/os/login");
  return session;
}

const text = (formData: FormData, key: string): string => String(formData.get(key) ?? "").trim();

/** Where to land after an action. Only ever a page under /os/edukacija, so a
 *  crafted form cannot turn this into an open redirect. */
function back(formData: FormData, params: Record<string, string>): never {
  const raw = text(formData, "back");
  const url = new URL(raw.startsWith("/os/edukacija") ? raw : "/os/edukacija", "http://os.local");
  for (const key of ["poruka", "greska"]) url.searchParams.delete(key);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  revalidatePath("/os/edukacija");
  redirect(`${url.pathname}${url.search}`);
}

export async function grantHoursAction(formData: FormData) {
  const session = await requireSession();
  const sign = text(formData, "direction") === "minus" ? -1 : 1;
  const hours = Number(text(formData, "hours").replace(",", ".")) * sign;
  const kind = text(formData, "kind");

  const result = await grantHours({
    email: text(formData, "email"),
    fullName: text(formData, "fullName") || null,
    kind: isEduKind(kind) ? kind : "education",
    hours,
    reason: text(formData, "reason") || null,
    note: text(formData, "note") || null,
    invoiceId: text(formData, "invoiceId") || null,
    notify: formData.get("notify") !== null,
    createdBy: session.email,
  });

  back(formData, result.ok ? { poruka: result.message } : { greska: result.message });
}

export async function setBookingLinkAction(formData: FormData) {
  await requireSession();
  const field = text(formData, "field") === "recording" ? "recording" : "meet";
  const raw = text(formData, "url");
  const url = raw === "" ? null : cleanUrl(raw);
  if (raw !== "" && url === null) {
    back(formData, { greska: "Link mora biti ispravan http(s) URL." });
  }

  const result = await setBookingLink(text(formData, "id"), field, url);
  if (!result.ok) back(formData, { greska: "Termin nije pronađen." });
  back(formData, {
    poruka:
      field === "recording"
        ? "Snimak sačuvan."
        : url === null
          ? "Link obrisan."
          : result.notified
            ? "Link sačuvan, klijent obavešten."
            : "Link sačuvan.",
  });
}

export async function markHeldAction(formData: FormData) {
  await requireSession();
  const ok = await markBookingHeld(text(formData, "id"));
  back(formData, ok ? { poruka: "Označeno kao održano." } : { greska: "Termin je već zatvoren." });
}

export async function cancelBookingAction(formData: FormData) {
  await requireSession();
  const refund = text(formData, "refund") !== "0";
  const result = await cancelBookingAsStudio(text(formData, "id"), {
    refund,
    reason: text(formData, "reason").slice(0, 300) || null,
  });
  back(formData, result.ok ? { poruka: result.message } : { greska: result.message });
}

export async function saveAvailabilityAction(formData: FormData) {
  await requireSession();
  const date = text(formData, "date");
  if (!isDate(date)) back(formData, { greska: "Neispravan datum." });

  const preset = text(formData, "preset");
  const slots =
    preset === "closed"
      ? []
      : preset === "workday"
        ? ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]
        : formData.getAll("slot").map(String);

  // Repeat onto every later same-weekday in the month: the schedule is usually
  // "Tuesdays 10–14", and clicking eight Tuesdays one by one is how it rots.
  const dates =
    formData.get("repeat") !== null
      ? monthCells(date.slice(0, 7)).filter(
          (d): d is string => d !== null && d >= date && weekday(d) === weekday(date),
        )
      : [date];

  await setAvailability(dates, slots);
  back(formData, {
    poruka:
      dates.length > 1
        ? `Sačuvano za ${dates.length} dana.`
        : slots.length === 0
          ? "Dan zatvoren."
          : "Sačuvano.",
  });
}
