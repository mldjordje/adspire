"use client";

import { BLOG_POSTS } from "@/data/blogPosts";
import { PageShellV4 } from "./PageShellV4";
import styles from "./BlogV4.module.css";

export function BlogV4() {
  return (
    <PageShellV4
      eyebrow="Blog / Praksa iz produkcije"
      title={
        <>
          ZAPISI IZ
          <br />
          RADIONICE<span className={styles.dot}>.</span>
        </>
      }
      intro="Konkretni tekstovi o web sistemima, performansama, booking tokovima, e-commerce-u i AI automatizaciji."
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
              <span className={styles.link}>Procitaj tekst</span>
            </div>
          </a>
        ))}
      </section>
    </PageShellV4>
  );
}
