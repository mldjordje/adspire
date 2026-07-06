import { notFound } from "next/navigation";
import { SetHtmlLang } from "@/components/site/SetHtmlLang";
import { defaultLocale, isLocale, prefixedLocales } from "@/lib/site-config";

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) {
    notFound();
  }

  return (
    <>
      {/* Root layout owns <html lang="sr">; correct it for prefixed locales (a11y). */}
      <SetHtmlLang lang={locale} />
      {children}
    </>
  );
}
