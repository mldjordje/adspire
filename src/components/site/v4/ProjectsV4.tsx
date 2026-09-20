"use client";

import { PageShellV4 } from "./PageShellV4";
import { ClientLogosV4 } from "./ClientLogosV4";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";
import { getProjectRowCopy, getProjectsChrome } from "./projectsCopy";
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
    image: "/images/case-studies/drigic-mobileview.webp",
    accent: "#f2efe6",
  },
  {
    slug: "prevozkop-digitalni-prodajni-operativni-sistem",
    index: "02",
    title: "Prevoz Kop",
    category: "SEO + operativa",
    outcome: "Javni SEO sajt, lead CRM, ponude, proizvodi, radnici, vozila i isporuke.",
    stack: "Next.js · PHP API · MySQL",
    image: "/images/case-studies/prevozkop-desktop.webp",
    accent: "#b9bac9",
  },
  {
    slug: "santos-santorini-web-shop-admin-platforma",
    index: "03",
    title: "Santos & Santorini",
    category: "E-commerce",
    outcome: "Storefront, korpa, checkout, CMS, admin, lager i marketplace integracije.",
    stack: "Next.js · Supabase · Ananas API",
    image: "/images/case-studies/santos-desktop.webp",
    accent: "#b9bac9",
  },
  {
    slug: "teachfromhome-onboarding-sistem-za-remote-nastavnike",
    index: "04",
    title: "TeachFromHome",
    category: "Recruiting platforma",
    outcome: "Google prijava, audio prijave, admin review, referral i funnel analitika.",
    stack: "Next.js · NextAuth · Vercel Postgres",
    image: "/images/case-studies/teachfromhome-desktop.webp",
    accent: "#d8d6e4",
  },
  {
    slug: "toza-ai-platforma-za-ai-video-studio",
    index: "05",
    title: "Toza AI",
    category: "Naplata + termini",
    outcome: "Paketi, naplata, sati u nalogu, termini, fakture i sadržaj sajta u jednom sistemu.",
    stack: "Next.js · Neon · Google OAuth · pdf-lib",
    image: "/images/case-studies/tozai-desktop.webp",
    accent: "#b9bac9",
  },
  {
    slug: "dropz-tattoo-sajt-i-sistem-zakazivanja",
    index: "06",
    title: "Dropz Tattoo",
    category: "WebGL + booking",
    outcome: "WebGL naslovna, upiti sa referencama, kalendar termina, kapare i mesečni pregled naplate.",
    stack: "Next.js · Neon · Three.js · FullCalendar",
    image: "/images/case-studies/dropz-desktop.webp",
    accent: "#d8d6e4",
  },
  {
    slug: "doctor-barber-online-booking-sistem",
    index: "07",
    title: "Doctor Barber",
    category: "Booking sistem",
    outcome: "Javni sajt, online zakazivanje, klijentski nalog, admin kalendar i notifikacije.",
    stack: "Next.js · TypeScript · PHP · PWA",
    image: "/images/case-studies/doctorbarber.webp",
    accent: "#f2efe6",
  },
];

export function ProjectsV4({ locale = defaultLocale }: { locale?: LocaleCode }) {
  const t = getProjectsChrome(locale);
  return (
    <PageShellV4
      eyebrow={t.eyebrow}
      title={
        <>
          {t.title[0]}
          <br />
          {t.title[1]}
          <span className={styles.dot}>.</span>
        </>
      }
      intro={t.intro}
    >
      <div className={styles.list}>
        {PROJECTS.map((p) => {
          const row = getProjectRowCopy(p.slug, locale);
          return (
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
                <span className={styles.rowCat}>{row?.category ?? p.category}</span>
                <h2 className={styles.rowTitle}>{p.title}</h2>
                <p className={styles.rowOutcome}>{row?.outcome ?? p.outcome}</p>
                <div className={styles.rowFoot}>
                  <span className={styles.rowStack}>{p.stack}</span>
                  <span className={styles.rowLink}>{t.rowLink}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <ClientLogosV4 locale={locale} />

      <section className={styles.cta} data-reveal>
        <h2 className={styles.ctaTitle}>{t.cta.title}</h2>
        <p className={styles.ctaText}>{t.cta.text}</p>
        <a
          className={styles.ctaButton}
          href={locale === defaultLocale ? "/upit" : localePath("/contact-us", locale)}
          data-cta="projekti-upit"
          data-cursor="on"
          data-magnetic
        >
          {t.cta.button}
        </a>
      </section>
    </PageShellV4>
  );
}
