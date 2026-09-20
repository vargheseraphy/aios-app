import type { ReactNode } from "react";
import styles from "./modulePage.module.css";

export interface SpreadStat {
  label: ReactNode;
  value: ReactNode;
  /** dot colour before the label, matching each-module.html's .b/.i/.a
   * (green/blue/amber) level-count dots — omit for a neutral grey dot. */
  color?: string;
}

/** The "about this module" / "how the book is built" block that sits below
 * the prompts (each design's own PAGE SHAPE note: this is context, not an
 * obstacle, so it comes after the accordion rather than before it). */
export function AboutSpread({
  heading,
  lead,
  body,
  stats,
}: {
  heading: string;
  lead?: string;
  body: ReactNode;
  stats: SpreadStat[];
}) {
  return (
    <div className={styles.about} id="about">
      <div>
        <h2>{heading}</h2>
        {lead && <p className={styles.aboutLead}>{lead}</p>}
        <p>{body}</p>
      </div>
      <div className={styles.spread}>
        {stats.map((stat, i) => (
          <div className={styles.sp} key={i}>
            <span className={styles.spl} style={stat.color ? { color: stat.color } : undefined}>
              {stat.label}
            </span>
            <b>{stat.value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
