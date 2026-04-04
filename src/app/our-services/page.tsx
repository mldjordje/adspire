import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return <AzurioTemplatePage fileName="services.html" />;
}
