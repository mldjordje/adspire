-- AI crawler visits.
--
-- WHY A SEPARATE TABLE. site_events is a session-based funnel with an explicit
-- promise in 010: no user agent, no identifier that outlives a tab. A crawler
-- hit is the opposite shape — there is no session, and the user agent family is
-- the whole point. Forcing it into site_events would either break that promise
-- or produce rows with a fake session id that poison every funnel count.
--
-- WHY IT EXISTS AT ALL. The schema work is a bet that AI assistants will read
-- and recommend the site. This table is how the bet gets settled: which engines
-- actually fetch, which pages they fetch, and whether that changes after a
-- change ships. Without it there is no feedback loop, only hope.
--
-- PRIVACY. No IP and no raw user agent string — only the matched crawler family
-- ('gptbot', 'claudebot', …). A crawler is not a person, but storing raw agent
-- strings would quietly become a place where human traffic could land.

create table if not exists crawler_hits (
  id bigserial primary key,
  created_at timestamptz not null default now(),

  -- Normalised family id from lib/analytics/crawlers.ts, never the raw agent.
  bot text not null,
  path text not null,

  -- 'route'  — the crawler hit a route that records its own traffic
  --            (/llms.txt, /llms-full.txt, /robots.txt).
  -- 'drain'  — replayed from a Vercel log drain, which sees every request
  --            including statically served pages.
  source text not null default 'route',

  -- HTTP status the crawler received. A crawler getting 404s is a problem that
  -- is invisible in every other dashboard we have.
  status int
);

create index if not exists crawler_hits_created_idx on crawler_hits (created_at desc);
create index if not exists crawler_hits_bot_created_idx on crawler_hits (bot, created_at desc);
create index if not exists crawler_hits_path_idx on crawler_hits (path, created_at desc);
