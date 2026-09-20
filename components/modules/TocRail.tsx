"use client";

import styles from "./modulePage.module.css";

export interface TocItem {
  /** matches the row's own `b-{id}` button id, so a click can find and open it */
  id: string;
  number: string;
  title: string;
  ariaLabel: string;
}

export interface TocSection {
  href: string;
  label: string;
}

/**
 * The sticky left-hand contents rail shared by /m{module} (one row per
 * framework) and /modules (one row per module) — desktop only, per both
 * designs' `.toc{display:none}` below 1100px. Clicking a row opens its
 * accordion row (if closed) and scrolls it into view, matching each-
 * module.html/all-module.html's own `openRow()` behaviour but driven off
 * each row's own id rather than lifted React state.
 */
export function TocRail({
  heading,
  items,
  sectionsHeading,
  sections,
}: {
  heading: string;
  items: TocItem[];
  sectionsHeading: string;
  sections: TocSection[];
}) {
  function jumpTo(id: string) {
    const btn = document.getElementById(`b-${id}`);
    if (!btn) return;
    if (btn.getAttribute("aria-expanded") !== "true") btn.click();
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    btn.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    btn.focus({ preventScroll: true });
  }

  return (
    <aside className={styles.toc} aria-label="Contents">
      <div className={styles.tocCard}>
        <h2>{heading}</h2>
        <div className={styles.tocList}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.tl}
              aria-label={item.ariaLabel}
              onClick={() => jumpTo(item.id)}
            >
              <span className={styles.tn}>{item.number}</span>
              <span className={styles.tt}>{item.title}</span>
              <span style={{ width: 16 }} />
            </button>
          ))}
        </div>
      </div>
      <div className={styles.tocCard}>
        <h2>{sectionsHeading}</h2>
        <nav className={styles.tocSec} aria-label="Sections">
          {sections.map((section) => (
            <a key={section.href} href={section.href}>
              <span className={styles.tocDot} />
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
