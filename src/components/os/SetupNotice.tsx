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
                ].join("\n")}
              </code>
            </pre>
          </li>
          <li>
            Primeni migracije i napravi owner nalog:
            <pre>
              <code>
                {[
                  "npm run db:migrate",
                  'node scripts/os-create-user.mjs djordje@adspire.rs "<lozinka>" "Đorđe"',
                ].join("\n")}
              </code>
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
