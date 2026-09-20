import type { ReactNode } from "react";
import styles from "./modulePage.module.css";

export interface HeadChip {
  label: string;
  value: ReactNode;
}

/** The head band directly under the seam strip — kicker, H1, subtitle and
 * up to a few fact chips. Deliberately carries nothing else: per each-
 * module.html's PAGE SHAPE note, the reader arrived to copy a prompt, not
 * to read about the module, so the description goes in #about below the
 * prompts instead of up here. */
export function PageHeadBand({
  kicker,
  title,
  subtitle,
  chips,
}: {
  kicker: ReactNode;
  title: string;
  subtitle: string;
  chips: HeadChip[];
}) {
  return (
    <div className={styles.mhead}>
      <div className={`pad ${styles.mheadIn}`}>
        <div className={styles.mheadL}>
          <p className={styles.mkick}>{kicker}</p>
          <h1 className={styles.mt}>{title}</h1>
          <p className={styles.msub}>{subtitle}</p>
        </div>
        <dl className={styles.mfacts}>
          {chips.map((chip) => (
            <div className={styles.mf} key={chip.label}>
              <dt>{chip.label}</dt>
              <dd>{chip.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
