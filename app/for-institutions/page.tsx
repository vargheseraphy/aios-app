import Link from "next/link";
import type { Metadata } from "next";
import { getLesson, moduleParam } from "@/lib/content";
import styles from "@/components/for-institutions/for-institutions.module.css";

const COURSE_EXAMPLES: Array<{ module: number; fileId: string }> = [
  { module: 1, fileId: "00" }, // The AI Mental Model
  { module: 1, fileId: "01" }, // C.A.R.E Prompting
  { module: 1, fileId: "06" }, // First Principles Thinking
  { module: 1, fileId: "09" }, // Mental Models Library
  { module: 10, fileId: "02" }, // 90-Day Planning
  { module: 10, fileId: "07" }, // Socratic Self-Questioning
];

export const metadata: Metadata = {
  title: "For Institutions — AI Operating System for Leaders",
  description:
    "108 frameworks for teaching students how to think with AI, not just how to prompt it — free to browse on this site, in print for the library shelf.",
};

export default function ForInstitutionsPage() {
  const examples = COURSE_EXAMPLES.map((e) => getLesson(e.module, e.fileId)).filter(
    (l): l is NonNullable<typeof l> => Boolean(l),
  );

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

      {/* ============ WHY IT FITS A COURSE ============ */}
      <section className="dark">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">Why it fits a course</div>
              <h2 className="sh" style={{ maxWidth: "32ch" }}>
                Structured the way a syllabus already is.
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
              <h3>Ten modules, one per unit</h3>
              <p>Strategy, business design, market, sales, marketing, team, operations, decisions, finance, self-leadership — a term&rsquo;s worth of units already scoped.</p>
            </div>
            <div className={`${styles.diff} ${styles.cRed}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-3.6 3.6-6.2 8-6.2s8 2.6 8 6.2" />
                </svg>
              </span>
              <h3>Every student gets the same starting point</h3>
              <p>No two students arrive with the same AI habits. A shared module 1 puts everyone on the same mental model before the coursework needs it.</p>
            </div>
            <div className={`${styles.diff} ${styles.cYellow}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <path d="M12 3v7M12 10L6 20M12 10l6 10" />
                  <circle cx="12" cy="3" r="1.8" />
                </svg>
              </span>
              <h3>A worked example on every page</h3>
              <p>Each framework ends in a real, paste-ready prompt with bracketed placeholders — something a student can run, not just read about.</p>
            </div>
            <div className={`${styles.diff} ${styles.cGreen}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="M7 9.5h6M7 13.5h4" />
                </svg>
              </span>
              <h3>Free to browse, no login for a student</h3>
              <p>Every prompt is open on this site with no account required, so assigning a reading never means chasing down sign-ins first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SAMPLE MODULE ============ */}
      <section className="light" id="start">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">Sample module</div>
              <h2 className="sh" style={{ maxWidth: "32ch" }}>
                Six frameworks from the two most classroom-ready modules.
              </h2>
              <p className="sd" style={{ maxWidth: "84ch" }}>
                Module 1, Think Like a Strategist — the foundational AI-and-thinking module — and
                Module 10, Lead Yourself First, on personal planning and reflection.
              </p>
            </div>
          </div>
          <div className={styles.examples}>
            {examples.map((lesson) => (
              <Link
                key={lesson.lesson}
                href={`/${moduleParam(lesson.module)}/${lesson.fileId}`}
                className={styles.example}
              >
                <span className={styles.exNum}>{lesson.lesson}</span>
                <span className={styles.exBody}>
                  <span className={styles.exTitle}>{lesson.title}</span>
                  <br />
                  <span className={styles.exModule}>
                    Module {String(lesson.module).padStart(2, "0")}
                  </span>
                </span>
                <span className={styles.exGo}>
                  <svg className="i" width="16" height="16" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
