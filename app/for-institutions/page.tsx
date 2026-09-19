import Link from "next/link";
import type { Metadata } from "next";
import { getAllModules, getLesson } from "@/lib/content";
import { FOR_INSTITUTIONS_CONTENT as C } from "@/lib/pages-content";
import { Rich } from "@/components/RichText";
import { PromptPreviewCard } from "@/components/PromptPreviewCard";
import { ButtonLink } from "@/components/Button";
import { SubscribeSection } from "@/components/marketing/SubscribeSection";
import styles from "@/components/for-institutions/for-institutions.module.css";

export const metadata: Metadata = {
  title: "For Institutions — AI Operating System for Leaders",
  description:
    "A book built to be opened mid-assignment, not shelved after the first week — three shelf tests, and where the ten modules sit in a syllabus already being taught.",
};

const testColorClass: Record<string, string> = {
  blue: styles.tBlue,
  yellow: styles.tYellow,
  green: styles.tGreen,
};

export default function ForInstitutionsPage() {
  const modules = getAllModules();
  const mechLesson = getLesson(C.mechPromptRef.module, C.mechPromptRef.fileId);

  return (
    <main>
      <header className={styles.phero}>
        <div className={styles.bg} />
        <div className={styles.gridLines} />
        <div className={styles.scrim} />
        <div className={`pad ${styles.pheroIn}`}>
          <div className={styles.pheroCopy}>
            <div className={styles.crumb}>
              <Link href="/">Home</Link> <span>/</span> <span>{C.crumb}</span>
            </div>
            <h1 className={styles.phH}>{C.heroHeading}</h1>
            <p className={styles.phSub}>{C.heroSub}</p>
            <div className={styles.phBtns}>
              <ButtonLink variant="white" href={C.heroPrimaryCta.href}>
                {C.heroPrimaryCta.label}
              </ButtonLink>
              <ButtonLink variant="line" href={C.heroSecondaryCta.href}>
                {C.heroSecondaryCta.label}
              </ButtonLink>
            </div>
          </div>
          <div className={styles.pheroArt}>
            <svg viewBox="0 0 300 292" className="line" aria-hidden="true">
              <path className="s2" d="M26 40h248" />
              <rect className="s2" x="34" y="52" width="26" height="92" rx="3" />
              <rect className="s2" x="66" y="52" width="22" height="92" rx="3" />
              <rect className="s2" x="94" y="52" width="28" height="92" rx="3" />
              <rect className="s2" x="128" y="52" width="24" height="92" rx="3" />
              <rect className="s2" x="158" y="52" width="26" height="92" rx="3" />
              <rect className="s2" x="190" y="52" width="22" height="92" rx="3" />
              <rect className="s2" x="218" y="52" width="26" height="92" rx="3" />
              <rect className="s2" x="250" y="52" width="24" height="92" rx="3" />
              <path className="s" d="M26 152h248" />
              <text className="t" x="26" y="30" style={{ fontSize: 9, letterSpacing: "0.09em" }}>
                ON THE SHELF
              </text>
              <path className="s" d="M88 186c18-9 44-9 62 4v72c-18-13-44-13-62-4z" />
              <path className="s" d="M212 186c-18-9-44-9-62 4v72c18-13 44-13 62-4z" />
              <path className="s" d="M150 190v72" />
              <path className="s2" d="M102 208h30M102 220h21M168 208h30M168 220h23" />
              <rect className="s" x="166" y="224" width="20" height="20" rx="3" />
              <rect className="fd" x="170" y="228" width="5.5" height="5.5" rx="1" />
              <path className="s3" d="M150 158v20" />
              <circle className="fd" cx="150" cy="172" r="3.4" />
              <text className="t" x="84" y="286" style={{ fontSize: 9, letterSpacing: "0.09em" }}>
                IN SOMEONE&rsquo;S HANDS
              </text>
            </svg>
          </div>
        </div>
      </header>

      <section className="light" id="tests">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">{C.testsKicker}</div>
              <h2 className="sh">{C.testsHeading}</h2>
              <p className="sd">{C.testsSub}</p>
            </div>
          </div>
          {C.shelfTests.map((test) => (
            <div className={`${styles.test} ${testColorClass[test.colorKey]}`} key={test.tag}>
              <div className={styles.testQ}>
                <span className={styles.tn}>{test.tag}</span>
                <h3>{test.question}</h3>
                <p className={styles.usual}>{test.usual}</p>
              </div>
              <div className={styles.testA}>
                <h4 className={styles.alab}>What this one does instead</h4>
                {test.answer.map((para) => (
                  <p key={para}>
                    <Rich text={para} />
                  </p>
                ))}
                <div className={styles.ev}>
                  {test.evidence.map((chip) => (
                    <span className={styles.evchip} key={chip}>
                      <span className={styles.evDot} />
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dark">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">{C.mechKicker}</div>
              <h2 className="sh">{C.mechHeading}</h2>
            </div>
          </div>
          <div className={styles.mech}>
            <div>
              <p>
                <Rich text={C.mechP1} />
              </p>
              <p>
                <Rich text={C.mechP2} />
              </p>
              <div className={styles.seq}>
                {C.mechSteps.map((step, i) => (
                  <div className={styles.seqrow} key={step}>
                    <span className={styles.sn}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.st}>
                      <Rich text={step} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {mechLesson && (
              <PromptPreviewCard
                lessonId={mechLesson.lesson}
                title={mechLesson.title}
                moduleLabel={`Module ${String(C.mechPromptRef.module).padStart(2, "0")}`}
                prompt={mechLesson.prompt}
                pairsWith={mechLesson.pairsWith}
              />
            )}
          </div>
        </div>
      </section>

      <section className="wash" id="syllabus">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">{C.syllabusKicker}</div>
              <h2 className="sh">{C.syllabusHeading}</h2>
              <p className="sd">{C.syllabusSub}</p>
            </div>
            <ButtonLink variant="linedark" href="/#modules">
              Browse the modules
            </ButtonLink>
          </div>

          <div className={styles.sylWrap} tabIndex={0} role="region" aria-label="Modules mapped to course areas, scrollable table">
            <table className={styles.syl}>
              <caption>Each of the ten modules, the course area it sits alongside, and how many frameworks it contains.</caption>
              <thead>
                <tr>
                  <th scope="col">Module</th>
                  <th scope="col">Sits alongside</th>
                  <th scope="col" style={{ textAlign: "right" }}>
                    Frameworks
                  </th>
                </tr>
              </thead>
              <tbody>
                {modules.map((mod) => (
                  <tr key={mod.module}>
                    <td>
                      <span className={styles.sylMn}>{String(mod.module).padStart(2, "0")}</span>{" "}
                      <span className={styles.sylMt}>{mod.title}</span>
                    </td>
                    <td className={styles.sylCourse}>{C.courseByModule[mod.module]}</td>
                    <td className={styles.sylCnt}>{mod.lessons.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.sylNote}>{C.syllabusNote}</p>
        </div>
      </section>

      <section className="light">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">{C.editionKicker}</div>
              <h2 className="sh">{C.editionHeading}</h2>
            </div>
          </div>
          <div className={styles.ed}>
            <div>
              {C.editionParas.map((para) => (
                <p key={para}>
                  <Rich text={para} />
                </p>
              ))}
              <div className={styles.phBtns} style={{ marginTop: 22 }}>
                <ButtonLink variant="ink" href="#acquire">
                  Request a quote
                </ButtonLink>
                <ButtonLink variant="linedark" href="/how-to-use">
                  See how scanning works
                </ButtonLink>
              </div>
            </div>
            <div className={styles.edArt}>
              <div className={styles.edArtBg} />
              <svg viewBox="0 0 300 250" className="line" aria-hidden="true">
                <rect className="s" x="24" y="76" width="96" height="112" rx="7" />
                <path className="s2" d="M42 106h60M42 124h44M42 142h56" />
                <rect className="s" x="60" y="154" width="26" height="26" rx="4" />
                <rect className="fd" x="65" y="159" width="7" height="7" rx="1" />
                <text className="t" x="24" y="206" style={{ fontSize: 9, letterSpacing: "0.08em" }}>
                  PRINTED ONCE
                </text>
                <path className="s3" d="M132 132h30" />
                <path className="s" d="M152 124l10 8-10 8" />
                <rect className="s2" x="176" y="52" width="100" height="38" rx="7" />
                <text className="t" x="200" y="76">v1</text>
                <rect className="s2" x="176" y="102" width="100" height="38" rx="7" />
                <text className="t" x="200" y="126">v2</text>
                <rect className="s" x="176" y="152" width="100" height="38" rx="7" />
                <text className="t" x="200" y="176" style={{ opacity: 0.95 }}>v3 &mdash; current</text>
                <path className="s3" d="M226 90v12M226 140v12" />
                <circle className="fd" cx="188" cy="171" r="3.4" />
                <text className="t" x="176" y="212" style={{ fontSize: 9, letterSpacing: "0.08em" }}>
                  REWRITTEN AS NEEDED
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.acq} id="acquire">
        <div className={styles.acqBg} />
        <div className={styles.acqLines} />
        <div className={`pad ${styles.acqIn}`}>
          <div>
            <h2>{C.acquireHeading}</h2>
            <p>{C.acquireBody}</p>
            <div className={styles.acqFacts}>
              {C.acquireFacts.map((fact) => (
                <div className={styles.afact} key={fact.label}>
                  <b>{fact.value}</b>
                  <span>{fact.label}</span>
                </div>
              ))}
              <div className={styles.afact}>
                <b>{modules.reduce((sum, m) => sum + m.lessons.length, 0)}</b>
                <span>Frameworks</span>
              </div>
            </div>
          </div>
          <div className={styles.acqcard}>
            <h3>{C.acquireCardHeading}</h3>
            {C.acquireIncludes.map((item) => (
              <div className={styles.arow} key={item}>
                <span className={styles.ai}>
                  <svg className="i" width="16" height="16" viewBox="0 0 24 24">
                    <path d="M4 4.5h6.5a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H4z" />
                    <path d="M20 4.5h-5.5a2 2 0 0 0-2 2V20a2 2 0 0 1 2-2H20z" />
                  </svg>
                </span>
                <span>{item}</span>
              </div>
            ))}
            <ButtonLink variant="white" href="/contact" className={styles.fullBtn}>
              Request a quote
            </ButtonLink>
            <p className={styles.acqNote}>{C.acquireNote}</p>
          </div>
        </div>
      </section>

      <SubscribeSection placeholder="you@institution.edu" />
    </main>
  );
}
