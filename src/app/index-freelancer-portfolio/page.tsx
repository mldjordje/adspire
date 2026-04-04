import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Freelancer Portfolio",
};

export default function IndexFreelancerPortfolioPage() {
  return <AzurioTemplatePage fileName="index-freelancer-portfolio.html" />;
}
