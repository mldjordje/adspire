-- Edukacija: 1-on-1 sessions sold as hour packs, ported from the TOZA AI platform.
--
-- HOURS ARE A LEDGER, NOT A COUNTER. A grant is a positive row, a booking a
-- negative one, a cancellation a positive one again. Balance = SUM(hours). A
-- counter cannot say where an hour went, and cannot refund safely.
--
-- DOUBLE BOOKING is prevented by the primary key (date, slot) on
-- edu_booking_slots — one row per occupied hour — never by checking first.
-- Two buyers hitting the same slot in the same second would both pass a check.
--
-- Accounts are the existing portal_users: the buyer logs in with the same magic
-- link that already collects their upiti.

-- Owner-defined open hours. slots[] holds "HH:MM" per bookable hour; a day
-- without a row is closed.
create table if not exists edu_availability (
  date date primary key,
  slots text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists edu_bookings (
  id uuid primary key default gen_random_uuid(),
  portal_user_id uuid not null references portal_users(id) on delete cascade,
  kind text not null default 'education' check (kind in ('education', 'consulting')),
  date date not null,
  start_slot text not null,
  hours int not null default 1 check (hours between 1 and 4),
  status text not null default 'zakazano' check (status in ('zakazano', 'odrzano', 'otkazano')),
  topic text,
  meet_url text,
  recording_url text,
  cancel_reason text,
  canceled_at timestamptz,
  -- Claimed by the daily reminder run before its mail goes out, so overlapping
  -- runs cannot send twice.
  owner_reminded boolean not null default false,
  buyer_reminded boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists edu_bookings_user_idx on edu_bookings (portal_user_id, date);
create index if not exists edu_bookings_date_idx on edu_bookings (date, status);

create table if not exists edu_booking_slots (
  booking_id uuid not null references edu_bookings(id) on delete cascade,
  date date not null,
  slot text not null,
  primary key (date, slot)
);

create index if not exists edu_booking_slots_booking_idx on edu_booking_slots (booking_id);

create table if not exists edu_hour_entries (
  id bigserial primary key,
  portal_user_id uuid not null references portal_users(id) on delete cascade,
  kind text not null default 'education' check (kind in ('education', 'consulting')),
  hours numeric(6,2) not null check (hours <> 0),
  -- purchase: granted against a paid invoice; manual: granted by hand;
  -- booking/refund: written by the calendar; offline: an hour used outside the
  -- calendar; correction: undoing a mis-keyed grant.
  reason text not null
    check (reason in ('purchase', 'manual', 'booking', 'refund', 'offline', 'correction')),
  -- Cascade: a booking row is only ever deleted when its own creation is being
  -- rolled back, and its debit must go with it.
  booking_id uuid references edu_bookings(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete set null,
  note text,
  created_by text,
  created_at timestamptz not null default now()
);

create index if not exists edu_hour_entries_user_idx on edu_hour_entries (portal_user_id, kind);

-- One debit and at most one refund per booking, enforced where a double click
-- or a buyer and the studio cancelling at once cannot get around it.
create unique index if not exists edu_hour_entries_booking_once
  on edu_hour_entries (booking_id) where reason = 'booking';
create unique index if not exists edu_hour_entries_refund_once
  on edu_hour_entries (booking_id) where reason = 'refund';
