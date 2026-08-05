# Adspire — instrukcije za agente

**Prvo pročitaj `docs/HANDOFF-2026-07-31.md`.** Tu je gde smo stali, šta je urađeno,
šta je blokirano i šta je sledeće.

## Kontekst

Adspire Digital, Niš. Đorđe Milovanović je jedini u firmi. Ima 13 živih klijentskih
sistema, ali radi samo na preporuku — sajt je živ ~2 godine i doneo je 0 klijenata.
Cilj: sajt kao prodajni kanal + šira ponuda + ponavljajući prihod.

Glavni plan: `docs/plan-adspire-2026-h2.md`.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Supabase (Postgres + Auth + RLS), Zod,
Vitest, n8n, Vercel.

## Granice

- **Animacije, pozadina i scroll efekti su tuđi posao.** Zaseban agent radi samo taj
  sloj po `docs/PROMPT-agent-3-vizuelni.md`. Ne diraj `SceneV4.tsx`, `SilkV4.tsx`,
  `EventHorizonV4.tsx`, `ObsidianShard.tsx`, `ProjectPlanesV4.tsx`, `PreloaderV4.tsx`,
  `CursorV4.tsx`, GSAP/ScrollTrigger i Lenis logiku u `HomeV4.tsx`, ni keyframe/`data-reveal`
  prelaze u `*.module.css`. Predloge za taj sloj upiši u taj prompt fajl.
- **Ne diraj `src/middleware.ts`** — rewrite za `adspireagency.de` → `/de`.
- **Ne diraj stilove u `src/app/os/os.css`** — `/os` je interni alat, namerno plain.
- **Paleta je odlučena:** crno/belo baza + trust-blue `#2f6bff`. Ember, violet i
  narandžasta su odbijeni. Ne predlaži nove palete bez pitanja.
- **Kontakt forma** (`ContactV4`) je nedavno prepravljena: čuvaj polja, honeypot,
  atribuciju i `requestId`; menjaj samo izgled.
- **Ne šalji mejlove i ne menjaj DNS** bez Đorđeve izričite potvrde.
- Javne početne cene se ne prikazuju — cena ide u ponudu, vidljiva samo leadu.

## Provera pre kraja izmene

```bash
npm run typecheck && npm test && npm run build
```

Dev server: preko `.claude/launch.json` („Next.js Dev Server", port 3000), ne preko bash-a.

## Jezik

- Komentari u kodu: engleski, kratki, objašnjavaju **zašto**.
- Tekst za korisnike: srpski. Lokalizacija SR/EN/DE postoji za početnu i kontakt;
  ostale unutrašnje strane su još samo SR.
