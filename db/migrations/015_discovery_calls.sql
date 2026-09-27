-- Razgovor (discovery call): a 20-minute call a stranger books in three taps.
--
-- WHY IT IS NOT A LEAD FORM. A business owner who wants one specific thing will
-- not read the site to find the right brief; talking for twenty minutes is less
-- work for them than writing. So the only things asked are what it is about,
-- when, and how to reach them — phone or Google Meet.
--
-- DOUBLE BOOKING is prevented by the partial unique index on (date, start_slot)
-- for live calls, never by checking first. The same owner also runs edukacija
-- sessions; the two calendars block each other in lib/calls and
-- lib/education/store, by hour.
--
-- 'asap' is a call with no slot: "call me as soon as you can". It sits at the
-- top of /os until the owner marks it done.

create table if not exists discovery_calls (
  id uuid primary key default gen_random_uuid(),
  request_id text not null unique,
  status text not null default 'zakazano'
    check (status in ('zakazano', 'odrzano', 'otkazano', 'nije_se_javio')),
  channel text not null check (channel in ('phone', 'meet')),
  -- Null together for "što pre": both or neither.
  date date,
  start_slot text,
  asap boolean not null default false,
  full_name text not null,
  phone text,
  email text,
  company text,
  service text not null,
  note text,
  locale text not null default 'sr',
  -- Page path the visitor booked from, so /os shows which page earns calls.
  source text,
  attribution jsonb not null default '{}'::jsonb,
  lead_id uuid references leads(id) on delete set null,
  owner_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint discovery_calls_slot_pair check ((date is null) = (start_slot is null)),
  constraint discovery_calls_slot_or_asap check (asap or date is not null),
  constraint discovery_calls_contact check (
    (channel = 'phone' and phone is not null) or (channel = 'meet' and email is not null)
  )
);

create unique index if not exists discovery_calls_slot_once
  on discovery_calls (date, start_slot) where status = 'zakazano' and date is not null;

create index if not exists discovery_calls_status_idx on discovery_calls (status, date);

-- Days the owner closed by hand (holiday, travel). Weekdays 09–17 are open
-- by default; a row here closes the whole day for calls.
create table if not exists discovery_call_closed_days (
  date date primary key,
  note text,
  created_at timestamptz not null default now()
);
