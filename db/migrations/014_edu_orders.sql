-- Edukacija: package orders placed from the site.
--
-- Until now the only path to hours was "send an inquiry, talk, get billed, and
-- the owner grants hours by hand in /os". The landing sells two fixed packages,
-- so an order is its own thing: the buyer signs in (Google or magic link),
-- confirms a package, and the row below is the record of that intent.
--
-- IT IS NOT A PAYMENT. There is no gateway on the site; the row moves to
-- 'placena' from /os when the money actually lands, and only that transition
-- credits hours. Keeping order and ledger separate means a mis-clicked order
-- never silently becomes bookable hours.
create table if not exists edu_orders (
  id uuid primary key default gen_random_uuid(),
  portal_user_id uuid not null references portal_users(id) on delete cascade,
  -- Package id from lib/education/packages.ts, with the numbers copied in: the
  -- price list may change, an order must still say what was bought that day.
  package_id text not null,
  hours numeric(6,2) not null check (hours > 0),
  price_eur numeric(10,2) not null check (price_eur >= 0),
  kind text not null default 'education' check (kind in ('education', 'consulting')),
  status text not null default 'nova' check (status in ('nova', 'placena', 'otkazana')),
  -- What the buyer wants to learn, and how to reach them. Both optional: the
  -- order must not turn into the brief form it replaced.
  goal text,
  phone text,
  note text,
  -- The grant this order produced, so /os can show "hours are in" and a second
  -- click cannot double-credit.
  hours_entry_id bigint references edu_hour_entries(id) on delete set null,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists edu_orders_user_idx on edu_orders (portal_user_id, created_at desc);
create index if not exists edu_orders_status_idx on edu_orders (status, created_at desc);
