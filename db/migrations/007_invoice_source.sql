-- Which proforma a račun came out of.
--
-- The two series are numbered independently and a document is never edited, so
-- the only way to state "this invoice settles that predračun" is a link between
-- rows. It also stops the same proforma being converted twice: the screen finds
-- the existing invoice instead of issuing a second number for the same job.

alter table invoices
  add column if not exists source_invoice_id uuid references invoices(id) on delete set null;

create index if not exists invoices_source_idx on invoices (source_invoice_id);
