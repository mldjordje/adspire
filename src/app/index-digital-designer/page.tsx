import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Digital Designer",
};

export default function IndexDigitalDesignerPage() {
  return <AzurioTemplatePage fileName="index-digital-designer.html" />;
}
