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
cp .env.example .env.local   # fill in Supabase project values
npm run dev
```

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
