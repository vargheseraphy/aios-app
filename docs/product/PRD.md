# PRD — AI Operating System for Leaders, companion website

Full visual reference (PRD + Architecture + Sprint Plan, in one place) lives here:
https://claude.ai/artifact/Cjqsh7x8V9evMmoiF6zB43
This file is the condensed, build-ready version for Claude Code.

## What this is

A companion website at aios.obio.in for the printed book "AI Operating System for Leaders" by
Raphy Varghese. Each framework in the book has a QR code; scanning it lands on this site and
shows the ready-to-copy AI prompt for that framework. The book stays fixed in print; the
website is the layer that gets updated as prompting technique evolves.

The URL every QR code encodes is `aios.obio.in/m{module}/{lesson}` (e.g. `/m6/06`). That single
route must render instantly, with no sign-in gate — everything else in this document exists to
protect that path.

## Users

1. **Reader, mid-book, on a phone.** Scanned a QR code for one specific prompt. Wants it in
   under 3 seconds, copyable in one tap. Majority of all traffic. Needs no account.
2. **Buyer/gifter** (HR lead, founder, college library) deciding whether to buy or license
   copies. Browses marketing pages on a laptop, never scans a QR code.
3. **Signed-in reader** who wants to bookmark prompts and invite others.
4. **Raphy**, maintaining lesson content over time without needing a developer for every edit.

## Core features

### 1. Public content (no sign-in required)
- Module pages (`/m1` ... `/m10`): every lesson in the module as a collapsed accordion.
  Expanding a lesson shows the framework name, the full prompt (copy-paste ready, with
  `[BRACKETED PLACEHOLDERS]`), a Copy button, "pairs well with" links, and last-updated date.
- Lesson deep links (`/m1/01` etc.): identical to the module page, with that lesson's accordion
  item pre-expanded and scrolled into view. **This is the exact URL every QR code encodes** —
  it must render fast with no sign-in gate and no loading delay.
- `/how-to-use` — the page the book's early-pages QR code points to: scan → expand → copy,
  with one worked example.
- `/about`, `/why-this-book`, `/for-business`, `/for-institutions`, `/contact` — marketing
  pages for the buyer/gifter audience, **hand-designed by Raphy directly in HTML**. The build
  wires these into the shared header/footer/fonts rather than redesigning them.

### 2. Accounts
- Sign-in: email magic link + "Continue with Google." No password.
- Browsing and copying prompts is **never gated** behind sign-in — only bookmarking and
  invites require an account.
- User record: email, display name (optional), created date, invited-by (if joined via a
  share link).

### 3. Bookmarks
- Signed-in user can save any lesson to a personal list ("My Prompts").
- Data shape: one row per (user_id, lesson_id, saved_at). No folders/tags/notes in v1.
- Bookmark icon on every lesson's accordion item, filled in when saved.

### 4. Invite-a-friend
- Every signed-in user gets a personal share link: `aios.obio.in/join?ref=[code]`.
- Landing page shows who invited them if available, routes straight to sign-in.
- v1 scope: shareable link + simple joined-count. No referral rewards, no email sending, no
  leaderboards — those are v2, once sharing behavior is proven.

## Full page plan

14 routes total. Pages marked **Raphy builds** are hand-designed by him in HTML and wired into
the site's shared layout rather than rebuilt from scratch.

| Route | Page | Sign-in | Notes |
| --- | --- | --- | --- |
| `/` | Home | No | Hero, book pitch, links to `/how-to-use` — **Raphy builds** |
| `/how-to-use` | Scan → expand → copy guide | No | QR target from the book's early pages |
| `/m1` … `/m10` | Module page | No | Every lesson in the module as an accordion — static |
| `/m{n}/{lesson}` | Lesson deep link | No | The QR target — item pre-expanded + scrolled into view |
| `/about` | About Raphy / the book | No | **Raphy builds** |
| `/why-this-book` | Value proposition | No | **Raphy builds** |
| `/for-business` | Org / team pitch | No | **Raphy builds** |
| `/for-institutions` | Colleges & libraries pitch | No | **Raphy builds** |
| `/contact` | Contact | No | **Raphy builds** — form posts via a server action, no third-party embed |
| `/sign-in` | Auth entry | — | Magic link input + official Google Sign-In button |
| `/join?ref={code}` | Invite landing | Prompts sign-in | Shows inviter's name if available |
| `/account` | Profile | Yes | Display name, email, sign out |
| `/my-prompts` | Bookmarked lessons | Yes | List + remove |
| `/account/invite` | Share link | Yes | Copy link, joined count |

## Explicitly out of scope for v1

Admin dashboard, user-to-user messaging, comments on prompts, any payment/paywall, referral
rewards beyond a joined-count.

## Content model

~107 lessons across 10 modules, already extracted from the manuscript into
`content/m{module}/{lesson}.json` and `content/modules/m{module}.json` in this folder (see
README.md). The site must read from these files (or their database equivalent) rather than
hardcoding lesson content into components — the entire point of the site vs. a static reprint
is that Raphy edits these without touching code.

**Known data issue to fix at import, not reproduce:** the `content/m6/06.json` file (module
6.6, "Culture Code Canvas") currently contains the wrong prompt — it's a duplicate of lesson
6.7's Delegation Ladder prompt, copied directly from an error in the printed book. Flag this
for Raphy to supply the correct prompt before it goes live; don't silently ship the bug.

## Non-functional requirements

- **Mobile-first, fast**: the QR-to-lesson path is the majority of traffic and must load with
  no visible delay and no horizontal scroll.
- **Accessible accordion**: keyboard-operable, proper `aria-expanded` — it's the core
  interaction of the entire site.
- **Row-level data privacy**: a signed-in user must only ever be able to read their own
  bookmarks and invite data.
- **Scale target**: up to 5,000 users. See ARCHITECTURE.md for the database choice and why.
