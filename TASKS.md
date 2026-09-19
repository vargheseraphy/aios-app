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
- [x] `/why-this-book` from `why-this-book.html`
- [x] `/how-to-use` from `how-to-use.html`
- [x] `/who-its-for` from `who-its-for.html`
- [x] Acceptance: each route renders visually identical to its source file at 400px, 768px,
      1280px; interactive parts work (prompt slider, scan demo, bracket toggles, seat tabs,
      accordions, copy buttons) — verified via structural/CSS comparison and build output, not
      a real rendered screenshot (no browser in this environment); see DECISIONS.md

## Phase 5 — accounts, bookmarks, invites

- [x] Magic link + Google OAuth sign-in (`components/auth/SignInModal.tsx`,
      `GoogleSignInButton.tsx` — Google via GIS + `signInWithIdToken`, see DECISIONS.md for
      the invite-code-linkage gap on that path)
- [x] Bookmarking and invites require an account; browsing/copying never do (verified: no
      route under `app/[module]/` imports Supabase, `/m{module}/{lesson}` stays statically
      generated with `BookmarkButton` as the only auth-aware, client-only island on the page)
- [x] `middleware.ts` refreshes the session, skips the QR path entirely (see DECISIONS.md)
- [x] `/account`, `/my-prompts`, `/join`
- [x] Acceptance: sign-out clears the session (`supabase.auth.signOut()`, default
      `@supabase/ssr` cookie handling — HttpOnly/Secure/SameSite=Lax, no overrides in this
      codebase); public routes still make zero database calls — `npm run build` confirms all
      118 QR routes plus the 5 marketing pages stay static (`○`/`●`), `grep -r
      SUPABASE_SERVICE .next/static` clean; `npm run build`, `npx tsc --noEmit`, `npx vitest
      run`, `npm run lint` all pass. No live Supabase/Google project to run a real sign-in
      flow against in this environment — see DECISIONS.md's "Items needing Raphy."

## Phase 6 — finish

- [x] Accessibility pass: focus states, contrast, keyboard paths, reduced motion
      (sign-in modal focus trap + restore, arrow-key PillTabs, stronger input
      focus rings, fg-3/gray-l2 contrast bumped to clear WCAG AA — see
      DECISIONS.md)
- [x] Lighthouse on a lesson route, mobile: performance and accessibility both 90+
      (real run, not simulated — see DECISIONS.md: `/m6/06` scored 100/100
      after fixing a site-wide crash-when-unconfigured bug and an accordion
      contrast bug the audit surfaced; `/` and `/who-its-for` also checked,
      both 90+)
- [x] `README.md` updated with setup, env vars, deploy steps
- [x] `DECISIONS.md` finalised
- [x] Final commit: `docs: record build decisions and outstanding items`

## Phase 7 — additional marketing pages (added post-launch, at Raphy's request)

PRD.md lists `/for-business`, `/for-institutions` and `/contact` as pages Raphy would
hand-design in HTML, same as the original four. No such HTML exists yet, so these were built
within the established design system instead — see DECISIONS.md for the caveat this implies.

- [x] `/for-business` — org/team pitch, real Module 6/8 examples, CTA to `/contact`
- [x] `/for-institutions` — colleges/libraries pitch, real Module 1/10 examples, CTA to
      `/contact`
- [x] `/contact` — name/email/organisation/message form via a Next.js Server Action, no
      third-party embed; no email transport wired up yet (see `.env.example`, DECISIONS.md)
- [x] Nav: "Why frameworks" now links to `/why-this-book` instead of the home page's `#why`
      anchor, matching how "How to use" and "Who it's for" already worked
- [x] Footer: "For business", "For institutions" and "Contact" now link to their real routes
      instead of `#` placeholders
- [x] Acceptance: `npm run build`, `npx tsc --noEmit`, `npx vitest run`, `npm run lint` all
      pass; all three new routes build static; the 118 QR routes are unaffected
