import type { Metadata } from "next";

import { PageShellV4 } from "@/components/site/v4/PageShellV4";
import { PortalLoginV4 } from "@/components/site/v4/PortalLoginV4";
import { v4FontClass } from "@/components/site/v4/fonts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prijava na nalog",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ greska?: string }> };

export default async function PrijavaPage({ searchParams }: Props) {
  const { greska } = await searchParams;

  return (
    <div className={v4FontClass}>
      <PageShellV4
        eyebrow="Nalog"
        title={<>Prijava</>}
        intro={
          greska === "link"
            ? "Link je istekao ili je već iskorišćen. Pošalji novi — traje trideset minuta."
            : "Nalog skuplja sve tvoje upite na jedno mesto. Nije obavezan — svaki upit ima i svoj privatni link iz mejla."
        }
      >
        <PortalLoginV4 />
      </PageShellV4>
    </div>
  );
}
