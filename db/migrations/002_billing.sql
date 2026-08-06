-- Adspire OS — clients, subscriptions, invoices.
--
-- The issuer is a Serbian flat-rate (paušal) sole trader outside the VAT
-- system, so no tax is computed anywhere: an invoice is a list of items, a
-- total, and the note naming why VAT was not charged. That note is a setting
-- because only the accountant can supply its exact wording.
--
-- Documents are never re-derived from live data. Everything the PDF states —
-- the buyer, the items, the amounts, the rate — is frozen on the row when the
-- number is allocated, so re-rendering a document a year later produces the
-- same paper the client already holds.

do $$ begin
  create type invoice_kind as enum ('proforma', 'invoice');
exception when duplicate_object then null; end $$;

do $$ begin
  create type invoice_status as enum ('issued', 'paid', 'cancelled');
exception when duplicate_object then null; end $$;

-- One row, id = 1. Holds the issuer's own details and the document defaults.
create table if not exists settings (
  id int primary key default 1,
  company_name text not null default 'Đorđe Mladenović PR Informacione usluge Adspire Niš',
  address text,
  city text not null default 'Niš',
  country text not null default 'Srbija',
  email text,
  phone text,
  pib text,
  mb text,
  bank_account text,
  eur_account text,
  swift text,
  bank_name text,
  bank_address text,
  -- Left as a placeholder on purpose: an invoice without this sentence is
  -- missing a mandatory element, and its exact wording is the accountant's call.
  vat_note_domestic text not null default 'POPUNITI SA KNJIGOVOĐOM',
  vat_note_foreign text not null default 'POPUNITI SA KNJIGOVOĐOM',
  payment_method text not null default 'Uplata na tekući račun',
  invoice_due_days int not null default 7,
  -- "Poziv na broj" model. 'none' prints the document number as the payment
  -- purpose instead; '97' generates a bank-checkable numeric reference.
  payment_reference_model text not null default 'none',
  -- Added to the per-year sequence so a new system can continue an existing
  -- numbering series instead of restarting at 1/2026.
  invoice_seq_offset int not null default 0,
  constraint settings_single_row check (id = 1)
);
insert into settings (id) values (1) on conflict (id) do nothing;

-- Paying clients. Deliberately separate from CRM `companies`: a lead becomes a
-- client once there is money, and a client's billing identity (PIB, MB, legal
-- address) is not something the lead form ever collects.
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_person text,
  email text,
  email_cc text,
  address text,
  city text,
  country text not null default 'Srbija',
  pib text,
  mb text,
  phone text,
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists clients_name_idx on clients (lower(company_name));

-- Recurring work (hosting, održavanje). The source of MRR, and the source of
-- the monthly invoice lines.
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  title text not null,
  item_description text not null,
  quantity numeric(10,2) not null default 1,
  monthly_price numeric(12,2) not null,
  currency text not null default 'RSD',
  active boolean not null default true,
  started_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists subscriptions_client_idx on subscriptions (client_id);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  kind invoice_kind not null default 'invoice',
  status invoice_status not null default 'issued',
  -- 'domestic' is the Serbian document; 'foreign' is the English one for DACH.
  scope text not null default 'domestic',
  invoice_year int not null,
  invoice_seq int not null,
  -- Printed form of (seq, year): "34/2026", the form the accountant already has.
  number text not null,
  issue_date date not null,
  -- Datum prometa: the day the service was delivered. A mandatory element and
  -- NOT the issue date — billing last month's work needs last month's date.
  supply_date date,
  due_date date,
  place text not null,
  payment_method text not null,
  bank_account text,
  currency text not null default 'RSD',
  total numeric(12,2) not null,
  -- Dinar equivalent of a foreign-currency amount, frozen at the NBS middle
  -- rate on the issue date.
  total_rsd numeric(14,2),
  fx_rate numeric(12,4),
  fx_date date,
  -- Buyer as printed. Kept even when the client row is later edited or deleted.
  buyer jsonb not null default '{}'::jsonb,
  vat_note text not null default '',
  period_label text,
  note text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (number),
  unique (invoice_year, invoice_seq, kind)
);
create index if not exists invoices_issue_idx on invoices (issue_date desc);
create index if not exists invoices_client_idx on invoices (client_id);

create table if not exists invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  position int not null default 1,
  name text not null,
  quantity numeric(10,2) not null default 1,
  unit_price numeric(12,2) not null,
  total numeric(12,2) not null
);
create index if not exists invoice_items_invoice_idx on invoice_items (invoice_id, position);
