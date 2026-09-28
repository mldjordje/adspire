"use server";

import { redirect } from "next/navigation";
import { endSession } from "@/lib/os/session";

export async function logout() {
  await endSession();
  redirect("/os/login");
}
