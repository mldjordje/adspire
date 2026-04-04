import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Creative Agency",
};

export default function IndexCreativeAgencyPage() {
  return <AzurioTemplatePage fileName="index-creative-agency.html" />;
}
