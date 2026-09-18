# Build reference — aios.obio.in

Everything needed to build the companion website. Read this file first, then the four
folders in order. Nothing outside this folder is required.

## What is being built

A companion site for the printed book *AI Operating System for Leaders* (Raphy Varghese,
Notion Press, 2026). Each of the book's 108 frameworks carries a QR code that opens that
framework's prompt on this site. The book is fixed in print; the site is the layer that
gets corrected as prompting technique changes.

**The one rule that outranks every other decision:** a scanned QR code must reach its prompt
instantly, with no sign-in, no interstitial, no loading gate. Every technical choice below
exists to protect that path.

## Read in this order

| Folder | File | What it settles |
|---|---|---|
| `01-product/` | `PRODUCT.md` | Who uses this, what is true, what must never be invented |
| `01-product/` | `PRD.md` | Scope: features, all 14 routes, what is out of scope for v1 |
| `02-design/` | `DESIGN.md` | The locked visual system — colour, type, layout, components |
| `02-design/pages/` | three `.html` files | The approved page designs, client-locked. Match these exactly. |
| `03-technical/` | `ARCHITECTURE.md` | Stack, database schema, auth setup, folder structure, security |
| `04-content/` | JSON | The real book content: 108 lessons, 10 modules |

## The design files are the specification, not a mood board

`02-design/pages/*.html` are complete, self-contained, working HTML. They are the client-approved
visual truth for the whole site:

- `home.html` — the master reference. Nav, hero, prompt slider, bento, module rail, audience
  tabs, author block, testimonials, FAQ, buy block, subscribe band, footer.
- `why-this-book.html` — page hero pattern, alternating text/art blocks, the before/after
  comparison, coloured feature cards.
- `how-to-use.html` — the book-spread hero with an interactive scan demo, the clickable
  bracket prompt card, the three-move flow, "pairs with" cards.

Lift the markup and CSS from these directly. Do not redesign, do not "improve", do not
substitute a component library. Where a React/Next component is needed, port the existing
markup rather than rebuilding from a description.

## Content

`04-content/` is the canonical extract from the manuscript PDFs.

- `modules/m1.json` … `m10.json` — module title, subtitle, description, ordered lesson list
- `m1/01.json` … `m10/11.json` — one file per lesson (108 total): title, full prompt text,
  `pairsWith`, and the book pages it came from
- `all_lessons.json` — all 108 in one file

The site must read from these files rather than hardcoding lesson text into components. That
is the entire point of the site over a static reprint: Raphy edits a JSON file, not code.

**Known bug, do not ship silently:** `m6/06.json` (framework 6.6, "Culture Code Canvas")
contains the wrong prompt — it duplicates 6.7's Delegation Ladder prompt, copied from an error
in the printed book. Get the correct prompt from Raphy before that lesson goes live.

## Never invent

Per `PRODUCT.md`: store URLs, reader testimonials, sales or reader numbers, press mentions,
benchmarks, named customers, and author biography beyond "author of the book" are all absent.
Placeholders in the design files are labelled as such. Ship them as placeholders or leave them
out — do not fill them with plausible-sounding invention.

## Suggested first message to Claude Code

> Read every file in this folder starting with START-HERE.md. Then scaffold the Next.js app
> described in 03-technical/ARCHITECTURE.md, port the nav, footer and design tokens out of
> 02-design/pages/home.html into shared components, and build the module and lesson routes
> reading from 04-content/. Stop before building accounts.
