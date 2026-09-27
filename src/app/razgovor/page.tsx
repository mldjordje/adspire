import type { Metadata } from "next";

import { CallPageV4 } from "@/components/site/v4/call/CallPageV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/razgovor",
  title: "Zakažite razgovor od 20 minuta",
  description:
    "Kratak razgovor telefonom ili preko Google Meet-a. Recite šta vam treba, a za 20 minuta znate šta ima smisla i koliko otprilike košta. Bez obaveze.",
  keywords: ["konsultacija izrada sajta", "razgovor web agencija", "poziv upoznavanja", "besplatna konsultacija Niš"],
});

export default function RazgovorPage() {
  return (
    <div className={v4FontClass}>
      <CallPageV4 locale="sr" />
    </div>
  );
}
