import { ContactFormSection } from "@/components/site/sections/ContactFormSection";
import { PageHero } from "@/components/site/sections/PageHero";
import { getSiteContent } from "@/content/site";
import { normalizeLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const content = getSiteContent(locale);

  return buildPageMetadata(locale, "/contact-us", content.contact.title, content.contact.subtitle);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const content = getSiteContent(locale);

  return (
    <>
      <PageHero
        kicker={content.nav.contact}
        title={content.contact.title}
        subtitle={content.contact.subtitle}
      />
      <ContactFormSection
        locale={locale}
        title={content.contact.title}
        subtitle={content.contact.subtitle}
        phone={content.contact.phone}
        email={content.contact.email}
        address={content.contact.address}
        form={content.contact.form}
      />
    </>
  );
}
