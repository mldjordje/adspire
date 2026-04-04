import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Digital Agency",
};

export default function IndexDigitalAgencyPage() {
  return <AzurioTemplatePage fileName="index-digital-agency.html" />;
}
