import Link from "next/link";

import { portalLogout } from "@/app/nalog/actions";
import styles from "./EducationV4.module.css";

/** Tabs shared by every page inside the client account. */
export function PortalNavV4({ active }: { active: "pregled" | "edukacija" }) {
  const tabs = [
    { id: "pregled", label: "Pregled", href: "/nalog" },
    { id: "edukacija", label: "Edukacija", href: "/nalog/edukacija" },
  ] as const;

  return (
    <nav className={styles.tabs} aria-label="Nalog">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`${styles.tab} ${active === tab.id ? styles.tabActive : ""}`}
          aria-current={active === tab.id ? "page" : undefined}
          data-cursor="on"
        >
          {tab.label}
        </Link>
      ))}
      <form action={portalLogout} className={styles.tabsEnd}>
        <button className={styles.textBtn} type="submit" data-cursor="on">
          Odjavi se
        </button>
      </form>
    </nav>
  );
}
