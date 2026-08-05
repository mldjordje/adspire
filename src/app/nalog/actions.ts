"use server";

import { redirect } from "next/navigation";

import { endPortalSession } from "@/lib/portal/session";

export async function portalLogout() {
  await endPortalSession();
  redirect("/nalog/prijava");
}
