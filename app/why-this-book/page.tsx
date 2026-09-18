import Link from "next/link";
import type { Metadata } from "next";
import { getAllModules, getLesson } from "@/lib/content";
import { PromptPreviewCard } from "@/components/PromptPreviewCard";
import { BuySection } from "@/components/marketing/BuySection";
import { SubscribeSection } from "@/components/marketing/SubscribeSection";
import styles from "@/components/why-this-book/why-this-book.module.css";

export const metadata: Metadata = {
  title: "Why This Book — AI Operating System for Leaders",
  description:
    "AI did not make you a better leader. A framework might. Why this book exists, and how it differs from every other book of prompts.",
};

const AUDIENCES = ["Founders", "Managers", "Students", "Teams", "Institutions"];

export default function WhyThisBookPage() {
  const modules = getAllModules();
  const insideLesson = getLesson(8, "02");

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
              <Link href="/">Home</Link> <span>/</span> <span>Why this book</span>
            </div>
            <h1 className={styles.phH}>AI did not make you a better leader. A framework might.</h1>
            <p className={styles.phSub}>
              Nearly everyone now has the same models on the same screen. The gap is no longer
              access — it is knowing what to ask, in what order, with what context attached.
            </p>
            <div className={styles.phBtns}>
              <a className="btn btn-white" href="#compare">
                See the difference
              </a>
              <a className="btn btn-line" href="#inside">
                What&rsquo;s inside
              </a>
            </div>
          </div>
          <div className={styles.pheroArt}>
            <svg viewBox="0 0 300 300" className="line" aria-hidden="true">
              <text className="t" x="16" y="22" style={{ fontSize: 10, letterSpacing: "0.1em" }}>
                ONE LINE
              </text>
              <rect className="s2" x="14" y="32" width="272" height="46" rx="12" />
              <path className="s2" d="M34 55c14-8 26 8 40 0s26 8 40 0 26 8 40 0" opacity={0.5} />
              <circle className="s2" cx="252" cy="55" r="11" />
              <path className="s2" d="M252 50v6M252 60v.5" />
              <path className="s3" d="M150 90v26" />
              <path className="s" d="M142 108l8 10 8-10" />
              <text className="t" x="16" y="144" style={{ fontSize: 10, letterSpacing: "0.1em" }}>
                FOUR LAYERS
              </text>
              <rect className="s" x="14" y="154" width="182" height="26" rx="8" />
              <text className="t" x="28" y="171">
                ROLE
              </text>
              <rect className="s" x="14" y="188" width="220" height="26" rx="8" />
              <text className="t" x="28" y="205">
                CONTEXT
              </text>
              <rect className="s" x="14" y="222" width="200" height="26" rx="8" />
              <text className="t" x="28" y="239">
                ACTION
              </text>
              <rect className="s" x="14" y="256" width="248" height="26" rx="8" />
              <text className="t" x="28" y="273">
                EXPECTATION
              </text>
              <path className="s3" d="M206 167h34M244 201h30M224 235h34M272 269h10" />
              <circle className="fd" cx="254" cy="167" r="3.2" />
              <circle className="fd" cx="284" cy="201" r="3.2" />
              <circle className="fd" cx="268" cy="235" r="3.2" />
            </svg>
          </div>
        </div>
      </header>

      {/* ============ THE PROBLEM ============ */}
      <section className="light" id="problem">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">The problem</div>
              <h2 className="sh" style={{ maxWidth: "32ch" }}>
                Three reasons AI quietly disappoints people.
              </h2>
            </div>
          </div>

          <div className={styles.alt}>
            <div className={styles.altCopy}>
              <div className={styles.num}>01</div>
              <h3>A blank box gives you back exactly what you put in.</h3>
              <p>
                Type &ldquo;write a marketing plan&rdquo; and you get a marketing plan for nobody
                — no industry, no stage, no constraint, no customer. It reads fine and is useless,
                which is the worst combination, because it takes a week to notice.
              </p>
              <p>The model is not guessing badly. It is guessing, because you did not tell it anything worth using.</p>
            </div>
            <div className={styles.altArt}>
              <div
                className={styles.artbg}
                style={{
                  background:
                    "radial-gradient(340px 260px at 30% 26%,#EC4A3B,transparent 62%),radial-gradient(300px 240px at 84% 82%,#3B7BF7,transparent 60%),#0B0C0F",
                }}
              />
              <svg viewBox="0 0 320 240" className="line" aria-hidden="true">
                <rect className="s" x="24" y="34" width="272" height="52" rx="12" />
                <path className="s2" d="M46 60h74" />
                <path className="s3" d="M128 60h6" />
                <rect className="s2" x="24" y="110" width="272" height="106" rx="12" />
                <path className="s2" d="M46 138h228M46 158h204M46 178h236M46 198h150" opacity={0.32} />
                <circle className="s" cx="258" cy="60" r="13" />
                <path className="s" d="M258 54v7M258 66.5v.5" />
              </svg>
            </div>
          </div>

          <div className={`${styles.alt} ${styles.altFlip} ${styles.altPlus}`}>
            <div className={styles.altCopy}>
              <div className={styles.num}>02</div>
              <h3>Everyone on the team prompts differently.</h3>
              <p>
                One person writes a paragraph, another writes five words, a third pastes a whole
                document. Three answers come back in three shapes, and none of them can be
                compared, reviewed or reused.
              </p>
              <p>Without a shared structure, AI makes a team faster at producing work that does not add up.</p>
            </div>
            <div className={styles.altArt}>
              <div
                className={styles.artbg}
                style={{
                  background:
                    "radial-gradient(340px 260px at 70% 24%,#FBBE10,transparent 60%),radial-gradient(300px 240px at 20% 84%,#2FAB57,transparent 60%),#0B0C0F",
                }}
              />
              <svg viewBox="0 0 320 240" className="line" aria-hidden="true">
                <circle className="s" cx="64" cy="58" r="17" />
                <rect className="s2" x="96" y="44" width="56" height="28" rx="8" />
                <path className="s2" d="M110 58h28" />
                <circle className="s" cx="64" cy="120" r="17" />
                <rect className="s2" x="96" y="98" width="128" height="44" rx="8" />
                <path className="s2" d="M110 114h96M110 130h62" />
                <circle className="s" cx="64" cy="186" r="17" />
                <rect className="s2" x="96" y="172" width="86" height="28" rx="8" />
                <path className="s2" d="M110 186h56" />
                <path className="s3" d="M246 40v164" />
                <path className="s2" d="M256 58h34M256 120h34M256 186h34" opacity={0.4} />
              </svg>
            </div>
          </div>

          <div className={`${styles.alt} ${styles.altPlus}`}>
            <div className={styles.altCopy}>
              <div className={styles.num}>03</div>
              <h3>What worked last year stops working.</h3>
              <p>
                Prompting technique moves faster than print. A book of prompts written today is
                partly wrong within a year, and the reader has no way of knowing which parts.
              </p>
              <p>That is a structural problem with books about software — and it is the one this book was designed around rather than ignored.</p>
            </div>
            <div className={styles.altArt}>
              <div
                className={styles.artbg}
                style={{
                  background:
                    "radial-gradient(340px 260px at 26% 70%,#3B7BF7,transparent 62%),radial-gradient(300px 240px at 82% 24%,#EC4A3B,transparent 60%),#0B0C0F",
                }}
              />
              <svg viewBox="0 0 320 240" className="line" aria-hidden="true">
                <rect className="s2" x="30" y="70" width="70" height="96" rx="10" />
                <text className="t" x="52" y="124" style={{ fontSize: 12 }}>
                  2024
                </text>
                <rect className="s2" x="118" y="70" width="70" height="96" rx="10" opacity={0.35} />
                <text className="t" x="140" y="124" style={{ fontSize: 12, opacity: 0.35 }}>
                  2025
                </text>
                <rect className="s" x="206" y="70" width="84" height="96" rx="10" />
                <text className="t" x="230" y="124" style={{ fontSize: 12, opacity: 0.95 }}>
                  NOW
                </text>
                <path className="s3" d="M106 118h6M194 118h6" />
                <path className="s" d="M248 52V34M226 58l-10-12M270 58l10-12" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATEMENT ============ */}
      <section className={styles.statement}>
        <div className={styles.statementLines} />
        <div className={`pad ${styles.statementIn}`}>
          <div>
            <blockquote>The prompt was never the hard part. The thinking behind it was.</blockquote>
            <p className={styles.statementAfter}>
              This book is 108 of those thoughts, written down in the order a business actually
              runs into them — each one ending in a prompt you can paste, not a principle you have
              to interpret.
            </p>
          </div>
          <div className={styles.statementArt}>
            <svg viewBox="0 0 280 300" className="line" aria-hidden="true">
              <path
                className="s"
                d="M196 96c0-44-36-74-78-74S40 52 40 96c0 22 8 34 8 52 0 14-10 18-10 28 0 8 10 10 10 10 0 14-4 18-4 26 0 12 14 20 34 20h30v-46"
              />
              <rect className="s" x="74" y="86" width="86" height="20" rx="6" />
              <text className="t" x="86" y="100">
                ROLE
              </text>
              <rect className="s" x="74" y="114" width="104" height="20" rx="6" />
              <text className="t" x="86" y="128">
                CONTEXT
              </text>
              <rect className="s" x="74" y="142" width="94" height="20" rx="6" />
              <text className="t" x="86" y="156">
                ACTION
              </text>
              <rect className="s2" x="74" y="170" width="116" height="20" rx="6" />
              <text className="t" x="86" y="184">
                EXPECTATION
              </text>
              <path className="s3" d="M196 130h40" />
              <path className="s" d="M226 122l10 8-10 8" />
              <rect className="s" x="196" y="196" width="72" height="62" rx="10" />
              <path className="s2" d="M210 216h44M210 230h30M210 244h38" />
              <path className="s3" d="M232 190v-46" />
              <circle className="fd" cx="232" cy="130" r="3.4" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============ BEFORE / AFTER ============ */}
      <section className="light" id="compare">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">The difference</div>
              <h2 className="sh" style={{ maxWidth: "32ch" }}>
                Same question. Same model. Two very different inputs.
              </h2>
              <p className="sd" style={{ maxWidth: "84ch" }}>
                A founder asking about positioning. On the left, the way most people ask. On the
                right, framework 1.1 from module one — and what each one gets back.
              </p>
            </div>
          </div>

          <div className={styles.compareWrap}>
            <span className={styles.vs}>VS</span>
            <div className={styles.compare}>
              <div className={`${styles.cc} ${styles.ccBad}`}>
                <div className={styles.ccH}>
                  <span className={styles.ccIc}>
                    <svg className="i" width="19" height="19" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                  </span>
                  <h3>Without a framework</h3>
                  <span className={styles.lbl}>Most people</span>
                </div>

                <div className={styles.stepLbl}>What you type</div>
                <div className={styles.mock}>How do I make my company stand out?</div>

                <div className={styles.stepLbl}>What comes back</div>
                <div className={styles.out}>
                  <div className={`${styles.ghost} ${styles.w1}`} />
                  <div className={`${styles.ghost} ${styles.w3}`} />
                  <div className={`${styles.ghost} ${styles.w2}`} />
                  <div className={`${styles.ghost} ${styles.w4}`} />
                  <div className={styles.verdict}>
                    <svg className="i" width="15" height="15" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                    Four paragraphs that would fit any company on earth
                  </div>
                </div>

                <ul className={styles.pts}>
                  <li>
                    <span className={styles.liIc}>
                      <svg className="i" width="11" height="11" viewBox="0 0 24 24" strokeWidth={3}>
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </span>
                    <span>No industry, stage or customer attached</span>
                  </li>
                  <li>
                    <span className={styles.liIc}>
                      <svg className="i" width="11" height="11" viewBox="0 0 24 24" strokeWidth={3}>
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </span>
                    <span>No format asked for, so you still have to process it</span>
                  </li>
                  <li>
                    <span className={styles.liIc}>
                      <svg className="i" width="11" height="11" viewBox="0 0 24 24" strokeWidth={3}>
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </span>
                    <span>Ask again tomorrow and you get something else</span>
                  </li>
                </ul>
              </div>

              <div className={`${styles.cc} ${styles.ccGood}`}>
                <div className={styles.ccH}>
                  <span className={styles.ccIc}>
                    <svg className="i" width="19" height="19" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M8.5 12.5l2.5 2.5 4.5-5.5" />
                    </svg>
                  </span>
                  <h3>With framework 1.1</h3>
                  <span className={styles.lbl}>C.A.R.E</span>
                </div>

                <div className={styles.stepLbl}>What you type</div>
                <div className={styles.mock}>
                  <span className={styles.mockK}>Role:</span>{"        "}Act as a{" "}
                  <span className={styles.mockV}>[B2B sales coach]</span>.{"\n"}
                  <span className={styles.mockK}>Context:</span>{"     "}I run{" "}
                  <span className={styles.mockV}>[a 9-person logistics SaaS]</span>.{"\n"}
                  <span className={styles.mockK}>Action:</span>{"      "}Give me 5 positioning ideas to stand out{"\n"}
                  {"             "}in <span className={styles.mockV}>[the South India mid-market]</span>.{"\n"}
                  <span className={styles.mockK}>Expectation:</span> Numbered list, 2–3 lines each, plain{"\n"}
                  {"             "}business language, no jargon.
                </div>

                <div className={styles.stepLbl}>What comes back</div>
                <div className={styles.out}>
                  <ol>
                    <li>
                      Own same-day dispatch visibility{" "}
                      <span>— the one metric their current vendor hides</span>
                    </li>
                    <li>
                      Price per shipment, not per seat <span>— matches how they already budget</span>
                    </li>
                    <li>
                      Position against spreadsheets, not rivals <span>— that is the real incumbent</span>
                    </li>
                  </ol>
                  <div className={styles.verdict}>
                    <svg className="i" width="15" height="15" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M8.5 12.5l2.5 2.5 4.5-5.5" />
                    </svg>
                    Five options you can argue about in a meeting on Monday
                  </div>
                </div>

                <ul className={styles.pts}>
                  <li>
                    <span className={styles.liIc}>
                      <svg className="i" width="11" height="11" viewBox="0 0 24 24" strokeWidth={3}>
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <span>Role and context attached, so the answer is about your business</span>
                  </li>
                  <li>
                    <span className={styles.liIc}>
                      <svg className="i" width="11" height="11" viewBox="0 0 24 24" strokeWidth={3}>
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <span>Format specified, so it arrives ready to act on</span>
                  </li>
                  <li>
                    <span className={styles.liIc}>
                      <svg className="i" width="11" height="11" viewBox="0 0 24 24" strokeWidth={3}>
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <span>Repeatable — your co-founder runs it and you can compare</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT MAKES IT DIFFERENT ============ */}
      <section className="dark">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">What makes it different</div>
              <h2 className="sh" style={{ maxWidth: "32ch" }}>
                A printed book that does not go out of date.
              </h2>
              <p className="sd" style={{ maxWidth: "84ch", color: "var(--fg-2)" }}>
                Four decisions that separate this from every other book of prompts on the shelf.
              </p>
            </div>
          </div>
          <div className={styles.diffs}>
            <div className={`${styles.diff} ${styles.cBlue}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
                  <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
                  <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
                  <path d="M17.25 13.5v7.5M13.5 17.25h7.5" />
                </svg>
              </span>
              <h3>Every page has a live twin</h3>
              <p>Scan the code on any framework and the current version of that prompt opens on your phone. The paper stays fixed; the prompt keeps moving.</p>
            </div>
            <div className={`${styles.diff} ${styles.cRed}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <path d="M12 3v7M12 10L6 20M12 10l6 10" />
                  <circle cx="12" cy="3" r="1.8" />
                  <circle cx="6" cy="20.5" r="2" />
                  <circle cx="18" cy="20.5" r="2" />
                </svg>
              </span>
              <h3>Organised by decision, not by topic</h3>
              <p>Chapters follow the order a business hits problems — strategy, model, market, sales, team, operations, money — so you read the one you need this week.</p>
            </div>
            <div className={`${styles.diff} ${styles.cYellow}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <path d="M4 7h16M4 12h16M4 17h9" />
                  <circle cx="18" cy="17" r="2" />
                </svg>
              </span>
              <h3>Frameworks that point at each other</h3>
              <p>Each one names the two or three it pairs with, so finishing a pricing question hands you the positioning question that follows it.</p>
            </div>
            <div className={`${styles.diff} ${styles.cGreen}`}>
              <span className={styles.diffIc}>
                <svg className="i" width="21" height="21" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="M7 9.5h6M7 13.5h4" />
                  <path d="M21 9l-4 3 4 3" />
                </svg>
              </span>
              <h3>The prompts are free, forever</h3>
              <p>No account, no paywall, no trial on the website. The book earns its price by explaining when to reach for which one — not by locking the text away.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INSIDE ============ */}
      <section className="wash" id="inside">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">What&rsquo;s inside</div>
              <h2 className="sh" style={{ maxWidth: "32ch" }}>
                Ten modules. 108 frameworks. 276 pages.
              </h2>
              <p className="sd" style={{ maxWidth: "84ch" }}>
                Every framework follows the same shape: what it is, when to use it, the prompt,
                and what it pairs with next.
              </p>
            </div>
            <Link className="btn btn-ink" href="/#modules">
              Browse all modules
            </Link>
          </div>
          <div className={styles.inside}>
            <div className={styles.modlist}>
              {modules.map((m) => (
                <div className={styles.modrow} key={m.module}>
                  <span className={styles.mn}>{String(m.module).padStart(2, "0")}</span>
                  <span className={styles.mt}>{m.title}</span>
                  <span className={styles.mc}>{m.lessons.length}</span>
                </div>
              ))}
            </div>
            <div>
              {insideLesson && (
                <PromptPreviewCard
                  lessonId={insideLesson.lesson}
                  title={insideLesson.title}
                  moduleLabel={`Module ${String(insideLesson.module).padStart(2, "0")}`}
                  prompt={insideLesson.prompt}
                  pairsWith={insideLesson.pairsWith}
                />
              )}
              <p className="sd" style={{ marginTop: 16, fontSize: 13 }}>
                This is one page of the book, and the page its QR code opens. Both say the same
                thing today. Only one of them can be corrected next year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AUTHOR STRIP — draft copy, see DECISIONS.md ============ */}
      <section className={styles.astrip}>
        <div className={styles.astripBg} />
        <div className={`pad ${styles.astripIn}`}>
          <span className={styles.av}>RV</span>
          <div className={styles.q}>
            <blockquote>
              &ldquo;I wrote the book I kept trying to find — the one that answers the question I
              am actually stuck on, on the day I am stuck on it.&rdquo;
            </blockquote>
            <p>
              Most business books are read once and shelved. This one was built to be scanned at
              a desk, mid-problem, with the model already open in the next tab. Every framework
              had to earn its page by being something I would reach for again.
            </p>
            <p>
              The QR codes are not a gimmick. They are how the printed version stays honest —
              when a technique changes, the page behind the code changes with it, and nobody has
              to buy a second edition.
            </p>
            <div className={styles.astripMeta}>
              <span className={styles.nm}>
                <b>Raphy Varghese</b>
                <span>Author, AI Operating System for Leaders</span>
              </span>
              <a className="btn btn-line" href="#">
                Read the full story
              </a>
            </div>
            <p className={styles.draftNote}>Draft copy — rewrite in your own words before launch.</p>
          </div>
        </div>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="light">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">Who it&rsquo;s for</div>
              <h2 className="sh" style={{ maxWidth: "32ch" }}>
                If you make decisions for a living, it was written for you.
              </h2>
              <p className="sd" style={{ maxWidth: "84ch" }}>
                Five groups get the most out of it. Each has its own page with the modules that
                matter first.
              </p>
            </div>
          </div>
          <div className={styles.chips}>
            {AUDIENCES.map((a) => (
              <Link className={styles.chipLink} href="/who-its-for" key={a}>
                {a}
                <svg className="i" width="15" height="15" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BuySection />
      <SubscribeSection />
    </main>
  );
}
