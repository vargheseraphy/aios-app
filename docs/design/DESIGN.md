# Design
Documented from the incumbent, author-locked implementation (`home.html` v7, `why-this-book.html` v6). Extensions inherit this file; they do not rewrite it.

## World
Near-black product-marketing canvas with saturated colour fields, alternating with white and light-grey reading sections. Energy comes from full-strength colour on black, never from tinted washes. Structure over decoration: heroes pin copy bottom-left over a colour field; content moves through tab switchers, snap rails, marquees, bento grids and accordions rather than symmetric card grids.

## Colour
- Blue `#3B7BF7` primary; highlight `#6EA0FF`; pressed `#1E5CE0`; deep field `#0F2E75`. Gradients are blue-to-blue only.
- Red `#EC4A3B` — errors, destructive, "without" states. Green `#2FAB57` — success, "with" states. Yellow `#FBBE10` — rare highlight; one card or one badge per page.
- Canvas near-black `#0E0F12`; panels `#15171C` / `#1B1E26`; ink for text on light `#1B1C1F`.
- Light sections: white `#FFFFFF` and wash `#F4F5F7`; hairline `#E6E8EC`, stronger `#D3D7DE`.
- On dark, secondary text is white at 72% / 50% / 34% — never a grey hex.
- Colour fields: two or three radial gradients of palette colours at 60–64% falloff over `#0B0C0F`, optionally with a 52px grid-line overlay masked to the centre.

## Type
- Display: Archivo 700/800, tracking −0.022em to −0.032em, `text-wrap: balance`.
- Body/UI: Roboto 400/500. Mono for kickers, hex, routes, and prompt text: Roboto Mono.
- Scale: hero h1 clamp(34px, 6.4vw, 56px) at line-height 1.06; section h2 clamp(25px, 3.6vw, 38px) at 1.1; card h3 15–18px; body 14–15px at 1.5–1.7; labels 12px; kickers 11px mono, 0.14em tracking, uppercase.
- Measures: h2 up to 32ch; body 62–84ch; problem-block copy 62ch so it sits level with its art.

## Layout
- Container 1536px; side padding 20 / 40 / 80px at 0 / 640 / 1024px.
- Section padding-block 76–78px. Blocks inside a section 44–72px apart, no divider rules.
- Text-and-art splits are 65/35 (`1.85fr 1fr`), art panel min-height 210–248px, no border on art panels in light sections.
- Gaps inside clusters 8–14px; grids 14px.

## Components
- Nav: sticky, 58px, blurred near-black, wordmark with a conic four-colour square, one filled white CTA, an icon-only circular login that swaps to an avatar chip.
- Buttons: 8px radius, 12/22 padding; white-on-dark primary, outlined white secondary, blue for in-content actions, ink-filled on light.
- Hero: full-bleed colour field + scrim, copy bottom-left, glass chip above the h1, two buttons, optional vertical ticker or art panel on the right.
- Marquee strip: pill items, 42s loop, paused under reduced motion.
- Tab switcher: pill rail with a sliding solid indicator; on light the indicator is ink, on dark it is white.
- Snap rail: 280px cards, arrows at the top right that disable at the ends.
- Accordion: plus-in-circle toggle that rotates 45° and fills when open; height + opacity transition.
- Bento: one tall light card, one wide near-black, two bright (blue, yellow) cards; mixed sizes, never uniform.
- Prompt card: near-black, panel header with a mono lesson tag, prompt body in mono with yellow keys and blue placeholders, footer with pairings and a blue Copy button that turns green on success.
- Comparison: two cards, "without" on wash with red accents, "with" on white with blue border and shadow, a VS badge on the seam, each showing input then output.
- Coloured feature cards on dark: 4px solid top bar, solid icon chip, tinted background and border in the same hue.
- Seat tab rail: centred pill rail, mono index number plus label per tab, sliding ink indicator, arrow-key navigation. The selected panel opens with a centred one-line statement, a mono "Seat n of 5" line, then three columns each under a small mono label with a hairline rule.
- Overlap matrix: rows of items against columns of audiences, a filled dot in the audience's colour where they intersect and a faint dot where they do not, legend beneath. Scrolls horizontally on narrow screens rather than compressing.

## Illustration
All artwork is inline SVG line art using `currentColor` (`.line .s` 2.2px, `.s2` 1.8px at 55%, `.s3` dashed, `.fd` solid fills). It sits over a colour field, never on a flat gradient alone, and draws the section's literal subject (book + QR + phone; four framework layers; org tree). Elements never overlap; viewBoxes leave stroke room at every edge.

## Motion
Hero ticker and marquees loop continuously; tab indicator slides on a 280ms cubic-bezier; accordion and slider fade over 250–300ms; rail scrolls smoothly. Everything animated has a reduced-motion fallback. No scroll-reveal, no per-section entrances.

## Page rules learned in build

- Text fills its column. Section headings cap around 32ch, body 62-84ch; a narrow cap that leaves dead space beside the text is a bug, not restraint.
- No divider rules between sibling blocks and no borders on art panels in light sections. Separation comes from space.
- Centred headers are used per section, not globally: the section whose content is a centred artefact gets a centred header and intro; list and index sections keep their left edge.
- A page that states a rule about itself keeps it. Who It's For claims the shown prompt comes from the module listed first, so the module order is sorted to make that true.
- Disclosure panels that are closed leave the tab order and find-in-page: `hidden` on tab panels, `inert` on collapsed regions.

## Content rules
Real module and lesson data everywhere; prompts are the canonical extracts. Testimonials and author bio are draft copy and stay labelled until replaced. Store links stay `#` with a visible note. Every `<meta charset="utf-8">` is the first line so local copies render special characters.
