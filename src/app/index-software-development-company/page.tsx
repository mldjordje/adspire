import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Software Development Company",
};

export default function IndexSoftwareDevelopmentCompanyPage() {
  return <AzurioTemplatePage fileName="index-software-development-company.html" />;
}
