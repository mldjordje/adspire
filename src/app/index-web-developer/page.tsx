import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Web Developer",
};

export default function IndexWebDeveloperPage() {
  return <AzurioTemplatePage fileName="index-web-developer.html" />;
}
