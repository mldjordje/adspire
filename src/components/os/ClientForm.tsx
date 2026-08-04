import { saveClientAction } from "@/lib/billing/actions";
import type { ClientRow } from "@/lib/billing/clients";

/** Create and edit share one form: the fields a Serbian invoice needs from the
 *  buyer are the same either way, and two copies would drift. */
export function ClientForm({ client }: { client?: ClientRow }) {
  return (
    <form action={saveClientAction} className="os-form">
      {client ? <input type="hidden" name="id" value={client.id} /> : null}

      <label>
        Naziv firme *
        <input name="companyName" required defaultValue={client?.companyName ?? ""} />
      </label>
      <label>
        Kontakt osoba
        <input name="contactPerson" defaultValue={client?.contactPerson ?? ""} />
      </label>
      <label>
        Email
        <input name="email" type="email" defaultValue={client?.email ?? ""} />
      </label>
      <label>
        Email CC
        <input name="emailCc" defaultValue={client?.emailCc ?? ""} />
      </label>
      <label>
        Adresa
        <input name="address" defaultValue={client?.address ?? ""} />
      </label>
      <label>
        Grad
        <input name="city" defaultValue={client?.city ?? ""} />
      </label>
      <label>
        Država
        <input name="country" defaultValue={client?.country ?? "Srbija"} />
      </label>
      <label>
        PIB
        <input name="pib" defaultValue={client?.pib ?? ""} />
      </label>
      <label>
        Matični broj
        <input name="mb" defaultValue={client?.mb ?? ""} />
      </label>
      <label>
        Telefon
        <input name="phone" defaultValue={client?.phone ?? ""} />
      </label>
      <label className="os-form__wide">
        Beleške
        <textarea name="notes" rows={3} defaultValue={client?.notes ?? ""} />
      </label>
      <label className="os-form__check">
        <input type="checkbox" name="active" defaultChecked={client?.active ?? true} />
        Aktivan klijent
      </label>

      <div className="os-form__wide">
        <button className="os-btn" type="submit">
          Sačuvaj
        </button>
      </div>
    </form>
  );
}
