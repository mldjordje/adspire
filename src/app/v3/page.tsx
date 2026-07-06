import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { HomeV3 } from "@/components/site/v3/HomeV3";

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
  title: "Adspire V3 — EMBER (preview)",
  robots: { index: false, follow: false },
};

export default function V3Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <HomeV3 />
    </div>
  );
}
