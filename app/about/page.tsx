import Link from "next/link";
import type { Metadata } from "next";
import { getAboutContent } from "@/lib/about";
import { ABOUT_CONTENT as C } from "@/lib/pages-content";
import { getLessonV2, fileIdFor, moduleParam } from "@/lib/content-v2";
import { Rich } from "@/components/RichText";
import { ButtonLink } from "@/components/Button";
import { SubscribeSection } from "@/components/marketing/SubscribeSection";
import styles from "@/components/about/about.module.css";

export const metadata: Metadata = {
  title: "About Raphy Varghese — AI Operating System for Leaders",
  description:
    "Why Raphy Varghese wrote AI Operating System for Leaders, who he wrote it for, and what he means by a framework — in his own words, from the book.",
};

// The demo section's cross-link target (Framework 2.7 — Pricing Strategy,
// Value Ladder) is resolved through the same lib/content-v2 helpers every
// other page uses, never hardcoded, so it can't silently drift from the
// real lesson data. Failing the build here is the point: if 2.7 ever moves
// or is renumbered, this page should not ship a dead cross-link.
const FRAMEWORK_MODULE = 2;
const FRAMEWORK_FILE_ID = fileIdFor("2.7");
if (!getLessonV2(FRAMEWORK_MODULE, FRAMEWORK_FILE_ID)) {
  throw new Error("about page's Framework 2.7 cross-link target is missing from content-v2");
}
const lessonHref = `/${moduleParam(FRAMEWORK_MODULE)}/${FRAMEWORK_FILE_ID}`;

export default function AboutPage() {
  const a = getAboutContent();

  return (
    <main>
      <header className={styles.ahero}>
        <div className={styles.bg} />
        <div className={styles.gridLines} />
        <div className={styles.scrim} />
        <div className={`pad ${styles.aheroIn}`}>
          <div>
            <p className={styles.crumb}>
              <Link href="/">Home</Link> <span>/</span> <span>{C.crumb}</span>
            </p>
            <h1 className={styles.aq}>{a.quote}</h1>
            <div className={styles.aplate}>
              <span className={styles.av}>RV</span>
              <span className={styles.nm}>
                <b>Raphy Varghese</b>
                <span>{a.byline}</span>
              </span>
            </div>
          </div>
          <div className={styles.aheroArt}>
            <svg viewBox="0 0 260 215" className="line" aria-hidden="true">
              <rect className="s2" x="18" y="150" width="224" height="2" rx="1" />
              <path className="s" d="M58 96c14-8 34-8 50 4v54c-16-12-36-12-50-5z" />
              <path className="s" d="M164 96c-14-8-34-8-50 4v54c16-12 36-12 50-5z" />
              <path className="s" d="M114 100v54" />
              <path className="s2" d="M72 116h26M72 128h18M126 116h26M126 128h20" />
              <rect className="s" x="126" y="136" width="18" height="18" rx="3" />
              <rect className="fd" x="129.5" y="139.5" width="5" height="5" rx="1" />
              <path className="s3" d="M114 60v24" />
              <circle className="fd" cx="114" cy="74" r="3.2" />
              <circle className="s" cx="114" cy="38" r="11" />
              <path className="s" d="M96 62c0-9.4 8-15 18-15s18 5.6 18 15" />
              <text className="t" x="18" y="178" style={{ letterSpacing: "0.09em" }}>
                ONE PERSON
              </text>
              <text className="t" x="18" y="194" style={{ letterSpacing: "0.09em" }}>
                EVERY PROBLEM IN THIS BOOK
              </text>
            </svg>
          </div>
        </div>
      </header>

      {/* the demonstration the book opens with */}
      <section className="wash" id="demo">
        <div className="pad">
          <div className="head-row">
            <div>
              <p className="kicker">{C.demoKicker}</p>
              <h2 className="sh">{C.demoHeading}</h2>
              <p className="sd">{C.demoSub}</p>
            </div>
          </div>
          <div className={styles.vs}>
            <div className={`${styles.vsc} ${styles.vscNo}`}>
              <h3>
                <svg className="i" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 7l10 10M17 7L7 17" />
                </svg>
                {C.withoutLabel}
              </h3>
              <p className={styles.said}>{a.without}</p>
              <p className={styles.res}>{a.withoutResult}</p>
              <span className={styles.tag}>{C.withoutTag}</span>
            </div>
            <div className={`${styles.vsc} ${styles.vscYes}`}>
              <h3>
                <svg className="i" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {C.withLabel}
              </h3>
              <p className={styles.said}>{a.with}</p>
              <p className={styles.res}>{a.withResult}</p>
              <Link className={styles.tag} href={lessonHref}>
                Framework {a.withFramework}
              </Link>
            </div>
          </div>
          <div className={styles.rule}>
            <span className={styles.rk}>{C.ruleKicker}</span>
            <p>
              {C.ruleLead} <span>{C.ruleHighlight}</span> {C.ruleTrail}
            </p>
          </div>
        </div>
      </section>

      {/* the four parts */}
      <section className="light" id="parts">
        <div className="pad">
          <div className="head-row">
            <div>
              <p className="kicker">{C.partsKicker}</p>
              <h2 className="sh">{C.partsHeading}</h2>
            </div>
          </div>

          <div className={styles.part}>
            <div className={styles.partH}>
              <span className={styles.pn}>01</span>
              <h2>{C.part1Label}</h2>
              <span className={styles.pf}>{C.part1Page}</span>
            </div>
            <div className={styles.partG}>
              <div className={styles.voice}>
                <p>{a.story[0]}</p>
                <p className={styles.attr}>{C.attribution}</p>
              </div>
              <div className={`${styles.partArt} ${styles.a1}`}>
                <div className={styles.abg} />
                <svg viewBox="0 0 240 190" className="line" aria-hidden="true">
                  <path className="s" d="M34 124h172" />
                  <path className="s" d="M52 124v42M188 124v42" />
                  <path className="s2" d="M62 124v-6a10 10 0 0 1 10-10h18a10 10 0 0 1 10 10v6" />
                  <path className="s2" d="M72 108V80a10 10 0 0 1 10-10h0a10 10 0 0 1 10 10v28" />
                  <path className="s2" d="M62 166v-42M100 166v-42" />
                  <path className="s3" d="M140 112h44M140 96h36" />
                  <text className="t" x="34" y="56" style={{ letterSpacing: "0.09em" }}>
                    ONE CHAIR
                  </text>
                  <text className="t" x="140" y="76" style={{ letterSpacing: "0.09em" }}>
                    NO SECOND ONE
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.part}>
            <div className={styles.partH}>
              <span className={styles.pn}>02</span>
              <h2>{C.part2Label}</h2>
              <span className={styles.pf}>{C.part2Page}</span>
            </div>
            <p className={styles.mine} style={{ marginTop: 0, marginBottom: 22 }}>
              <Rich text={C.part2Intro} />
            </p>
            <div className={styles.whos}>
              {a.who.map((w) => (
                <div className={styles.whoc} key={w.who}>
                  <span className={styles.wd} />
                  <div>
                    <h3>{w.who}</h3>
                    <p>{w.what}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.part}>
            <div className={styles.partH}>
              <span className={styles.pn}>03</span>
              <h2>{C.part3Label}</h2>
              <span className={styles.pf}>{C.part3Page}</span>
            </div>
            <div className={styles.partG}>
              <div className={styles.voice}>
                <p>{a.story[2]}</p>
                <p>{a.notAboutAI}</p>
                <p className={styles.attr}>{C.attribution}</p>
              </div>
              <div className={`${styles.partArt} ${styles.a3}`}>
                <div className={styles.abg} />
                <svg viewBox="0 0 240 190" className="line" aria-hidden="true">
                  <circle className="s2" cx="58" cy="52" r="12" />
                  <path className="s2" d="M38 96c0-11 9-18 20-18s20 7 20 18" />
                  <circle className="s" cx="162" cy="52" r="12" />
                  <path className="s" d="M142 96c0-11 9-18 20-18s20 7 20 18" />
                  <path className="s" d="M186 62l14-14M200 48l-6-2 2 6" />
                  <path className="s3" d="M92 74h40" />
                  <path className="s" d="M124 66l8 8-8 8" />
                  <text className="t" x="30" y="128" style={{ letterSpacing: "0.09em" }}>
                    SAME TALENT
                  </text>
                  <text className="t" x="138" y="128" style={{ letterSpacing: "0.09em" }}>
                    BETTER TOOLS
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.part}>
            <div className={styles.partH}>
              <span className={styles.pn}>04</span>
              <h2>{C.part4Label}</h2>
              <span className={styles.pf}>{C.part4Page}</span>
            </div>
            <div className={styles.partG}>
              <div className={styles.proof}>
                <h3>{C.proofHeading}</h3>
                <p className={styles.said}>{a.story[3]}</p>
                <span className={styles.proofTag}>{C.proofTag}</span>
              </div>
              <div>
                <p className={styles.mine} style={{ marginTop: 0 }}>
                  <Rich text={C.proofResponse} />
                </p>
                <p style={{ marginTop: 16 }}>
                  <Link className={styles.inlink} href="/modules">
                    {C.proofLinkLabel} →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* the mission */}
      <section className="wash" id="mission">
        <div className={`pad ${styles.misIn}`}>
          <div>
            <p className="kicker">{C.missionKicker}</p>
            <h2>{a.whatSeparates}</h2>
            <p>{a.mission}</p>
            <p className={styles.gapline}>
              <b>{a.gap}</b>
            </p>
          </div>
          <div className={styles.misfacts}>
            <div className={styles.mf2}>
              <span>{C.missFactBook}</span>
              <b>{C.missFactBookValue}</b>
            </div>
            <div className={styles.mf2}>
              <span>{C.missFactFrameworks}</span>
              <b>{C.missFactFrameworksValue}</b>
            </div>
            <div className={styles.mf2}>
              <span>{C.missFactPrompt}</span>
              <b>{C.missFactPromptValue}</b>
            </div>
            <div className={styles.mf2}>
              <span>{C.missFactReach}</span>
              <b>
                <Link className={styles.inlink} href="/contact">
                  Contact
                </Link>
              </b>
            </div>
          </div>
        </div>
      </section>

      {/* the close */}
      <section className={styles.close}>
        <div className={styles.closeBg} />
        <div className={styles.closeScrim} />
        <div className={`pad ${styles.closeIn}`}>
          <div>
            <p className="kicker">{C.closeKicker}</p>
            <h2>&ldquo;{a.story[4]}&rdquo;</h2>
            <p>
              <Rich text={C.closeBody} />
            </p>
            <div className={styles.cbtns}>
              <ButtonLink variant="white" href="/modules">
                {C.closeCtaPrimary}
              </ButtonLink>
              <ButtonLink variant="line" href="/why-this-book">
                {C.closeCtaSecondary}
              </ButtonLink>
            </div>
          </div>
          <div className={styles.closeArt}>
            <svg viewBox="0 0 260 190" className="line" aria-hidden="true">
              <path className="s" d="M30 58c14-8 34-8 48 4v56c-15-12-34-12-48-5z" />
              <path className="s" d="M126 58c-14-8-34-8-48 4v56c15-12 34-12 48-5z" />
              <path className="s" d="M78 62v56" />
              <path className="s2" d="M42 76h24M42 88h17M90 76h24M90 88h19" />
              <rect className="s" x="90" y="96" width="17" height="17" rx="3" />
              <rect className="fd" x="93" y="99" width="5" height="5" rx="1" />
              <path className="s3" d="M140 86h26" />
              <path className="s" d="M160 78l8 8-8 8" />
              <circle className="s" cx="196" cy="58" r="10" />
              <path className="s" d="M180 84c0-8.6 7.2-14 16-14s16 5.4 16 14" />
              <circle className="s2" cx="228" cy="70" r="8" />
              <path className="s2" d="M215 92c0-7 5.8-11.5 13-11.5s13 4.5 13 11.5" />
              <circle className="s2" cx="176" cy="102" r="8" />
              <path className="s2" d="M163 124c0-7 5.8-11.5 13-11.5s13 4.5 13 11.5" />
              <text className="t" x="30" y="146" style={{ letterSpacing: "0.09em" }}>
                PRINTED ONCE
              </text>
              <text className="t" x="166" y="146" style={{ letterSpacing: "0.09em" }}>
                HANDED OUT
              </text>
            </svg>
          </div>
        </div>
      </section>

      <SubscribeSection
        subtext="A prompt worth running and the decision it is meant for. Nothing else."
        placeholder="you@example.com"
        note="The mailing list is connected before launch — like the form above, nothing here is stored yet."
      />
    </main>
  );
}
