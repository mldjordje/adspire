-- Sending a document to the buyer, from inside Adspire OS.
--
-- `sent_at` is on the invoice because "have I sent this?" is a property of the
-- document, and the answer has to survive on the screen that shows it. The
-- correspondence itself lives in `messages`, which now also points at the
-- invoice so a document's mail history reads like a lead's.

alter table invoices add column if not exists sent_at timestamptz;

alter table messages
  add column if not exists invoice_id uuid references invoices(id) on delete cascade;

create index if not exists messages_invoice_idx on messages (invoice_id, created_at desc);
