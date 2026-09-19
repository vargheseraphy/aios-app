import Link from "next/link";
import type { PrevNext } from "@/lib/content-v2";
import styles from "./moduleRail.module.css";

export interface ModuleRailRow {
  lesson: string;
  fileId: string;
  titlePrinted: string;
  sourcePages: { intro: number; prompt: number };
  current: boolean;
}

export function ModuleRail({
  moduleNumber,
  moduleTitle,
  moduleSubtitle,
  pageRange,
  rows,
  prevNext,
}: {
  moduleNumber: number;
  moduleTitle: string;
  moduleSubtitle: string;
  pageRange: string;
  rows: ModuleRailRow[];
  prevNext: PrevNext;
}) {
  return (
    <div id="module" className={styles.modwrap}>
      <section>
        <div className="pad">
          <div className={styles.headRow}>
            <div>
              <p className={styles.kicker}>
                Module {String(moduleNumber).padStart(2, "0")} &mdash; {moduleTitle}
              </p>
              <h2 className={styles.sh}>{moduleSubtitle}</h2>
              <p className={styles.sd}>
                {rows.length} frameworks, printed on pages {pageRange}.
              </p>
            </div>
            <Link className="btn btn-line btn-sm" href="/#modules">
              All 10 modules
            </Link>
          </div>

          <div className={styles.mlist}>
            {rows.map((row) =>
              row.current ? (
                <div key={row.lesson} className={`${styles.ml} ${styles.on}`} aria-current="page">
                  <span className={styles.mn}>{row.lesson}</span>
                  <span className={styles.mt}>{row.titlePrinted}</span>
                  <span className={styles.here}>You are here</span>
                </div>
              ) : (
                <Link key={row.lesson} className={styles.ml} href={`/m${moduleNumber}/${row.fileId}`}>
                  <span className={styles.mn}>{row.lesson}</span>
                  <span className={styles.mt}>{row.titlePrinted}</span>
                  <span className={styles.mp}>
                    pp. {row.sourcePages.intro}&ndash;{row.sourcePages.prompt}
                  </span>
                </Link>
              ),
            )}
          </div>

          <nav className={styles.prevnext} aria-label="Previous and next framework">
            {prevNext.prev && (
              <Link className={styles.pnCard} href={`/m${prevNext.prev.module}/${prevNext.prev.fileId}`}>
                <span className={styles.dir}>
                  <svg className="i" width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                  Previous
                </span>
                <span className={styles.t}>
                  {prevNext.prev.lesson} {prevNext.prev.titlePrinted}
                </span>
                <span className={styles.p}>
                  Module {String(prevNext.prev.module).padStart(2, "0")} &middot; pages{" "}
                  {prevNext.prev.sourcePages.intro}&ndash;{prevNext.prev.sourcePages.prompt}
                </span>
              </Link>
            )}
            {prevNext.next && (
              <Link
                className={`${styles.pnCard} ${styles.next}`}
                href={`/m${prevNext.next.module}/${prevNext.next.fileId}`}
              >
                <span className={styles.dir}>
                  Next
                  <svg className="i" width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <span className={styles.t}>
                  {prevNext.next.lesson} {prevNext.next.titlePrinted}
                </span>
                <span className={styles.p}>
                  Module {String(prevNext.next.module).padStart(2, "0")} &middot; pages{" "}
                  {prevNext.next.sourcePages.intro}&ndash;{prevNext.next.sourcePages.prompt}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </section>
    </div>
  );
}
