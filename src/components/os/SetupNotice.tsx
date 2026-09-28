/**
 * Shown while the database or the session secret is missing, so /os explains
 * the next step instead of crashing or redirecting in a loop.
 */
export function SetupNotice() {
  return (
    <div className="os">
      <div className="os-setup">
        <h1>Adspire OS još nije povezan sa bazom</h1>
        <p className="os-note">
          Kod je spreman. Nedostaju Neon baza i dve environment varijable — do tada upiti sa
          sajta stižu mailom i ništa se ne gubi.
        </p>
        <ol>
          <li>
            Napravi Neon projekat (region <code>eu-central-1</code>) i kopiraj connection string.
          </li>
          <li>
            Upiši u <code>.env.local</code>:
            <pre>
              <code>
                {[
                  "DATABASE_URL=postgresql://…",
                  "OS_SESSION_SECRET=<64 nasumična karaktera>",
                  "GOOGLE_CLIENT_ID=…",
                  "GOOGLE_CLIENT_SECRET=…",
                ].join("\n")}
              </code>
            </pre>
            U Google Cloud dodaj redirect URI:{" "}
            <code>{"${NEXT_PUBLIC_SITE_URL}/api/os/google/callback"}</code>. Pristup imaju samo
            nalozi sa liste u <code>src/lib/os/google.ts</code> (<code>ADMIN_EMAILS</code>).
          </li>
          <li>
            Primeni migracije:
            <pre>
              <code>npm run db:migrate</code>
            </pre>
          </li>
          <li>
            Popuni izdavaoca u <code>/os/podesavanja</code> (PIB, MB, račun, PDV napomena).
          </li>
        </ol>
        <p className="os-note">Detalji: docs/faza-1-lead-capture.md</p>
      </div>
    </div>
  );
}
