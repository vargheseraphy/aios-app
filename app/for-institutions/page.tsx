import Link from "next/link";
import type { Metadata } from "next";
import styles from "@/components/for-institutions/for-institutions.module.css";

export const metadata: Metadata = {
  title: "For Institutions — AI Operating System for Leaders",
  description:
    "108 frameworks for teaching students how to think with AI, not just how to prompt it — free to browse on this site, in print for the library shelf.",
};

export default function ForInstitutionsPage() {
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
              <Link href="/">Home</Link> <span>/</span> <span>For institutions</span>
            </div>
            <h1 className={styles.phH}>A framework for thinking with AI, not just prompting it.</h1>
            <p className={styles.phSub}>
              Most AI literacy stops at syntax. This book&rsquo;s first module teaches the mental
              model underneath it — role, context, action, expectation — then spends nine more
              modules applying it to real business decisions.
            </p>
            <div className={styles.phBtns}>
              <a className="btn btn-white" href="#start">
                See a sample module
              </a>
              <Link className="btn btn-line" href="/contact">
                Ask about course adoption
              </Link>
            </div>
          </div>
          <div className={styles.pheroArt}>
            <svg viewBox="0 0 280 260" className="line" aria-hidden="true">
              <rect className="s" x="46" y="30" width="188" height="140" rx="10" />
              <path className="s3" d="M140 30v140" />
              <path className="s2" d="M64 52h56M64 68h44M64 84h50" />
              <path className="s2" d="M158 52h56M158 68h40M158 84h50" />
              <path className="s" d="M46 170l-14 34h216l-14-34" />
              <circle className="fd" cx="140" cy="204" r="3.2" />
              <path className="s3" d="M60 220h160" />
              <text className="t" x="98" y="240" style={{ fontSize: 10, letterSpacing: "0.1em" }}>
                10 MODULES · 108 FRAMEWORKS
              </text>
            </svg>
          </div>
        </div>
      </header>
    </main>
  );
}
