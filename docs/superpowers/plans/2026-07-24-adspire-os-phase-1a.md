# Adspire OS Phase 1A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready website lead capture, owner CRM, pipeline dashboard, attribution layer, and reliable n8n handoff without changing the public site's visual identity.

**Architecture:** Keep the public Next.js App Router site intact and add a protected `/os` product boundary. Supabase provides Postgres, Auth, and RLS; public form submissions go through server-side validation and a service-role repository, while owner pages use the authenticated server client. Reliable automation uses an outbox table and a signed n8n dispatcher.

**Tech Stack:** Next.js 16, React 19, TypeScript, Supabase Postgres/Auth, Zod, Vitest, Testing Library, Playwright, n8n, Vercel.

---

## Scope boundary

This plan implements the first independently deployable subsystem from the design:

- owner authentication;
- companies, contacts, leads, deals, activities and tasks;
- website lead intake with attribution;
- owner dashboard and lead inbox;
- pipeline stage changes and next actions;
- reliable n8n outbox delivery;
- first-party funnel events;
- automated tests and deployment checks.

Calendar sync, proposal builder, full content engine, project delivery and finance are
separate plans after this subsystem is live and collecting real leads.

## File map

### Configuration and test infrastructure

- Modify `package.json` — scripts and dependencies.
- Modify `package-lock.json` — locked dependency graph.
- Create `vitest.config.ts` — unit/integration test configuration.
- Create `vitest.setup.ts` — DOM matchers.
- Create `playwright.config.ts` — owner and public funnel E2E configuration.
- Create `.env.example` — documented non-secret environment contract.

### Supabase boundary

- Create `supabase/migrations/202607240001_adspire_os_core.sql` — CRM schema, indexes, triggers and RLS.
- Create `src/lib/env.ts` — validated environment access.
- Create `src/lib/supabase/browser.ts` — browser auth client.
- Create `src/lib/supabase/server.ts` — cookie-aware owner server client.
- Create `src/lib/supabase/admin.ts` — server-only service-role client.
- Create `src/lib/supabase/database.types.ts` — generated schema types.

### CRM domain

- Create `src/lib/crm/types.ts` — domain types and pipeline constants.
- Create `src/lib/crm/validation.ts` — Zod schemas.
- Create `src/lib/crm/attribution.ts` — UTM/referrer normalization.
- Create `src/lib/crm/leads.ts` — lead intake transaction and deduplication.
- Create `src/lib/crm/queries.ts` — owner dashboard and inbox queries.
- Create `src/lib/crm/actions.ts` — authenticated pipeline/task mutations.
- Create `src/lib/crm/__tests__/validation.test.ts`.
- Create `src/lib/crm/__tests__/attribution.test.ts`.
- Create `src/lib/crm/__tests__/leads.test.ts`.

### Public acquisition flow

- Create `src/app/api/leads/route.ts` — public lead endpoint.
- Create `src/app/api/events/route.ts` — first-party funnel events.
- Modify `src/components/site/v4/ContactV4.tsx` — richer form and attribution submission.
- Modify `src/components/site/v4/ContactV4.module.css` — additions within the existing design.
- Create `src/components/analytics/SalesAnalytics.tsx` — minimal event client.
- Modify `src/app/layout.tsx` — mount event client.
- Modify `src/pages/api/contact.ts` — compatibility response pointing callers to `/api/leads`.

### Owner product

- Create `src/app/os/login/page.tsx`.
- Create `src/app/os/login/actions.ts`.
- Create `src/app/os/(protected)/layout.tsx`.
- Create `src/app/os/(protected)/page.tsx`.
- Create `src/app/os/(protected)/leads/page.tsx`.
- Create `src/app/os/(protected)/leads/[id]/page.tsx`.
- Create `src/app/os/(protected)/pipeline/page.tsx`.
- Create `src/components/os/OsShell.tsx`.
- Create `src/components/os/KpiStrip.tsx`.
- Create `src/components/os/PipelineBoard.tsx`.
- Create `src/components/os/LeadTable.tsx`.
- Create `src/components/os/LeadDetail.tsx`.
- Create `src/components/os/NextActionForm.tsx`.
- Create `src/components/os/StatusBadge.tsx`.
- Create `src/app/os/os.css`.
- Modify `src/middleware.ts` — protect `/os` and retain German-domain rewrite.

### Automation and operations

- Create `src/lib/automation/signature.ts`.
- Create `src/lib/automation/dispatcher.ts`.
- Create `src/app/api/automation/dispatch/route.ts`.
- Create `src/lib/automation/__tests__/signature.test.ts`.
- Create `vercel.json` — cron dispatch schedule.

### E2E and documentation

- Create `tests/e2e/contact-lead.spec.ts`.
- Create `tests/e2e/os-auth.spec.ts`.
- Create `tests/e2e/os-pipeline.spec.ts`.
- Create `docs/adspire-os-operations.md`.

---

### Task 1: Establish the test and dependency baseline

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Create: `.env.example`

- [ ] **Step 1: Install runtime and test dependencies**

Run:

```bash
npm install @supabase/ssr @supabase/supabase-js zod
npm install -D vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @playwright/test supabase
```

Expected: `package.json` and `package-lock.json` include the new packages with no
peer-dependency failure.

- [ ] **Step 2: Add deterministic scripts to `package.json`**

Set the scripts block to:

```json
{
  "dev": "next dev",
  "build": "next build",
  "postbuild": "next-sitemap",
  "start": "next start",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:e2e": "playwright test",
  "sitemap": "next-sitemap",
  "check-wp": "node scripts/check-wordpress.mjs"
}
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    coverage: {
      reporter: ["text", "html"],
      include: ["src/lib/crm/**/*.ts", "src/lib/automation/**/*.ts"],
    },
  },
});
```

- [ ] **Step 4: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 6: Create `.env.example`**

```dotenv
NEXT_PUBLIC_SITE_URL=https://adspire.rs
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
N8N_CRM_WEBHOOK_URL=
N8N_WEBHOOK_SECRET=
AUTOMATION_CRON_SECRET=
NEXT_PUBLIC_BOOKING_URL=
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
```

- [ ] **Step 7: Run the clean baseline**

Run:

```bash
npm run typecheck
npm run build
```

Expected: both commands exit `0`. Record any existing warning separately; do not
hide it by weakening TypeScript.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts playwright.config.ts .env.example
git commit -m "test: establish Adspire OS test baseline"
```

---

### Task 2: Create the Supabase CRM schema and security model

**Files:**
- Create: `supabase/migrations/202607240001_adspire_os_core.sql`
- Create: `src/lib/supabase/database.types.ts`

- [ ] **Step 1: Write the migration**

Create `supabase/migrations/202607240001_adspire_os_core.sql` with:

```sql
create extension if not exists pgcrypto;

create type public.lead_status as enum (
  'new', 'contacted', 'qualified', 'meeting_booked',
  'proposal_sent', 'negotiation', 'won', 'lost'
);
create type public.activity_type as enum (
  'note', 'email', 'call', 'meeting', 'status_change',
  'form_submission', 'task_completed'
);
create type public.task_status as enum ('open', 'done', 'cancelled');
create type public.outbox_status as enum ('pending', 'processing', 'sent', 'failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
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

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  language text not null default 'sr',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index contacts_email_unique on public.contacts (lower(email));

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.contacts(id) on delete restrict,
  company_id uuid references public.companies(id) on delete set null,
  status public.lead_status not null default 'new',
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
  request_id text not null,
  spam_score numeric(5,2) not null default 0,
  owner_id uuid references public.profiles(id) on delete set null,
  next_action_at timestamptz,
  lost_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (request_id)
);
create index leads_status_created_idx on public.leads(status, created_at desc);
create index leads_next_action_idx on public.leads(next_action_at)
  where status not in ('won', 'lost');

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null unique references public.leads(id) on delete cascade,
  title text not null,
  value_min numeric(12,2),
  value_max numeric(12,2),
  currency text not null default 'EUR',
  expected_close_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  type public.activity_type not null,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index activities_lead_created_idx on public.activities(lead_id, created_at desc);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  assignee_id uuid references public.profiles(id) on delete set null,
  title text not null,
  due_at timestamptz,
  status public.task_status not null default 'open',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index tasks_open_due_idx on public.tasks(status, due_at);

create table public.web_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  contact_id uuid references public.contacts(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  name text not null,
  path text not null,
  locale text,
  market text,
  properties jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);
create index web_events_name_time_idx on public.web_events(name, occurred_at desc);

create table public.automation_outbox (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  aggregate_id uuid not null,
  payload jsonb not null,
  status public.outbox_status not null default 'pending',
  attempts integer not null default 0,
  available_at timestamptz not null default now(),
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);
create index automation_outbox_pending_idx
  on public.automation_outbox(status, available_at)
  where status in ('pending', 'failed');

create table public.webhook_receipts (
  id uuid primary key default gen_random_uuid(),
  outbox_id uuid not null references public.automation_outbox(id) on delete cascade,
  response_status integer,
  response_body text,
  created_at timestamptz not null default now()
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.contacts enable row level security;
alter table public.leads enable row level security;
alter table public.deals enable row level security;
alter table public.activities enable row level security;
alter table public.tasks enable row level security;
alter table public.web_events enable row level security;
alter table public.automation_outbox enable row level security;
alter table public.webhook_receipts enable row level security;
alter table public.audit_log enable row level security;

create policy "authenticated owner reads profiles" on public.profiles
  for select to authenticated using (auth.uid() = id);

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'companies', 'contacts', 'leads', 'deals', 'activities', 'tasks',
    'web_events', 'automation_outbox', 'webhook_receipts', 'audit_log'
  ] loop
    execute format(
      'create policy "owner full access %1$s" on public.%1$I
       for all to authenticated using (true) with check (true)',
      table_name
    );
  end loop;
end $$;
```

- [ ] **Step 2: Apply the migration to the linked Supabase project**

Run:

```bash
npx supabase db push
```

Expected: migration `202607240001_adspire_os_core.sql` is recorded as applied.

- [ ] **Step 3: Generate exact database types**

Run:

```bash
npx supabase gen types typescript --linked > src/lib/supabase/database.types.ts
```

Expected: the generated `Database` type contains `leads`, `contacts`, `deals`,
`activities`, `tasks`, `web_events`, and `automation_outbox`.

- [ ] **Step 4: Verify RLS**

Run:

```bash
npx supabase db lint --linked
```

Expected: no exposed table without RLS and no migration syntax error.

- [ ] **Step 5: Commit**

```bash
git add supabase/migrations/202607240001_adspire_os_core.sql src/lib/supabase/database.types.ts
git commit -m "feat(os): add secured CRM data model"
```

---

### Task 3: Add validated environment and Supabase clients

**Files:**
- Create: `src/lib/env.ts`
- Create: `src/lib/supabase/browser.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/admin.ts`

- [ ] **Step 1: Create `src/lib/env.ts`**

```ts
import "server-only";
import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  N8N_CRM_WEBHOOK_URL: z.string().url(),
  N8N_WEBHOOK_SECRET: z.string().min(32),
  AUTOMATION_CRON_SECRET: z.string().min(32),
});

export const env = schema.parse(process.env);
```

- [ ] **Step 2: Create `src/lib/supabase/browser.ts`**

```ts
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

export function createBrowserSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

- [ ] **Step 3: Create `src/lib/supabase/server.ts`**

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll(values) {
          try {
            values.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Components cannot mutate cookies; middleware refreshes them.
          }
        },
      },
    },
  );
}
```

- [ ] **Step 4: Create `src/lib/supabase/admin.ts`**

```ts
import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "./database.types";

export function createAdminSupabaseClient() {
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
```

- [ ] **Step 5: Run the compiler**

Run:

```bash
npm run typecheck
```

Expected: exit `0`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/env.ts src/lib/supabase
git commit -m "feat(os): add Supabase client boundary"
```

---

### Task 4: Implement lead validation and attribution with TDD

**Files:**
- Create: `src/lib/crm/types.ts`
- Create: `src/lib/crm/validation.ts`
- Create: `src/lib/crm/attribution.ts`
- Create: `src/lib/crm/__tests__/validation.test.ts`
- Create: `src/lib/crm/__tests__/attribution.test.ts`

- [ ] **Step 1: Write failing validation tests**

Create `src/lib/crm/__tests__/validation.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { leadSubmissionSchema } from "../validation";

describe("leadSubmissionSchema", () => {
  it("normalizes a valid Serbian lead", () => {
    const parsed = leadSubmissionSchema.parse({
      fullName: "  Ana Petrović ",
      email: " ANA@EXAMPLE.COM ",
      company: "Klinika Ana",
      phone: "+381 60 123 456",
      market: "rs",
      service: "booking",
      message: "Želimo booking sistem za dve ordinacije.",
      consent: true,
      requestId: "req_1234567890",
      attribution: { landingPage: "/our-services/sistemi-za-zakazivanje" },
    });

    expect(parsed.fullName).toBe("Ana Petrović");
    expect(parsed.email).toBe("ana@example.com");
  });

  it("rejects spam honeypot and missing consent", () => {
    expect(() =>
      leadSubmissionSchema.parse({
        fullName: "Spam",
        email: "spam@example.com",
        market: "rs",
        service: "other",
        message: "This should never pass.",
        consent: false,
        website: "https://spam.example",
        requestId: "req_1234567890",
        attribution: { landingPage: "/" },
      }),
    ).toThrow();
  });
});
```

- [ ] **Step 2: Write failing attribution tests**

Create `src/lib/crm/__tests__/attribution.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { normalizeAttribution } from "../attribution";

describe("normalizeAttribution", () => {
  it("keeps only supported attribution fields", () => {
    expect(
      normalizeAttribution({
        landingPage: " /de/contact-us ",
        referrer: "https://google.com/",
        utmSource: " Google ",
        utmMedium: "CPC",
        utmCampaign: "Booking-DE",
        ignored: "secret",
      }),
    ).toEqual({
      landingPage: "/de/contact-us",
      referrer: "https://google.com/",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "booking-de",
      utmContent: null,
      utmTerm: null,
    });
  });
});
```

- [ ] **Step 3: Run tests to verify failure**

Run:

```bash
npm test -- src/lib/crm/__tests__/validation.test.ts src/lib/crm/__tests__/attribution.test.ts
```

Expected: FAIL because `validation.ts` and `attribution.ts` do not exist.

- [ ] **Step 4: Create `src/lib/crm/types.ts`**

```ts
export const MARKETS = ["rs", "dach", "white-label"] as const;
export const SERVICES = [
  "booking", "web-platform", "ecommerce", "automation",
  "mobile", "white-label", "other",
] as const;
export const LEAD_STATUSES = [
  "new", "contacted", "qualified", "meeting_booked",
  "proposal_sent", "negotiation", "won", "lost",
] as const;

export type Market = (typeof MARKETS)[number];
export type Service = (typeof SERVICES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];
```

- [ ] **Step 5: Create `src/lib/crm/attribution.ts`**

```ts
type UnknownRecord = Record<string, unknown>;

const clean = (value: unknown, lower = false) => {
  if (typeof value !== "string" || value.trim() === "") return null;
  const result = value.trim().slice(0, 500);
  return lower ? result.toLowerCase() : result;
};

export function normalizeAttribution(input: UnknownRecord) {
  return {
    landingPage: clean(input.landingPage) ?? "/",
    referrer: clean(input.referrer),
    utmSource: clean(input.utmSource, true),
    utmMedium: clean(input.utmMedium, true),
    utmCampaign: clean(input.utmCampaign, true),
    utmContent: clean(input.utmContent, true),
    utmTerm: clean(input.utmTerm, true),
  };
}
```

- [ ] **Step 6: Create `src/lib/crm/validation.ts`**

```ts
import { z } from "zod";
import { MARKETS, SERVICES } from "./types";

const trimmed = (max: number) => z.string().trim().min(1).max(max);

export const attributionSchema = z.object({
  landingPage: z.string().trim().min(1).max(500),
  referrer: z.string().trim().max(500).nullable().optional(),
  utmSource: z.string().trim().max(200).nullable().optional(),
  utmMedium: z.string().trim().max(200).nullable().optional(),
  utmCampaign: z.string().trim().max(200).nullable().optional(),
  utmContent: z.string().trim().max(200).nullable().optional(),
  utmTerm: z.string().trim().max(200).nullable().optional(),
});

export const leadSubmissionSchema = z.object({
  fullName: trimmed(120),
  email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
  company: z.string().trim().max(180).optional().default(""),
  phone: z.string().trim().max(60).optional().default(""),
  market: z.enum(MARKETS),
  service: z.enum(SERVICES),
  message: trimmed(4000),
  budgetRange: z.string().trim().max(80).optional(),
  timeline: z.string().trim().max(80).optional(),
  consent: z.literal(true),
  website: z.literal("").optional().default(""),
  requestId: z.string().trim().min(10).max(100),
  attribution: attributionSchema,
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
```

- [ ] **Step 7: Run tests**

Run:

```bash
npm test -- src/lib/crm/__tests__/validation.test.ts src/lib/crm/__tests__/attribution.test.ts
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/lib/crm
git commit -m "feat(crm): validate leads and normalize attribution"
```

---

### Task 5: Implement transactional lead intake and deduplication

**Files:**
- Create: `src/lib/crm/leads.ts`
- Create: `src/lib/crm/__tests__/leads.test.ts`
- Create: `src/app/api/leads/route.ts`

- [ ] **Step 1: Write the failing repository test**

Create `src/lib/crm/__tests__/leads.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";
import { createLeadIntake } from "../leads";

describe("createLeadIntake", () => {
  it("returns the existing lead for a repeated request id", async () => {
    const rpc = vi.fn().mockResolvedValue({
      data: [{ lead_id: "lead-1", created: false }],
      error: null,
    });
    const result = await createLeadIntake({ rpc } as never, {
      fullName: "Ana Petrović",
      email: "ana@example.com",
      company: "Klinika Ana",
      phone: "",
      market: "rs",
      service: "booking",
      message: "Booking za dve ordinacije.",
      consent: true,
      website: "",
      requestId: "req_1234567890",
      attribution: { landingPage: "/contact-us" },
    });
    expect(result).toEqual({ leadId: "lead-1", created: false });
    expect(rpc).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 2: Run the test to verify failure**

Run:

```bash
npm test -- src/lib/crm/__tests__/leads.test.ts
```

Expected: FAIL because `createLeadIntake` is missing.

- [ ] **Step 3: Add an atomic database function to the migration**

Append to `supabase/migrations/202607240001_adspire_os_core.sql`:

```sql
create or replace function public.intake_lead(payload jsonb)
returns table (lead_id uuid, created boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_id uuid;
  company_uuid uuid;
  contact_uuid uuid;
  new_lead_id uuid;
begin
  select id into existing_id from public.leads
    where request_id = payload->>'requestId';
  if existing_id is not null then
    return query select existing_id, false;
    return;
  end if;

  if nullif(payload->>'company', '') is not null then
    insert into public.companies(name)
      values (payload->>'company')
      returning id into company_uuid;
  end if;

  select id into contact_uuid from public.contacts
    where lower(email) = lower(payload->>'email');

  if contact_uuid is null then
    insert into public.contacts(company_id, full_name, email, phone)
      values (
        company_uuid,
        payload->>'fullName',
        lower(payload->>'email'),
        nullif(payload->>'phone', '')
      )
      returning id into contact_uuid;
  end if;

  insert into public.leads(
    contact_id, company_id, market, service, message, budget_range,
    timeline, landing_page, referrer, utm_source, utm_medium,
    utm_campaign, utm_content, utm_term, first_touch, last_touch,
    consent_at, request_id
  ) values (
    contact_uuid, company_uuid, payload->>'market', payload->>'service',
    payload->>'message', nullif(payload->>'budgetRange', ''),
    nullif(payload->>'timeline', ''), payload#>>'{attribution,landingPage}',
    payload#>>'{attribution,referrer}', payload#>>'{attribution,utmSource}',
    payload#>>'{attribution,utmMedium}', payload#>>'{attribution,utmCampaign}',
    payload#>>'{attribution,utmContent}', payload#>>'{attribution,utmTerm}',
    payload->'attribution', payload->'attribution', now(), payload->>'requestId'
  ) returning id into new_lead_id;

  insert into public.activities(lead_id, type, body, metadata)
    values (new_lead_id, 'form_submission', 'Website lead submitted', payload);

  insert into public.automation_outbox(topic, aggregate_id, payload)
    values ('lead.created', new_lead_id, jsonb_build_object(
      'leadId', new_lead_id, 'email', payload->>'email',
      'fullName', payload->>'fullName', 'service', payload->>'service',
      'market', payload->>'market'
    ));

  return query select new_lead_id, true;
end;
$$;

revoke all on function public.intake_lead(jsonb) from public, anon, authenticated;
grant execute on function public.intake_lead(jsonb) to service_role;
```

- [ ] **Step 4: Create `src/lib/crm/leads.ts`**

```ts
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import type { LeadSubmission } from "./validation";

export async function createLeadIntake(
  client: Pick<SupabaseClient<Database>, "rpc">,
  submission: LeadSubmission,
) {
  const { data, error } = await client.rpc("intake_lead", {
    payload: submission,
  });
  if (error) throw new Error(`Lead intake failed: ${error.message}`);
  const row = data?.[0];
  if (!row) throw new Error("Lead intake returned no result");
  return { leadId: row.lead_id, created: row.created };
}
```

- [ ] **Step 5: Create `src/app/api/leads/route.ts`**

```ts
import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createLeadIntake } from "@/lib/crm/leads";
import { normalizeAttribution } from "@/lib/crm/attribution";
import { leadSubmissionSchema } from "@/lib/crm/validation";

export async function POST(request: Request) {
  const requestId = request.headers.get("x-request-id") ??
    `web_${crypto.randomUUID()}`;
  try {
    const raw = await request.json();
    const parsed = leadSubmissionSchema.parse({
      ...raw,
      requestId: raw.requestId || requestId,
      attribution: normalizeAttribution(raw.attribution ?? {}),
    });
    const result = await createLeadIntake(createAdminSupabaseClient(), parsed);
    return NextResponse.json(result, {
      status: result.created ? 201 : 200,
      headers: { "x-request-id": requestId },
    });
  } catch (error) {
    const invalid = error instanceof Error && error.name === "ZodError";
    console.error("lead_intake_failed", { requestId, invalid });
    return NextResponse.json(
      { message: invalid ? "Proverite unete podatke." : "Upit trenutno nije sačuvan.", requestId },
      { status: invalid ? 400 : 500 },
    );
  }
}
```

- [ ] **Step 6: Regenerate database types and run tests**

Run:

```bash
npx supabase db reset
npx supabase gen types typescript --local > src/lib/supabase/database.types.ts
npm test -- src/lib/crm/__tests__/leads.test.ts
npm run typecheck
```

Expected: PASS and exit `0`.

- [ ] **Step 7: Commit**

```bash
git add supabase/migrations src/lib/crm src/app/api/leads src/lib/supabase/database.types.ts
git commit -m "feat(crm): ingest website leads transactionally"
```

---

### Task 6: Upgrade the existing contact form without redesigning it

**Files:**
- Modify: `src/components/site/v4/ContactV4.tsx`
- Modify: `src/components/site/v4/ContactV4.module.css`
- Modify: `src/pages/api/contact.ts`

- [ ] **Step 1: Add a component test for the required sales fields**

Create `src/components/site/v4/__tests__/ContactV4.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContactV4 } from "../ContactV4";

vi.mock("../PageShellV4", () => ({
  PageShellV4: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
}));

describe("ContactV4", () => {
  it("collects qualification and consent without showing a public price", () => {
    render(<ContactV4 />);
    expect(screen.getByLabelText("Koja usluga vam je potrebna?")).toBeInTheDocument();
    expect(screen.getByLabelText("Kada želite da počnemo?")).toBeInTheDocument();
    expect(screen.getByLabelText(/Saglasan sam/)).toBeInTheDocument();
    expect(screen.queryByText(/od 900/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run:

```bash
npm test -- src/components/site/v4/__tests__/ContactV4.test.tsx
```

Expected: FAIL because the fields do not exist.

- [ ] **Step 3: Update the form submission in `ContactV4.tsx`**

Keep the existing `PageShellV4`, left-side content and class names. Replace the
request body in `handleSubmit` with:

```ts
const params = new URLSearchParams(window.location.search);
const requestId = `web_${crypto.randomUUID()}`;
const response = await fetch("/api/leads", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-request-id": requestId,
  },
  body: JSON.stringify({
    fullName: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    company: String(form.get("company") ?? ""),
    phone: String(form.get("phone") ?? ""),
    market: String(form.get("market") ?? "rs"),
    service: String(form.get("service") ?? "other"),
    message: String(form.get("message") ?? ""),
    timeline: String(form.get("timeline") ?? ""),
    consent: form.get("consent") === "on",
    website: String(form.get("website") ?? ""),
    requestId,
    attribution: {
      landingPage: window.location.pathname,
      referrer: document.referrer || null,
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
      utmContent: params.get("utm_content"),
      utmTerm: params.get("utm_term"),
    },
  }),
});
if (!response.ok) throw new Error("Lead submission failed");
```

In the existing form, use these additional code-native fields:

```tsx
<input
  className={styles.honeypot}
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
/>
<label className={styles.field}>
  <span>Firma / projekat</span>
  <input type="text" name="company" />
</label>
<label className={styles.field}>
  <span>Tržište</span>
  <select name="market" defaultValue="rs">
    <option value="rs">Srbija i region</option>
    <option value="dach">DACH / dijaspora</option>
    <option value="white-label">White-label partnerstvo</option>
  </select>
</label>
<label className={styles.field}>
  <span>Koja usluga vam je potrebna?</span>
  <select name="service" required defaultValue="">
    <option value="" disabled>Izaberite</option>
    <option value="booking">Booking i automatizacija</option>
    <option value="web-platform">Web sajt ili platforma</option>
    <option value="ecommerce">E-commerce</option>
    <option value="automation">AI i automatizacija</option>
    <option value="mobile">Mobilna aplikacija</option>
    <option value="white-label">White-label razvoj</option>
    <option value="other">Drugo</option>
  </select>
</label>
<label className={styles.field}>
  <span>Kada želite da počnemo?</span>
  <select name="timeline" defaultValue="flexible">
    <option value="asap">Što pre</option>
    <option value="30-days">U narednih 30 dana</option>
    <option value="quarter">U naredna 3 meseca</option>
    <option value="flexible">Fleksibilno</option>
  </select>
</label>
<label className={styles.consent}>
  <input type="checkbox" name="consent" required />
  <span>Saglasan sam da Adspire odgovori na moj upit.</span>
</label>
```

- [ ] **Step 4: Extend `ContactV4.module.css` without changing the visual concept**

Add:

```css
.field select {
  width: 100%;
  background: rgba(6, 6, 8, 0.6);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 14px 16px;
  color: var(--ink);
  font: inherit;
}

.consent {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  color: var(--ink-dim);
  font-size: 13px;
  line-height: 1.45;
}

.consent input {
  margin-top: 3px;
  accent-color: var(--accent);
}

.honeypot {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  opacity: 0;
  pointer-events: none;
}
```

- [ ] **Step 5: Make the old endpoint explicitly deprecated**

Replace `src/pages/api/contact.ts` with:

```ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Deprecation", "true");
  res.setHeader("Link", '</api/leads>; rel="successor-version"');
  return res.status(410).json({
    message: "Kontakt forma je premeštena na /api/leads.",
  });
}
```

- [ ] **Step 6: Run component, type and build checks**

Run:

```bash
npm test -- src/components/site/v4/__tests__/ContactV4.test.tsx
npm run typecheck
npm run build
```

Expected: all pass. The contact route remains visually consistent.

- [ ] **Step 7: Commit**

```bash
git add src/components/site/v4 src/pages/api/contact.ts
git commit -m "feat(site): qualify and attribute website leads"
```

---

### Task 7: Add owner authentication and the protected OS shell

**Files:**
- Create: `src/app/os/login/page.tsx`
- Create: `src/app/os/login/actions.ts`
- Create: `src/app/os/(protected)/layout.tsx`
- Create: `src/components/os/OsShell.tsx`
- Create: `src/app/os/os.css`
- Modify: `src/middleware.ts`

- [ ] **Step 1: Create the login server action**

`src/app/os/login/actions.ts`:

```ts
"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/os/login?error=invalid");
  redirect("/os");
}

export async function logout() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/os/login");
}
```

- [ ] **Step 2: Create the login page**

`src/app/os/login/page.tsx`:

```tsx
import { login } from "./actions";
import "../os.css";

export default async function OsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="os-login">
      <form action={login} className="os-login__form">
        <span className="os-login__brand">ADSPIRE OS</span>
        <h1>Owner access</h1>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Lozinka<input name="password" type="password" autoComplete="current-password" required /></label>
        {error ? <p role="alert">Pogrešan email ili lozinka.</p> : null}
        <button type="submit">Prijavi se</button>
      </form>
    </main>
  );
}
```

- [ ] **Step 3: Create the shared OS shell**

`src/components/os/OsShell.tsx`:

```tsx
import Link from "next/link";
import { logout } from "@/app/os/login/actions";

const links = [
  ["/os", "Pregled"],
  ["/os/leads", "Leadovi"],
  ["/os/pipeline", "Pipeline"],
] as const;

export function OsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="os-shell">
      <aside className="os-sidebar">
        <Link href="/os" className="os-brand">ADSPIRE OS</Link>
        <nav>{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <form action={logout}><button type="submit">Odjavi se</button></form>
      </aside>
      <main className="os-main">{children}</main>
    </div>
  );
}
```

- [ ] **Step 4: Create the protected layout**

`src/app/os/(protected)/layout.tsx`:

```tsx
import { redirect } from "next/navigation";
import { OsShell } from "@/components/os/OsShell";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import "../os.css";

export default async function ProtectedOsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/os/login");
  return <OsShell>{children}</OsShell>;
}
```

- [ ] **Step 5: Add the base styles**

Create `src/app/os/os.css` with a true-white workspace, charcoal sidebar,
existing Adspire orange accent, 220px sidebar, compact tables, visible focus
states, and breakpoints at 820px and 620px. Reuse the token values:

```css
:root {
  --os-bg: #f5f5f3;
  --os-surface: #fff;
  --os-sidebar: #121313;
  --os-text: #171817;
  --os-muted: #6e726f;
  --os-line: #dedfdc;
  --os-accent: #f04416;
}
.os-shell { min-height: 100vh; display: grid; grid-template-columns: 220px 1fr; }
.os-sidebar { padding: 24px 16px; color: #fff; background: var(--os-sidebar); }
.os-sidebar nav { display: grid; gap: 6px; margin-top: 40px; }
.os-sidebar a, .os-sidebar button { color: inherit; text-decoration: none; }
.os-main { min-width: 0; padding: 36px clamp(20px, 4vw, 56px); background: var(--os-surface); }
.os-login { min-height: 100vh; display: grid; place-items: center; background: var(--os-bg); }
.os-login__form { width: min(420px, calc(100vw - 32px)); display: grid; gap: 16px; padding: 28px; background: #fff; border: 1px solid var(--os-line); }
.os-login__form label { display: grid; gap: 6px; }
.os-login__form input { min-height: 42px; border: 1px solid var(--os-line); padding: 10px 12px; }
.os-login__form button { min-height: 42px; border: 0; color: #fff; background: var(--os-accent); font-weight: 700; }
@media (max-width: 820px) {
  .os-shell { display: block; }
  .os-sidebar { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 20px; overflow-x: auto; }
  .os-sidebar nav { display: flex; margin: 0; }
}
```

- [ ] **Step 6: Extend middleware without breaking the German domain**

Replace `src/middleware.ts` with:

```ts
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isGermanDomain(host: string | null) {
  const value = host?.split(":")[0].toLowerCase();
  return value === "adspireagency.de" || value === "www.adspireagency.de";
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const path = request.nextUrl.pathname;

  if (isGermanDomain(request.headers.get("host")) && path === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/de";
    return NextResponse.rewrite(url);
  }

  if (path.startsWith("/os") && path !== "/os/login") {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll(values) {
            values.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            values.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );
    const { data } = await supabase.auth.getUser();
    if (!data.user) return NextResponse.redirect(new URL("/os/login", request.url));
  }
  return response;
}

export const config = {
  matcher: ["/", "/os/:path*"],
};
```

- [ ] **Step 7: Typecheck and build**

Run:

```bash
npm run typecheck
npm run build
```

Expected: both exit `0`; `/`, `/de`, `/os/login` and protected `/os` build.

- [ ] **Step 8: Commit**

```bash
git add src/app/os src/components/os src/middleware.ts
git commit -m "feat(os): add protected owner workspace"
```

---

### Task 8: Build dashboard, lead inbox and pipeline mutations

**Files:**
- Create: `src/lib/crm/queries.ts`
- Create: `src/lib/crm/actions.ts`
- Create: `src/app/os/(protected)/page.tsx`
- Create: `src/app/os/(protected)/leads/page.tsx`
- Create: `src/app/os/(protected)/leads/[id]/page.tsx`
- Create: `src/app/os/(protected)/pipeline/page.tsx`
- Create: `src/components/os/KpiStrip.tsx`
- Create: `src/components/os/LeadTable.tsx`
- Create: `src/components/os/LeadDetail.tsx`
- Create: `src/components/os/PipelineBoard.tsx`
- Create: `src/components/os/NextActionForm.tsx`
- Create: `src/components/os/StatusBadge.tsx`

- [ ] **Step 1: Create authenticated CRM queries**

`src/lib/crm/queries.ts`:

```ts
import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getDashboardData() {
  const supabase = await createServerSupabaseClient();
  const [newLeads, openTasks, openDeals, recent] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("tasks").select("*", { count: "exact", head: true }).eq("status", "open"),
    supabase.from("deals").select("value_min,value_max,leads!inner(status)").not("leads.status", "in", '("won","lost")'),
    supabase.from("leads").select("*,contacts(*),companies(*)").order("created_at", { ascending: false }).limit(8),
  ]);
  const pipelineMin = (openDeals.data ?? []).reduce((sum, d) => sum + Number(d.value_min ?? 0), 0);
  const pipelineMax = (openDeals.data ?? []).reduce((sum, d) => sum + Number(d.value_max ?? 0), 0);
  return {
    newLeadCount: newLeads.count ?? 0,
    openTaskCount: openTasks.count ?? 0,
    pipelineMin,
    pipelineMax,
    recentLeads: recent.data ?? [],
  };
}

export async function getLeads() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*,contacts(*),companies(*),deals(*)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getLead(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*,contacts(*),companies(*),deals(*),activities(*),tasks(*)")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}
```

- [ ] **Step 2: Create protected server mutations**

`src/lib/crm/actions.ts`:

```ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { LEAD_STATUSES } from "./types";

const statusInput = z.object({
  leadId: z.string().uuid(),
  status: z.enum(LEAD_STATUSES),
  lostReason: z.string().trim().max(500).optional(),
});

export async function updateLeadStatus(input: z.infer<typeof statusInput>) {
  const values = statusInput.parse(input);
  const supabase = await createServerSupabaseClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Unauthorized");
  const { data: before } = await supabase.from("leads").select("status,lost_reason").eq("id", values.leadId).single();
  const { error } = await supabase.from("leads").update({
    status: values.status,
    lost_reason: values.status === "lost" ? values.lostReason ?? "Nije navedeno" : null,
    updated_at: new Date().toISOString(),
  }).eq("id", values.leadId);
  if (error) throw new Error(error.message);
  await supabase.from("activities").insert({
    lead_id: values.leadId,
    actor_id: userData.user.id,
    type: "status_change",
    metadata: { from: before?.status, to: values.status },
  });
  revalidatePath("/os");
  revalidatePath("/os/leads");
  revalidatePath("/os/pipeline");
}

export async function createNextAction(formData: FormData) {
  const values = z.object({
    leadId: z.string().uuid(),
    title: z.string().trim().min(2).max(200),
    dueAt: z.string().datetime(),
  }).parse({
    leadId: formData.get("leadId"),
    title: formData.get("title"),
    dueAt: formData.get("dueAt"),
  });
  const supabase = await createServerSupabaseClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Unauthorized");
  const { error } = await supabase.from("tasks").insert({
    lead_id: values.leadId,
    assignee_id: userData.user.id,
    title: values.title,
    due_at: values.dueAt,
  });
  if (error) throw new Error(error.message);
  await supabase.from("leads").update({ next_action_at: values.dueAt }).eq("id", values.leadId);
  revalidatePath(`/os/leads/${values.leadId}`);
}
```

- [ ] **Step 3: Create small display components**

`src/components/os/StatusBadge.tsx`:

```tsx
import type { LeadStatus } from "@/lib/crm/types";

const labels: Record<LeadStatus, string> = {
  new: "Novi lead", contacted: "Kontaktiran", qualified: "Kvalifikovan",
  meeting_booked: "Poziv zakazan", proposal_sent: "Ponuda poslata",
  negotiation: "Pregovori", won: "Dobijen", lost: "Izgubljen",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return <span className={`os-status os-status--${status}`}>{labels[status]}</span>;
}
```

`src/components/os/KpiStrip.tsx`:

```tsx
export function KpiStrip({ data }: {
  data: { newLeadCount: number; openTaskCount: number; pipelineMin: number; pipelineMax: number };
}) {
  const items = [
    ["Novi leadovi", String(data.newLeadCount)],
    ["Otvoreni zadaci", String(data.openTaskCount)],
    ["Pipeline minimum", `${data.pipelineMin.toLocaleString("sr-RS")} €`],
    ["Pipeline potencijal", `${data.pipelineMax.toLocaleString("sr-RS")} €`],
  ];
  return <section className="os-kpis">{items.map(([label, value]) =>
    <article key={label}><span>{label}</span><strong>{value}</strong></article>
  )}</section>;
}
```

- [ ] **Step 4: Create pages using the query boundary**

`src/app/os/(protected)/page.tsx`:

```tsx
import { KpiStrip } from "@/components/os/KpiStrip";
import { LeadTable } from "@/components/os/LeadTable";
import { getDashboardData } from "@/lib/crm/queries";

export default async function OsDashboardPage() {
  const data = await getDashboardData();
  return <>
    <header className="os-page-header"><div><h1>Prodajni pregled</h1><p>Šta danas zahteva pažnju.</p></div></header>
    <KpiStrip data={data} />
    <section><h2>Najnoviji leadovi</h2><LeadTable leads={data.recentLeads} /></section>
  </>;
}
```

`src/app/os/(protected)/leads/page.tsx`:

```tsx
import { LeadTable } from "@/components/os/LeadTable";
import { getLeads } from "@/lib/crm/queries";

export default async function LeadsPage() {
  const leads = await getLeads();
  return <><header className="os-page-header"><h1>Website inbox</h1></header><LeadTable leads={leads} /></>;
}
```

`src/app/os/(protected)/leads/[id]/page.tsx`:

```tsx
import { LeadDetail } from "@/components/os/LeadDetail";
import { getLead } from "@/lib/crm/queries";

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LeadDetail lead={await getLead(id)} />;
}
```

`src/app/os/(protected)/pipeline/page.tsx`:

```tsx
import { PipelineBoard } from "@/components/os/PipelineBoard";
import { getLeads } from "@/lib/crm/queries";

export default async function PipelinePage() {
  return <><header className="os-page-header"><h1>Prodajni pipeline</h1></header><PipelineBoard leads={await getLeads()} /></>;
}
```

- [ ] **Step 5: Create typed tables and detail components**

Create `src/components/os/LeadTable.tsx`:

```tsx
import Link from "next/link";
import type { LeadStatus } from "@/lib/crm/types";
import { StatusBadge } from "./StatusBadge";

export type LeadListItem = {
  id: string;
  market: string;
  service: string;
  status: LeadStatus;
  next_action_at: string | null;
  created_at: string;
  contacts: { full_name: string; email: string } | null;
  companies: { name: string } | null;
};

export function LeadTable({ leads }: { leads: LeadListItem[] }) {
  return (
    <div className="os-table-wrap">
      <table className="os-table">
        <thead><tr>
          <th>Kontakt</th><th>Kompanija</th><th>Tržište</th><th>Usluga</th>
          <th>Status</th><th>Sledeći korak</th><th>Kreiran</th><th />
        </tr></thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td><strong>{lead.contacts?.full_name ?? "Nepoznat kontakt"}</strong><small>{lead.contacts?.email}</small></td>
              <td>{lead.companies?.name ?? "—"}</td>
              <td>{lead.market}</td>
              <td>{lead.service}</td>
              <td><StatusBadge status={lead.status} /></td>
              <td>{lead.next_action_at ? new Date(lead.next_action_at).toLocaleString("sr-RS") : "Nije zakazan"}</td>
              <td>{new Date(lead.created_at).toLocaleDateString("sr-RS")}</td>
              <td><Link aria-label={`Otvori lead ${lead.contacts?.full_name ?? lead.id}`} href={`/os/leads/${lead.id}`}>Otvori</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {leads.length === 0 ? <p className="os-empty">Još nema leadova.</p> : null}
    </div>
  );
}
```

Create `src/components/os/NextActionForm.tsx`:

```tsx
import { createNextAction } from "@/lib/crm/actions";

export function NextActionForm({ leadId }: { leadId: string }) {
  const minimum = new Date(Date.now() + 60_000).toISOString().slice(0, 16);
  return (
    <form action={createNextAction} className="os-form">
      <input type="hidden" name="leadId" value={leadId} />
      <label>Sledeći korak<input name="title" minLength={2} maxLength={200} required /></label>
      <label>Rok<input name="dueAt" type="datetime-local" min={minimum} required /></label>
      <button type="submit">Sačuvaj zadatak</button>
    </form>
  );
}
```

Create `src/components/os/PipelineBoard.tsx`:

```tsx
"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/lib/crm/actions";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/crm/types";
import type { LeadListItem } from "./LeadTable";
import { StatusBadge } from "./StatusBadge";

const stageLabels: Record<LeadStatus, string> = {
  new: "Novi lead", contacted: "Kontaktiran", qualified: "Kvalifikovan",
  meeting_booked: "Poziv zakazan", proposal_sent: "Ponuda poslata",
  negotiation: "Pregovori", won: "Dobijen", lost: "Izgubljen",
};

export function PipelineBoard({ leads }: { leads: LeadListItem[] }) {
  const [pending, startTransition] = useTransition();
  return (
    <div className="os-pipeline" aria-busy={pending}>
      {LEAD_STATUSES.map((stage) => (
        <section className="os-pipeline__column" key={stage}>
          <h2>{stageLabels[stage]} <span>{leads.filter((lead) => lead.status === stage).length}</span></h2>
          {leads.filter((lead) => lead.status === stage).map((lead) => (
            <article className="os-pipeline__card" key={lead.id}>
              <strong>{lead.contacts?.full_name ?? "Nepoznat kontakt"}</strong>
              <small>{lead.companies?.name ?? lead.service}</small>
              <StatusBadge status={lead.status} />
              <label>
                Promeni fazu
                <select
                  value={lead.status}
                  disabled={pending}
                  onChange={(event) => {
                    const status = event.target.value as LeadStatus;
                    startTransition(() => updateLeadStatus({ leadId: lead.id, status }));
                  }}
                >
                  {LEAD_STATUSES.map((value) => <option key={value} value={value}>{stageLabels[value]}</option>)}
                </select>
              </label>
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
```

Create `src/components/os/LeadDetail.tsx`:

```tsx
"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus } from "@/lib/crm/actions";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/crm/types";
import { NextActionForm } from "./NextActionForm";
import { StatusBadge } from "./StatusBadge";

type LeadDetailData = {
  id: string;
  status: LeadStatus;
  market: string;
  service: string;
  message: string;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  contacts: { full_name: string; email: string; phone: string | null } | null;
  companies: { name: string; website: string | null } | null;
  activities: Array<{ id: string; type: string; created_at: string }>;
  tasks: Array<{ id: string; title: string; status: string; due_at: string | null }>;
};

export function LeadDetail({ lead }: { lead: LeadDetailData }) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [lostReason, setLostReason] = useState("");
  const [pending, startTransition] = useTransition();
  return (
    <>
      <header className="os-page-header">
        <div><h1>{lead.contacts?.full_name ?? "Lead"}</h1><p>{lead.companies?.name ?? lead.service}</p></div>
        <StatusBadge status={status} />
      </header>
      <div className="os-detail">
        <section><h2>Kontakt</h2><p>{lead.contacts?.email}</p><p>{lead.contacts?.phone ?? "Telefon nije unet"}</p></section>
        <section><h2>Zahtev</h2><p>{lead.message}</p><dl><dt>Usluga</dt><dd>{lead.service}</dd><dt>Tržište</dt><dd>{lead.market}</dd></dl></section>
        <section><h2>Atribucija</h2><dl><dt>Landing</dt><dd>{lead.landing_page ?? "—"}</dd><dt>Referrer</dt><dd>{lead.referrer ?? "—"}</dd><dt>UTM</dt><dd>{[lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / ") || "Organski / direktno"}</dd></dl></section>
        <section>
          <h2>Status i razlog gubitka</h2>
          <div className="os-form">
            <label>Status<select value={status} onChange={(event) => setStatus(event.target.value as LeadStatus)}>{LEAD_STATUSES.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
            {status === "lost" ? <label>Razlog gubitka<textarea value={lostReason} onChange={(event) => setLostReason(event.target.value)} required /></label> : null}
            <button disabled={pending} type="button" onClick={() => startTransition(async () => {
              await updateLeadStatus({ leadId: lead.id, status, lostReason });
            })}>Sačuvaj status</button>
          </div>
        </section>
        <section><h2>Aktivnosti</h2><ul>{lead.activities.map((item) => <li key={item.id}>{item.type} · {new Date(item.created_at).toLocaleString("sr-RS")}</li>)}</ul></section>
        <section><h2>Zadaci</h2><ul>{lead.tasks.map((task) => <li key={task.id}>{task.title} · {task.status}</li>)}</ul><NextActionForm leadId={lead.id} /></section>
      </div>
    </>
  );
}
```

- [ ] **Step 6: Add the OS component styles**

Append this exact block to `src/app/os/os.css`:

```css
.os-page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 28px; }
.os-page-header h1 { margin: 0; font-size: clamp(28px, 4vw, 44px); letter-spacing: -0.04em; }
.os-page-header p { margin: 8px 0 0; color: var(--os-muted); }
.os-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-bottom: 36px; }
.os-kpis article, .os-detail section { padding: 20px; border: 1px solid var(--os-line); background: var(--os-bg); }
.os-kpis span, .os-table small { display: block; color: var(--os-muted); font-size: 12px; }
.os-kpis strong { display: block; margin-top: 12px; font-size: 24px; }
.os-table-wrap { width: 100%; overflow-x: auto; border: 1px solid var(--os-line); }
.os-table { width: 100%; border-collapse: collapse; white-space: nowrap; }
.os-table th, .os-table td { padding: 13px 14px; border-bottom: 1px solid var(--os-line); text-align: left; vertical-align: top; }
.os-table th { color: var(--os-muted); font-size: 11px; text-transform: uppercase; letter-spacing: .08em; }
.os-empty { padding: 24px; color: var(--os-muted); }
.os-status { display: inline-flex; padding: 4px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; }
.os-status--new { background: #e8efff; color: #244da8; }
.os-status--contacted { background: #e8f6ff; color: #17638a; }
.os-status--qualified { background: #eef8df; color: #4d6b16; }
.os-status--meeting_booked { background: #f4edff; color: #67439a; }
.os-status--proposal_sent { background: #fff1dc; color: #8a5416; }
.os-status--negotiation { background: #ffeadf; color: #9b401f; }
.os-status--won { background: #def6e7; color: #17643a; }
.os-status--lost { background: #f3e8e8; color: #853838; }
.os-detail { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.os-detail h2 { margin-top: 0; }
.os-detail dl { display: grid; grid-template-columns: 110px 1fr; gap: 8px 14px; }
.os-detail dt { color: var(--os-muted); }
.os-detail dd { margin: 0; overflow-wrap: anywhere; }
.os-form { display: grid; gap: 12px; }
.os-form label { display: grid; gap: 6px; }
.os-form input, .os-form select, .os-form textarea { min-height: 40px; padding: 9px 10px; border: 1px solid var(--os-line); background: #fff; color: var(--os-text); font: inherit; }
.os-form button { min-height: 40px; padding: 9px 14px; border: 0; background: var(--os-accent); color: #fff; font-weight: 700; }
.os-pipeline { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(260px, 1fr); gap: 12px; overflow-x: auto; padding-bottom: 12px; }
.os-pipeline__column { padding: 12px; background: var(--os-bg); }
.os-pipeline__column h2 { display: flex; justify-content: space-between; font-size: 14px; }
.os-pipeline__card { display: grid; gap: 9px; margin-top: 10px; padding: 14px; border: 1px solid var(--os-line); background: #fff; }
.os-pipeline__card small { color: var(--os-muted); }
.os-pipeline__card label { display: grid; gap: 5px; font-size: 12px; }
.os-pipeline__card select { width: 100%; padding: 8px; border: 1px solid var(--os-line); background: #fff; }
.os-main :focus-visible { outline: 3px solid color-mix(in srgb, var(--os-accent), white 35%); outline-offset: 2px; }
@media (max-width: 1000px) { .os-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 820px) { .os-detail { grid-template-columns: 1fr; } }
@media (max-width: 620px) { .os-kpis { grid-template-columns: 1fr; } .os-main { padding: 24px 16px; } }
```

- [ ] **Step 7: Run unit, type and build checks**

Run:

```bash
npm test
npm run typecheck
npm run build
```

Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add src/lib/crm src/app/os src/components/os
git commit -m "feat(os): add owner dashboard and CRM pipeline"
```

---

### Task 9: Add reliable signed n8n delivery

**Files:**
- Create: `src/lib/automation/signature.ts`
- Create: `src/lib/automation/dispatcher.ts`
- Create: `src/lib/automation/__tests__/signature.test.ts`
- Create: `src/app/api/automation/dispatch/route.ts`
- Create: `vercel.json`

- [ ] **Step 1: Write the failing signature test**

`src/lib/automation/__tests__/signature.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { signWebhookPayload } from "../signature";

describe("signWebhookPayload", () => {
  it("returns a deterministic sha256 HMAC", async () => {
    expect(await signWebhookPayload('{"leadId":"1"}', "secret", "1721820000"))
      .toBe("11e1ba22594850c7e3ae2337a975b2923e0775db4c632dbe20c97248ad6a2289");
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run:

```bash
npm test -- src/lib/automation/__tests__/signature.test.ts
```

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Create `src/lib/automation/signature.ts`**

```ts
export async function signWebhookPayload(body: string, secret: string, timestamp: string) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC", key, new TextEncoder().encode(`${timestamp}.${body}`),
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
```

- [ ] **Step 4: Create the dispatcher**

`src/lib/automation/dispatcher.ts`:

```ts
import "server-only";
import { env } from "@/lib/env";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { signWebhookPayload } from "./signature";

export async function dispatchAutomationBatch(limit = 20) {
  const db = createAdminSupabaseClient();
  const { data: rows, error } = await db.from("automation_outbox")
    .select("*").in("status", ["pending", "failed"])
    .lte("available_at", new Date().toISOString())
    .order("created_at").limit(limit);
  if (error) throw new Error(error.message);

  let sent = 0;
  for (const row of rows ?? []) {
    await db.from("automation_outbox").update({
      status: "processing", attempts: row.attempts + 1,
    }).eq("id", row.id);
    const body = JSON.stringify({ topic: row.topic, ...row.payload });
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = await signWebhookPayload(body, env.N8N_WEBHOOK_SECRET, timestamp);
    try {
      const response = await fetch(env.N8N_CRM_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-adspire-timestamp": timestamp,
          "x-adspire-signature": signature,
        },
        body,
      });
      const responseBody = (await response.text()).slice(0, 2000);
      await db.from("webhook_receipts").insert({
        outbox_id: row.id,
        response_status: response.status,
        response_body: responseBody,
      });
      if (!response.ok) throw new Error(`n8n returned ${response.status}`);
      await db.from("automation_outbox").update({
        status: "sent", sent_at: new Date().toISOString(), last_error: null,
      }).eq("id", row.id);
      sent++;
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unknown error";
      const delayMinutes = Math.min(60, 2 ** Math.min(row.attempts, 5));
      await db.from("automation_outbox").update({
        status: "failed",
        last_error: message.slice(0, 1000),
        available_at: new Date(Date.now() + delayMinutes * 60_000).toISOString(),
      }).eq("id", row.id);
    }
  }
  return { processed: rows?.length ?? 0, sent };
}
```

- [ ] **Step 5: Create the secured cron route**

`src/app/api/automation/dispatch/route.ts`:

```ts
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { dispatchAutomationBatch } from "@/lib/automation/dispatcher";

export async function GET(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${env.AUTOMATION_CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await dispatchAutomationBatch());
}
```

- [ ] **Step 6: Add Vercel cron configuration**

`vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/automation/dispatch",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

- [ ] **Step 7: Run tests**

Run:

```bash
npm test -- src/lib/automation/__tests__/signature.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/lib/automation src/app/api/automation vercel.json
git commit -m "feat(automation): deliver CRM events reliably to n8n"
```

---

### Task 10: Add first-party funnel events

**Files:**
- Create: `src/app/api/events/route.ts`
- Create: `src/components/analytics/SalesAnalytics.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the events endpoint**

`src/app/api/events/route.ts`:

```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const eventSchema = z.object({
  sessionId: z.string().min(10).max(100),
  name: z.enum(["page_view", "cta_click", "lead_form_started", "lead_form_submitted", "meeting_booked"]),
  path: z.string().min(1).max(500),
  locale: z.string().max(10).optional(),
  market: z.string().max(40).optional(),
  properties: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).default({}),
});

export async function POST(request: Request) {
  try {
    const value = eventSchema.parse(await request.json());
    const { error } = await createAdminSupabaseClient().from("web_events").insert({
      session_id: value.sessionId,
      name: value.name,
      path: value.path,
      locale: value.locale,
      market: value.market,
      properties: value.properties,
    });
    if (error) throw new Error(error.message);
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ message: "Invalid event" }, { status: 400 });
  }
}
```

- [ ] **Step 2: Create a minimal event client**

`src/components/analytics/SalesAnalytics.tsx`:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function sessionId() {
  const key = "adspire.sales.session";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const created = `session_${crypto.randomUUID()}`;
  sessionStorage.setItem(key, created);
  return created;
}

export function trackSalesEvent(
  name: "page_view" | "cta_click" | "lead_form_started" | "lead_form_submitted" | "meeting_booked",
  properties: Record<string, string | number | boolean | null> = {},
) {
  const body = JSON.stringify({
    sessionId: sessionId(),
    name,
    path: window.location.pathname,
    locale: document.documentElement.lang,
    properties,
  });
  navigator.sendBeacon?.("/api/events", new Blob([body], { type: "application/json" })) ||
    fetch("/api/events", { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: true });
}

export function SalesAnalytics() {
  const pathname = usePathname();
  useEffect(() => trackSalesEvent("page_view"), [pathname]);
  return null;
}
```

- [ ] **Step 3: Mount analytics once**

In `src/app/layout.tsx`, import and render:

```tsx
import { SalesAnalytics } from "@/components/analytics/SalesAnalytics";

// Inside <body>, next to <Analytics />:
<SalesAnalytics />
```

- [ ] **Step 4: Instrument form start and success**

In `ContactV4.tsx`, call:

```ts
trackSalesEvent("lead_form_started", { form: "contact_v4" });
trackSalesEvent("lead_form_submitted", { service, market });
```

Ensure `lead_form_started` fires only once per component mount.

- [ ] **Step 5: Run compiler and build**

Run:

```bash
npm run typecheck
npm run build
```

Expected: exit `0`.

- [ ] **Step 6: Commit**

```bash
git add src/app/api/events src/components/analytics src/app/layout.tsx src/components/site/v4/ContactV4.tsx
git commit -m "feat(analytics): connect website activity to sales funnel"
```

---

### Task 11: Verify the complete acquisition path with E2E tests

**Files:**
- Create: `tests/e2e/contact-lead.spec.ts`
- Create: `tests/e2e/os-auth.spec.ts`
- Create: `tests/e2e/os-pipeline.spec.ts`

- [ ] **Step 1: Write the contact lead E2E test**

`tests/e2e/contact-lead.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("qualified website lead gets a success state", async ({ page }) => {
  await page.route("**/api/leads", async (route) => {
    const body = route.request().postDataJSON();
    expect(body.service).toBe("booking");
    expect(body.attribution.utmSource).toBe("google");
    await route.fulfill({ status: 201, contentType: "application/json", body: '{"leadId":"lead-1","created":true}' });
  });
  await page.goto("/contact-us?utm_source=google&utm_medium=cpc");
  await page.getByLabel("Ime i prezime").fill("Ana Petrović");
  await page.getByLabel("Firma / projekat").fill("Klinika Ana");
  await page.getByLabel("Email").fill("ana@example.com");
  await page.getByLabel("Koja usluga vam je potrebna?").selectOption("booking");
  await page.getByLabel("O čemu se radi?").fill("Booking za dve ordinacije.");
  await page.getByLabel(/Saglasan sam/).check();
  await page.getByRole("button", { name: /Pošalji poruku/ }).click();
  await expect(page.getByText(/Javljamo se u roku od 24h/)).toBeVisible();
});
```

- [ ] **Step 2: Write auth and pipeline tests**

`tests/e2e/os-auth.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("anonymous owner route redirects to login", async ({ page }) => {
  await page.goto("/os");
  await expect(page).toHaveURL(/\/os\/login/);
  await expect(page.getByRole("heading", { name: "Owner access" })).toBeVisible();
});
```

`tests/e2e/os-pipeline.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test.skip(!process.env.E2E_OWNER_EMAIL, "Owner credentials not configured");

test("owner sees lead inbox and updates a next action", async ({ page }) => {
  await page.goto("/os/login");
  await page.getByLabel("Email").fill(process.env.E2E_OWNER_EMAIL!);
  await page.getByLabel("Lozinka").fill(process.env.E2E_OWNER_PASSWORD!);
  await page.getByRole("button", { name: "Prijavi se" }).click();
  await page.goto("/os/leads");
  await expect(page.getByRole("heading", { name: "Website inbox" })).toBeVisible();
  await page.getByRole("link", { name: /otvori lead/i }).first().click();
  await page.getByLabel("Sledeći korak").fill("Pozvati klijenta");
  await page.getByLabel("Rok").fill("2026-07-27T10:00");
  await page.getByRole("button", { name: "Sačuvaj zadatak" }).click();
  await expect(page.getByText("Pozvati klijenta")).toBeVisible();
});
```

- [ ] **Step 3: Install browsers and run E2E**

Run:

```bash
npx playwright install chromium
npm run test:e2e
```

Expected: contact and anonymous auth tests pass on desktop and mobile; owner
pipeline test passes when credentials are set and skips otherwise.

- [ ] **Step 4: Run the full release gate**

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Expected: all required checks exit `0`.

- [ ] **Step 5: Commit**

```bash
git add tests/e2e
git commit -m "test(os): cover lead acquisition and owner pipeline"
```

---

### Task 12: Document operations and perform production smoke verification

**Files:**
- Create: `docs/adspire-os-operations.md`

- [ ] **Step 1: Create the operations guide**

`docs/adspire-os-operations.md` must contain:

```markdown
# Adspire OS Operations

## Required environment variables

Document every variable from `.env.example`, where it is configured, and which
runtime consumes it. Never paste secret values into this document.

## Owner bootstrap

1. Create the owner in Supabase Auth.
2. Insert the matching `profiles` row with role `owner`.
3. Enable MFA.
4. Verify `/os` redirects unauthenticated users.

## Lead smoke test

1. Submit one test lead with `utm_source=smoke-test`.
2. Verify the contact, lead, activity and outbox rows.
3. Run the dispatcher.
4. Verify the n8n receipt and notification.
5. Delete the smoke-test lead and dependent test data.

## Automation recovery

- `pending`: waiting for dispatch.
- `processing`: currently being sent.
- `failed`: retry scheduled; inspect `last_error`.
- `sent`: accepted by n8n.

Never manually mark a failed row `sent`. Fix the cause and move `available_at`
to the current timestamp.

## Release gate

`npm test && npm run typecheck && npm run lint && npm run build && npm run test:e2e`
```

- [ ] **Step 2: Deploy a preview**

Create a preview from the verified working tree:

```bash
npx vercel --yes
```

Copy the preview URL from stdout and inspect its deployment status with the
connected Vercel project tools. Do not run a production promotion until the
preview status is `READY`.

- [ ] **Step 3: Browser smoke verification**

Verify at 1440px, 768px and 375px:

```text
/contact-us
/os/login
/os
/os/leads
/os/pipeline
```

Expected:

- no console errors;
- no horizontal page overflow;
- public design remains recognizably unchanged;
- keyboard focus is visible;
- form success and failure states are readable;
- unauthenticated `/os` access redirects;
- owner can inspect and update a lead.

- [ ] **Step 4: Commit documentation**

```bash
git add docs/adspire-os-operations.md
git commit -m "docs: add Adspire OS operations runbook"
```

- [ ] **Step 5: Production deployment and post-deploy checks**

Promote the verified build, then:

```text
1. Submit a production smoke lead.
2. Confirm it appears in Website inbox.
3. Confirm the n8n notification arrives once.
4. Confirm Vercel Analytics and first-party events both record the page.
5. Mark the smoke lead lost with reason "production smoke test".
```

Expected: one website submission, one lead, one outbox event, one n8n
notification, and one complete audit trail.
