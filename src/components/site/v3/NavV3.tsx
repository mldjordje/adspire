"use client";

import { useEffect, useState } from "react";
import styles from "./HomeV3.module.css";

const LINKS = [
  { label: "O nama", href: "/about-us" },
  { label: "Usluge", href: "/our-services" },
  { label: "Projekti", href: "/our-projects" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/contact-us" },
];

export function NavV3() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.navSolid : ""}`}>
        <div className={styles.navInner}>
          <a href="/" className={styles.navLogo} aria-label="Adspire — početna">
            <span className={styles.logoMark} aria-hidden="true" />
            <span className={styles.logoText}>ADSPIRE</span>
          </a>

          <nav className={styles.navLinks} aria-label="Glavna navigacija">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>

          <a className={styles.navCta} href="/contact-us">Zapali projekat</a>

          <button
            className={styles.navBurger}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={open}
          >
            <span className={open ? styles.burgerOpen : ""} />
            <span className={open ? styles.burgerOpen : ""} />
          </button>
        </div>
      </header>

      <div className={`${styles.navOverlay} ${open ? styles.navOverlayOpen : ""}`} aria-hidden={!open}>
        <nav className={styles.navOverlayLinks}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a className={styles.navOverlayCta} href="/contact-us" onClick={() => setOpen(false)}>Zapali projekat →</a>
        </nav>
        <div className={styles.navOverlayContacts}>
          <a href="mailto:djordje@adspire.rs">djordje@adspire.rs</a>
          <a href="tel:+381601491491">+381 60 149 149 1</a>
        </div>
      </div>
    </>
  );
}
