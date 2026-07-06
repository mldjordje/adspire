import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudyPage } from "@/components/site/ProjectCaseStudyPage";
import {
  findProjectCaseStudy,
  getProjectCaseStudyContent,
  projectCaseStudySlugs,
} from "@/data/projectCaseStudies";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return projectCaseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const project = findProjectCaseStudy(slug);
  if (!project) return { title: "404" };
  const content = getProjectCaseStudyContent(project);
  return pageMetadata({
    path: `/our-projects/${project.slug}`,
    title: `${project.shortTitle} case study`,
    description: content.shortDescription || content.heroSubtitle,
    locale: lc,
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const project = findProjectCaseStudy(slug);
  if (!project) notFound();
  const content = getProjectCaseStudyContent(project);

  return <ProjectCaseStudyPage project={project} {...content} locale={lc} />;
}
