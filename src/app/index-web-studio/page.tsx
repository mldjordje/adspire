import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Web Studio",
};

export default function IndexWebStudioPage() {
  return <AzurioTemplatePage fileName="index-web-studio.html" />;
}
