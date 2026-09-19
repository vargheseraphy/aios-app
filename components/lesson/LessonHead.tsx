import Link from "next/link";
import styles from "./head.module.css";

const LEVEL_CLASS: Record<string, string> = {
  Beginner: styles.levBeginner,
  Intermediate: styles.levIntermediate,
  Advanced: styles.levAdvanced,
};

export function SeamBar({
  sourcePages,
  moduleNumber,
  moduleTitle,
}: {
  sourcePages: { intro: number; prompt: number };
  moduleNumber: number;
  moduleTitle: string;
}) {
  return (
    <div className={styles.seam}>
      <div className={styles.seamBg} />
      <div className={`pad ${styles.seamIn}`}>
        <svg className={`i ${styles.seamArt}`} width="34" height="26" viewBox="0 0 34 26" aria-hidden="true">
          <path d="M2 5c3.5-2 8-2 12 1v16c-3.5-3-8.5-3-12-1" opacity={0.55} />
          <path d="M2 5v16" opacity={0.55} />
          <rect x="19" y="3" width="13" height="20" rx="2.5" />
          <rect x="23" y="8" width="5" height="5" rx="1" fill="currentColor" />
        </svg>
        <p className={styles.seamTxt}>
          <b>Page {sourcePages.prompt}</b>
          <span className={styles.dim}> &middot; </span>
          Module {String(moduleNumber).padStart(2, "0")}
          <span className={styles.seamLong}>
            , {moduleTitle}
            <span className={styles.dim}> &middot; this screen continues that page</span>
          </span>
        </p>
        <Link className={styles.seamBack} href="/#modules">
          <svg className="i" width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          <span>All 108 frameworks</span>
        </Link>
      </div>
    </div>
  );
}

export function LessonHead({
  lessonNumber,
  level,
  moduleNumber,
  moduleTitle,
  titlePrinted,
  subtitle,
}: {
  lessonNumber: string;
  level: string;
  moduleNumber: number;
  moduleTitle: string;
  titlePrinted: string;
  subtitle?: string;
}) {
  return (
    <div className={`pad ${styles.lhead}`}>
      <div className={styles.hrow}>
        <span className={styles.lnum}>{lessonNumber}</span>
        <span className={`${styles.lev} ${LEVEL_CLASS[level] ?? ""}`}>{level}</span>
        <span className={styles.lmod}>
          Module {String(moduleNumber).padStart(2, "0")} &middot;{" "}
          <Link href="/#modules">{moduleTitle}</Link>
        </span>
      </div>
      <h1 className={styles.lt}>{titlePrinted}</h1>
      {subtitle && <p className={styles.lsub}>{subtitle}</p>}
    </div>
  );
}
