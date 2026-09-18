import Link from "next/link";
import type { Metadata } from "next";
import { getLesson } from "@/lib/content";
import { CopyButton } from "@/components/CopyButton";
import { SubscribeSection } from "@/components/marketing/SubscribeSection";
import { ScanDemo } from "@/components/how-to-use/ScanDemo";
import { BracketCard } from "@/components/how-to-use/BracketCard";
import { TroubleAccordion } from "@/components/how-to-use/TroubleAccordion";
import styles from "@/components/how-to-use/how-to-use.module.css";

export const metadata: Metadata = {
  title: "How To Use — AI Operating System for Leaders",
  description:
    "Scan the page. Copy the prompt. Run it. Three moves, under ten seconds, for every one of the book's 108 frameworks.",
};

/**
 * Same real lesson 1.1 prompt the scan demo and bracket card teach with —
 * trimmed at the manuscript-extraction boundary where the diagram caption
 * and pro-tip text begin, so the demo shows the actual paste-ready prompt
 * rather than the OCR'd page furniture around it. See DECISIONS.md.
 */
function corePrompt(fullPrompt: string): string {
  const marker = "CRAFTING EFFECTIVE AI PROMPTS";
  const idx = fullPrompt.indexOf(marker);
  return idx === -1 ? fullPrompt : fullPrompt.slice(0, idx).trimEnd();
}

const BRACKET_FILLS = [
  "B2B sales coach",
  "a 9-person logistics SaaS in Kochi, 14 months in",
  "Give me 5 positioning ideas to differentiate in the South India mid-market",
];

export default function HowToUsePage() {
  const lesson = getLesson(1, "01");
  const demoPrompt = lesson ? corePrompt(lesson.prompt) : "";

  return (
    <main>
      {/* ============ HERO: LESSON 0.0 AS A SPREAD ============ */}
      <header className={styles.spreadHero}>
        <div className={styles.bg} />
        <div className={styles.gridLines} />
        <div className={styles.scrim} />
        <div className="pad">
          <div className={styles.heroTop}>
            <div className={styles.crumb}>
              <Link href="/">Home</Link> <span>/</span> <span>How to use</span>
            </div>
            <span className="meta">Written in the same shape as every framework in the book</span>
          </div>

          <div className={styles.spread}>
            <div className={`${styles.page} ${styles.pageLeft}`}>
              <div className={styles.run}>
                <span>AI Operating System for Leaders</span>
                <b>Page 0</b>
              </div>
              <span className={styles.lessonTag}>
                0.0 <span style={{ color: "var(--gray-l2)" }}>—</span> How to use this book
              </span>
              <h1>Scan the page. Copy the prompt. Run it.</h1>

              <div className={styles.fwLbl}>What it is</div>
              <p>
                Every framework in this book ends with a QR code. The code opens that
                framework&rsquo;s prompt on your phone, already expanded, with a copy button — so
                the paper explains the thinking and the screen hands you the tool.
              </p>

              <div className={styles.fwLbl}>When to use it</div>
              <p>
                The moment a chapter names the decision you are actually facing. Do not read ahead
                to collect prompts; scan the one you need, run it, and come back for the next when
                the next problem arrives.
              </p>

              <div className={styles.also}>
                <a className="btn btn-ink" href="#moves">
                  The four moves
                </a>
                <a className="btn btn-linedark" href="#brackets">
                  What the brackets mean
                </a>
              </div>
            </div>

            <div className={`${styles.page} ${styles.pageRight}`}>
              <div className={styles.run}>
                <span>Try it here</span>
                <b>Page 1</b>
              </div>
              <ScanDemo prompt={demoPrompt} />
            </div>
          </div>
        </div>
      </header>

      {/* ============ THE THREE MOVES ============ */}
      <section className="light" id="moves">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className={styles.fwKicker}>How it works</div>
              <h2 className="sh" style={{ maxWidth: "30ch" }}>
                Three moves. Under ten seconds.
              </h2>
              <p className="sd" style={{ maxWidth: "84ch" }}>
                The same three every time, for every one of the 108 frameworks. Nothing to set up
                first.
              </p>
            </div>
          </div>
          <div className={styles.flow}>
            <div className={styles.mv}>
              <div
                className={styles.mvArt}
                style={{
                  background:
                    "radial-gradient(260px 150px at 30% 40%,#3B7BF7,transparent 62%),radial-gradient(220px 150px at 82% 76%,#6EA0FF,transparent 60%),#0B0C0F",
                }}
              >
                <svg viewBox="0 0 160 104" className="line" aria-hidden="true">
                  <rect className="s" x="12" y="14" width="60" height="76" rx="5" />
                  <rect className="s" x="24" y="26" width="22" height="22" rx="3" />
                  <rect className="fd" x="31" y="33" width="8" height="8" />
                  <path className="s2" d="M24 62h36M24 74h24" />
                  <rect className="s" x="98" y="8" width="50" height="88" rx="10" />
                  <path className="s2" d="M116 20h14" />
                  <path className="s3" d="M76 52h18" />
                  <path className="s" d="M90 46l6 6-6 6" />
                </svg>
              </div>
              <h3>Point the camera at the code</h3>
              <p>The one printed at the end of the framework. Your phone&rsquo;s own camera reads it.</p>
            </div>
            <div className={styles.arrow} aria-hidden="true">
              <svg className="i" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
            <div className={styles.mv}>
              <div
                className={styles.mvArt}
                style={{
                  background:
                    "radial-gradient(260px 150px at 70% 30%,#2FAB57,transparent 62%),radial-gradient(220px 150px at 22% 80%,#3B7BF7,transparent 60%),#0B0C0F",
                }}
              >
                <svg viewBox="0 0 160 104" className="line" aria-hidden="true">
                  <rect className="s" x="54" y="6" width="52" height="92" rx="10" />
                  <rect className="s2" x="64" y="20" width="32" height="7" rx="3.5" />
                  <rect className="s" x="64" y="36" width="32" height="10" rx="3" />
                  <path className="s2" d="M64 56h32M64 66h20M64 76h26" />
                  <path className="s3" d="M14 52h28" />
                  <path className="s" d="M32 46l6 6-6 6" />
                  <path className="s3" d="M118 52h28" opacity={0.35} />
                </svg>
              </div>
              <h3>The prompt is already open</h3>
              <p>That exact framework, expanded, at the top of the screen. The rest of the module waits below it.</p>
            </div>
            <div className={styles.arrow} aria-hidden="true">
              <svg className="i" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
            <div className={styles.mv}>
              <div
                className={styles.mvArt}
                style={{
                  background:
                    "radial-gradient(260px 150px at 30% 30%,#FBBE10,transparent 60%),radial-gradient(220px 150px at 82% 80%,#EC4A3B,transparent 62%),#0B0C0F",
                }}
              >
                <svg viewBox="0 0 160 104" className="line" aria-hidden="true">
                  <rect className="s" x="14" y="22" width="76" height="60" rx="10" />
                  <path className="s2" d="M28 40h48M28 52h30M28 64h40" />
                  <rect className="s" x="104" y="40" width="42" height="24" rx="12" />
                  <path className="s" d="M114 52h8M126 52h10" opacity={0.8} />
                  <path className="s" d="M92 52h8" opacity={0.5} />
                </svg>
              </div>
              <h3>Copy, fill the brackets, run it</h3>
              <p>One tap copies. Paste into ChatGPT, Claude, Gemini or Copilot and swap in your own situation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE BRACKETS ============ */}
      <section className="wash" id="brackets">
        <div className="pad">
          <div className={styles.brkGrid}>
            <div className={styles.brkCopy}>
              <div className={styles.fwKicker}>The brackets</div>
              <h3>Anything in square brackets is yours to replace.</h3>
              <p>
                That substitution is the entire reason the answer stops sounding generic. Tap
                each bracket in the prompt to see it filled in for an example founder — then do
                the same with yours.
              </p>
              <div className={styles.rules}>
                <div className={styles.rule}>
                  <span className={styles.ruleN}>
                    <svg className="i" width="12" height="12" viewBox="0 0 24 24" strokeWidth={3}>
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <span>
                    <b>Be specific, not long</b>
                    <span>&ldquo;A 9-person logistics SaaS in Kochi&rdquo; beats &ldquo;my company&rdquo;. One phrase is enough.</span>
                  </span>
                </div>
                <div className={styles.rule}>
                  <span className={styles.ruleN}>
                    <svg className="i" width="12" height="12" viewBox="0 0 24 24" strokeWidth={3}>
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <span>
                    <b>Keep the words outside the brackets</b>
                    <span>They are doing work — the role, the format, the tone. Change only what is inside.</span>
                  </span>
                </div>
                <div className={styles.rule}>
                  <span className={styles.ruleN}>
                    <svg className="i" width="12" height="12" viewBox="0 0 24 24" strokeWidth={3}>
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <span>
                    <b>Nested brackets fill inside out</b>
                    <span>
                      The Action line has one: fill{" "}
                      <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 12 }}>[MARKET / REGION]</span>{" "}
                      first, then the bracket around it.
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {lesson && (
              <BracketCard lessonId="1.1" title="C.A.R.E Prompting" prompt={demoPrompt} fills={BRACKET_FILLS} />
            )}
          </div>
        </div>
      </section>

      {/* ============ THE HELPER PROMPT ============ */}
      <section className="dark">
        <div className="pad">
          <div className={styles.helper}>
            <div>
              <div className={`${styles.fwKicker} ${styles.darkFwKicker}`} style={{ marginBottom: 12 }}>
                The prompt
              </div>
              <span className={styles.helperNote}>
                <i /> Site-only — not printed in the book
              </span>
              <h3>Not sure what to put in a bracket? Ask the AI to ask you.</h3>
              <p>
                Paste this once at the start of a session. From then on, every framework prompt
                you paste after it gets interviewed out of you, one bracket at a time, before it
                runs.
              </p>
              <div className={styles.aiRow}>
                <span className={styles.aiChip}>
                  <i /> ChatGPT
                </span>
                <span className={styles.aiChip}>
                  <i /> Claude
                </span>
                <span className={styles.aiChip}>
                  <i /> Gemini
                </span>
                <span className={styles.aiChip}>
                  <i /> Copilot
                </span>
              </div>
            </div>
            <div className={styles.brkCard}>
              <div className={styles.pcTop}>
                <span className={styles.pcTag}>0.0</span>
                <span className={styles.pcTtl}>Bracket interview</span>
                <span className={styles.pcUp}>helper</span>
              </div>
              <div className={styles.pcBody}>
                For the rest of this conversation, whenever I paste a prompt that contains text in
                [SQUARE BRACKETS], do not run it yet.
                {"\n\n"}
                First, ask me one question per bracket, in order, so I can fill each with my real
                situation. Keep every question to one line.
                {"\n\n"}
                When all brackets are filled, show me the completed prompt once, then run it.
              </div>
              <div className={styles.pcFoot}>
                <span className={styles.pcFootSt}>Plain language · works in any model</span>
                <span className={styles.pcFootActions}>
                  <CopyButton
                    text={
                      "For the rest of this conversation, whenever I paste a prompt that contains text in [SQUARE BRACKETS], do not run it yet.\n\nFirst, ask me one question per bracket, in order, so I can fill each with my real situation. Keep every question to one line.\n\nWhen all brackets are filled, show me the completed prompt once, then run it."
                    }
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PAIRS WITH ============ */}
      <section className="wash">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className={styles.fwKicker}>Pairs with</div>
              <h2 className="sh" style={{ maxWidth: "30ch" }}>
                Where to go once you have run your first one.
              </h2>
            </div>
          </div>
          <div className={styles.pairs}>
            <Link className={`${styles.pair} ${styles.pairBlue}`} href="/#modules">
              <span className={styles.pn}>Modules 01–10</span>
              <h3>Browse every framework</h3>
              <p>All 108, grouped by the decision they help with. Read the one on fire this week; ignore the rest until they are.</p>
              <span className={styles.pairGo}>
                Open the modules
                <svg className="i" width="14" height="14" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
            <Link className={`${styles.pair} ${styles.pairInk}`} href="/why-this-book">
              <span className={styles.pn}>Why this book</span>
              <h3>See what a framework changes</h3>
              <p>The same question asked two ways, side by side, with what each one gets back from the model.</p>
              <span className={styles.pairGo}>
                See the difference
                <svg className="i" width="14" height="14" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
            <Link className={`${styles.pair} ${styles.pairWhite}`} href="/who-its-for">
              <span className={styles.pn}>Who it&rsquo;s for</span>
              <h3>Start with your seat</h3>
              <p>Founders, managers, students, teams, institutions — each has a page naming the three modules to read first.</p>
              <span className={styles.pairGo}>
                Find your page
                <svg className="i" width="14" height="14" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ IF SOMETHING GOES WRONG ============ */}
      <section className="light" id="trouble">
        <div className="pad">
          <div className={styles.faqGrid}>
            <div>
              <div className={styles.faqArt}>
                <div className={styles.faqArtBg} />
                <svg viewBox="0 0 240 200" className="line" aria-hidden="true">
                  <rect className="s" x="40" y="30" width="112" height="140" rx="10" />
                  <rect className="s" x="58" y="48" width="36" height="36" rx="4" />
                  <rect className="fd" x="70" y="60" width="12" height="12" />
                  <path className="s2" d="M58 100h76M58 116h56M58 132h68" />
                  <circle className="s" cx="188" cy="60" r="22" />
                  <path className="s" d="M188 50v12M188 69v.5" />
                  <path className="s3" d="M158 60h8" />
                </svg>
              </div>
              <div className={styles.fwKicker}>If something goes wrong</div>
              <h2 className="sh" style={{ maxWidth: "30ch" }}>
                The five things that actually come up.
              </h2>
              <p className="sd" style={{ maxWidth: "84ch" }}>
                Anything else, the contact form reaches Raphy directly.
              </p>
              <a className="btn btn-linedark" href="#" style={{ marginTop: 20 }}>
                Contact
              </a>
            </div>
            <TroubleAccordion />
          </div>
        </div>
      </section>

      {/* ============ SIGN-UP ============ */}
      <section className={styles.signup}>
        <div className={styles.signupBg} />
        <div className={`pad ${styles.signupIn}`}>
          <span className={styles.signupIc}>
            <svg className="i" width="27" height="27" viewBox="0 0 24 24">
              <path d="M19 21V10l-7-6-7 6v11" />
              <path d="M9 21v-7h6v7" />
              <path d="M15.5 3.5l3 3M18.5 3.5l-3 3" />
            </svg>
          </span>
          <div className={styles.signupTxt}>
            <h3>Copying is free. An account keeps them.</h3>
            <p>
              Save any prompt to your own list, pick up on another device, and send a colleague a
              link with your name on it. No card, no trial, no paywall on the prompts themselves.
            </p>
          </div>
          <div className={styles.signupCta}>
            <a className="btn btn-white" href="#">
              Create a free account
            </a>
            <a className="btn btn-line" href="#">
              Log in
            </a>
          </div>
        </div>
      </section>

      <SubscribeSection />
    </main>
  );
}
