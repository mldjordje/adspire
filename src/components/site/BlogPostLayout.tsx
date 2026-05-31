import Link from "next/link";
import type { BlogPost, BlogSection } from "@/data/blogPosts";

function Section({ s }: { s: BlogSection }) {
  switch (s.type) {
    case "h2":
      return <h2 className="bp-h2">{s.text}</h2>;
    case "h3":
      return <h3 className="bp-h3">{s.text}</h3>;
    case "p":
      return <p className="bp-p">{s.text}</p>;
    case "ul":
      return (
        <ul className="bp-ul">
          {s.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return <blockquote className="bp-callout">{s.text}</blockquote>;
    case "divider":
      return <hr className="bp-divider" />;
    default:
      return null;
  }
}

type Props = {
  post: BlogPost;
  related: BlogPost[];
};

export function BlogPostLayout({ post, related }: Props) {
  return (
    <div className="bp-root">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="bp-hero">
        <div className="bp-hero__inner">
          <nav className="bp-breadcrumb">
            <Link href="/">Početna</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span>{post.category}</span>
          </nav>

          <div className="bp-hero__meta">
            <span className="bp-category">{post.category}</span>
            <span className="bp-dot">·</span>
            <span className="bp-date">{post.date}</span>
            <span className="bp-dot">·</span>
            <span className="bp-readtime">{post.readTime} čitanja</span>
          </div>

          <h1 className="bp-title">{post.title}</h1>
          <p className="bp-excerpt">{post.excerpt}</p>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <article className="bp-body">
        <div className="bp-body__inner">
          {post.body.map((s, i) => (
            <Section key={i} s={s} />
          ))}
        </div>
      </article>

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <section className="bp-cta">
        <div className="bp-cta__inner">
          <p className="bp-cta__label">Imaš projekat u glavi?</p>
          <h2 className="bp-cta__heading">Pričajmo o tome.</h2>
          <Link href="/contact-us" className="bp-cta__btn">
            Pokreni razgovor
          </Link>
        </div>
      </section>

      {/* ── Related posts ────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bp-related">
          <div className="bp-related__inner">
            <h2 className="bp-related__heading">Pročitaj i ovo</h2>
            <div className="bp-related__grid">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="bp-related__card">
                  <img src={r.image} alt={r.title} />
                  <div className="bp-related__card-body">
                    <span className="bp-category">{r.category}</span>
                    <h3>{r.title}</h3>
                    <p>{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back link ────────────────────────────────────────────────────── */}
      <div className="bp-back">
        <Link href="/blog" className="bp-back__link">
          ← Svi postovi
        </Link>
      </div>
    </div>
  );
}
