import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "FAQ",
};

export default function FaqPage() {
  return <AzurioTemplatePage fileName="faq.html" />;
}
