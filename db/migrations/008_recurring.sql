-- Monthly maintenance invoicing.
--
-- `recurring_period` marks a document as "the maintenance invoice for this
-- client for this month" and nothing else. The unique index is the whole point:
-- a cron that fires twice, a retried request, or an owner pressing the button
-- after the cron already ran must not produce two numbers for one month. A
-- manually issued invoice leaves the column null and is never in the way.
--
-- Format is 'YYYY-MM' — sortable, and unambiguous next to the human
-- `period_label` ("08/2026") that gets printed on the document.

alter table invoices add column if not exists recurring_period text;

create unique index if not exists invoices_recurring_period_key
  on invoices (client_id, recurring_period, currency)
  where recurring_period is not null;
