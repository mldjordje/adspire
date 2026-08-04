import type { Metadata } from "next";
import { isDatabaseConfigured } from "@/lib/db";
import { isSessionConfigured } from "@/lib/os/session";
import { SetupNotice } from "@/components/os/SetupNotice";
import { login } from "./actions";
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
  if (!isDatabaseConfigured() || !isSessionConfigured()) return <SetupNotice />;

  const { error } = await searchParams;

  return (
    <div className="os">
      <main className="os-login">
        <form action={login} className="os-login__form">
          <span className="os-login__brand">ADSPIRE OS</span>
          <h1>Owner pristup</h1>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Lozinka
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {error === "invalid" ? (
            <p className="os-alert" role="alert">
              Pogrešan email ili lozinka.
            </p>
          ) : null}
          {error === "setup" ? (
            <p className="os-alert" role="alert">
              Baza ili session secret nisu podešeni.
            </p>
          ) : null}
          <button className="os-btn" type="submit">
            Prijavi se
          </button>
        </form>
      </main>
    </div>
  );
}
