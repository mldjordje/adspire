import LocalePage, {
  generateMetadata as generateLocaleMetadata,
  generateStaticParams as generateLocaleStaticParams,
} from "@/app/[locale]/(site)/usluge/[slug]/page";

export function generateStaticParams() {
  return generateLocaleStaticParams()
    .filter((item) => item.locale === "sr")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return generateLocaleMetadata({ params: Promise.resolve({ locale: "sr", slug }) });
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LocalePage params={Promise.resolve({ locale: "sr", slug })} />;
}
