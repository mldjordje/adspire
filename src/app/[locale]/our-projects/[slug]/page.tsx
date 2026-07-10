import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyV4 } from "@/components/site/v4/CaseStudyV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { JsonLd } from "@/components/site/JsonLd";
import {
  findProjectCaseStudy,
  getCaseStudyV4Content,
  getProjectCaseStudyContent,
  projectCaseStudySlugs,
} from "@/data/projectCaseStudies";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
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
  const { slug } = await params;
  const project = findProjectCaseStudy(slug);
  if (!project) notFound();
  const content = getCaseStudyV4Content(project);

  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Pocetna", path: "/" },
            { name: "Projekti", path: "/our-projects" },
            { name: project.shortTitle, path: `/our-projects/${project.slug}` },
          ]),
        ]}
      />
      <CaseStudyV4 project={project} content={content} />
    </div>
  );
}
