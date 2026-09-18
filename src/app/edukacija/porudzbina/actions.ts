"use server";

import { redirect } from "next/navigation";

import { placeOrder } from "@/lib/education/orders";
import { findPackage, ORDER_PATH } from "@/lib/education/packages";
import { getPortalSession } from "@/lib/portal/session";

/**
 * Placing an edukacija package order.
 *
 * A server action is a public endpoint, so the session is read here and never
 * taken from the form: the form only says which package, not who.
 */
export async function placeOrderAction(formData: FormData) {
  const packageId = String(formData.get("paket") ?? "").trim();
  const pkg = findPackage(packageId);
  const back = pkg ? `${ORDER_PATH}?paket=${pkg.id}` : ORDER_PATH;

  const session = await getPortalSession();
  if (!session) redirect(`/nalog/prijava?next=${encodeURIComponent(back)}`);
  if (!pkg) redirect(`${back}?greska=paket`);

  const result = await placeOrder({
    portalUserId: session.userId,
    email: session.email,
    fullName: String(formData.get("ime") ?? "").trim() || null,
    packageId: pkg.id,
    goal: String(formData.get("cilj") ?? ""),
    phone: String(formData.get("telefon") ?? ""),
  });

  if (!result.ok) {
    redirect(`${back}${back.includes("?") ? "&" : "?"}greska=${result.code}`);
  }
  redirect("/nalog/edukacija?porudzbina=ok");
}
