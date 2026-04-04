import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return <AzurioTemplatePage fileName="about-us.html" />;
}
