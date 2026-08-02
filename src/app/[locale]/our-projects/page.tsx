import type { Metadata } from "next";
import { ProjectsV4 } from "@/components/site/v4/ProjectsV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const projects = getSiteContent(lc).projectsPage;
  return pageMetadata({
    path: "/our-projects",
    title: projects.hero.eyebrow,
    description: projects.hero.description,
    locale: lc,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;

  return (
    <div className={v4FontClass}>
      <ProjectsV4 locale={lc} />
    </div>
  );
}
