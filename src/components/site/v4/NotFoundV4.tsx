"use client";

import Link from "next/link";
import { PageShellV4 } from "./PageShellV4";
import styles from "./NotFoundV4.module.css";

/**
 * 404 on the OBSIDIAN chrome — same nav / footer language as the inner pages,
 * no leftover template. Steers lost visitors back to the money pages.
 */
export function NotFoundV4() {
  return (
    <PageShellV4
      eyebrow="Greška 404"
      title={
        <>
          STRANICA NE
          <br />
          POSTOJI<span className={styles.dot}>.</span>
        </>
      }
      intro="Link je zastareo ili je stranica premeštena. Vratite se na početak ili idite pravo na ono što vam treba."
    >
      <nav className={styles.links} aria-label="Predlozi">
        <Link className={styles.link} href="/">Početna</Link>
        <Link className={styles.link} href="/our-services">Usluge</Link>
        <Link className={styles.link} href="/our-projects">Projekti</Link>
        <Link className={styles.link} href="/contact-us">Kontakt</Link>
      </nav>
    </PageShellV4>
  );
}
