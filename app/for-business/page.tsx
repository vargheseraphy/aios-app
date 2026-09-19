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
    </main>
  );
}
