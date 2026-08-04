import Link from "next/link";
import { logout } from "@/app/os/login/actions";

const LINKS = [
  ["/os", "Pregled"],
  ["/os/leads", "Leadovi"],
  ["/os/pipeline", "Pipeline"],
  ["/os/klijenti", "Klijenti"],
  ["/os/fakture", "Fakture"],
  ["/os/podesavanja", "Podešavanja"],
] as const;

export function OsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="os">
      <div className="os-shell">
        <aside className="os-sidebar">
          <Link href="/os" className="os-brand">
            ADSPIRE <span>OS</span>
          </Link>
          <nav>
            {LINKS.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <form action={logout}>
            <button className="os-btn os-btn--ghost" type="submit">
              Odjavi se
            </button>
          </form>
        </aside>
        <main className="os-main">{children}</main>
      </div>
    </div>
  );
}
