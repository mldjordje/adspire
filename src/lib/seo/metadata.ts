import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/seo/site";

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") {
    return base;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

type PageMetaInput = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
};

/** Osnovni SEO blok sa ispravnim canonical-om po ruti (ne koristiti globalni canonical u layout-u). */
export function pageMetadata({ path, title, description, keywords }: PageMetaInput): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = `${title} | Adspire Digital`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: socialTitle,
      description,
    },
    twitter: {
      title: socialTitle,
      description,
    },
  };
}
