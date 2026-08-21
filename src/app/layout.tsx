import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";
import { AttributionCapture } from "@/components/analytics/AttributionCapture";
import { GoogleMeasurement } from "@/components/analytics/GoogleMeasurement";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { JsonLd } from "@/components/site/JsonLd";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs"),
  title: {
    // "Web agencija" is the word an informed buyer uses; "IT firma" is the word
    // everyone else searches. Carrying both costs nothing and the narrower title
    // was not ranking for either.
    default: "Adspire Digital | IT firma i web agencija iz Niša",
    template: "%s | Adspire Digital",
  },
  description:
    "IT firma iz Niša. Pravimo sajtove, aplikacije i programe po meri za firme — web shopovi, sistemi za zakazivanje, interna evidencija i AI automatizacija. Kontakt: djordje@adspire.rs, +381 60 149 149 1.",
  keywords: [
    "Adspire",
    "Adspire Digital",
    "IT firma Niš",
    "web agencija Niš",
    "izrada sajta Niš",
    "izrada aplikacija Niš",
    "rezervacioni sistemi Niš",
    "programiranje Niš",
    "e-commerce razvoj",
    "AI automatizacija",
  ],
  authors: [{ name: "Adspire Digital", url: siteUrl }],
  creator: "Adspire Digital",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: siteUrl,
    siteName: "Adspire Digital",
    title: "Adspire Digital | IT firma i web agencija iz Niša",
    description:
      "IT firma iz Niša: sajtovi, aplikacije, web shopovi, sistemi za zakazivanje i AI automatizacija.",
    // og/twitter image comes from src/app/opengraph-image.tsx (real 1200x630
    // card) — the old /images/logo.png here was 100x100 and broke share previews
  },
  twitter: {
    card: "summary_large_image",
    title: "Adspire Digital | IT firma i web agencija iz Niša",
    description:
      "IT firma iz Niša: sajtovi, aplikacije, web shopovi, sistemi za zakazivanje i AI automatizacija.",
  },
  robots: { index: true, follow: true },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="sr" dir="ltr">
      <head>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#EEEAE8" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f0f0f" />
        <meta name="msapplication-navbutton-color" content="#0f0f0f" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('template.theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('color-scheme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <AttributionCapture />
        <SiteAnalytics />
        {children}
        <Analytics />
        <GoogleMeasurement />
      </body>
    </html>
  );
}
