import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs"),
  title: {
    default: "Adspire",
    template: "%s | Adspire",
  },
  description:
    "Adspire Digital iz Niša — web platforme, mobilne aplikacije, poslovni sistemi, e-commerce, PWA, AI automatizacija i SaaS razvoj.",
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
        {children}
        <Script src="/azurio/js/libs.min.js" strategy="afterInteractive" />
        <Script src="/azurio/js/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
