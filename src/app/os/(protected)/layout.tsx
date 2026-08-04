import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OsShell } from "@/components/os/OsShell";
import { SetupNotice } from "@/components/os/SetupNotice";
import { isDatabaseConfigured } from "@/lib/db";
import { getSession, isSessionConfigured } from "@/lib/os/session";
import "../os.css";

export const metadata: Metadata = {
  title: "Adspire OS",
  robots: { index: false, follow: false },
};

export default async function ProtectedOsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isDatabaseConfigured() || !isSessionConfigured()) return <SetupNotice />;

  const session = await getSession();
  if (!session) redirect("/os/login");

  return <OsShell>{children}</OsShell>;
}
