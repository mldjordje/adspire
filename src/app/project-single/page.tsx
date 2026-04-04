import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Project Details",
};

export default function ProjectSinglePage() {
  return <AzurioTemplatePage fileName="project-details.html" />;
}
