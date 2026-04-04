import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Blog Article",
};

export default function BlogSinglePage() {
  return <AzurioTemplatePage fileName="blog-article.html" />;
}
