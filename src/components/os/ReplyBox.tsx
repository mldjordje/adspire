"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { REPLY_TEMPLATES, firstNameOf, type ReplyContext } from "@/lib/messages/templates";

/**
 * Writing back to a client without leaving `/os`.
 *
 * The point is not the textarea — it is that every sent mail lands in the
 * timeline underneath it. Templates are pre-filled starting points; nothing is
 * sent until the owner presses the button, and the text is editable up to that
 * moment.
 */

function SendButton() {
  const { pending } = useFormStatus();
  return (
    <button className="os-btn" type="submit" disabled={pending}>
      {pending ? "Šaljem…" : "Pošalji mejl"}
    </button>
  );
}

export function ReplyBox({
  action,
  idField,
  idValue,
  to,
  context,
}: {
  action: (formData: FormData) => void | Promise<void>;
  /** `leadId` on a lead, `id` on an upit — the action reads its own field. */
  idField: string;
  idValue: string;
  to: string;
  context: ReplyContext;
}) {
  const [subject, setSubject] = useState(
    context.subjectHint ?? `Adspire — odgovor na tvoj upit${context.reference ? ` [${context.reference}]` : ""}`,
  );
  const [body, setBody] = useState("");

  const applyTemplate = (id: string) => {
    const template = REPLY_TEMPLATES.find((item) => item.id === id);
    if (!template) return;
    const ctx: ReplyContext = { ...context, firstName: firstNameOf(context.firstName) };
    setSubject(template.subject(ctx));
    setBody(template.body(ctx));
  };

  return (
    <form action={action} className="os-reply">
      <input type="hidden" name={idField} value={idValue} />

      <div className="os-chips">
        {REPLY_TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            className="os-chip"
            onClick={() => applyTemplate(template.id)}
          >
            {template.label}
          </button>
        ))}
        {body ? (
          <button type="button" className="os-chip os-chip--clear" onClick={() => setBody("")}>
            Očisti
          </button>
        ) : null}
      </div>

      <div className="os-reply__head">
        <label>
          Za
          <input name="to" defaultValue={to} required />
        </label>
        <label>
          Naslov
          <input
            name="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          />
        </label>
      </div>

      <textarea
        name="body"
        rows={12}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Napiši odgovor ili izaberi šablon iznad…"
        required
      />

      <div className="os-reply__foot">
        <SendButton />
        <span className="os-note">
          Ide sa adrese iz podešavanja, odgovor klijenta stiže na djordje@adspire.rs.
        </span>
      </div>
    </form>
  );
}
