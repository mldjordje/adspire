import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Personal Portfolio",
};

export default function IndexPersonalPortfolioPage() {
  return <AzurioTemplatePage fileName="index-personal-portfolio.html" />;
}
