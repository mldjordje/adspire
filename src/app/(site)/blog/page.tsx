import LocalePage, { generateMetadata as generateLocaleMetadata } from "@/app/[locale]/(site)/blog/page";

export async function generateMetadata() {
  return generateLocaleMetadata({ params: Promise.resolve({ locale: "sr" }) });
}

export default async function Page() {
  return <LocalePage params={Promise.resolve({ locale: "sr" })} />;
}
