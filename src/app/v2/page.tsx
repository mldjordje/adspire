import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { HomeV2 } from "@/components/site/v2/HomeV2";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adspire V2 (preview)",
  robots: { index: false, follow: false },
};

export default function V2Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <HomeV2 />
    </div>
  );
}
