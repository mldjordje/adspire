import Link from "next/link";
import { logout } from "@/app/os/login/actions";
import { OsNav, type NavCounts } from "./OsNav";

export function OsShell({
  counts,
  email,
  children,
}: {
  counts: NavCounts;
  email: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="os">
      <div className="os-shell">
        <aside className="os-sidebar">
          <Link href="/os" className="os-brand">
            ADSPIRE <span>OS</span>
          </Link>

          <OsNav counts={counts} />

          <div className="os-sidebar__foot">
            {email ? <span className="os-sidebar__user">{email}</span> : null}
            <form action={logout}>
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Odjavi se
              </button>
            </form>
          </div>
        </aside>
        <main className="os-main">{children}</main>
      </div>
    </div>
  );
}
