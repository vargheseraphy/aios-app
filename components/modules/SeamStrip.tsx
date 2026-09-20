import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./modulePage.module.css";

/** The slim dark strip above the head band — shared shell for /m{module}'s
 * and /modules' seam bars; each page supplies its own text as children. */
export function SeamStrip({
  backHref,
  backLabel,
  children,
}: {
  backHref: string;
  backLabel: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.seam}>
      <div className={styles.seamBg} />
      <div className={`pad ${styles.seamIn}`}>
        <svg className={`i ${styles.seamArt}`} width="34" height="26" viewBox="0 0 34 26" aria-hidden="true">
          <path className="s2" d="M2 5c3.5-2 8-2 12 1v16c-3.5-3-8.5-3-12-1" opacity={0.55} />
          <path className="s2" d="M2 5v16" opacity={0.55} />
          <rect x="19" y="3" width="13" height="20" rx="2.5" />
          <rect className="fd" x="23" y="8" width="5" height="5" rx="1" fill="currentColor" />
        </svg>
        <p className={styles.seamTxt}>{children}</p>
        <Link className={styles.seamBack} href={backHref}>
          <svg className="i" width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          <span>{backLabel}</span>
        </Link>
      </div>
    </div>
  );
}
