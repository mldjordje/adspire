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
    image: "/images/case-studies/drigic-mobileview.png",
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
    image: "/images/case-studies/prevozkop-desktop.png",
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
    image: "/images/case-studies/santos-desktop.png",
    extraImages: ["/images/case-studies/santos-mobile.png"],
    website: "https://santos-santorini.com",
    stack: "Next.js, Supabase, Resend, Ananas API, Sharp",
    outcome: "Storefront, korpa, checkout, CMS, admin, lager i marketplace integracije.",
  },
  {
    slug: "teachfromhome-onboarding-sistem-za-remote-nastavnike",
    fileName: "case-study-teachfromhome.md",
    title: "TeachFromHome - onboarding sistem za remote nastavnike",
    shortTitle: "TeachFromHome",
    category: "Recruiting platforma",
    image: "/images/case-studies/teachfromhome-desktop.png",
    website: "https://teachfromhome.app",
    stack: "Next.js, NextAuth, Vercel Postgres, Drizzle, Vercel Blob",
    outcome: "Google prijava, audio prijave, admin review, referral i funnel analitika.",
  },
  {
    slug: "doctor-barber-online-booking-sistem",
    fileName: "case-study-doctorbarber.md",
    title: "Doctor Barber - online booking sistem",
    shortTitle: "Doctor Barber",
    category: "Booking sistem",
    image: "/images/case-studies/doctorbarber.png",
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
