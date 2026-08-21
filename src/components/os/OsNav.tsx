"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Sidebar navigation.
 *
 * A client component for one reason: the active section has to be obvious
 * without reading the URL bar. The badges are counts of work that is waiting —
 * they are the only numbers in the shell, so a number here always means
 * "someone is waiting on you".
 */

export type NavCounts = {
  newLeads: number;
  waitingInquiries: number;
  dueFollowUps: number;
  overdueInvoices: number;
};

type Item = {
  href: string;
  label: string;
  count?: number;
  /** Red instead of blue: money or a promise already past its date. */
  alert?: boolean;
};

export function OsNav({ counts }: { counts: NavCounts }) {
  const pathname = usePathname() ?? "/os";

  const groups: { title: string; items: Item[] }[] = [
    {
      title: "Danas",
      items: [
        { href: "/os", label: "Pregled", count: counts.dueFollowUps, alert: true },
      ],
    },
    {
      title: "Prodaja",
      items: [
        { href: "/os/upiti", label: "Upiti", count: counts.waitingInquiries, alert: true },
        { href: "/os/leads", label: "Leadovi", count: counts.newLeads },
        { href: "/os/pipeline", label: "Pipeline" },
        { href: "/os/analitika", label: "Analitika" },
      ],
    },
    {
      title: "Posao",
      items: [
        { href: "/os/klijenti", label: "Klijenti" },
        { href: "/os/fakture", label: "Fakture", count: counts.overdueInvoices, alert: true },
        { href: "/os/podesavanja", label: "Podešavanja" },
      ],
    },
  ];

  const isActive = (href: string) =>
    href === "/os" ? pathname === "/os" : pathname.startsWith(href);

  return (
    <nav className="os-nav">
      {groups.map((group) => (
        <div key={group.title} className="os-nav__group">
          <span className="os-nav__title">{group.title}</span>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`os-nav__link${isActive(item.href) ? " is-active" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <span>{item.label}</span>
              {item.count ? (
                <span className={`os-nav__count${item.alert ? " is-alert" : ""}`}>
                  {item.count}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
