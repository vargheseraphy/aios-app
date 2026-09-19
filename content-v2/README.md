# content-v2 — the book's narrative content, extracted

`content/` only ever captured the prompt. The manuscript PDFs in `../book manuscript/` carry a
whole intro page per framework that was never extracted. This directory is `content/` plus those
fields. Nothing in `content/` was modified.

New per lesson: `level` (Beginner/Intermediate/Advanced), `subtitle` (the printed one-liner),
`useWhen` (the problem statement), `howToUse` (the framework explanation), `steps[]` (the
numbered method), `origin` (where the framework comes from), `titlePrinted` (the title as set,
with its real dash), `pairsPrinted` (the "Pairs well with" line as printed), and `promptBody` /
`proTip` split apart so Copy never picks up the commentary.

New per module: `roleProfile` — the Role Profile Index from
`AIOSF_Role_Profile part3_Index.docx.pdf`. Six internal roles and four outside perspectives per
module, each with a seniority level, what they prioritise, and when to use them.

Rebuild with `scripts/extract-book.py` and `scripts/extract-roles.py`.

Coverage: 108/108 lessons. level, useWhen, howToUse, steps and origin are present on 100/108 or
better; the handful of gaps are listed by running the extractor. Role profiles: 10/10 modules,
6 internal + 4 outside each.

Still to fix by hand: the figure-caption fragments described in
`../build-reference/CONTENT-ISSUES.md` are carried into `promptBody` unchanged.
