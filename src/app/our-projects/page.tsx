import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Works",
};

export default function ProjectsPage() {
  return <AzurioTemplatePage fileName="works-grid-sticky.html" />;
}
