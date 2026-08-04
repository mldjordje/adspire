"use server";

import { redirect } from "next/navigation";
import { isDatabaseConfigured } from "@/lib/db";
import { verifyPassword } from "@/lib/os/password";
import { endSession, isSessionConfigured, startSession } from "@/lib/os/session";
import { findUserByEmail } from "@/lib/os/users";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!isDatabaseConfigured() || !isSessionConfigured()) redirect("/os/login?error=setup");

  const user = await findUserByEmail(email);
  // The hash is verified even when no user matched, against a value that cannot
  // match, so a wrong email and a wrong password take the same time to reject.
  const ok = await verifyPassword(password, user?.password_hash ?? "scrypt$16384$8$1$AA==$AA==");
  if (!user || !ok) redirect("/os/login?error=invalid");

  await startSession({ userId: user.id, email: user.email });
  redirect("/os");
}

export async function logout() {
  await endSession();
  redirect("/os/login");
}
