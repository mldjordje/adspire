import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Design Studio",
};

export default function IndexDesignStudioPage() {
  return <AzurioTemplatePage fileName="index-design-studio.html" />;
}
