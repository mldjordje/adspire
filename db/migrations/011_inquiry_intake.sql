-- Which form the brief came from.
--
-- 'full'  — /upit: the whole brief, invoice details included, ready to quote.
-- 'quick' — /upit/brzo: five fields for a cold visitor off an ad. The missing
--           answers are asked in the reply, not on the page, because a stranger
--           will not look up a PIB to ask a question.
--
-- Defaulting to 'full' keeps every existing row honest: they all came from the
-- long form.
alter table inquiries
  add column if not exists intake text not null default 'full';

create index if not exists inquiries_intake_idx on inquiries (intake, created_at desc);
