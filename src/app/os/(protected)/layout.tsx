import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OsShell } from "@/components/os/OsShell";
import { SetupNotice } from "@/components/os/SetupNotice";
import { isDatabaseConfigured } from "@/lib/db";
import { getSession, isSessionConfigured } from "@/lib/os/session";
import { getOsCounters } from "@/lib/os/workqueue";
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

  // A shell that cannot render its badges is still a usable shell: an empty set
  // of counters beats a stack trace on every page when a migration is pending.
  const counts = await getOsCounters().catch(() => ({
    newLeads: 0,
    waitingInquiries: 0,
    dueFollowUps: 0,
    overdueInvoices: 0,
  }));

  return (
    <OsShell counts={counts} email={session.email}>
      {children}
    </OsShell>
  );
}
