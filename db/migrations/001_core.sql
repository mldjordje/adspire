-- Adspire OS — core schema on Neon Postgres.
--
-- Replaces the Supabase project: there is one operator (the owner), so the
-- access model is a signed session cookie checked in the app, not row-level
-- security tied to auth.users. Every table here is reachable only through
-- server code that already established a session.

create extension if not exists pgcrypto;

do $$ begin
  create type lead_status as enum (
    'new', 'contacted', 'qualified', 'meeting_booked',
    'proposal_sent', 'negotiation', 'won', 'lost'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type activity_type as enum (
    'note', 'email', 'call', 'meeting', 'status_change',
    'form_submission', 'task_completed'
  );
exception when duplicate_object then null; end $$;

-- Operator accounts. Password hashing is scrypt from node:crypto — see
-- src/lib/os/password.ts for the encoding of this column.
create table if not exists os_users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  password_hash text not null,
  display_name text not null default 'Owner',
  created_at timestamptz not null default now()
);
create unique index if not exists os_users_email_key on os_users (lower(email));

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  country text,
  city text,
  industry text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  language text not null default 'sr',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists contacts_email_key on contacts (lower(email));

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references contacts(id) on delete restrict,
  company_id uuid references companies(id) on delete set null,
  status lead_status not null default 'new',
  market text not null,
  service text not null,
  message text not null,
  budget_range text,
  timeline text,
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  first_touch jsonb not null default '{}'::jsonb,
  last_touch jsonb not null default '{}'::jsonb,
  consent_at timestamptz,
  request_id text not null unique,
  spam_score numeric(5,2) not null default 0,
  next_action_at timestamptz,
  lost_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists leads_status_created_idx on leads (status, created_at desc);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  type activity_type not null,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists activities_lead_created_idx on activities (lead_id, created_at desc);
