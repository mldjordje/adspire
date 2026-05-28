import Link from "next/link";
import { AzurioChrome } from "@/components/site/AzurioChrome";
import type { ProjectCaseStudy } from "@/data/projectCaseStudies";

type MarkdownBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
    paragraph = [];
  };

  const flushList = () => {
    if (!list) return;
    blocks.push({ type: "list", ordered: list.ordered, items: list.items });
    list = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: heading[1].length as 2 | 3 | 4,
        text: heading[2],
      });
      continue;
    }

    const unordered = line.match(/^-\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const isOrdered = Boolean(ordered);
      const item = (unordered?.[1] ?? ordered?.[1] ?? "").trim();
      if (!list || list.ordered !== isOrdered) {
        flushList();
        list = { ordered: isOrdered, items: [] };
      }
      list.items.push(item);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    return <span key={index}>{part}</span>;
  });
}

type ProjectCaseStudyPageProps = {
  project: ProjectCaseStudy;
  heroTitle: string;
  heroSubtitle: string;
  shortDescription: string;
  ctaItems: string[];
  body: string;
};

export function ProjectCaseStudyPage({
  project,
  heroTitle,
  heroSubtitle,
  shortDescription,
  ctaItems,
  body,
}: ProjectCaseStudyPageProps) {
  const blocks = parseMarkdown(body);
  const images = [project.image, ...(project.extraImages ?? [])];

  return (
    <AzurioChrome>
      <main className="case-study-page">
        <section className="case-study-hero blur-section">
          <div className="mxd-container grid-l-container">
            <div className="case-study-breadcrumbs breadcrumbs__nav">
              <span>
                <Link href="/">
                  <span className="mxd-scramble">Pocetna</span>
                </Link>
              </span>
              <span>
                <Link href="/our-projects">
                  <span className="mxd-scramble">Projekti</span>
                </Link>
              </span>
              <span className="current-item">{project.shortTitle}</span>
            </div>
            <div className="case-study-hero__grid">
              <div className="case-study-hero__copy">
                <span className="tag tag-m meta-tag">{project.category}</span>
                <h1>{heroTitle}</h1>
                <p className="case-study-hero__lead">{heroSubtitle}</p>
                <div className="case-study-hero__actions">
                  <Link className="btn btn-line btn-line-default" href="#case-study-content">
                    <span className="btn-caption mxd-scramble">{ctaItems[0] ?? "Pogledaj case study"}</span>
                  </Link>
                  <Link className="btn btn-line btn-line-default" href="/contact-us">
                    <span className="btn-caption mxd-scramble">Zakazi konsultaciju</span>
                  </Link>
                </div>
              </div>
              <div className="case-study-hero__media">
                <img src={project.image} alt={project.title} />
              </div>
            </div>
          </div>
        </section>

        <section className="case-study-summary blur-section">
          <div className="mxd-container grid-l-container">
            <div className="case-study-summary__grid">
              <div>
                <span className="case-study-summary__label">Ukratko</span>
                <p>{shortDescription}</p>
              </div>
              <div>
                <span className="case-study-summary__label">Stack</span>
                <p>{project.stack}</p>
              </div>
              <div>
                <span className="case-study-summary__label">Rezultat</span>
                <p>{project.outcome}</p>
              </div>
              <div>
                <span className="case-study-summary__label">Live</span>
                <p>
                  <a href={project.website} target="_blank" rel="noreferrer">
                    {project.website.replace(/^https?:\/\//, "")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {images.length > 1 ? (
          <section className="case-study-gallery blur-section">
            <div className="mxd-container grid-l-container">
              <div className="case-study-gallery__grid">
                {images.map((image) => (
                  <img key={image} src={image} alt={project.title} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="case-study-content" className="case-study-content blur-section">
          <div className="mxd-container grid-l-container">
            <article className="case-study-article">
              {blocks.map((block, index) => {
                if (block.type === "heading") {
                  const HeadingTag = `h${block.level}` as "h2" | "h3" | "h4";
                  return <HeadingTag key={index}>{renderInline(block.text)}</HeadingTag>;
                }

                if (block.type === "list") {
                  const ListTag = block.ordered ? "ol" : "ul";
                  return (
                    <ListTag key={index}>
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{renderInline(item)}</li>
                      ))}
                    </ListTag>
                  );
                }

                return <p key={index}>{renderInline(block.text)}</p>;
              })}
            </article>
          </div>
        </section>

        <section className="case-study-cta blur-section">
          <div className="mxd-container grid-l-container">
            <div className="case-study-cta__inner">
              <span className="tag tag-m meta-tag">Slican projekat</span>
              <h2>Hoces da ovakav sistem prilagodimo tvom biznisu?</h2>
              <p>
                Posalji nam kontekst, cilj i trenutni problem. Vracamo konkretan predlog
                sledeceg koraka.
              </p>
              <Link className="btn btn-line btn-line-default" href="/contact-us">
                <span className="btn-caption mxd-scramble">Pokreni razgovor</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </AzurioChrome>
  );
}
