"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ResolvedPair } from "@/lib/content-v2";
import styles from "./pairs.module.css";

/** Horizontally-scrollable "pairs well with" rail, mirroring the disable-at-ends
 * arrow pattern already used by components/home/ModuleRailSection.tsx. Each pair
 * is pre-resolved by the caller against real lesson data (see NOTE 3 in
 * lesson.html — the pairsWith label isn't always the paired lesson's own title). */
export function PairsRail({ pairs }: { pairs: ResolvedPair[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft <= 4);
    setAtEnd(rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  function stepWidth(): number {
    const card = railRef.current?.querySelector<HTMLElement>(`.${styles.pair}`);
    return card ? card.offsetWidth + 16 : 272;
  }

  function scrollBy(dir: 1 | -1) {
    railRef.current?.scrollBy({ left: dir * stepWidth(), behavior: "smooth" });
  }

  if (pairs.length === 0) return null;

  return (
    <div id="pairs" className={styles.blk}>
      <div className={styles.bh}>
        <span className={styles.bi} style={{ background: "#F4F5F7", color: "#1B1C1F" }}>
          <svg className="i" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 13.5a4.2 4.2 0 0 0 5.7 0l2.8-2.8a4.2 4.2 0 0 0-5.7-5.7l-1.4 1.4" />
            <path d="M14 10.5a4.2 4.2 0 0 0-5.7 0l-2.8 2.8a4.2 4.2 0 0 0 5.7 5.7l1.4-1.4" />
          </svg>
        </span>
        <h2>Pairs well with</h2>
        <span className={styles.bn}>As printed with this framework</span>
        <span className={styles.railBtns}>
          <button
            type="button"
            className={styles.railBtn}
            aria-label="Scroll to earlier frameworks"
            disabled={atStart}
            onClick={() => scrollBy(-1)}
          >
            <svg className="i" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.railBtn}
            aria-label="Scroll to later frameworks"
            disabled={atEnd}
            onClick={() => scrollBy(1)}
          >
            <svg className="i" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </span>
      </div>
      <div
        className={styles.pairs}
        ref={railRef}
        onScroll={sync}
        tabIndex={0}
        role="region"
        aria-label="Related frameworks, scrollable"
      >
        {pairs.map((pair, i) =>
          pair.resolved ? (
            <Link key={i} className={styles.pair} href={`/m${pair.module}/${pair.fileId}`}>
              <span className={styles.pn}>{pair.number}</span>
              <h3>{pair.title}</h3>
              {pair.sourcePages && (
                <span className={styles.pp}>
                  Pages {pair.sourcePages.intro}&ndash;{pair.sourcePages.prompt}
                </span>
              )}
            </Link>
          ) : (
            <span key={i} className={styles.pair}>
              <span className={styles.pn}>{pair.number}</span>
            </span>
          ),
        )}
      </div>
    </div>
  );
}
