# Product
<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Primary: a reader of the printed book *AI Operating System for Leaders*, mid-chapter, phone in hand, who has just scanned the QR code on a framework page. Job: get that framework's prompt into an AI chat in under ten seconds, no account, no explanation.

Secondary, confirmed: buyers and gifters (founders, HR leads, managers, college libraries) evaluating whether to buy or bulk-order; signed-in readers who bookmark prompts; the author maintaining prompts over time. Five named audiences on the site: Founders, Managers, Students, Teams, Institutions.

## Product Purpose
Companion site to the printed book at aios.obio.in. Every one of the book's 108 frameworks (10 modules, 276 pages, Notion Press, 2026) carries a QR code that opens that framework's prompt on this site. The book stays fixed in print; the site is the layer that gets rewritten as prompting technique changes. Success: a scanned code opens the right prompt instantly and the reader copies it; secondarily, a visitor understands why the book exists and buys it.

## Positioning
A business book whose prompts cannot go stale, because each printed page points at a page that can be corrected. The frameworks are organised by decision (in the order a business hits problems), each ends in a paste-ready prompt with bracketed placeholders, and each names the frameworks it pairs with next. Copying is free and never gated behind an account.

## Operating Context
Readers use the prompts inside ChatGPT, Claude, Gemini or Copilot — the prompts are plain-language with no tool-specific syntax. Scanning happens at a desk or in a meeting, on a phone camera, no app. Lesson URLs follow `/m{module}/{lesson}`, e.g. `/m6/06`. Prompt text is the canonical extract in `../website/content/m*/*.json` (108 lessons) and `../website/content/modules/m*.json` (10 modules).

## Capabilities and Constraints
Confirmed: browse and copy every prompt without sign-in; optional account (magic link + Google) only for bookmarking into a personal list and invite-a-friend links; module and lesson pages statically generated; accounts on Supabase; hosting on Vercel.
Explicitly undecided / not to be invented: store URLs for Amazon and Notion Press (placeholders); real reader testimonials (draft copy only, must be replaced with permissioned quotes); author biography beyond "author of the book" (draft copy only); author portrait and photography (line-art placeholders).
Known content bug: lesson 6.6 "Culture Code Canvas" currently carries lesson 6.7's prompt, copied from an error in the manuscript — must be corrected before it goes live.

## Brand Commitments
Name: AIOS / *AI Operating System for Leaders*. Author: Raphy Varghese. Publisher: Notion Press. Domain aios.obio.in.
Visual direction pinned by the author: palette one shade off Google's four colours (blue primary with a blue-only gradient, red and green functional only, yellow rare) on a near-black canvas alternating with white reading sections; dense small type (14px body, 12px labels), tight gaps, wide 1536px container; structure borrowed from modern product-marketing sites (full-bleed hero with bottom-left copy, pill tab switcher, marquee, snap rail, accordion, bento); all illustration as currentColor line art over colour fields. Two pages are locked as the reference: `home.html` (v7) and `why-this-book.html` (v6).

## Evidence on Hand
Real: 10 module titles and subtitles, 108 lesson titles and full prompt texts, lesson pairings, page counts, publisher. Sample prompts already in use on the site: 1.1 C.A.R.E Prompting, 4.2 SPIN Discovery Call, 8.2 Pre-Mortem Analysis, 10.2 90-Day Planning.
Absent (do not fabricate): sales figures, reader counts, press, benchmarks, named customers, real testimonials, store links.

## Product Principles
- The QR path is sacred: nothing may slow or gate a scanned code reaching its prompt.
- Show the product, never describe it: a real prompt with a working copy button beats a paragraph about prompts.
- Minimal words, real content: every page uses actual module and lesson data, not filler.
- Print stays honest through the site: the page behind a code can change; the book never has to be reprinted.
- Claims stay true: no invented numbers, quotes, or credentials — placeholders are labelled.
