import Link from "next/link";

import styles from "./EducationV4.module.css";
import { EDU_PACKAGES, formatEur, PACKAGE_INQUIRY_HREF, pricePerHour } from "@/lib/education/packages";

/** Hour packages inside the account — for a buyer with no hours or running low. */
export function EduPackagesV4({ title, intro }: { title: string; intro: string }) {
  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.muted} style={{ marginTop: 10 }}>
        {intro}
      </p>
      <div className={styles.packages}>
        {EDU_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`${styles.package} ${pkg.featured ? styles.packageFeatured : ""}`}
          >
            <p className={styles.label}>{pkg.label}</p>
            <p className={styles.value}>{formatEur(pkg.priceEur)}</p>
            <p className={styles.itemTitle}>
              {pkg.hours} sati · {formatEur(pricePerHour(pkg))}/h
            </p>
            <p className={styles.muted}>{pkg.note}</p>
            <Link
              className={styles.packageCta}
              href={PACKAGE_INQUIRY_HREF}
              data-cta={`nalog-paket-${pkg.id}`}
              data-cursor="on"
            >
              Izaberi paket →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
