"use client";

import { PageShellV4 } from "./PageShellV4";
import styles from "./ProjectsV4.module.css";

/**
 * Projects index — editorial rows, one per case study. Real screenshots,
 * category / stack / outcome meta, big index numbers. Sales-critical page,
 * so every row is a full-bleed link into the case study.
 */

type ProjectRow = {
  slug: string;
  index: string;
  title: string;
  category: string;
  outcome: string;
  stack: string;
  image: string;
  accent: string;
};

const PROJECTS: ProjectRow[] = [
  {
    slug: "dr-igic-web-aplikacija-za-estetske-klinike",
    index: "01",
    title: "Dr Igić Clinic",
    category: "Booking + klinika",
    outcome: "Sajt, booking, admin kalendar, Beauty Pass i analitika rade kao jedan sistem.",
    stack: "Next.js · PostgreSQL · Drizzle · Vercel",
    image: "/images/case-studies/drigic-mobileview.png",
    accent: "#9d6bff",
  },
  {
    slug: "prevozkop-digitalni-prodajni-operativni-sistem",
    index: "02",
    title: "Prevoz Kop",
    category: "SEO + operativa",
    outcome: "Javni SEO sajt, lead CRM, ponude, proizvodi, radnici, vozila i isporuke.",
    stack: "Next.js · PHP API · MySQL",
    image: "/images/case-studies/prevozkop-desktop.png",
    accent: "#ff5c9d",
  },
  {
    slug: "santos-santorini-web-shop-admin-platforma",
    index: "03",
    title: "Santos & Santorini",
    category: "E-commerce",
    outcome: "Storefront, korpa, checkout, CMS, admin, lager i marketplace integracije.",
    stack: "Next.js · Supabase · Ananas API",
    image: "/images/case-studies/santos-desktop.png",
    accent: "#ff5c9d",
  },
  {
    slug: "teachfromhome-onboarding-sistem-za-remote-nastavnike",
    index: "04",
    title: "TeachFromHome",
    category: "Recruiting platforma",
    outcome: "Google prijava, audio prijave, admin review, referral i funnel analitika.",
    stack: "Next.js · NextAuth · Vercel Postgres",
    image: "/images/case-studies/teachfromhome-desktop.png",
    accent: "#c084fc",
  },
  {
    slug: "doctor-barber-online-booking-sistem",
    index: "05",
    title: "Doctor Barber",
    category: "Booking sistem",
    outcome: "Javni sajt, online zakazivanje, klijentski nalog, admin kalendar i notifikacije.",
    stack: "Next.js · TypeScript · PHP · PWA",
    image: "/images/case-studies/doctorbarber.png",
    accent: "#9d6bff",
  },
];

export function ProjectsV4() {
  return (
    <PageShellV4
      eyebrow="Radovi / Case studies"
      title={
        <>
          SISTEMI KOJI
          <br />
          RADE ZA KLIJENTE<span className={styles.dot}>.</span>
        </>
      }
      intro="Ne screenshotovi za portfolio — produkcijski sistemi koji svakodnevno rade za realne firme. Svaki dovodi upite, prodaje ili štedi sate rada."
    >
      <div className={styles.list}>
        {PROJECTS.map((p) => (
          <a
            key={p.slug}
            className={styles.row}
            href={`/our-projects/${p.slug}`}
            data-cursor="otvori"
            data-reveal
            style={{ "--accent": p.accent } as React.CSSProperties}
          >
            <div className={styles.rowMedia}>
              <span className={styles.rowIndex}>{p.index}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.rowImg} src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className={styles.rowInfo}>
              <span className={styles.rowCat}>{p.category}</span>
              <h2 className={styles.rowTitle}>{p.title}</h2>
              <p className={styles.rowOutcome}>{p.outcome}</p>
              <div className={styles.rowFoot}>
                <span className={styles.rowStack}>{p.stack}</span>
                <span className={styles.rowLink}>Pogledaj case study →</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <section className={styles.cta} data-reveal>
        <h2 className={styles.ctaTitle}>Vaš sistem je sledeći.</h2>
        <p className={styles.ctaText}>
          Ispričajte nam problem — vraćamo konkretan predlog i prototip za 48h.
        </p>
        <a className={styles.ctaButton} href="/contact-us" data-cursor="on" data-magnetic>
          Zakaži besplatan poziv →
        </a>
      </section>
    </PageShellV4>
  );
}
