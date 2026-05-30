import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";
import { JsonLd } from "@/components/site/JsonLd";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs"),
  title: {
    default: "Adspire Digital | Web agencija Niš",
    template: "%s | Adspire Digital",
  },
  description:
    "Adspire Digital iz Niša — web platforme, mobilne aplikacije, poslovni sistemi, e-commerce, PWA, AI automatizacija i SaaS razvoj. Kontakt: djordje@adspire.rs, +381 60 149 149 1.",
  keywords: [
    "Adspire",
    "Adspire Digital",
    "web agencija Niš",
    "izrada sajta Niš",
    "Next.js Srbija",
    "PWA razvoj",
    "e-commerce razvoj",
    "AI automatizacija",
    "SaaS razvoj",
  ],
  authors: [{ name: "Adspire Digital", url: siteUrl }],
  creator: "Adspire Digital",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: siteUrl,
    siteName: "Adspire Digital",
    title: "Adspire Digital | Web agencija Niš",
    description:
      "Razvojni i tehnološki partner iz Niša: web, aplikacije, e-commerce, AI, SEO i hosting.",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "Adspire Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adspire Digital | Web agencija Niš",
    description:
      "Razvojni i tehnološki partner iz Niša: web, aplikacije, e-commerce, AI, SEO i hosting.",
    images: ["/images/logo.png"],
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
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="stylesheet" href="/azurio/css/loader.css" />
        <link rel="stylesheet" href="/azurio/css/plugins.css" />
        <link rel="stylesheet" href="/azurio/css/main.css" />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.setTimeout(function () {
                if (!document.documentElement.classList.contains('mxd-loader-complete')) {
                  document.documentElement.classList.add('mxd-fallback-visible');
                }
              }, 3200);
            `,
          }}
        />
      </head>
      <body>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        {children}
        <Script src="/azurio/js/libs.min.js" strategy="afterInteractive" />
        <Script src="/azurio/js/app.js" strategy="afterInteractive" />
        <Analytics />
      </body>
    </html>
  );
}
