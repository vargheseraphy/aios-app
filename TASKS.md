# Tasks

Single source of build progress. Pick the first unchecked task in the lowest unfinished phase.
See `BUILD-PROMPT.md` (in `../aios-book/website/build-reference/`) for full phase acceptance
criteria, and `DECISIONS.md` for anything resolved autonomously along the way.

## Phase 0 — repo setup

- [x] `git init`, configure author (Raphy Varghese / raphy202@gmail.com)
- [x] Copy `docs/` and `content/` from the reference repo
- [x] `.gitignore`
- [x] `README.md`
- [x] Read every file in `docs/`
- [x] Commit: `chore: initialise repo with reference docs and book content`

## Phase 1 — scaffold

- [x] Next.js (App Router) + TypeScript + Tailwind, per `docs/technical/ARCHITECTURE.md`
      (Next.js 16 / Tailwind v4 — CSS-first config, no `tailwind.config.ts`; see DECISIONS.md)
- [x] Port design tokens from `docs/design/pages/home.html` into `app/globals.css`'s `@theme`
      block: colour palette, Archivo/Roboto/Roboto Mono font stack (Google Fonts via
      `next/font/google`), the 1536px container with 20/40/80px side padding, the type scale
- [x] Follow `docs/design/DESIGN.md` for the documented system
- [x] Acceptance: `npm run build` passes; a blank page renders with fonts and tokens live
      (verified in compiled CSS output)

## Phase 2 — database and security

- [x] `supabase/migrations/0001_init.sql`: `users`, `bookmarks`, `invites` tables from
      `ARCHITECTURE.md`, RLS enabled, policies in the same migration
- [x] Supabase client helpers for server and browser; service-role key server-side only
      (`lib/supabase/client.ts`, `server.ts`, `admin.ts` guarded by `server-only`)
- [x] `.env.example` with named-but-empty vars
- [x] Acceptance: migration reviewed for valid Postgres/RLS syntax (no live project available
      to apply it against — see DECISIONS.md); `supabase/migrations/0001_init.test.ts` proves
      the policy SQL is correctly scoped (static check, not a live cross-account test — also in
      DECISIONS.md); `grep -r SUPABASE_SERVICE .next/static` returns nothing

## Phase 3 — content layer and the QR routes

- [x] `lib/content.ts` reads and caches `content/`, typed — no lesson text hardcoded
- [x] `/m{module}` and `/m{module}/{lesson}` routes (see DECISIONS.md for URL format),
      statically generated for all 10 modules and 108 lessons; lesson route pre-expands and
      scrolls to that framework
- [x] Keyboard-operable accordion with correct `aria-expanded`
- [x] Copy button, "pairs with" links, last-updated date, per the locked designs
- [x] Lesson 6.6 shows the "prompt under review" notice (and drops its copy button)
- [x] Acceptance: all 118 routes build statically (verified in `.next/server/app`); no route
      under `app/[module]/` imports `lib/supabase` or `@supabase/*`; lesson 6.6 shows the
      review notice; `npm run build`, `npx tsc --noEmit`, `npx vitest run`, `npm run lint` all
      pass

## Phase 4 — port the locked marketing pages

- [x] Extract shared nav, footer, buttons, prompt card, tab rail, accordion into components
      (`components/SiteHeader.tsx`, `SiteFooter.tsx`, `Button.tsx`, `Marquee.tsx`, `PillTabs.tsx`;
      reused Phase 3's `Accordion`/`CopyButton`/`LessonPromptCard` rather than duplicating them)
- [x] `/` from `docs/design/pages/home.html`
- [ ] `/why-this-book` from `why-this-book.html`
- [ ] `/how-to-use` from `how-to-use.html`
- [ ] `/who-its-for` from `who-its-for.html`
- [ ] Acceptance: each route renders visually identical to its source file at 400px, 768px,
      1280px; interactive parts work (prompt slider, scan demo, bracket toggles, seat tabs,
      accordions, copy buttons)

## Phase 5 — accounts, bookmarks, invites

- [ ] Magic link + Google OAuth sign-in
- [ ] Bookmarking and invites require an account; browsing/copying never do
- [ ] `middleware.ts` refreshes the session
- [ ] `/account`, `/my-prompts`, `/join`
- [ ] Acceptance: sign-out clears the session; session cookie is HttpOnly, Secure,
      SameSite=Lax; public routes still make zero database calls

## Phase 6 — finish

- [ ] Accessibility pass: focus states, contrast, keyboard paths, reduced motion
- [ ] Lighthouse on a lesson route, mobile: performance and accessibility both 90+
- [ ] `README.md` updated with setup, env vars, deploy steps
- [ ] `DECISIONS.md` finalised
- [ ] Final commit: `docs: record build decisions and outstanding items`
