import type { Metadata } from "next";
import Link from "next/link";
import { getAllModules, getLesson, getModule, moduleParam } from "@/lib/content";
import { SeatTabs, type Seat, type SeatModule } from "@/components/who-its-for/SeatTabs";
import { BuySection } from "@/components/marketing/BuySection";
import { SubscribeSection } from "@/components/marketing/SubscribeSection";
import styles from "@/components/who-its-for/who-its-for.module.css";

export const metadata: Metadata = {
  title: "Who It's For — AI Operating System for Leaders",
  description:
    "Five seats at the table. The same 108 frameworks. Find the row that sounds like your week and get three module numbers and a prompt to run today.",
};

function seatModules(numbers: number[]): SeatModule[] {
  return numbers.map((n) => {
    const m = getModule(n);
    return { number: n, title: m?.title ?? "", lessonCount: m?.lessons.length ?? 0 };
  });
}

function promptFor(moduleNumber: number, fileId: string) {
  const lesson = getLesson(moduleNumber, fileId);
  return {
    lessonId: lesson?.lesson ?? "",
    title: lesson?.title ?? "",
    moduleLabel: `Module ${String(moduleNumber).padStart(2, "0")}`,
    prompt: lesson?.prompt ?? "",
    pairsWith: lesson?.pairsWith ?? [],
  };
}

function buildSeats(): Seat[] {
  return [
    {
      id: "s01",
      label: "Founders",
      seatNumber: 1,
      seatLine: "Deciding alone, at speed, with your own money on it",
      lead: (
        <>
          You are the strategy department, the hiring committee and the finance function, usually
          before 11am. <b>The expensive mistakes are the ones you make confidently and alone.</b>
        </>
      ),
      situationBody:
        "The frameworks do not make the call. They force the question you were skipping — what would have to be true, what happens if this fails, what the customer actually buys — and hand back an answer structured enough to argue with.",
      startModules: seatModules([8, 2, 10]),
      openModuleHref: `/${moduleParam(8)}`,
      prompt: promptFor(8, "02"),
    },
    {
      id: "s02",
      label: "Managers",
      seatNumber: 2,
      seatLine: "Running conversations nobody trained you to run",
      lead: (
        <>
          Nobody prepared you for the 1-on-1 that goes sideways, the hire you are not sure about,
          or the process everyone quietly ignores. <b>You are improvising conversations that carry
          real consequences.</b>
        </>
      ),
      situationBody:
        "These modules move the part you rehearse in your head onto paper first: the questions to ask, the order to ask them in, and what to do with whatever comes back.",
      startModules: seatModules([6, 7, 4]),
      openModuleHref: `/${moduleParam(6)}`,
      prompt: promptFor(6, "03"),
    },
    {
      id: "s03",
      label: "Students",
      seatNumber: 3,
      seatLine: "Walking into a first job that assumes you are fluent",
      lead: (
        <>
          Knowing how to prompt is table stakes now.{" "}
          <b>What still separates people is whether they can frame a business question worth
          asking.</b>
        </>
      ),
      situationBody:
        "Every framework here is the reasoning a working manager applies, written down. It holds up in a case competition, a placement interview and your first month on the job, because the structure does not change.",
      startModules: seatModules([3, 1, 9]),
      openModuleHref: `/${moduleParam(3)}`,
      prompt: promptFor(3, "01"),
    },
    {
      id: "s04",
      label: "Teams",
      seatNumber: 4,
      seatLine: "Six people, six prompting habits, nothing that adds up",
      lead: (
        <>
          Ask three people on the same team to draft the same brief with AI and three documents
          come back sharing no structure, no depth and no assumptions.{" "}
          <b>Reviewing them costs more than writing them would have.</b>
        </>
      ),
      situationBody:
        "Fixing the input fixes the output. When everyone runs the same framework for the same job, drafts arrive in a shape you can read at a glance, argue with, and pass on without rewriting.",
      startModules: seatModules([2, 5, 7]),
      openModuleHref: `/${moduleParam(2)}`,
      prompt: promptFor(2, "01"),
    },
    {
      id: "s05",
      label: "Institutions",
      seatNumber: 5,
      seatLine: "Shelf space that has to earn itself every semester",
      lead: (
        <>
          A book about AI dates in eighteen months and gets quietly withdrawn.{" "}
          <b>A book students keep pulling down mid-assignment does not.</b>
        </>
      ),
      situationBody:
        "Every page here ends in something to run, which is why it stays in circulation. It sits alongside existing entrepreneurship and management coursework, and because each prompt lives on a page that can be corrected, the shelf copy stays accurate without a second edition.",
      startModules: seatModules([1, 2, 9]),
      openModuleHref: `/${moduleParam(1)}`,
      prompt: promptFor(1, "01"),
    },
  ];
}

/**
 * A 10-module x 5-seat overlap matrix. Which cells are "on" (and in which
 * seat's colour) is fixed layout data matching the seats above — not
 * derived from content/, since it encodes an editorial claim (which seats
 * start with which modules), same as the locked design.
 */
const MATRIX_MARKS: Record<number, ("f" | "m" | "s" | "tm" | "i")[]> = {
  1: ["s", "i"],
  2: ["f", "tm", "i"],
  3: ["s"],
  4: ["m"],
  5: ["tm"],
  6: ["m"],
  7: ["m", "tm"],
  8: ["f"],
  9: ["s", "i"],
  10: ["f"],
};
const MATRIX_COLUMNS: { key: "f" | "m" | "s" | "tm" | "i"; label: string; cls: string }[] = [
  { key: "f", label: "Founders", cls: styles.mxF },
  { key: "m", label: "Managers", cls: styles.mxM },
  { key: "s", label: "Students", cls: styles.mxS },
  { key: "tm", label: "Teams", cls: styles.mxTm },
  { key: "i", label: "Institutions", cls: styles.mxI },
];

export default function WhoItsForPage() {
  const modules = getAllModules();
  const seats = buildSeats();

  return (
    <main>
      {/* ============ HERO ============ */}
      <header className={styles.phero}>
        <div className={styles.bg} />
        <div className={styles.gridLines} />
        <div className={styles.scrim} />
        <div className={`pad ${styles.pheroIn}`}>
          <div className={styles.pheroCopy}>
            <div className={styles.crumb}>
              <Link href="/">Home</Link> <span>/</span> <span>Who it&rsquo;s for</span>
            </div>
            <h1 className={styles.phH}>Five seats at the table. The same 108 frameworks.</h1>
            <p className={styles.phSub}>
              What changes is where you start. Find the row that sounds like your week, open it,
              and you get three module numbers and one prompt you can run before lunch.
            </p>
            <div className={styles.phBtns}>
              <a className="btn btn-white" href="#index">
                Find your row
              </a>
              <Link className="btn btn-line" href="/#modules">
                See all 10 modules
              </Link>
            </div>
          </div>
          <div className={styles.pheroArt}>
            <svg viewBox="0 0 290 300" className="line" aria-hidden="true">
              <path className="s2" d="M18 34h254" />
              <text className="t" x="18" y="26" style={{ fontSize: 10, letterSpacing: "0.1em" }}>
                INDEX
              </text>
              <path className="s" d="M18 70h44" />
              <path className="s3" d="M70 70h150" />
              <text className="t" x="230" y="74">
                02 08 10
              </text>
              <path className="s2" d="M18 110h52" />
              <path className="s3" d="M78 110h142" />
              <text className="t" x="230" y="114">
                06 07 04
              </text>
              <path className="s2" d="M18 150h40" />
              <path className="s3" d="M66 150h154" />
              <text className="t" x="230" y="154">
                01 03 09
              </text>
              <path className="s2" d="M18 190h58" />
              <path className="s3" d="M84 190h136" />
              <text className="t" x="230" y="194">
                02 05 07
              </text>
              <path className="s2" d="M18 230h48" />
              <path className="s3" d="M74 230h146" />
              <text className="t" x="230" y="234">
                01 02 09
              </text>
              <circle className="fd" cx="12" cy="70" r="3.6" />
              <circle className="s2" cx="12" cy="110" r="3" />
              <circle className="s2" cx="12" cy="150" r="3" />
              <circle className="s2" cx="12" cy="190" r="3" />
              <circle className="s2" cx="12" cy="230" r="3" />
              <path className="s2" d="M18 268h254" />
              <text className="t" x="18" y="286" style={{ fontSize: 10, letterSpacing: "0.1em" }}>
                108 FRAMEWORKS · 10 MODULES
              </text>
            </svg>
          </div>
        </div>
      </header>

      {/* ============ THE INDEX ============ */}
      <section className="light" id="index" style={{ paddingTop: 58 }}>
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">The index</div>
              <h2 className="sh" style={{ maxWidth: "32ch" }}>
                Open the one that sounds like your week.
              </h2>
              <p className="sd" style={{ maxWidth: "84ch" }}>
                Each seat gives you the situation, the three modules to read first, and one real
                prompt from the first of them.
              </p>
            </div>
          </div>

          <SeatTabs seats={seats} />
        </div>
      </section>

      {/* ============ OVERLAP MAP ============ */}
      <section className="dark">
        <div className="pad">
          <div className={styles.headMid}>
            <div className="kicker">Where the rows overlap</div>
            <h2 className="sh">Five starting points. One book underneath them.</h2>
          </div>

          <div className={styles.mxIntro}>
            <p>
              Nobody gets a different edition — the five seats above are reading orders, not
              versions, and between them they touch every module in the book.{" "}
              <b>Module 02 turns up in three of the five:</b> designing the business is the
              question a founder, a team and a library all arrive at from different directions.
              Modules 01, 07 and 09 each appear twice.
            </p>
          </div>

          <div className={styles.mxWrap}>
            <div className={styles.mx}>
              <div className={`${styles.mxRow} ${styles.mxHead}`}>
                <span />
                <span>Module</span>
                {MATRIX_COLUMNS.map((c) => (
                  <span key={c.key}>{c.label}</span>
                ))}
              </div>
              {modules.map((m) => (
                <div className={styles.mxRow} key={m.module}>
                  <span className={styles.mxN}>{String(m.module).padStart(2, "0")}</span>
                  <span className={styles.mxT}>{m.title}</span>
                  {MATRIX_COLUMNS.map((c) => {
                    const on = MATRIX_MARKS[m.module]?.includes(c.key);
                    return (
                      <span
                        key={c.key}
                        className={`${styles.mxCell} ${on ? `${styles.mxCellOn} ${c.cls}` : ""}`}
                      >
                        <i />
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mxFoot}>
            <span>
              <i style={{ background: "var(--blue)" }} />
              Founders
            </span>
            <span>
              <i style={{ background: "var(--red)" }} />
              Managers
            </span>
            <span>
              <i style={{ background: "var(--green)" }} />
              Students
            </span>
            <span>
              <i style={{ background: "var(--yellow)" }} />
              Teams
            </span>
            <span>
              <i style={{ background: "#fff" }} />
              Institutions
            </span>
            <span style={{ marginLeft: "auto" }}>All 10 modules covered across the five</span>
          </div>
        </div>
      </section>

      {/* ============ BULK ============ */}
      <section className={styles.bulk} id="bulk">
        <div className={styles.bulkBg} />
        <div className={`pad ${styles.bulkIn}`}>
          <div>
            <div className="kicker">Teams and institutions</div>
            <h2>One copy per desk beats one copy per office.</h2>
            <p>
              The shared-language effect only works if everyone has the book open in front of
              them. Bulk and institutional orders are handled directly — tell us how many copies
              and where they are going.
            </p>
            <div className={styles.phBtns} style={{ marginBottom: 22 }}>
              <a className="btn btn-white" href="#">
                Request a quote
              </a>
              <a className="btn btn-line" href="#">
                Contact Raphy
              </a>
            </div>
            <div className={styles.facts}>
              <div className={styles.bfact}>
                <b>10+</b>
                <span>Copies, invoiced</span>
              </div>
              <div className={styles.bfact}>
                <b>276</b>
                <span>Pages each</span>
              </div>
              <div className={styles.bfact}>
                <b>108</b>
                <span>Frameworks</span>
              </div>
            </div>
          </div>
          <div className={styles.bulkArt}>
            <div className={styles.bulkArtBg} />
            <svg viewBox="0 0 290 240" className="line" aria-hidden="true">
              <rect className="s" x="24" y="66" width="42" height="120" rx="5" />
              <rect className="s" x="74" y="54" width="42" height="132" rx="5" />
              <rect className="s" x="124" y="72" width="42" height="114" rx="5" />
              <rect className="s2" x="174" y="60" width="42" height="126" rx="5" />
              <rect className="s2" x="224" y="78" width="42" height="108" rx="5" />
              <path className="s2" d="M34 96h22M84 86h22M134 102h22M184 90h22M234 108h22" />
              <path className="s" d="M14 202h262" />
              <circle className="fd" cx="95" cy="36" r="4" />
              <path className="s3" d="M95 42v8" />
            </svg>
          </div>
        </div>
      </section>

      <BuySection />
      <SubscribeSection />
    </main>
  );
}
