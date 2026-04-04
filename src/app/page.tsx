import type { Metadata } from "next";
import { AzurioCompositeHomePage } from "@/components/site/AzurioCompositeHomePage";

export const metadata: Metadata = {
  title: "Adspire",
};

export default function Page() {
  return <AzurioCompositeHomePage />;
}
