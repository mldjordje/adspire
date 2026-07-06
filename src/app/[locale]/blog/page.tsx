import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";
import { getSiteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { isLocale, type LocaleCode } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lc = (isLocale(locale) ? locale : "en") as LocaleCode;
  const blog = getSiteContent(lc).blogPage;
  return pageMetadata({
    path: "/blog",
    title: "Blog",
    description: blog.hero.description,
    locale: lc,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <AzurioTemplatePage fileName="blog-standard.html" locale={locale as LocaleCode} />;
}
