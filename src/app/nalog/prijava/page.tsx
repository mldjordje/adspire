import type { Metadata } from "next";

import { PageShellV4 } from "@/components/site/v4/PageShellV4";
import { PortalLoginV4 } from "@/components/site/v4/PortalLoginV4";
import { v4FontClass } from "@/components/site/v4/fonts";
import { isGoogleLoginConfigured } from "@/lib/portal/google";
import { safeNextPath } from "@/lib/portal/next";
import { isPortalConfigured } from "@/lib/portal/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prijava na nalog",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ greska?: string; next?: string }> };

export default async function PrijavaPage({ searchParams }: Props) {
  const { greska, next: rawNext } = await searchParams;
  const next = safeNextPath(rawNext);
  // Without the portal secret the Google route can't start a session and bounces straight back.
  const google = isGoogleLoginConfigured() && isPortalConfigured();

  return (
    <div className={v4FontClass}>
      <PageShellV4
        eyebrow="Nalog"
        title={<>Prijava</>}
        intro={
          greska === "link"
            ? "Link je istekao ili je već iskorišćen. Pošalji novi — traje trideset minuta."
            : greska === "google"
              ? "Prijava preko Google-a nije uspela. Pokušaj ponovo ili zatraži link na mejl."
              : next === "/nalog/edukacija"
                ? google
                  ? "Uđi Google nalogom sa adrese na koju su ti dodati sati — ili zatraži link na mejl. Vodi pravo na tvoje termine."
                  : "Upiši email na koji su ti dodati sati. Stiže link za prijavu — bez lozinke — i vodi pravo na tvoje termine."
                : "Nalog skuplja tvoje upite, sate edukacije i termine na jedno mesto. Bez lozinke."
        }
      >
        <PortalLoginV4 next={next} google={google} />
      </PageShellV4>
    </div>
  );
}
