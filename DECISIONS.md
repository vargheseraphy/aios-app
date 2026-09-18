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
build has not confirmed pixel-level fidelity, only structural/behavioural fidelity.

## Items needing Raphy before this goes live

- Store URLs (Amazon / Notion Press) — currently placeholders (`#` with a labelled note).
- Reader testimonials — draft copy only, must be replaced with permissioned real quotes.
- Author biography beyond "author of the book" and author portrait/photography — currently
  line-art placeholders per the locked design.
- Correct prompt text for lesson 6.6 "Culture Code Canvas".
- Google Cloud OAuth client ID/secret for Google Sign-In (steps in
  `docs/technical/ARCHITECTURE.md`) — not created during this autonomous run, since it requires
  a human with console access; `.env.example` documents the variable name.
- A live Supabase project (URL + keys) to point `.env.local` at, with migration
  `0001_init.sql` applied — this run only wrote the migration and env var names, no project
  was provisioned. Once it exists, run a real cross-account RLS test (see the note above) —
  the current test only checks the policy SQL, not enforcement.
- A real visual check of `/`, `/why-this-book`, `/how-to-use`, `/who-its-for` at 400px, 768px
  and 1280px against their locked HTML source — this build verified structure and behaviour but
  had no browser available to confirm pixel fidelity (see the note above).
- Content-extraction cleanup: every lesson's `prompt` field in `content/m{module}/{lesson}.json`
  appears to bundle the actual prompt with trailing diagram-caption and "PRO TIP" text from the
  manuscript OCR (confirmed on 5 of 108 lessons). The Copy button on every `/m{module}/{lesson}`
  page currently copies all of it. Worth splitting into separate fields at the source so the
  Copy button — the entire point of the QR path — copies only the intended prompt.
