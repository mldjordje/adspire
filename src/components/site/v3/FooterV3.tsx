"use client";

import styles from "./HomeV3.module.css";

const SERVICES = [
  { label: "Web sajtovi", href: "/our-services/web-prezentacije" },
  { label: "Web shop", href: "/our-services/e-commerce-web-shop" },
  { label: "Mobilne aplikacije", href: "/our-services/mobilne-aplikacije" },
  { label: "AI automatizacija", href: "/our-services/ai-integracije-automatizacija" },
  { label: "SEO & marketing", href: "/our-services/seo-digitalni-marketing" },
];

const NAV = [
  { label: "O nama", href: "/about-us" },
  { label: "Projekti", href: "/our-projects" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/contact-us" },
];

export function FooterV3() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-light.png" alt="Adspire Digital" className={styles.footerLogo} />
            <p className={styles.footerTagline}>
              Web sistemi i aplikacije koje donose klijente. Iz Niša, za celu Srbiju i region.
            </p>
            <a className={styles.footerCta} href="/contact-us">Zapali projekat →</a>
          </div>

          <div className={styles.footerCols}>
            <div className={styles.footerCol}>
              <h4>Usluge</h4>
              {SERVICES.map((s) => <a key={s.href} href={s.href}>{s.label}</a>)}
            </div>
            <div className={styles.footerCol}>
              <h4>Navigacija</h4>
              {NAV.map((s) => <a key={s.href} href={s.href}>{s.label}</a>)}
            </div>
            <div className={styles.footerCol}>
              <h4>Kontakt</h4>
              <a href="mailto:djordje@adspire.rs">djordje@adspire.rs</a>
              <a href="tel:+381601491491">+381 60 149 149 1</a>
              <span className={styles.footerAddr}>Dimitrija Leka 66, Niš</span>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Adspire Digital. Sva prava zadržana.</span>
          <span className={styles.footerMade}>Iskovano u Nišu 🔥</span>
        </div>
      </div>
    </footer>
  );
}
