-- First-party funnel analytics.
--
-- WHY OUR OWN TABLE. Vercel Analytics and GA4 both answer "how many visits".
-- Neither answers the only question that matters here: of the people who read
-- /cena-izrade-sajta, how many started the brief and how many finished it —
-- joined against the leads that actually landed in this same database. That
-- join is impossible across two vendor dashboards and trivial in one table.
--
-- PRIVACY. No IP, no cookie, no user agent string, no PII. The session id is a
-- random value generated in the browser and kept in sessionStorage: it dies
-- with the tab and identifies nobody. That is what keeps this outside the
-- consent-banner requirement, so nothing here may ever grow an identifier that
-- survives the session.

create table if not exists site_events (
  id bigserial primary key,
  created_at timestamptz not null default now(),

  -- 'page_view' | 'cta_click' | 'form_started' | 'form_submitted'
  -- | 'scroll_50' | 'scroll_90' | 'outbound_click' | 'contact_intent'
  name text not null,

  -- Random per-tab value from sessionStorage. Groups events into one visit.
  session_id text not null,

  path text not null,
  -- Referrer host only ('google.com'), never the full URL: the query string of
  -- a referring page can carry someone else's personal data.
  referrer_host text,

  utm_source text,
  utm_medium text,
  utm_campaign text,

  locale text,
  -- 'mobile' | 'desktop', derived from viewport width in the browser.
  device text,

  -- Event-specific detail: which CTA, which form, which outbound host.
  label text,

  -- Set once the same session posts a lead, so funnel counts can be checked
  -- against real leads without storing anything that identifies the visitor.
  request_id text
);

-- Every dashboard query is "events in the last N days", then grouped.
create index if not exists site_events_created_idx on site_events (created_at desc);
create index if not exists site_events_name_created_idx on site_events (name, created_at desc);
create index if not exists site_events_path_idx on site_events (path, created_at desc);
create index if not exists site_events_session_idx on site_events (session_id);

-- The lead itself is joined back to the visit through `request_id`, which the
-- form already sends and `leads.request_id` already stores — so no identifier
-- needs to be duplicated onto the leads table for the funnel to close.
