import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Branding Studio",
};

export default function IndexBrandingStudioPage() {
  return <AzurioTemplatePage fileName="index-branding-studio.html" />;
}
