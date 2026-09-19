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
import { breadcrumbJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { founderRef, orgRef, productId } from "@/lib/seo/ids";
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
  const title = `${project.shortTitle} case study | Adspire`;
  const description = content.shortDescription || content.heroSubtitle;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "sr_RS",
      url: canonical,
      siteName: "Adspire",
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

  const content = getCaseStudyV4Content(project);
  const base = getSiteUrl();
  const canonical = `${base}/our-projects/${project.slug}`;
  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: project.title,
    name: project.title,
    description: content.shortDescription || content.heroSubtitle || project.outcome,
    url: canonical,
    image: project.image.startsWith("http") ? project.image : `${base}${project.image}`,
    // A named person as author is the evidence signal; "Adspire wrote
    // about Adspire" is not one an answer engine can weigh.
    author: founderRef(),
    creator: orgRef(),
    publisher: orgRef(),
    inLanguage: "sr-RS",
    about: { "@id": productId(canonical) },
    mentions: orgRef(),
  };

  /**
   * The delivered system as its own node, with the live client site as the
   * proof link. This is what turns "an agency claims a result" into "a named
   * system that runs at a URL anyone can open".
   */
  const deliveredSystemJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": productId(canonical),
    name: project.shortTitle,
    description: project.outcome,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: project.category,
    operatingSystem: "Web",
    url: project.website,
    sameAs: project.website,
    author: orgRef(),
    provider: orgRef(),
    // The stack is authored as a comma-joined string for the page body.
    featureList: project.stack.split(",").map((item) => item.trim()).filter(Boolean),
    isPartOf: { "@id": `${canonical}#article` },
  };

  return (
    <div className={v4FontClass}>
      <JsonLd
        data={[
          webPageAboutOrganizationJsonLd(
            `/our-projects/${project.slug}`,
            project.title,
            content.shortDescription || project.outcome,
            { mainEntity: `${canonical}#article` },
          ),
          caseStudyJsonLd,
          deliveredSystemJsonLd,
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
