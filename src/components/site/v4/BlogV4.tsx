"use client";

import { BLOG_POSTS } from "@/data/blogPosts";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";
import { PageShellV4 } from "./PageShellV4";
import styles from "./BlogV4.module.css";

/**
 * Blog index.
 *
 * The articles are written in Serbian and have no prefixed routes, so /en/blog
 * and /de/blog stay out of the index (see TRANSLATED_PATHS). The chrome is
 * still translated: a visitor who follows the header link from the English
 * site should at least be told, in English, what they are looking at.
 */

type BlogChrome = {
  eyebrow: string;
  title: [string, string];
  intro: string;
  readLink: string;
};

const CHROME: Record<LocaleCode, BlogChrome> = {
  sr: {
    eyebrow: "Blog / Praksa iz produkcije",
    title: ["ZAPISI IZ", "RADIONICE"],
    intro:
      "Konkretni tekstovi o web sistemima, performansama, booking tokovima, e-commerce-u i AI automatizaciji.",
    readLink: "Procitaj tekst",
  },
  en: {
    eyebrow: "Blog / Notes from production",
    title: ["NOTES FROM", "THE WORKSHOP"],
    intro:
      "Pieces on web systems, performance, booking flows, e-commerce and AI automation. The articles themselves are in Serbian.",
    readLink: "Read the piece",
  },
  de: {
    eyebrow: "Blog / Notizen aus der Produktion",
    title: ["NOTIZEN AUS", "DER WERKSTATT"],
    intro:
      "Texte über Websysteme, Performance, Buchungsabläufe, E-Commerce und KI-Automatisierung. Die Beiträge selbst sind auf Serbisch.",
    readLink: "Beitrag lesen",
  },
};

export function BlogV4({ locale = defaultLocale }: { locale?: LocaleCode }) {
  const t = CHROME[locale] ?? CHROME.sr;
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
      <section className={styles.list} data-reveal>
        {BLOG_POSTS.map((post, index) => (
          <a key={post.slug} className={styles.card} href={`/blog/${post.slug}`} data-cursor="otvori">
            <div className={styles.media}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.title} loading={index < 2 ? "eager" : "lazy"} />
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className={styles.body}>
              <div className={styles.meta}>
                <span>{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <span className={styles.link}>{t.readLink}</span>
            </div>
          </a>
        ))}
      </section>
    </PageShellV4>
  );
}
