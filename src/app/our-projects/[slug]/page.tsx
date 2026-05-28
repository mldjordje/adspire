import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudyPage } from "@/components/site/ProjectCaseStudyPage";
import { JsonLd } from "@/components/site/JsonLd";
import {
  findProjectCaseStudy,
  getProjectCaseStudyContent,
  projectCaseStudySlugs,
} from "@/data/projectCaseStudies";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projectCaseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProjectCaseStudy(slug);

  if (!project) {
    return { title: "Projekat nije pronadjen" };
  }

  const content = getProjectCaseStudyContent(project);
  const canonical = `${getSiteUrl()}/our-projects/${project.slug}`;
  const title = `${project.shortTitle} case study | Adspire Digital`;
  const description = content.shortDescription || content.heroSubtitle;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "sr_RS",
      url: canonical,
      siteName: "Adspire Digital",
      title,
      description,
      images: [{ url: project.image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = findProjectCaseStudy(slug);

  if (!project) {
    notFound();
  }

  const content = getProjectCaseStudyContent(project);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Pocetna", path: "/" },
            { name: "Projekti", path: "/our-projects" },
            { name: project.shortTitle, path: `/our-projects/${project.slug}` },
          ]),
        ]}
      />
      <ProjectCaseStudyPage project={project} {...content} />
    </>
  );
}
