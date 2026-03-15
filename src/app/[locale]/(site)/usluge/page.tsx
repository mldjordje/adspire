import { redirect } from "next/navigation";
import { normalizeLocale, withLocalePrefix } from "@/lib/locale";

export default async function UslugeIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  redirect(withLocalePrefix(locale, "/our-services"));
}
