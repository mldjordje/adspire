import type { Metadata } from "next";
import { isDatabaseConfigured } from "@/lib/db";
import { isGoogleLoginConfigured } from "@/lib/os/google";
import { isSessionConfigured } from "@/lib/os/session";
import { SetupNotice } from "@/components/os/SetupNotice";
import "../os.css";

export const metadata: Metadata = {
  title: "Adspire OS",
  robots: { index: false, follow: false },
};

export default async function OsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isDatabaseConfigured() || !isSessionConfigured() || !isGoogleLoginConfigured()) {
    return <SetupNotice />;
  }

  const { error } = await searchParams;

  return (
    <div className="os">
      <main className="os-login">
        <div className="os-login__form">
          <span className="os-login__brand">ADSPIRE OS</span>
          <h1>Owner pristup</h1>
          {error === "forbidden" ? (
            <p className="os-alert" role="alert">
              Taj Google nalog nema pristup.
            </p>
          ) : null}
          {error === "google" ? (
            <p className="os-alert" role="alert">
              Prijava preko Google-a nije uspela. Pokušaj ponovo.
            </p>
          ) : null}
          {error === "setup" ? (
            <p className="os-alert" role="alert">
              Baza ili session secret nisu podešeni.
            </p>
          ) : null}
          <a className="os-btn" href="/api/os/google">
            Nastavi sa Google-om
          </a>
        </div>
      </main>
    </div>
  );
}
