import React from "react";
import type { Metadata } from "next";
import Providers from "./providers";
import "@/app/globals.css";
import "@/app/(site)/landing-rayo-v10.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs"),
  title: "Adspire",
  description: "Adspire builds websites, web applications, booking systems and growth workflows for businesses in Nis and across Serbia.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="sr" data-theme="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
