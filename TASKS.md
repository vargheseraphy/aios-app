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

## Phase 7b — re-port from Raphy's real locked designs

Raphy supplied real hand-designed HTML for all three (`docs/design/pages/for-business.html`,
`for-institution.html`, `contact.html`), superseding Phase 7's from-scratch build. Re-ported
properly this time, plus separated page copy from layout per Raphy's explicit request.

- [x] `lib/pages-content.ts` — typed copy for all three pages, separate from the components
      that render it; module/lesson references resolve live via `lib/content.ts`, never
      duplicated as static text
- [x] `components/RichText.tsx` — renders `**bold**` markers so content strings can carry
      inline emphasis without embedding JSX/HTML in data
- [x] `/for-business` rebuilt: sticky scroll-spy department rail (`DeptRail`), five
      departments each with real modules + one real prompt via `PromptPreviewCard`, coverage
      grid, rollout steps, order band
- [x] `/for-institutions` rebuilt: three shelf tests, student-mechanism walkthrough with a
      real prompt, syllabus table sourced live from `getAllModules()`, edition section,
      acquisition band
- [x] `/contact` rebuilt: triage section (three answered-before-you-write rows), who-answers
      dual cards, topic-pill form with a live per-topic hint, honest "not connected yet"
      status matching the locked copy exactly
- [x] `SubscribeSection` parametrized (subtext/placeholder/note) to match each page's small
      copy differences instead of forking the component
- [x] Acceptance: `npm run build`, `npx tsc --noEmit`, `npx vitest run`, `npm run lint` all
      pass; 131 routes total, all three pages static; QR routes and their zero-Supabase
      guarantee unaffected

## Phase 8 — rebuild the lesson page from the locked content-v2 design

Raphy supplied a locked design for the lesson page itself (`docs/design/pages/lesson.html`)
and the richer content-v2 dataset it's bound to (`content-v2/`, mirrored from
`../aios-book/website/content-v2/`) — a dedicated per-lesson page replacing the Phase 3
accordion-item view for the QR target. See DECISIONS.md for the architecture decision (a
parallel content-v2 data layer, not a migration) and the content issues this surfaced.

- [x] `lib/content-v2.ts` + `lib/prompt-role.ts` — typed content-v2 reader, kept deliberately
      separate from `lib/content.ts` (12 files still depend on the older schema); pure
      role-clause string helpers split into their own file so the client role switcher doesn't
      pull `node:fs` into the browser bundle
- [x] `components/lesson/*` — prompt card with inline key/value/role-clause rendering, the
      module role profile with a live role switcher (NOTE 4-gated), use-when/how-to/method/
      origin (each hidden when its field is genuinely absent), the pairs rail, the module rail
      with a true global prev/next sequence, the sidebar, maintenance panel, save band, seam
      bar and lesson head
- [x] `app/[module]/[lesson]/page.tsx` rebuilt wholesale on content-v2; `app/[module]/page.tsx`
      (the accordion browse view) deliberately left untouched
- [x] `components/BookmarkButton.tsx` gained a `variant="dark"` for the prompt card's header;
      real bookmarking wired in, not the locked mockup's fake local-only preview toggle
- [x] `components/SiteHeader.tsx` nav gained for-business/for-institutions/contact links
- [x] Fixed a systemic data mislabel: every module's `roleProfile.sharpen` "See also" reference
      cites "Framework 1.2 Role Prompting — The Expert Chair", but that lesson is really 1.3 —
      `resolveSharpenXref` now resolves by title match first, falling back to the number only
      if no title matches
- [x] Acceptance: `npm run build`, `npx tsc --noEmit`, `npx vitest run`, `npm run lint` all
      pass; all 108 lesson routes stay fully static (`generateStaticParams`, `dynamicParams =
      false`); zero Supabase imports in `app/[module]/[lesson]/**`'s render path; spot-checked
      `/m9/01` (role switcher, pairs resolution), `/m6/06` (review notice, no Copy button),
      `/m2/02` (no proTip card), `/m1/03` (dash-damaged title renders exactly as stored),
      `/m1/00` (non-"Act as" prompt renders roles non-interactively, no Previous card at the
      book's start), `/m10/11` (no Next card at the book's end)

## Phase 9 — about, module and all-modules pages from three new locked designs

Raphy added three more locked designs to `docs/design/pages/`: `about.html`, `each-module.html`
and `all-module.html`. This phase covers `/about`; the other two (`/m{module}` rebuilt from
`each-module.html`, and the new `/modules` route from `all-module.html`) are tracked
separately — see the "still outstanding" note below.

- [x] `content-v2/about.json` synced from `../aios-book/website/content-v2/about.json`; all 10
      `content-v2/modules/m{n}.json` re-synced too, to pick up new `promise`/`whatItDoes`/
      `startHere` fields `each-module.html`/`all-module.html` need (not consumed by this phase)
- [x] `lib/about.ts` — typed, cached reader for `content-v2/about.json`, same pattern as
      `lib/content-v2.ts`
- [x] `ABOUT_CONTENT` added to `lib/pages-content.ts` — site-authored headings/kickers/labels,
      kept separate from Raphy's own words
- [x] `components/about/about.module.css` + `app/about/page.tsx` — faithful port of
      `about.html`: the vague-question-vs-framework demo, the four-part "who wrote this and why
      trust it" answer, the mission section, the close
- [x] The demo section's "Framework 2.7" tag links to the real `/m2/07`, resolved via
      `moduleParam`/`fileIdFor` with a build-time existence guard — not a hardcoded path
- [x] `components/SiteFooter.tsx`'s "About Raphy" placeholder now points at `/about`
- [x] Judgment call: `SiteHeader`'s top nav does NOT gain an "About" link — no locked design's
      own nav includes one, only footers do
- [x] Judgment call: the hero quote's `<em>` accent and the demo card's inline bold/italic
      spans on `about.json` string fields are not reproduced — highlighting an arbitrary
      substring of book-sourced data would mean hardcoding a match against today's exact
      wording, which breaks the content/design separation this file exists to protect
- [x] Acceptance: `npm run build`, `npx tsc --noEmit`, `npx vitest run`, `npm run lint` all
      pass; `/about` is static; all 108 lesson routes and 10 module routes still build static;
      `app/[module]/**` untouched

**Still outstanding**: `/m{module}` rebuilt from `each-module.html` (see DECISIONS.md for the
QR-gating conflict already resolved) and the new `/modules` route from `all-module.html` — both
designs are in place but not yet ported. `/about` links to `/modules` and `why-this-book.html`'s
existing content ahead of that route existing, matching the intended final site map.

## Phase 10 — `/m{module}` rebuilt and `/modules` added, from `each-module.html`/`all-module.html`

Closes out the two routes Phase 9 left outstanding. `/m{module}` moves off the old `content/`
schema onto `content-v2`, joining `/m{module}/{lesson}` which made that move in Phase 8.
`/m{module}/{lesson}` and every file under `components/lesson/**` are untouched by this phase —
verified via `git diff --stat` against both paths returning empty.

- [x] `lib/content-v2.ts`: `ModuleV2` gains `promise`/`whatItDoes`/`startHere` (already synced
      into `content-v2/modules/m*.json` since Phase 9); added `getModuleStatsV2()` (per-module
      `lessonCount`/`pageRange`/`roleCount`/`levelCount`, all computed, none hardcoded) and
      `getBookStatsV2()` (book-wide totals for `/modules`' head band and "about" spread, replacing
      the `108`/`10`/`22–246`/`100` each-module.html/all-module.html hardcode as their own demo
      placeholders)
- [x] `EACH_MODULE_CONTENT`/`ALL_MODULES_CONTENT`/`MODULES_JOIN_CONTENT` added to
      `lib/pages-content.ts` — site-authored copy only; every module/lesson field on both new
      pages reads live from `content-v2` via the accessors above, never duplicated as strings
- [x] `components/modules/` — new, shared by both routes: `SeamStrip`, `PageHeadBand`, `TocRail`,
      `AboutSpread`, `JoinBand` (one join band, reused as-is — the two designs' join copy is
      byte-identical); `LessonRow` (per-lesson accordion row, `/m{module}` only) and `ModuleRow`
      (per-module accordion row, `/modules` only) are the two pages' one real difference
- [x] `app/[module]/page.tsx` rebuilt wholesale on `content-v2`, replacing the Phase 3
      `content`-schema build; deleted `components/LessonAccordionList.tsx`, left orphaned by the
      replacement (`LessonPromptCard`, which it wrapped, stays — still used by
      `PromptPreviewCard`/`ScanDemo`)
- [x] `app/modules/page.tsx` — new route
- [x] Reused rather than reimplemented: the `promptBody` k/v-span render rule, via
      `components/lesson/PromptBodyRich` (imported, not copied); lesson 6.6's "prompt under
      review" notice and Copy-button suppression, same condition
      (`isFlaggedForReviewV2`) and same message as the lesson page's own `PromptCard`
- [x] **Confirmed NOT implemented**: `each-module.html`'s NOTE 3 lock (the `#join`/`data-href`
      swap-on-auth script on "View full lesson"). Every such link on `/m{module}` is a plain
      `<Link>` straight to `/m{module}/{lesson}` for every visitor, signed in or not — see
      DECISIONS.md's "the lesson-page gate stays off /m{module}" entry. `/modules`' "Open module"
      links were never gated in the design to begin with (its own NOTE 3 just repoints them from
      the demo's `module.html` to the real `/m{n}`)
- [x] `SiteHeader.tsx`'s `NAV_LINKS` "Modules" entry now points at `/modules`, not `/#modules` —
      the one nav change in scope; the broader nav/footer curation pass Raphy asked for separately
      is not part of this phase
- [x] Judgment call: added a small "See all 10 modules" link to the home page's
      `ModuleRailSection` pointing at `/modules`, without otherwise touching that rail
- [x] Judgment call: client components (`LessonRow`, `ModuleRow`) take narrowed prop shapes
      rather than the full `LessonV2`/`ModuleV2` — every prop on a client component serialises
      into the page's RSC payload, so passing the full objects would have put `startHere` into
      `/modules`' client bundle even though it's never rendered, defeating the point of NOTE 2
- [x] Judgment call: dropped two enhancements from each-module.html's vanilla-JS mockup —
      the "N of M copied" progress tally/checkmarks and `IntersectionObserver`-driven "on this
      page" active-section highlighting. Both are cosmetic on top of a fully working page (every
      row still opens/closes, copies, and the contents rail still jumps to and opens any row);
      cut for scope given the size of this task. See DECISIONS.md
- [x] Acceptance: `npm run build`, `npx tsc --noEmit`, `npx vitest run`, `npm run lint` all pass;
      all 10 `/m{module}` routes and the new `/modules` route build static, zero Supabase
      imports; all 108 `/m{module}/{lesson}` routes still build static and unchanged. Spot-checked
      rendered HTML: `/m9` (9 "View full lesson" links all point at `/m9/0N`, none at `#join`,
      no `data-href`/`data-auth` markers anywhere on the page); `/m6` (6.6 shows the review
      notice, Copy button absent from that row only); `/modules` (module 1's panel ships
      `aria-expanded="true"`, module 10's `"false"`; `startHere`'s text does not appear anywhere
      in the rendered HTML, including the RSC payload; all ten "Open module" links point at
      `/m{n}`)
