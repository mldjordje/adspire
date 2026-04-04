import type { Metadata } from "next";
import { AzurioTemplatePage } from "@/components/site/AzurioTemplatePage";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return <AzurioTemplatePage fileName="contact.html" />;
}
