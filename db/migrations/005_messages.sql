-- Correspondence log: every mail Adspire OS sends to a lead or an upit.
--
-- WHY A TABLE AND NOT JUST `activities`. An activity is a one-line fact ("status
-- changed"). A mail has a recipient, a subject, a body, a provider and a
-- delivery outcome — and the owner needs to reread what was actually promised
-- to a client three weeks ago. Failed sends are stored too: a mail that never
-- left is the single most expensive thing to silently lose in a sales funnel.
--
-- `lead_id` and `inquiry_id` are both nullable and both may be set: an upit
-- always has its lead, and a reply written from either screen should show up on
-- both timelines.

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  inquiry_id uuid references inquiries(id) on delete cascade,
  client_id uuid references clients(id) on delete set null,

  -- 'out' is what the owner sent. 'in' is reserved for replies pulled back in
  -- from the mailbox (webhook or IMAP), which nothing writes yet.
  direction text not null default 'out',
  -- 'email' today; 'note' and 'phone' let the same timeline hold a call log.
  channel text not null default 'email',

  to_email text,
  subject text,
  body text not null,

  -- 'sent' | 'failed' | 'skipped' (no transport configured).
  status text not null default 'sent',
  provider text,
  provider_id text,
  error text,

  created_by text,
  created_at timestamptz not null default now()
);

create index if not exists messages_lead_idx on messages (lead_id, created_at desc);
create index if not exists messages_inquiry_idx on messages (inquiry_id, created_at desc);
create index if not exists messages_client_idx on messages (client_id, created_at desc);

-- Owner's own follow-up reminder on an upit. One date and one line of text is
-- everything a single operator needs; anything richer is a calendar's job.
alter table inquiries add column if not exists follow_up_on date;
alter table leads add column if not exists follow_up_on date;
