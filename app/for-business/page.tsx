import Link from "next/link";
import type { Metadata } from "next";
import styles from "@/components/for-business/for-business.module.css";

export const metadata: Metadata = {
  title: "For Teams — AI Operating System for Leaders",
  description:
    "Give a whole team the same 108 frameworks, organised by decision, so everyone asking AI the same question gets a comparable answer.",
};

export default function ForBusinessPage() {
  return (
    <main>
      {/* ============ PAGE HERO ============ */}
      <header className={styles.phero}>
        <div className={styles.bg} />
        <div className={styles.gridLines} />
        <div className={styles.scrim} />
        <div className={`pad ${styles.pheroIn}`}>
          <div className={styles.pheroCopy}>
            <div className={styles.crumb}>
              <Link href="/">Home</Link> <span>/</span> <span>For teams</span>
            </div>
            <h1 className={styles.phH}>One shared way to prompt, across the whole team.</h1>
            <p className={styles.phSub}>
              Right now, one person on your team writes a paragraph, another writes five words,
              a third pastes a whole document — and three answers come back in three shapes that
              can&rsquo;t be compared. Give everyone the same 108 frameworks instead.
            </p>
            <div className={styles.phBtns}>
              <a className="btn btn-white" href="#start">
                See where teams start
              </a>
              <Link className="btn btn-line" href="/contact">
                Talk to us about your team
              </Link>
            </div>
          </div>
          <div className={styles.pheroArt}>
            <svg viewBox="0 0 280 260" className="line" aria-hidden="true">
              <circle className="s" cx="140" cy="34" r="16" />
              <path className="s2" d="M140 50v28" />
              <path className="s2" d="M76 108h128" />
              <path className="s2" d="M76 78v30M204 78v30" />
              <circle className="s" cx="76" cy="124" r="14" />
              <circle className="s" cx="140" cy="124" r="14" />
              <circle className="s" cx="204" cy="124" r="14" />
              <path className="s3" d="M76 138v20M140 138v20M204 138v20" />
              <rect className="s2" x="40" y="164" width="72" height="30" rx="8" />
              <rect className="s2" x="104" y="164" width="72" height="30" rx="8" />
              <rect className="s2" x="168" y="164" width="72" height="30" rx="8" />
              <path className="s3" d="M76 194v18M140 194v18M204 194v18" />
              <path className="s" d="M60 212h32M124 212h32M188 212h32" />
              <circle className="fd" cx="76" cy="212" r="2.6" />
              <circle className="fd" cx="140" cy="212" r="2.6" />
              <circle className="fd" cx="204" cy="212" r="2.6" />
            </svg>
          </div>
        </div>
      </header>

      {/* ============ WHY A SHARED LIBRARY ============ */}
      <section className="dark">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">Why a shared library</div>
              <h2 className="sh" style={{ maxWidth: "32ch" }}>
                Four reasons this works better than fifteen people improvising.
              </h2>
            </div>
          </div>
          <div className={styles.diffs}>
            <div className={`${styles.diff} ${styles.cBlue}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
                  <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
                  <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
                  <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
                </svg>
              </span>
              <h3>Same 108 frameworks for everyone</h3>
              <p>One reference the whole team points at, instead of fifteen people each carrying their own half-remembered prompt style.</p>
            </div>
            <div className={`${styles.diff} ${styles.cRed}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <path d="M12 3v7M12 10L6 20M12 10l6 10" />
                  <circle cx="12" cy="3" r="1.8" />
                </svg>
              </span>
              <h3>Organised by decision, not by role</h3>
              <p>A manager, a founder and a new hire land in the same module for the same kind of problem, so their answers are actually comparable.</p>
            </div>
            <div className={`${styles.diff} ${styles.cYellow}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <path d="M4 7h16M4 12h16M4 17h9" />
                  <circle cx="18" cy="17" r="2" />
                </svg>
              </span>
              <h3>Each one names what&rsquo;s next</h3>
              <p>Every framework pairs with the two or three that follow it, so a one-on-one leads naturally into the feedback model, not a dead end.</p>
            </div>
            <div className={`${styles.diff} ${styles.cGreen}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="M7 9.5h6M7 13.5h4" />
                </svg>
              </span>
              <h3>Free to browse, nothing to license per seat</h3>
              <p>Every prompt is open on this site with no account and no per-seat sign-in — the book is what you buy, not access to the page behind the code.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
