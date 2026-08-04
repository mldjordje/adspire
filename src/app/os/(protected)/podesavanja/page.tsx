import { saveSettingsAction } from "@/lib/billing/actions";
import { getSettings } from "@/lib/os/settings";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, { saved }] = await Promise.all([getSettings(), searchParams]);

  return (
    <>
      <h1 className="os-h1">Podešavanja</h1>
      <p className="os-sub">Ovo se štampa na svakom dokumentu.</p>

      {saved ? <p className="os-note">Sačuvano.</p> : null}

      {settings.vat_note_domestic.includes("POPUNITI") ? (
        <p className="os-alert" role="alert">
          PDV napomena nije popunjena. Dok stoji ovako, računu fali obavezan element — tačnu
          formulaciju daje knjigovođa.
        </p>
      ) : null}

      <section className="os-section">
        <form action={saveSettingsAction} className="os-form">
          <label className="os-form__wide">
            Naziv izdavaoca
            <input name="company_name" defaultValue={settings.company_name} required />
          </label>
          <label>
            Adresa
            <input name="address" defaultValue={settings.address ?? ""} />
          </label>
          <label>
            Mesto izdavanja
            <input name="city" defaultValue={settings.city} />
          </label>
          <label>
            Država
            <input name="country" defaultValue={settings.country} />
          </label>
          <label>
            Email
            <input name="email" defaultValue={settings.email ?? ""} />
          </label>
          <label>
            Telefon
            <input name="phone" defaultValue={settings.phone ?? ""} />
          </label>
          <label>
            PIB
            <input name="pib" defaultValue={settings.pib ?? ""} />
          </label>
          <label>
            Matični broj
            <input name="mb" defaultValue={settings.mb ?? ""} />
          </label>
          <label>
            Tekući račun (RSD)
            <input name="bank_account" defaultValue={settings.bank_account ?? ""} />
          </label>
          <label>
            Devizni račun EUR / IBAN
            <input name="eur_account" defaultValue={settings.eur_account ?? ""} />
          </label>
          <label>
            Devizni račun USD / IBAN
            <input name="usd_account" defaultValue={settings.usd_account ?? ""} />
          </label>
          <label>
            SWIFT/BIC
            <input name="swift" defaultValue={settings.swift ?? ""} />
          </label>
          <label>
            Banka
            <input name="bank_name" defaultValue={settings.bank_name ?? ""} />
          </label>
          <label className="os-form__wide">
            Adresa banke
            <input name="bank_address" defaultValue={settings.bank_address ?? ""} />
          </label>
          <label>
            Način plaćanja
            <input name="payment_method" defaultValue={settings.payment_method} />
          </label>
          <label>
            Rok plaćanja (dana)
            <input
              name="invoice_due_days"
              type="number"
              min={0}
              defaultValue={settings.invoice_due_days}
            />
          </label>
          <label>
            Poziv na broj
            <select name="payment_reference_model" defaultValue={settings.payment_reference_model}>
              <option value="none">Ne koristim</option>
              <option value="97">Model 97</option>
            </select>
          </label>
          <label>
            Početak numeracije (offset)
            <input
              name="invoice_seq_offset"
              type="number"
              min={0}
              defaultValue={settings.invoice_seq_offset}
            />
          </label>
          <label className="os-form__wide">
            PDV napomena — domaći računi
            <textarea name="vat_note_domestic" rows={2} defaultValue={settings.vat_note_domestic} />
          </label>
          <label className="os-form__wide">
            PDV napomena — strani kupci
            <textarea name="vat_note_foreign" rows={2} defaultValue={settings.vat_note_foreign} />
          </label>

          <div className="os-form__wide">
            <button className="os-btn" type="submit">
              Sačuvaj
            </button>
          </div>
        </form>
      </section>

      <section className="os-section">
        <h2>Šta znači offset</h2>
        <p className="os-note">
          Numeracija ide <code>1/2026</code>, <code>2/2026</code>… Ako želiš da nastaviš
          postojeću seriju, upiši poslednji izdati broj te godine — sledeći dokument dobija
          naredni. Offset ne dira već izdate dokumente.
        </p>
      </section>
    </>
  );
}
