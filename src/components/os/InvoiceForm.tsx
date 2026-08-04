"use client";

import { useMemo, useState } from "react";
import { createInvoiceAction } from "@/lib/billing/actions";
import { money } from "./billingUi";

export type InvoiceFormClient = {
  id: string;
  companyName: string;
  subscriptions: { title: string; itemDescription: string; quantity: number; monthlyPrice: number }[];
};

type Row = { key: number; name: string; quantity: string; unitPrice: string };

const emptyRow = (key: number): Row => ({ key, name: "", quantity: "1", unitPrice: "" });

/** "1234,50" and "1234.50" both parse — the comma is what a Serbian keyboard
 *  produces. Mirrors the parsing the server action does. */
const decimal = (value: string) => {
  const parsed = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

export function InvoiceForm({
  clients,
  today,
  defaultClientId,
  defaultDueDate,
  error,
}: {
  clients: InvoiceFormClient[];
  today: string;
  defaultClientId?: string;
  defaultDueDate: string;
  error?: string;
}) {
  const [clientId, setClientId] = useState(defaultClientId ?? "");
  const [currency, setCurrency] = useState("RSD");
  const [rows, setRows] = useState<Row[]>([emptyRow(0)]);
  const [nextKey, setNextKey] = useState(1);

  const client = clients.find((c) => c.id === clientId);
  const total = useMemo(
    () => rows.reduce((sum, row) => sum + decimal(row.quantity) * decimal(row.unitPrice), 0),
    [rows],
  );

  const update = (key: number, patch: Partial<Row>) =>
    setRows((current) => current.map((row) => (row.key === key ? { ...row, ...patch } : row)));

  const addRow = () => {
    setRows((current) => [...current, emptyRow(nextKey)]);
    setNextKey((key) => key + 1);
  };

  /** Pulls the client's active subscriptions in as lines — the monthly
   *  maintenance invoice is the same three fields every month. */
  const fillFromSubscriptions = () => {
    if (!client || client.subscriptions.length === 0) return;
    let key = nextKey;
    const filled = client.subscriptions.map((subscription) => ({
      key: key++,
      name: subscription.itemDescription,
      quantity: String(subscription.quantity),
      unitPrice: String(subscription.monthlyPrice),
    }));
    setRows(filled);
    setNextKey(key);
  };

  return (
    <form action={createInvoiceAction} className="os-form">
      {error ? (
        <p className="os-alert os-form__wide" role="alert">
          {error}
        </p>
      ) : null}

      <label>
        Klijent
        <select name="clientId" value={clientId} onChange={(e) => setClientId(e.target.value)}>
          <option value="">— bez klijenta —</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.companyName}
            </option>
          ))}
        </select>
      </label>
      <label>
        Vrsta
        <select name="kind" defaultValue="invoice">
          <option value="invoice">Račun</option>
          <option value="proforma">Predračun</option>
        </select>
      </label>
      <label>
        Valuta
        <select name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="RSD">RSD</option>
          <option value="EUR">EUR</option>
        </select>
      </label>
      <label>
        Datum izdavanja
        <input name="issueDate" type="date" defaultValue={today} />
      </label>
      <label>
        Datum prometa
        <input name="supplyDate" type="date" defaultValue={today} />
      </label>
      <label>
        Rok plaćanja
        <input name="dueDate" type="date" defaultValue={defaultDueDate} />
      </label>
      <label>
        Period (za održavanje)
        <input name="periodLabel" placeholder="07/2026" />
      </label>
      <label className="os-form__wide">
        Napomena na dokumentu
        <input name="note" placeholder="npr. broj ugovora" />
      </label>

      <div className="os-form__wide">
        <h3>Stavke</h3>
        {client && client.subscriptions.length > 0 ? (
          <button className="os-btn os-btn--ghost" type="button" onClick={fillFromSubscriptions}>
            Popuni iz pretplata ({client.subscriptions.length})
          </button>
        ) : null}

        <div className="os-tablewrap" style={{ marginTop: 12 }}>
          <table className="os-table os-table--fixed">
            <thead>
              <tr>
                {/* Narrow fixed columns on the right so the description — the
                    field that actually holds a sentence — keeps the rest. */}
                <th>Naziv</th>
                <th style={{ width: 64 }}>Kol.</th>
                <th style={{ width: 104 }}>Cena</th>
                <th style={{ width: 116 }}>Iznos</th>
                <th style={{ width: 36 }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <td>
                    <input
                      name="itemName"
                      value={row.name}
                      onChange={(e) => update(row.key, { name: e.target.value })}
                      placeholder="Mesečno održavanje web sajta"
                    />
                  </td>
                  <td>
                    <input
                      name="itemQuantity"
                      value={row.quantity}
                      inputMode="decimal"
                      onChange={(e) => update(row.key, { quantity: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      name="itemPrice"
                      value={row.unitPrice}
                      inputMode="decimal"
                      onChange={(e) => update(row.key, { unitPrice: e.target.value })}
                    />
                  </td>
                  <td>{money(decimal(row.quantity) * decimal(row.unitPrice), currency)}</td>
                  <td>
                    {rows.length > 1 ? (
                      <button
                        className="os-btn os-btn--ghost"
                        type="button"
                        onClick={() =>
                          setRows((current) => current.filter((r) => r.key !== row.key))
                        }
                        aria-label="Ukloni stavku"
                      >
                        ×
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 12 }}>
          <button className="os-btn os-btn--ghost" type="button" onClick={addRow}>
            Dodaj stavku
          </button>
        </p>

        <p className="os-total">Ukupno: {money(total, currency)}</p>

        <button className="os-btn" type="submit">
          Izdaj dokument
        </button>
      </div>
    </form>
  );
}
