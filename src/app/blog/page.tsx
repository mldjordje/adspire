import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return <AzurioTemplatePage fileName="blog-standard.html" />;
}
