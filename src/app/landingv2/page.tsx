import type { Metadata } from "next";
import { v4FontClass } from "@/components/site/v4/fonts";
import { LandingV2 } from "@/components/site/landing-v2/LandingV2";

export const metadata: Metadata = {
  title: "Adspire — Signal / Landing V2",
  description: "Sajtovi koji dovode klijente. Aplikacije koje štede vreme. Nova Adspire digitalna priča.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function LandingV2Page() {
  return <div className={v4FontClass}><LandingV2 /></div>;
}
