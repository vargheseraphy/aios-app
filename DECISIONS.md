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

## Known content bug — lesson 6.6

`content/m6/06.json` (framework 6.6, "Culture Code Canvas") holds a duplicate of 6.7's
Delegation Ladder prompt, copied from an error in the printed book. Per the build prompt this
is rendered with a visible "prompt under review" notice rather than silently shipped. **Needs
Raphy**: the correct prompt text for 6.6.

## Items needing Raphy before this goes live

- Store URLs (Amazon / Notion Press) — currently placeholders (`#` with a labelled note).
- Reader testimonials — draft copy only, must be replaced with permissioned real quotes.
- Author biography beyond "author of the book" and author portrait/photography — currently
  line-art placeholders per the locked design.
- Correct prompt text for lesson 6.6 "Culture Code Canvas".
- Google Cloud OAuth client ID/secret for Google Sign-In (steps in
  `docs/technical/ARCHITECTURE.md`) — not created during this autonomous run, since it requires
  a human with console access; `.env.example` documents the variable name.
- A live Supabase project (URL + keys) to point `.env.local` at — this run only wrote the
  migration and env var names, no project was provisioned.
