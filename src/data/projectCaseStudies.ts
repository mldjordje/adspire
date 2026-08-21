import { readFileSync } from "node:fs";
import path from "node:path";

export type ProjectCaseStudy = {
  slug: string;
  fileName: string;
  title: string;
  shortTitle: string;
  category: string;
  image: string;
  extraImages?: string[];
  website: string;
  stack: string;
  outcome: string;
};

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "dr-igic-web-aplikacija-za-estetske-klinike",
    fileName: "web-app-za-estetske-klinike-dr-igic-copy.md",
    title: "Dr Igic - web aplikacija za estetske klinike",
    shortTitle: "Dr Igic Clinic",
    category: "Booking + klinika",
    image: "/images/case-studies/drigic-mobileview.webp",
    website: "https://drigic.rs",
    stack: "Next.js, PostgreSQL, Drizzle, Vercel Blob, Resend",
    outcome: "Sajt, booking, admin kalendar, Beauty Pass i analitika rade kao jedan sistem.",
  },
  {
    slug: "prevozkop-digitalni-prodajni-operativni-sistem",
    fileName: "case-study-prevozkop.md",
    title: "Prevoz Kop - digitalni prodajni i operativni sistem",
    shortTitle: "Prevoz Kop",
    category: "SEO + operativa",
    image: "/images/case-studies/prevozkop-desktop.webp",
    website: "https://prevozkop.rs",
    stack: "Next.js, PHP API, MySQL, Vercel, cPanel",
    outcome: "Javni SEO sajt, lead CRM, ponude, proizvodi, radnici, vozila i isporuke.",
  },
  {
    slug: "santos-santorini-web-shop-admin-platforma",
    fileName: "case-study-santos.md",
    title: "Santos & Santorini - web shop i admin platforma",
    shortTitle: "Santos & Santorini",
    category: "E-commerce",
    image: "/images/case-studies/santos-desktop.webp",
    extraImages: ["/images/case-studies/santos-mobile.webp"],
    website: "https://www.santos.rs",
    stack: "Next.js, Supabase, Resend, Ananas API, Sharp",
    outcome: "Storefront, korpa, checkout, CMS, admin, lager i marketplace integracije.",
  },
  {
    slug: "teachfromhome-onboarding-sistem-za-remote-nastavnike",
    fileName: "case-study-teachfromhome.md",
    title: "TeachFromHome - onboarding sistem za remote nastavnike",
    shortTitle: "TeachFromHome",
    category: "Recruiting platforma",
    image: "/images/case-studies/teachfromhome-desktop.webp",
    website: "https://teachfromhome.app",
    stack: "Next.js, NextAuth, Vercel Postgres, Drizzle, Vercel Blob",
    outcome: "Google prijava, audio prijave, admin review, referral i funnel analitika.",
  },
  {
    slug: "toza-ai-platforma-za-ai-video-studio",
    fileName: "case-study-tozaai.md",
    title: "Toza AI - platforma za AI video studio",
    shortTitle: "Toza AI",
    category: "Naplata + termini",
    image: "/images/case-studies/tozai-desktop.webp",
    website: "https://toza-ai.rs",
    stack: "Next.js, Neon Postgres, Google OAuth, Vercel Blob, pdf-lib",
    outcome: "Paketi, naplata, sati u nalogu, termini, fakture i sadržaj sajta u jednom sistemu.",
  },
  {
    slug: "dropz-tattoo-sajt-i-sistem-zakazivanja",
    fileName: "case-study-dropz.md",
    title: "Dropz Tattoo - sajt i sistem zakazivanja",
    shortTitle: "Dropz Tattoo",
    category: "WebGL + booking",
    image: "/images/case-studies/dropz-desktop.webp",
    website: "https://dropz.rs",
    stack: "Next.js, Neon Postgres, Three.js, FullCalendar, Vercel Blob",
    outcome: "WebGL naslovna, upiti sa referencama, kalendar termina, kapare i mesečni pregled naplate.",
  },
  {
    slug: "doctor-barber-online-booking-sistem",
    fileName: "case-study-doctorbarber.md",
    title: "Doctor Barber - online booking sistem",
    shortTitle: "Doctor Barber",
    category: "Booking sistem",
    image: "/images/case-studies/doctorbarber.webp",
    website: "https://doctorbarber.rs",
    stack: "Next.js, React, TypeScript, PHP API, MySQL, PWA",
    outcome: "Javni sajt, online zakazivanje, klijentski nalog, admin kalendar i notifikacije.",
  },
];

const CASE_STUDY_ROOT = path.join(process.cwd(), "novi-projekti");

export const projectCaseStudySlugs = projectCaseStudies.map((project) => project.slug);

export function findProjectCaseStudy(slug: string) {
  return projectCaseStudies.find((project) => project.slug === slug) ?? null;
}

export function readProjectCaseStudyMarkdown(project: ProjectCaseStudy) {
  return readFileSync(path.join(CASE_STUDY_ROOT, project.fileName), "utf-8");
}

function extractSection(markdown: string, title: string) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(
    new RegExp(`^##\\s+${escapedTitle}\\s*$([\\s\\S]*?)(?=^##\\s+|(?![\\s\\S]))`, "im"),
  );
  return match?.[1]?.trim() ?? "";
}

function extractSubsection(markdown: string, title: string) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(
    new RegExp(`^###\\s+${escapedTitle}\\s*$([\\s\\S]*?)(?=^###\\s+|^##\\s+|(?![\\s\\S]))`, "im"),
  );
  return match?.[1]?.trim() ?? "";
}

function firstParagraph(section: string) {
  return section
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .find(Boolean) ?? "";
}

function plainLine(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^-+\s*/, "").trim())
    .find(Boolean) ?? "";
}

/** Split a section body into its `### subsection` blocks. */
function extractSubsectionBlocks(section: string) {
  const blocks: { title: string; lines: string[]; paragraph: string }[] = [];
  const parts = section.split(/^###\s+/m).slice(1);
  for (const part of parts) {
    const [titleLine, ...rest] = part.split(/\r?\n/);
    const bodyLines = rest.map((l) => l.trim()).filter(Boolean);
    const lines = bodyLines
      .filter((l) => l.startsWith("-"))
      .map((l) => l.replace(/^-+\s*/, "").trim());
    const paragraph = bodyLines.find((l) => !l.startsWith("-") && !l.startsWith("#")) ?? "";
    blocks.push({ title: titleLine.trim(), lines, paragraph });
  }
  return blocks;
}

/** First non-empty section matching any of the candidate titles. */
function firstSectionOf(markdown: string, titles: string[]) {
  for (const t of titles) {
    const s = extractSection(markdown, t);
    if (s) return s;
  }
  return "";
}

/**
 * Structured content for the OBSIDIAN (v4) case study page. Pulls the
 * consistent sections across all case-study markdown files into typed data.
 */
export function getCaseStudyV4Content(project: ProjectCaseStudy) {
  const markdown = readProjectCaseStudyMarkdown(project);
  const base = getProjectCaseStudyContent(project);

  const intro = firstParagraph(extractSection(markdown, "Case study uvod")) || base.shortDescription;

  const features = extractSubsectionBlocks(extractSection(markdown, "Glavne funkcionalnosti"))
    .map((b) => ({ title: b.title, items: b.lines.slice(0, 5) }))
    .filter((b) => b.items.length > 0)
    .slice(0, 8);

  const salesBlocks = extractSubsectionBlocks(
    extractSection(markdown, "Prodajni blokovi za landing stranicu"),
  )
    .map((b) => ({ title: b.title, text: b.paragraph }))
    .filter((b) => b.text)
    .slice(0, 6);

  // Some files wrap the prose in a `### Tekst` subsection; unwrap it and
  // drop any residual heading lines before taking the first paragraph.
  const clientGetsRaw = firstSectionOf(markdown, ["Sta klijent dobija", "Sekcija: Sta klinika dobija"]);
  const clientGetsBody = extractSubsection(clientGetsRaw, "Tekst") || clientGetsRaw;
  const clientGets = firstParagraph(clientGetsBody.replace(/^#{1,6}\s+.*$/gm, "").trim());

  const forWhomSection = firstSectionOf(markdown, [
    "Za koga je resenje",
    "Sekcija: Za koje klinike je resenje",
  ]);
  const forWhom = forWhomSection
    .split(/\r?\n/)
    .map((l) => l.replace(/^-+\s*/, "").trim())
    .filter((l) => l && !l.startsWith("#") && l.length < 90);

  const ctaSection = extractSection(markdown, "CTA sekcija");
  const ctaTitle = plainLine(extractSubsection(ctaSection, "Naslov"));
  const ctaText = firstParagraph(extractSubsection(ctaSection, "Tekst"));

  return {
    heroTitle: base.heroTitle,
    heroSubtitle: base.heroSubtitle,
    shortDescription: base.shortDescription,
    intro,
    features,
    salesBlocks,
    clientGets,
    forWhom,
    ctaTitle,
    ctaText,
  };
}

export function getProjectCaseStudyContent(project: ProjectCaseStudy) {
  const markdown = readProjectCaseStudyMarkdown(project);
  const hero = extractSection(markdown, "Hero sekcija");
  const shortDescription = firstParagraph(extractSection(markdown, "Kratak opis za stranicu"));
  const heroTitle = plainLine(extractSubsection(hero, "Naslov")) || project.title;
  const heroSubtitle = firstParagraph(extractSubsection(hero, "Podnaslov")) || shortDescription;
  const ctaItems = extractSubsection(hero, "CTA dugmad")
    .split(/\r?\n/)
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
  const body = markdown
    .replace(/^#\s+.*$/m, "")
    .replace(/^##\s+Hero sekcija\s*$[\s\S]*?(?=^##\s+)/im, "")
    .trim();

  return {
    markdown,
    body,
    shortDescription,
    heroTitle,
    heroSubtitle,
    ctaItems,
  };
}
