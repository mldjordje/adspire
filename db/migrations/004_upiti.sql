-- Upiti (service inquiries) and the optional client portal behind them.
--
-- WHY A SEPARATE TABLE FROM `leads`. A lead is one contact-form message: who
-- wrote in and what they said. An upit is a brief — several services, a
-- business description, billing details, a timeframe — and it has a life after
-- arrival: it gets quoted, then accepted or declined. Cramming that into
-- `leads` would leave most of the columns null for every ordinary lead.
-- Every upit still creates its lead row, so the pipeline stays one funnel.
--
-- WHY LOGIN IS OPTIONAL. Requiring an account before a stranger can ask for a
-- price is how the brief gets abandoned instead of sent. So `portal_user_id` is
-- nullable and every upit carries `access_token`: an unguessable link that
-- shows its own status and nothing else. An account is an upgrade — it collects
-- several upiti under one login — never a gate.

do $$ begin
  create type inquiry_status as enum (
    'submitted', 'quoted', 'accepted', 'declined', 'canceled'
  );
exception when duplicate_object then null; end $$;

-- Optional client login. Passwordless on purpose: a password we would have to
-- store is a liability for an account whose only content is one's own brief.
create table if not exists portal_users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create unique index if not exists portal_users_email_key on portal_users (lower(email));

-- Magic-link tokens. Only the sha256 hash is stored, so a database dump does
-- not hand out live login links.
create table if not exists portal_login_tokens (
  token_hash text primary key,
  portal_user_id uuid not null references portal_users(id) on delete cascade,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists portal_login_tokens_user_idx
  on portal_login_tokens (portal_user_id);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  -- Human reference used in mail subjects and on the phone: UP-2026-0001.
  reference text not null unique,
  -- The status link handed to a buyer who never made an account.
  access_token text not null unique,
  lead_id uuid references leads(id) on delete set null,
  portal_user_id uuid references portal_users(id) on delete set null,
  contact_id uuid references contacts(id) on delete set null,
  company_id uuid references companies(id) on delete set null,

  -- Service slugs from src/content/site (the /our-services catalogue). Stored
  -- as slugs rather than ids: the catalogue is content, not a table, and a slug
  -- is what the URL and the sitemap already use.
  services text[] not null default '{}',
  buyer_type text not null default 'individual',

  full_name text not null,
  email text not null,
  phone text,

  -- Billing snapshot. Only asked of a company, and only enforced for a Serbian
  -- one (PIB and matični broj come from the domestic register).
  company_name text,
  pib text,
  mb text,
  address text,
  city text,
  country text,

  business_name text not null,
  business_description text not null,
  -- { idea, wishes, timeframe } — free-form answers only this brief has.
  brief jsonb not null default '{}'::jsonb,
  budget_eur numeric(12, 2),

  status inquiry_status not null default 'submitted',
  quoted_amount numeric(12, 2),
  currency text not null default 'EUR',
  turnaround_days int,
  quote_valid_until date,
  quote_note text,
  admin_note text,
  quoted_at timestamptz,
  responded_at timestamptz,
  decline_reason text,

  request_id text not null unique,
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  consent_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists inquiries_status_idx on inquiries (status, created_at desc);
create index if not exists inquiries_portal_user_idx on inquiries (portal_user_id, created_at desc);
create index if not exists inquiries_email_idx on inquiries (lower(email));

-- Per-year counter for `reference`. A sequence would not reset in January, and
-- counting rows would race two simultaneous submissions into the same number.
create table if not exists inquiry_counters (
  year int primary key,
  last_number int not null default 0
);

create or replace function next_inquiry_reference() returns text as $$
declare
  y int := extract(year from now() at time zone 'Europe/Belgrade');
  n int;
begin
  insert into inquiry_counters (year, last_number)
  values (y, 1)
  on conflict (year) do update set last_number = inquiry_counters.last_number + 1
  returning last_number into n;
  return 'UP-' || y || '-' || lpad(n::text, 4, '0');
end;
$$ language plpgsql;
