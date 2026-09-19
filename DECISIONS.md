# Decisions

Autonomous decisions made during the build, blockers, and everything that needs Raphy before
this goes live. Updated as the build progresses; finalised in Phase 6.

## Lesson/module URL format resolves an internal doc conflict

`docs/product/PRODUCT.md` and `docs/product/PRD.md` give the QR URL format as
`/m{module}/{lesson}`, e.g. `/m6/06` — a single path segment (`m6`), not `/m/6/06`.
`docs/technical/ARCHITECTURE.md`'s folder tree and the build prompt's Phase 3 wording show
`m/[module]/[lesson]/page.tsx`, which in a literal Next.js reading produces `/m/6/06` instead.

The locked design files settle it: `docs/design/pages/how-to-use.html` shows the URL twice,
literally, as `/m1/01` and `/m6/03`. Since the QR path is the one non-negotiable rule and the
physical book is already printed, the site must match the format the locked design (and by
extension the real printed QR codes) already commits to. Routes are implemented as Next.js
folders named `m[module]` (no separating slash) so the resulting URL is `/m6/06`, not `/m/6/06`.

## Scope taken from BUILD-PROMPT.md, not the older PRD

`docs/product/PRD.md` lists 14 routes including `/about`, `/for-business`, `/for-institutions`,
`/contact`, and a standalone `/sign-in`. The build prompt that drove this build
(`../aios-book/website/build-reference/BUILD-PROMPT.md`) only specifies four locked marketing
pages (`/`, `/why-this-book`, `/how-to-use`, `/who-its-for` — note `/who-its-for` replaces the
PRD's audience-page concept and has a locked HTML file; `/about`, `/for-business`,
`/for-institutions`, `/contact` do not) plus `/account`, `/my-prompts`, `/join` for accounts.
Treating the build prompt's phase list as authoritative over the older PRD for this run — the
PRD pages without a locked design file are not built. Sign-in is handled inline (magic link
input + Google button) rather than as a separate `/sign-in` route, consistent with the accounts
phase as scoped in the build prompt.

## Route folder naming: `app/[module]`, not `app/m[module]`

The obvious way to get the URL `/m6/06` from Next.js App Router is a folder literally named
`m[module]`, fusing the static "m" prefix with the dynamic segment. Turbopack in this Next.js
16.3.5 build does not substitute static params into that kind of mixed literal+bracket folder
name during static export: a build produced exactly one file, `m[module].html`, and the
prerender manifest listed the literal path `/m[module]/00` instead of `/m1/00`, `/m6/00`, etc.
(only 13 lesson-number paths total, one per fractional lesson id, module never varied).

Fixed by using a plain `app/[module]` folder and baking the `m` prefix into the **param value**
instead (`generateStaticParams` returns `{ module: "m6" }`, not `{ module: "6" }`), parsed back
with `parseModuleParam()` in `lib/content.ts`. This is the portable pattern and produces the
same `/m6/06` URLs the locked design requires (see the URL-format decision above) without
depending on prefix-in-folder-name support. Worth re-testing the `app/m[module]` form if the
Next.js/Turbopack version is upgraded later — it may just be a version-specific gap.

## Scaffold: Next.js 16 / Tailwind v4, no `tailwind.config.ts`

`docs/technical/ARCHITECTURE.md`'s folder tree lists a `tailwind.config.ts`. Current
`create-next-app` (Next.js 16) scaffolds Tailwind v4, which is CSS-first: theme tokens live in
an `@theme` block inside `app/globals.css` instead of a JS/TS config file. There is no
functional loss — colours, fonts, container width and the type scale are all expressed the
same way, just in CSS — so the app was scaffolded with the current tool default rather than
force-installing Tailwind v3 to match the architecture doc's file name literally.
`create-next-app` also refuses to run in a non-empty directory, so the scaffold was generated
in a temp dir and its output files (`app/`, `public/`, config files) were copied in, preserving
`docs/`, `content/`, `README.md`, `TASKS.md`, `DECISIONS.md` and `.git`.

## SiteHeader/SiteFooter live in the root layout

`components/SiteHeader.tsx` and `SiteFooter.tsx` (Phase 4) are rendered once in `app/layout.tsx`,
not per-page, so every route — including the Phase 3 lesson/module pages and the Phase 5 account
pages to come — gets the same nav and footer automatically. Confirmed this doesn't reintroduce a
Supabase import or a database call on the QR path: the header's login-state preview is a local
`useState` toggle only (no real auth until Phase 5), and `grep -r SUPABASE_SERVICE .next/static`
stays clean after the change.

## Known content bug — lesson 6.6

`content/m6/06.json` (framework 6.6, "Culture Code Canvas") holds a duplicate of 6.7's
Delegation Ladder prompt, copied from an error in the printed book. Per the build prompt this
is rendered with a visible "prompt under review" notice rather than silently shipped. **Needs
Raphy**: the correct prompt text for 6.6.

## RLS test is a static policy-text check, not a live integration test

The Phase 2 acceptance check calls for "a written test proves account A cannot read account
B's bookmark rows." No Supabase CLI, Docker, or local `psql` is available in this environment
(checked: `which supabase`, `which docker`, `which psql` all fail), so there is no local
Postgres to actually run two accounts against. `supabase/migrations/0001_init.test.ts`
(Vitest) instead asserts against the migration's SQL text: RLS is enabled on all three tables,
every `bookmarks`/`invites` policy is scoped by `auth.uid() = user_id`/`inviter_id`, no policy
lacks a `using`/`with check` clause, and no table carries a public/anon grant (the `/join`
invite-name lookup goes through a `SECURITY DEFINER` function returning one scalar instead).
This proves the policies are written correctly; it does not prove Postgres enforces them as
written. **Needs Raphy** (or whoever provisions the Supabase project): once a real project
exists, run a live test — sign in as two accounts, insert a bookmark as account A, assert
account B's client cannot select it — before this ships.

## users-table public-read question, resolved without a public policy

`ARCHITECTURE.md`'s `getInviterName(code)` server action is public (no session) and needs a
display name reachable only via an invite code. Rather than add a public SELECT policy to
`invites` or `users` — which would let any anonymous caller enumerate every inviter's code,
email, and display name, not just the one they have a code for — the migration adds
`get_inviter_name(p_code text)`, a `SECURITY DEFINER` SQL function that returns a single
`display_name` (or null) for a given code and nothing else. Both tables keep owner-only
policies; the function is the only public-facing surface, and it's granted `EXECUTE` (not
table access) to `anon`/`authenticated`. This is the least-privilege option that still lets
`/join` show "invited by \<name\>" to a signed-out visitor.

## Marketing-page example prompt cards use the real lesson JSON, not the mockup's shortened text

`why-this-book.html`, `how-to-use.html` and `who-its-for.html`'s example prompt cards (the
"inside the book" card, the scan-demo phone, the bracket-fill card, the five seat panels) are
hand-typeset in the locked HTML: cleaner line breaks, a yellow key / blue value split (`Role:`
in yellow, `[BRACKET]` in blue), and no trailing content. The real `content/m{module}/{lesson}.json`
`prompt` field for the same lessons is longer — it includes the diagram caption and "PRO TIP"
text that follows the actual paste-ready prompt in the manuscript extraction (confirmed on
`m1/01`, `m8/02`, `m6/03`, `m3/01`, `m2/01`: every one of them has a `PRO TIP` or all-caps
diagram-label block appended after the real prompt ends).

Rather than hand-retype the mockup's shortened text (which would drift from the real content
and risks a typo counting as invented copy), `PromptPreviewCard` and `who-its-for`'s seat panels
render the full real `prompt` field verbatim, matching how `LessonPromptCard` already renders it
on `/m{module}/{lesson}` (Phase 3) — so a marketing page's example and the real lesson page always
agree, and Copy always copies what the reader would actually get from scanning the code. Only
`[BRACKET]` highlighting is applied (no yellow key/value split), consistent with the lesson pages.
This is a visible deviation from the locked mockup's tighter typesetting — worth a manual look.

**Separately worth flagging to Raphy**: the manuscript extraction bakes the diagram caption and
PRO TIP text into the same `prompt` field as the actual instructions, for at least the five
lessons checked above (and likely all 108). The Copy button on every `/m{module}/{lesson}` page
(Phase 3, unchanged here) copies that entire field, meaning a reader scanning a QR code currently
copies the diagram caption and pro-tip paragraph along with the real prompt. This wasn't
introduced or fixed in this build (Phase 3 is already committed and this run didn't touch it) —
flagging it as a content-extraction cleanup worth doing across all 108 lesson files, ideally by
splitting `prompt` from a separate `proTip`/`diagram` field at the source.

## how-to-use's scan demo and bracket card show a trimmed real prompt, not the full field

For the same reason, `how-to-use.html`'s interactive scan demo and bracket-fill card (both built
around the real lesson 1.1 "C.A.R.E Prompting" prompt so the demo and the real `/m1/01` page
agree) trim `content/m1/01.json`'s `prompt` field at the literal substring `"CRAFTING EFFECTIVE
AI PROMPTS"` — the point where the real text moves from the four-line C.A.R.E. prompt into the
diagram caption. This is a programmatic slice of the real text (not retyped), matching the
locked mockup's shorter demo prompt almost exactly (same four lines, same bracket example text)
while staying sourced from `content/`. The bracket-fill example values ("B2B sales coach", "a
9-person logistics SaaS in Kochi, 14 months in", "Give me 5 positioning ideas to differentiate in
the South India mid-market") are taken verbatim from the locked design — they're UI teaching copy
for a fictional example founder, not a claim about a real customer, so reusing them isn't an
invented-content issue.

## "Open module" buttons on who-its-for link to the real module route, not `home.html#modules`

The locked `who-its-for.html` mockup points every "Open module 08" button at `home.html#modules`
(the module rail on the home page), because at design time no per-module route existed yet.
Phase 3 built real `/m{module}` pages, so these buttons now link directly to the module they name
(e.g. `/m8` for Founders) — the more correct, more useful behaviour for the same labelled intent,
and not a content change (no text differs from the locked design, only the destination of an
internal navigation link).

## Visual verification method — no browser available in this environment

Phase 4's acceptance criterion ("renders visually identical to its source file at 400px, 768px,
1280px") couldn't be checked against an actual rendered screenshot — no browser or screenshot
tool is available in this environment. Verification instead relied on: porting each page's CSS
close to 1:1 into CSS Modules using the same pixel/`clamp()`/media-query values as the locked
HTML; a structural read-through confirming every interactive behaviour in each page's `<script>`
block (login preview, prompt slider, scan demo, bracket toggles, seat-tab arrow-key navigation,
FAQ/trouble accordions, copy buttons) was ported into a React client component, not dropped; and
`npm run build` + grepping the static HTML output for expected structure, ARIA states and route
counts. **Needs Raphy**: an actual visual pass at the three breakpoints before this ships — this
build has not confirmed pixel-level fidelity, only structural/behavioural fidelity. (Phase 6,
below, did later find a real Chrome installed on this machine and used it — but only to confirm
routes render without crashing and to run real Lighthouse, not for a pixel comparison against
the locked HTML. That specific check is still open — see "Items needing Raphy.")

## middleware.ts skips the QR path entirely rather than just being fast on it

ARCHITECTURE.md's State plan calls for `middleware.ts` to refresh the Supabase session "on
every request." Taken completely literally, that would add a Supabase auth round-trip to
`/m{module}/{lesson}` — the one route the whole build's non-negotiable rule says must make zero
database calls. There's no real tension once you notice the QR routes need no session state at
all (they render the same HTML for every visitor), so `middleware.ts` checks the pathname first
and returns immediately for anything matching `/m\d+`, before constructing a Supabase client at
all — not merely fast, genuinely zero network calls on that path. Every other route still gets
the session refresh. Confirmed this doesn't break session refresh elsewhere: the exclusion regex
only matches `/m6`, `/m6/06`-shaped paths, not `/my-prompts` or anything else.

Also: current Next.js (16.3.5) deprecates the `middleware.ts` file convention in favour of a
`proxy.ts` rename (same behaviour, `npx @next/codemod@canary middleware-to-proxy` migrates it
automatically) — kept as `middleware.ts` here since that's the name ARCHITECTURE.md's folder
structure specifies and the file still works, just with a build-time deprecation warning. Worth
running the codemod next time this file changes.

## Google sign-in: ID-token exchange, not a redirect flow — and invite-code linkage is untested there

ARCHITECTURE.md is explicit that "the Google Sign-In button is not restyled" — Google's own
rendered button via Google Identity Services, not a custom OAuth button. `GoogleSignInButton`
loads `accounts.google.com/gsi/client`, renders the official button into an unstyled container,
and exchanges the resulting ID token for a Supabase session via `signInWithIdToken` rather than
a `signInWithOAuth` redirect — keeps the whole sign-in inline in the modal instead of bouncing
through a redirect. No live Google Cloud OAuth client exists in this environment (see "Items
needing Raphy" below), so the button renders a disabled placeholder until
`NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set — verified it doesn't throw with the var unset.

**Known gap**: magic-link sign-in passes `invite_code` through `signInWithOtp`'s `options.data`,
which `handle_new_user` (migration 0001) reads out of `raw_user_meta_data` to set `invited_by`.
`signInWithIdToken` has no equivalent per-call metadata parameter in supabase-js — Google
sign-ins from a `/join?ref=code` link will authenticate correctly but the invite linkage has not
been verified to survive that path. Needs checking against a live Supabase project; magic-link
invite linkage is the one to trust for now.

## Sign-in modal only mounts while open

`AuthProvider` renders `<SignInModal />` conditionally (`{isSignInOpen && <SignInModal />}`)
rather than always rendering it and toggling visibility internally. This was originally a reset
effect (clear the email field and status when the modal closes) but the project's ESLint config
flags synchronous `setState` calls inside `useEffect` (`react-hooks/set-state-in-effect`, a
React Compiler–readiness rule) as a real lint error, not a style nit. Mounting only while open
gets the same reset behaviour for free — a fresh mount always starts from initial state — with
no effect needed. `BookmarkButton` and `JoinView` hit the same rule for a similar "reset on a
condition" pattern and were restructured the same way (derive a display value instead of
resetting state, or only set state inside an async callback rather than synchronously in the
effect body) rather than suppressed.

## Critical fix: the site crashed entirely without a live Supabase project

A real Lighthouse/browser run (see below) against a production build — the
actual state this repo is in right now, since no Supabase project has been
provisioned — surfaced that almost the whole site was broken:

- `middleware.ts` called `createServerClient` with empty env vars on every
  non-QR request. `createServerClient` throws synchronously without a URL/
  key, so `/`, all four marketing pages, `/account`, `/my-prompts` and
  `/join` all returned a hard 500. Only the QR path itself worked, because
  it already bypasses middleware entirely (see the note below).
- `AuthProvider` called the browser `createClient()` unconditionally in an
  effect that runs on every page, including the static QR lesson pages —
  the throw crashed the entire client-side React tree after hydration, with
  no error boundary anywhere in the app to catch it, replacing the rendered
  page (prompt text included) with Next's generic `html#__next_error__`
  fallback. This is the QR-path non-negotiable being violated in the
  starkest possible way: not merely gated or slow, but blank.
- `getInviterName` (the public `/join` lookup) and the sign-in modal's
  magic-link submit had the same unguarded call — one silently failed
  (unhandled promise rejection), the other left the form stuck on
  "Sending…" forever with no way out.

Fixed by adding an `isSupabaseConfigured` check (`lib/supabase/client.ts`
and `lib/supabase/server.ts` each export their own, since one runs in the
browser and one on the server/edge) and using it everywhere Supabase is
touched outside a deliberate, already-gated user action:
`middleware.ts` passes the request through untouched when unconfigured;
`AuthProvider` treats every visitor as signed out (starts `loading` at
`false` directly rather than setting it inside the effect — see the
"Sign-in modal only mounts while open" note above for why this codebase's
lint config requires that shape); `getInviterName` returns `null` instead
of throwing; the magic-link form shows "Sign-in isn't set up yet" instead
of hanging. Deliberate actions gated behind `if (!user)` (bookmarking,
`getOrCreateInviteCode`, account actions) were left as-is — no one can
actually sign in without a live project either, so they're unreachable,
and adding the same guard everywhere would be redundant defensive coding
for paths that can't currently execute.

Verified with a real headless Chrome run (`/Applications/Google Chrome.app`
via `puppeteer-core`, installed with `--no-save` and removed again after —
check `git diff package.json` shows no change) against `npm run start`:
before the fix, `/`, `/account`, `/my-prompts` and `/join` returned 500 and
`/m6/06` (and every other QR route) rendered `html#__next_error__` after a
client-side `pageerror`; after the fix, all eight sampled route shapes
return 200 with zero console errors. This is the single most important bug
found during this build — worth flagging prominently, not just fixing
quietly.

## Real Lighthouse run, not a manual substitute

Lighthouse (`npx lighthouse`) was expected to be unavailable — no
`chrome`/`chromium`/`google-chrome` binary on `PATH` — but `chrome-launcher`
found the real `Google Chrome.app` already installed on this machine, so
Phase 6's Lighthouse acceptance check ran for real, mobile emulation,
against a `next build && next start` production instance, not a manual
checklist substitute.

First run against `/m6/06` (before the crash fix above, and before the
accordion contrast fix below): **performance 98, accessibility 81** — the
81 was `html-has-lang` and `landmark-one-main` failing because Lighthouse's
snapshot was of Next's crashed-error-page fallback (`html#__next_error__`),
not the real page, a direct symptom of the crash bug above, not a separate
finding.

After the crash fix: **performance 100, accessibility 93** on `/m6/06`,
down from a perfect score only because of a genuine, separate bug —
`components/Accordion.tsx` hardcoded `text-ink-2` (dark text for a light
background) on its trigger title with no way for a dark-section caller to
override it, so every lesson title in the accordion rendered at a measured
1.12:1 contrast against the near-black canvas — effectively invisible.
Fixed with a `variant?: "light" | "dark"` prop (default `"light"`,
preserving the FAQ accordion's existing look exactly), set to `"dark"` by
`LessonAccordionList`, the only other caller.

Final run: **`/m6/06` performance 100, accessibility 100.** Also spot-checked
`/` (100/93) and `/who-its-for` (99/96) since the tooling was already working
— both comfortably clear 90+; their remaining accessibility gap is a single
`color-contrast` finding, documented separately below rather than fixed,
because it's the locked brand blue.

## Known, unfixed: the locked brand blue falls short of AA with white text

Lighthouse's `color-contrast` audit on `/` and `/who-its-for` flags white
text on the primary blue (`#3B7BF7`) at 3.91:1 — short of the 4.5:1 normal-
text AA threshold — on the prompt-slider Copy button label and a bento
card's heading/body. `#3B7BF7` is DESIGN.md's primary brand blue, "blue for
in-content actions" per its Buttons spec — the single most load-bearing
color in the whole locked system, not a quiet tertiary tint like the two
tokens adjusted earlier in this file. Overriding it globally would be a
materially different kind of change than bumping `fg-3`/`gray-l2`'s alpha
(which stayed visually near-identical and didn't touch a color anyone would
recognize as "the brand blue"). Left as-is and flagged here rather than
changed unilaterally — if Raphy wants full AA compliance, the fix is either
a slightly darker blue for text-on-blue contexts specifically (leaving the
button/field/link blue elsewhere untouched) or accepting this as a
large-text-only guarantee and increasing those two font sizes slightly.

## Phase 7 — /for-business, /for-institutions, /contact built without a locked HTML source

**Superseded by Phase 7b below** — Raphy supplied real locked HTML for all three shortly after
this landed, and the pages were rebuilt from that. Kept as a historical record of the reasoning
at the time, not as a description of what's currently shipped.

PRD.md lists these three (plus `/about`, already out of scope per this file's earlier "Scope
taken from BUILD-PROMPT.md" note) as pages Raphy would hand-design directly in HTML, the same
way home/why-this-book/how-to-use/who-its-for were. No such HTML exists in
`docs/design/pages/` for any of the three. The original build (Phases 1-6) treated their
absence as reason to skip them; Raphy then explicitly asked for them anyway.

Built them within the established system instead of waiting for a mockup: same page-hero,
coloured-feature-card, and module-list patterns already used on `why-this-book`, recoloured per
page (`components/for-business/`, `components/for-institutions/`), plus a plain form page for
`/contact` (`components/contact/`). Content is real where it can be — module/lesson examples on
both pitch pages read from `lib/content.ts` (Module 6/8 lessons for `for-business`, Module 1/10
for `for-institutions`), not invented copy — but the page structure itself is this build's
design judgment, not Raphy's. **These three should be reviewed against, and replaced by, his
own HTML if/when he makes one** — same as the original four were built by porting his markup
rather than writing new markup from a description, this went the other direction out of
necessity.

The contact form (`lib/actions/contact.ts`) validates and logs a submission server-side via a
real Next.js Server Action (no third-party embed, per PRD) but has no email transport wired up
— no Resend/SMTP key exists anywhere in this codebase, and none was invented. A submission is
currently only visible in server logs. `.env.example` now documents a placeholder
`CONTACT_NOTIFY_EMAIL` for whichever provider gets wired up later.

Also fixed two small pre-existing inconsistencies while touching shared nav/footer components:
the header's "Why frameworks" link pointed at the home page's own `#why` anchor instead of the
full `/why-this-book` route (How to use and Who it's for had already been upgraded to real page
links in Phase 4, this one was missed); and the footer's For business/For institutions/Contact
rows were `#` placeholders now pointing at the real routes.

## Phase 7b — for-business/for-institutions/contact re-ported from real locked designs

Raphy supplied real hand-designed HTML for all three pages — `docs/design/pages/for-business.html`,
`for-institution.html`, `contact.html` — each carrying the same "DIRECTION CONTRACT" authoring
comment the original four locked pages have, confirming they're genuine specs from the same
source, not placeholders. These supersede Phase 7's from-scratch build entirely; the earlier
version (department-agnostic feature cards, a simple contact form) is fully replaced.

Verified every module/lesson the designs cite against the real `content/` data before porting —
all ten module titles and lesson counts, and the five specific lesson citations checked
(4.2, 5.1, 7.1, 6.5, 9.3), match exactly (the mockup's prompt-card titles are shortened display
labels — e.g. "SPIN Discovery Call" vs the real "SPIN Selling - Discovery Call" — so the
rendered card uses the real title via `PromptPreviewCard`, same convention as the why-this-book/
how-to-use/who-its-for prompt cards). Nothing needed substituting.

**Content/design separation, per Raphy's explicit request** ("hope you are designing in a way
that content and design are separate"): all three pages' copy — headings, body paragraphs,
department situations, shelf-test answers, triage rows, form hints — lives in
`lib/pages-content.ts` as typed data, not embedded in JSX. Components consume it as props.
Real book data (module titles, lesson counts, prompt text, pairings) is never duplicated into
that file — only a reference (module number, lesson file id) is stored there, resolved live via
`lib/content.ts` at render time, so the content module can never drift from the actual book data
it points at. `components/RichText.tsx` renders `**bold**` markers so copy can carry the locked
design's inline emphasis without embedding markup in the data.

**This same separation does not yet exist for `/`, `/why-this-book`, `/how-to-use`,
`/who-its-for`** — those four were built in Phases 3-4, before this requirement was stated, and
hardcode their copy directly in JSX (see e.g. `app/why-this-book/page.tsx`). Not refactored here
— it would be a substantial, unrelated change to four already-shipped pages — but flagged
explicitly so the inconsistency is a known, recorded gap rather than a silent partial
application of something Raphy asked for once and got on 3 of 8 pages.

One small scoped exception: the "faster than writing" aside on `/contact` links to three other
pages inline within its own sentences (genuinely mixed prose-and-links, not a list of fields) —
composed directly in `app/contact/page.tsx` rather than forced into the content data shape.

The contact form's honest "not connected yet" framing (already the from-scratch build's
approach) is now the locked design's own wording verbatim — `lib/actions/contact.ts`'s success
message was updated to match exactly, since the previous "your message has been received"
phrasing overstated what happens (nothing is durably stored, only logged to server output).

**Global nav is not page-customized to match each locked mockup's own nav bar.** The mockups for
for-business/for-institutions/contact each swap one nav slot for "On this page" styling (e.g.
for-business.html's nav shows "For business" with `class="on"` in place of "FAQ"). This site
uses one shared `SiteHeader` across every route (a Phase 4 decision, not changed here) rather
than per-page nav content — matching that exactly would mean making the nav page-aware, a larger
change than this pass's scope. The three pages remain fully reachable via the footer (already
fixed in Phase 7) even without a matching top-nav entry.

## Phase 8 — lesson page rebuilt on content-v2, kept as a parallel data layer

Raphy supplied a locked design for the lesson page itself (`docs/design/pages/lesson.html`,
913 lines, the same "DIRECTION CONTRACT" authoring style as the other locked pages, plus an
exhaustive "TEMPLATE DATA BINDING" comment specifying exact field mappings, edge cases and
rendering rules) and the richer dataset it's built against, `content-v2/` (mirrored from
`../aios-book/website/content-v2/`, the cleaner of two copies available there — the
`build-reference/04-content-v2/` copy still has a figure-caption fragment and a numbering typo
in lesson 9.1 that the root copy has already had hand-cleaned). This replaces the Phase 3
accordion-item view for `/m{module}/{lesson}` — the QR target — with a dedicated per-lesson
page: sticky prompt card first, use-when/how-to/method/roles/origin/pairs, a sticky sidebar,
module rail, prev/next, maintenance panel, save band.

**Architecture: a new parallel data layer (`lib/content-v2.ts`), not a migration.** 12 files
already depend on `lib/content.ts` and the older `content/` schema (`app/[module]/page.tsx`,
`app/page.tsx`, all four original marketing pages, `for-business`/`for-institutions`,
`LessonAccordionList`, `LessonPromptCard`, `lib/actions/bookmarks.ts`, `lib/pages-content.ts`)
— all shipped and verified. Rather than risk regressing any of them to unify on one schema,
content-v2 gets its own reader with its own types, consumed only by the rebuilt lesson page.
`app/[module]/page.tsx` (the accordion browse view) is deliberately untouched and still runs on
the older `content/` schema — a real, acknowledged inconsistency (see "Items needing Raphy").

**A real build bug, not a design problem: pure role-switcher logic had to move out of
`lib/content-v2.ts`.** The role switcher (client-side, since it responds to clicks) originally
imported `parsePromptRoleLine`/`applyRoleClause` directly from `lib/content-v2.ts` — which also
has a top-level `import fs from "node:fs"` for its data readers. Turbopack refuses to chunk a
client bundle that transitively imports `node:fs` at all (a hard build failure, not a warning),
regardless of whether the specific functions used touch the filesystem. Fixed by splitting
those two pure string functions into `lib/prompt-role.ts` (no fs import anywhere in its
dependency graph), with `lib/content-v2.ts` re-exporting them for server-side callers. Worth
remembering for any future client-interactive feature built against a data-reading lib file.

**A second, genuine content-data bug found and fixed while implementing the "sharpen" cross-
reference**: every one of the 10 modules' `roleProfile.sharpen` field ends with the same "See
also" reference, and every one of them cites it as "Framework 1.2 Role Prompting — The Expert
Chair" — but the lesson actually titled "Role Prompting - The Expert Chair" is 1.3
(`content-v2/m1/03.json`); 1.2 is "The Context Stack" (`content-v2/m1/02.json`). Verified this
against all 10 modules' actual JSON, not just the one example lesson.html was built against, to
confirm it's systemic rather than a one-off typo. `resolveSharpenXref` resolves this reference
by matching the embedded title text against every real lesson's title first (normalizing
punctuation so an em-dash-vs-hyphen difference doesn't block the match), falling back to the
embedded number only if no title match is found — the title text is distinctive and reliably
correct here, the number consistently is not.

**Content-v2's own documented gaps are handled by hiding the section, never inventing text**:
`howToUse` missing on 3 lessons, `steps` on 8, `useWhen` on 6, `subtitle` on 5, `origin` on 2,
`proTip` on 14 (counts verified directly against the 108 real files, matching what
`content-v2/README.md` and `../aios-book/website/build-reference/CONTENT-ISSUES.md` already
document). The sidebar's "on this page" jump list only links to a section actually rendered for
that lesson. Titles with dash damage (double space where the book's dash was lost in
extraction) render with their stored whitespace intact everywhere a title appears — the lesson
h1, the module rail, the pairs rail cards, and the prev/next cards — rather than letting normal
CSS whitespace collapsing silently "fix" them. Lesson 6.6 still shows the established
prompt-under-review notice with Copy withheld; the bug is unchanged in content-v2, same lesson.

**The role switcher only activates when NOTE 4's regex matches.** 16 of 108 lessons' prompts
don't open with a literal `Act as {clause}.\n` line (some lead with `Role:\nActa as...`, some
with a `PROMPT — COPY & PASTE READY` banner line first, some open a different way entirely) —
for those, the role list still renders (informing the reader who the book suggests running the
prompt) but as plain, non-interactive rows with an explanatory line, never guessing where an
unmatched prompt's role clause might be.

**The bookmark button is real, not the locked mockup's preview toggle.** `lesson.html`'s own
`#markBtn` is explicitly commented as a local-only `aria-pressed` flip with no persistence
("preview — accounts are not live yet"). This build already has real bookmarking (Phase 5), so
the rebuilt page wires the actual `BookmarkButton`/`toggleBookmark` infrastructure instead,
restyled via a new `variant="dark"` prop for the prompt card's near-black header — same
auth-aware, sign-in-prompts-if-signed-out behavior as the accordion page's bookmark icon, not a
fake toggle. It remains the one client-side, auth-aware island on an otherwise fully static
page, exactly the pattern Phase 5 already established.

## Items needing Raphy before this goes live

- Store URLs (Amazon / Notion Press) — currently placeholders (`#` with a labelled note).
- Reader testimonials — draft copy only, must be replaced with permissioned real quotes.
- Author biography beyond "author of the book" and author portrait/photography — currently
  line-art placeholders per the locked design.
- Correct prompt text for lesson 6.6 "Culture Code Canvas".
- Google Cloud OAuth client ID/secret for Google Sign-In (steps in
  `docs/technical/ARCHITECTURE.md`) — not created during this autonomous run, since it requires
  a human with console access; `.env.example` documents the variable name.
- ~~A live Supabase project~~ **Done, 2026-09-19**: a project named `aios` (ref
  `endatmaraqlcvhbymxfw`, ap-south-1) now exists, connected via the Supabase MCP connector.
  `0001_init.sql` is applied, followed by a new `0002_lock_down_and_tune.sql` written after
  running Supabase's own security/performance advisors against the live database: it revoked
  public `EXECUTE` on `handle_new_user()` (a real, if low-severity, gap — Postgres already
  refuses to invoke a `returns trigger` function outside trigger context, so it wasn't actually
  exploitable, but there was no reason to leave it exposed as a public RPC), rewrote all six RLS
  policies' `auth.uid()` calls as `(select auth.uid())` per Supabase's per-query-not-per-row
  guidance, and indexed `users.invited_by`. Advisors are clean now except the one intentional
  warning already documented in `0001` (`get_inviter_name` being publicly callable is the point
  of that function). `.env.local` has the real project URL and anon key; `SUPABASE_SERVICE_ROLE_KEY`
  is still empty — the MCP connector doesn't expose secret keys by design, so that one has to be
  pasted in by hand from the Supabase dashboard (Settings → API → `service_role`). **Still
  outstanding**: a real cross-account RLS test with actual accounts — deliberately not done by
  creating throwaway auth users directly in the live project, since that would leave fake data in
  what's meant to be the real database; this should happen naturally via real sign-ins, or
  Raphy can ask for a proper scripted test against a Supabase branch if he wants one before
  launch. Also still untested: the actual sign-in flows (magic link, Google ID-token exchange),
  and specifically whether Google sign-in via `/join?ref=code` correctly links `invited_by` (see
  the note above).
- A real pixel-fidelity check of `/`, `/why-this-book`, `/how-to-use`, `/who-its-for` at 400px,
  768px and 1280px against their locked HTML source. Phase 6 did confirm — with a real headless
  Chrome, not just structural review — that every route actually renders without crashing or
  erroring (zero console errors across all eight route shapes) and that a lesson route scores
  100/100 on real mobile Lighthouse, but neither of those is a pixel-for-pixel comparison against
  the locked design. That specific check is still outstanding.
- The locked brand blue (`#3B7BF7`) with white text falls short of WCAG AA (3.91:1 vs 4.5:1) at
  small/normal text sizes — e.g. the prompt-slider Copy button label, a home page bento card's
  heading and body (see the Phase 6 Lighthouse note above). Not changed unilaterally since it's
  the core CTA color across the whole locked system, not a quiet tertiary tint — worth a design
  call on whether to use a slightly darker blue for text-on-blue contexts specifically.
- Content-extraction cleanup: every lesson's `prompt` field in `content/m{module}/{lesson}.json`
  appears to bundle the actual prompt with trailing diagram-caption and "PRO TIP" text from the
  manuscript OCR (confirmed on 5 of 108 lessons). The Copy button on every `/m{module}/{lesson}`
  page currently copies all of it. Worth splitting into separate fields at the source so the
  Copy button — the entire point of the QR path — copies only the intended prompt.
- A real pixel-fidelity check of `/for-business`, `/for-institutions` and `/contact` at 400px,
  768px and 1280px against their locked HTML sources (Phase 7b) — same outstanding check as the
  original four pages, not yet done for these three either.
- The global nav isn't page-customized to match each locked mockup's own "on this page" nav
  state for for-business/for-institutions/contact (see Phase 7b) — cosmetic only, all three
  pages are fully reachable via the footer.
- Content/design separation (Phase 7b, at Raphy's explicit request) only covers for-business,
  for-institutions and contact — `/`, `/why-this-book`, `/how-to-use`, `/who-its-for` still
  hardcode copy in JSX from Phases 3-4, before the requirement existed. Worth a follow-up pass
  extracting those four into the same `lib/pages-content.ts` pattern for consistency.
- The `/contact` form has no email transport wired up — submissions are logged server-side only
  (see `lib/actions/contact.ts`, `.env.example`'s `CONTACT_NOTIFY_EMAIL`). Needs a real provider
  (e.g. Resend) integrated before this form is actually useful for reaching Raphy.
- A real pixel-fidelity check of `/m{module}/{lesson}` against `docs/design/pages/lesson.html`
  at 400px, 768px and 1280px (Phase 8) — same outstanding check as every other locked page,
  verified structurally/behaviourally (role switcher, pairs resolution, prev/next, all the
  content gaps) but not against an actual screenshot.
- `app/[module]/page.tsx` (the module accordion browse view) still runs on the older `content/`
  schema and hasn't been upgraded to content-v2's richer fields (level, subtitle, steps, etc.) —
  deliberately out of scope for Phase 8, a real inconsistency between the two lesson views.
- content-v2's own documented gaps are content, not code, per its own README: `howToUse` missing
  on 3 lessons, `steps` on 8, `useWhen` on 6, `subtitle` on 5, `origin` on 2, `proTip` on 14, plus
  the same figure-caption-fragment and dash-damaged-title issues `content/` already has. This
  build renders every gap correctly (hidden, not invented) but doesn't fix the underlying data —
  that's a manuscript-extraction cleanup job, same as the existing `content/` cleanup item above.
