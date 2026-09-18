# aios.obio.in

Companion website for the printed book *AI Operating System for Leaders* (Raphy Varghese,
Notion Press, 2026). Each of the book's 108 frameworks carries a QR code pointing at
`aios.obio.in/m{module}/{lesson}` — that route must render instantly, with no sign-in, no
interstitial, no loading gate. Everything else on the site exists around that one rule.

Full build reference: [`docs/START-HERE.md`](docs/START-HERE.md).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, Supabase (Postgres + Auth), hosted on Vercel.

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in Supabase project values — see "Environment variables" below
npm run dev
```

The site runs and every public route works with `.env.local` left empty — no Supabase project
is required to browse and copy prompts, or to view the marketing pages. Sign-in, bookmarking and
invites stay inert (the sign-in form shows "not set up yet") until real Supabase values are set.

## Environment variables

All four live in `.env.example`, named but empty — copy it to `.env.local` for local dev, and
set the same names in Vercel's project settings for deploys.

| Variable | Where it comes from | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API | Public, safe in the browser bundle |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API | Public — RLS is what actually protects data, not this key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project → Settings → API | **Server-side only.** Bypasses RLS entirely — never expose to the client, never commit it |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google Cloud Console OAuth client | Public. See `docs/technical/ARCHITECTURE.md`'s "Google sign-in — setup guide" for the full Cloud Console + Supabase provider setup |

## Database setup

Apply `supabase/migrations/0001_init.sql` to a Supabase project — it creates the `users`,
`bookmarks` and `invites` tables with row-level security and policies included in the same
migration (see `docs/technical/ARCHITECTURE.md`'s "Database schema" section). Using the
Supabase CLI:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

or paste the file's contents into the project's SQL Editor. See `DECISIONS.md` for what's still
unverified against a live project (a real cross-account RLS test, the actual sign-in flows).

## Deploying

Standard Next.js App Router deploy to Vercel, domain `aios.obio.in`:

1. Import the repo into a new Vercel project.
2. Set the four environment variables above in Project Settings → Environment Variables (for
   Production, Preview and Development as needed).
3. Add the deployed and any preview URLs to the Supabase project's Authentication → URL
   Configuration → Additional Redirect URLs, and to the Google Cloud OAuth client's authorized
   redirect URIs.
4. Deploy. The QR routes (`/m{module}/{lesson}`) are statically generated at build time and make
   no database calls at request time — nothing about the deploy step affects them beyond a
   normal Next.js build.

## Content

`content/` holds the canonical lesson and module data extracted from the manuscript — one JSON
file per lesson, one per module, plus `all_lessons.json`. The site reads from these files rather
than hardcoding lesson text; editing a JSON file and redeploying is how content changes.

## Project docs

- [`docs/START-HERE.md`](docs/START-HERE.md) — read this first
- [`docs/product/`](docs/product/) — product and PRD
- [`docs/design/`](docs/design/) — locked visual system and page designs
- [`docs/technical/ARCHITECTURE.md`](docs/technical/ARCHITECTURE.md) — stack, schema, security
- [`TASKS.md`](TASKS.md) — build progress
- [`DECISIONS.md`](DECISIONS.md) — autonomous decisions made during the build, and what still
  needs Raphy before this goes live
