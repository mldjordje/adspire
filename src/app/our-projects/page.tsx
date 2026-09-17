import type { Metadata } from "next";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { defaultLocale } from "@/lib/site-config";
import { JsonLd } from "@/components/site/JsonLd";
import { collectionPageJsonLd } from "@/lib/seo/pages";
import { projectCaseStudies } from "@/data/projectCaseStudies";
import { ProjectsV4 } from "@/components/site/v4/ProjectsV4";
import { v4FontClass } from "@/components/site/v4/fonts";

const projectsPage = getSiteContent(defaultLocale).projectsPage;

export const metadata: Metadata = pageMetadata({
  path: "/our-projects",
  title: "Projekti",
  description: projectsPage.hero.description,
  keywords: ["Adspire projekti", "reference", "web sajtovi", "Next.js projekti", "Niš"],
});

export default function ProjectsPage() {
  return (
    <div className={v4FontClass}>
      <JsonLd
        data={collectionPageJsonLd({
          path: "/our-projects",
          title: "Projekti i studije slučaja",
          description: projectsPage.hero.description,
          items: projectCaseStudies.map((p) => ({
            name: p.title,
            path: `/our-projects/${p.slug}`,
            description: p.outcome,
            image: p.image,
          })),
        })}
      />
      <ProjectsV4 />
    </div>
  );
}
