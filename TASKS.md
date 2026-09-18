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

- [ ] `supabase/migrations/0001_init.sql`: `users`, `bookmarks`, `invites` tables from
      `ARCHITECTURE.md`, RLS enabled, policies in the same migration
- [ ] Supabase client helpers for server and browser; service-role key server-side only
- [ ] `.env.example` with named-but-empty vars
- [ ] Acceptance: migration applies cleanly; a written test proves account A cannot read
      account B's bookmark rows; `grep -r SUPABASE_SERVICE .next/static` returns nothing

## Phase 3 — content layer and the QR routes

- [ ] `lib/content.ts` reads and caches `content/`, typed — no lesson text hardcoded
- [ ] `/m{module}` and `/m{module}/{lesson}` routes (see DECISIONS.md for URL format),
      statically generated for all 10 modules and 108 lessons; lesson route pre-expands and
      scrolls to that framework
- [ ] Keyboard-operable accordion with correct `aria-expanded`
- [ ] Copy button, "pairs with" links, last-updated date, per the locked designs
- [ ] Lesson 6.6 shows the "prompt under review" notice
- [ ] Acceptance: all 118 routes build statically; no route in this phase imports the Supabase
      client; lesson 6.6 shows the review notice

## Phase 4 — port the locked marketing pages

- [ ] Extract shared nav, footer, buttons, prompt card, tab rail, accordion into components
- [ ] `/` from `docs/design/pages/home.html`
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
