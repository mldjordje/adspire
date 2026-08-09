# Transparent Client Logos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the homepage client-logo section reveal the existing scroll-based background while preserving logo readability and every animation behavior.

**Architecture:** Limit the visual change to CSS backgrounds in `ClientLogosV4.module.css`; the section becomes transparent and each card keeps a near-transparent contrast layer. Do not modify scene, scroll, layout, component data flow, or animation files. Verify the entire accumulated SEO/AEO/measurement change set before committing and pushing `main`.

**Tech Stack:** Next.js 16, React 19, CSS Modules, Vitest, TypeScript, next-sitemap

---

### Task 1: Make the logo section transparent

**Files:**
- Modify: `src/components/site/v4/ClientLogosV4.module.css`

- [ ] **Step 1: Record the current background declarations**

Run:

```powershell
Select-String -Path src/components/site/v4/ClientLogosV4.module.css -Pattern "background:" -Context 0,3
```

Expected: the section has an opaque dark gradient and cards use a near-transparent fill.

- [ ] **Step 2: Apply the minimal CSS change**

Use this section background:

```css
.section {
  background: transparent;
}
```

Use this card background so particles remain visible without losing white logos:

```css
.client {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.018), transparent 58%),
    rgba(3, 4, 10, 0.18);
}
```

Keep existing border, hover, logo filter, layout and transition declarations unchanged.

- [ ] **Step 3: Confirm protected animation files are untouched**

Run:

```powershell
git status --short | Select-String "SceneV4|SilkV4|EventHorizonV4|ObsidianShard|ProjectPlanesV4|PreloaderV4|CursorV4"
```

Expected: no output.

### Task 2: Verify SEO/AI and generated pages

**Files:**
- Verify: `src/data/serviceCatalog.ts`
- Verify: `src/app/llms.txt/route.ts`
- Verify: `src/lib/seo/jsonld.ts`
- Verify: `public/sitemap-0.xml`

- [ ] **Step 1: Run type and unit checks**

Run:

```powershell
npm run typecheck
npm test
```

Expected: TypeScript exits 0 and all 47 tests pass.

- [ ] **Step 2: Build production output and sitemap**

Run:

```powershell
npm run build
```

Expected: Next.js build succeeds, 110 routes generate and next-sitemap creates one index plus one child sitemap.

- [ ] **Step 3: Audit generated service HTML**

For all 15 `.next/server/app/our-services/*.html` files, assert exactly one canonical, exactly one H1, a non-empty title and visible `Za koga ima smisla` plus `Šta dobijate` sections. Assert 51 sitemap URLs, 51 unique values and no `/os`, `/nalog`, `/upit/status` or `/v4` route.

Expected: zero service audit issues and zero forbidden sitemap URLs.

### Task 3: Commit and publish

**Files:**
- Stage only the tracked/new files created or intentionally modified for today's SEO, AI, measurement, legal and client-logo work.
- Exclude unrelated user assets, exports, admin, n8n, Supabase and workflow files.

- [ ] **Step 1: Review the final diff**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors; protected animation files absent.

- [ ] **Step 2: Commit the reviewed change set**

```powershell
git commit -m "feat: complete SEO AI and Ads readiness"
```

Expected: one commit containing only today's intentional public-site work.

- [ ] **Step 3: Push production branch**

```powershell
git push origin main
```

Expected: `main` advances on `origin`; the connected production deployment starts.
