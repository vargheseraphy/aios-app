"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import { MODULE_ART } from "./moduleArt";

export interface RailModule {
  number: number;
  href: string;
  title: string;
  description: string;
  lessonCount: number;
}

export function ModuleRailSection({ modules }: { modules: RailModule[] }) {
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
    const card = railRef.current?.querySelector<HTMLElement>(`.${styles.mcard}`);
    return card ? card.offsetWidth + 12 : 300;
  }

  function scrollBy(dir: 1 | -1) {
    railRef.current?.scrollBy({ left: dir * stepWidth() * 2, behavior: "smooth" });
  }

  return (
    <section className="light" id="modules">
      <div className="pad">
        <div className="head-row">
          <div>
            <div className="kicker">The system</div>
            <h2 className="sh">Ten modules, front to back.</h2>
            <p className="sd">
              Read the book in order or jump to the one that&rsquo;s on fire this week. Each
              module holds nine to thirteen frameworks.
            </p>
            <Link href="/modules" className={styles.seeAll}>
              See all 10 modules
              <svg className="i" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className={styles.railnav}>
            <button
              type="button"
              className={styles.rbtn}
              aria-label="Scroll modules left"
              disabled={atStart}
              onClick={() => scrollBy(-1)}
            >
              <svg className="i" width="17" height="17" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.rbtn}
              aria-label="Scroll modules right"
              disabled={atEnd}
              onClick={() => scrollBy(1)}
            >
              <svg className="i" width="17" height="17" viewBox="0 0 24 24">
                <path d="M9 18l6-6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`pad ${styles.railWrap}`}>
        <div className={styles.rail} ref={railRef} onScroll={sync}>
          {modules.map((mod) => {
            const art = MODULE_ART[mod.number];
            return (
              <Link className={styles.mcard} href={mod.href} key={mod.number}>
                <div className={styles.media} style={{ background: art?.background }}>
                  <span className={styles.n}>{String(mod.number).padStart(2, "0")}</span>
                  {art?.icon}
                </div>
                <div className={styles.body}>
                  <h3>{mod.title}</h3>
                  <p>{mod.description}</p>
                  <span className={styles.cnt}>{mod.lessonCount} frameworks</span>
                </div>
              </Link>
            );
          })}
        </div>
        <p className={styles.railhint}>Scroll, or use the arrows above</p>
      </div>
    </section>
  );
}
