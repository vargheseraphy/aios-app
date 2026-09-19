import Link from "next/link";
import type { Metadata } from "next";
import { CONTACT_CONTENT as C } from "@/lib/pages-content";
import { Rich } from "@/components/RichText";
import { ButtonLink } from "@/components/Button";
import { SubscribeSection } from "@/components/marketing/SubscribeSection";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "@/components/contact/contact.module.css";

export const metadata: Metadata = {
  title: "Contact — AI Operating System for Leaders",
  description:
    "Most reasons to write are already answered on this page — buying a copy, a prompt that misbehaved, using it at work. Everything else reaches Raphy directly.",
};

const triageColorClass: Record<string, string> = {
  blue: styles.trBlue,
  yellow: styles.trYellow,
  green: styles.trGreen,
};

export default function ContactPage() {
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
            <svg viewBox="0 0 300 240" className="line" aria-hidden="true">
              <rect className="s" x="20" y="112" width="44" height="32" rx="3" />
              <path className="s" d="M20 116l22 15 22-15" />
              <text className="t" x="18" y="164" style={{ fontSize: 9, letterSpacing: "0.09em" }}>
                ONE MESSAGE
              </text>
              <path className="s2" d="M64 128h32" />
              <path className="s2" d="M96 44v168" />
              <path className="s2" d="M96 44h52M96 100h52M96 156h52" />
              <path className="s" d="M96 212h52" />
              <rect className="s2" x="148" y="30" width="28" height="28" rx="6" />
              <path className="s2" d="M156 44l5 5 9-11" />
              <text className="t" x="186" y="48">WHERE TO BUY</text>
              <rect className="s2" x="148" y="86" width="28" height="28" rx="6" />
              <path className="s2" d="M156 100l5 5 9-11" />
              <text className="t" x="186" y="104">PROMPT TROUBLE</text>
              <rect className="s2" x="148" y="142" width="28" height="28" rx="6" />
              <path className="s2" d="M156 156l5 5 9-11" />
              <text className="t" x="186" y="160">USING IT AT WORK</text>
              <rect className="s" x="148" y="198" width="28" height="28" rx="6" />
              <circle className="s" cx="162" cy="207.5" r="3.6" />
              <path className="s" d="M154.5 219c0-4.2 3.4-6.6 7.5-6.6s7.5 2.4 7.5 6.6" />
              <text className="t" x="186" y="216" style={{ opacity: 0.95 }}>EVERYTHING ELSE</text>
            </svg>
          </div>
        </div>
      </header>

      <section className="light" id="answers">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">{C.answersKicker}</div>
              <h2 className="sh">{C.answersHeading}</h2>
              <p className="sd">{C.answersSub}</p>
            </div>
          </div>

          <div className={styles.triage}>
            {C.triage.map((row) => (
              <div className={`${styles.tr} ${triageColorClass[row.colorKey]}`} key={row.tag}>
                <div className={styles.trQ}>
                  <span className={styles.tag}>{row.tag}</span>
                  <h3 className={styles.said}>{row.said}</h3>
                  <p className={styles.meta}>{row.meta}</p>
                </div>
                <div className={styles.trA}>
                  {row.answer.map((para) => (
                    <p key={para}>
                      <Rich text={para} />
                    </p>
                  ))}
                  <div className={styles.trGo}>
                    {row.routes.map((route) =>
                      route.dead ? (
                        <span className={`${styles.golink} ${styles.golinkDead}`} key={route.label}>
                          <svg className="i" width="14" height="14" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="8.5" />
                            <path d="M12 8v4.5l3 2" />
                          </svg>
                          {route.label}
                        </span>
                      ) : (
                        <Link className={styles.golink} href={route.href} key={route.label}>
                          <svg className="i" width="14" height="14" viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                          {route.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">{C.whoKicker}</div>
              <h2 className="sh">{C.whoHeading}</h2>
              <p className="sd">{C.whoSub}</p>
            </div>
          </div>
          <div className={styles.who}>
            <div className={`${styles.wcard} ${styles.will}`}>
              <h3>{C.willGet.heading}</h3>
              <p className={styles.wsub}>{C.willGet.sub}</p>
              <div className={styles.wlist}>
                {C.willGet.items.map((item) => (
                  <div className={styles.wrow} key={item}>
                    <span className={styles.wi}>
                      <svg className="i" width="13" height="13" viewBox="0 0 24 24">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    <span>
                      <Rich text={item} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.wcard} ${styles.wont}`}>
              <h3>{C.wontGet.heading}</h3>
              <p className={styles.wsub}>{C.wontGet.sub}</p>
              <div className={styles.wlist}>
                {C.wontGet.items.map((item) => (
                  <div className={styles.wrow} key={item}>
                    <span className={styles.wi}>
                      <svg className="i" width="13" height="13" viewBox="0 0 24 24">
                        <path d="M7 7l10 10M17 7L7 17" />
                      </svg>
                    </span>
                    <span>
                      <Rich text={item} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.whorow}>
            <p className={styles.whonote}>
              <span className={styles.wtag}>{C.worthSendingTag}</span>
              <Rich text={C.worthSending} />
            </p>
            <div className={styles.whoart}>
              <div className={styles.whoartBg} />
              <svg viewBox="0 0 300 176" className="line" aria-hidden="true">
                <rect className="s" x="16" y="74" width="40" height="28" rx="3" />
                <path className="s" d="M16 77l20 14 20-14" />
                <text className="t" x="14" y="124" style={{ fontSize: 9, letterSpacing: "0.09em" }}>
                  YOUR REPORT
                </text>
                <path className="s2" d="M64 88h26" />
                <path className="s2" d="M84 82l6 6-6 6" />
                <rect className="s" x="104" y="38" width="92" height="104" rx="6" />
                <path className="s3" d="M120 62h56M120 78h40M120 94h50" />
                <rect className="s" x="120" y="106" width="24" height="24" rx="3" />
                <rect className="fd" x="124" y="110" width="6" height="6" rx="1" />
                <text className="t" x="104" y="160" style={{ fontSize: 9, letterSpacing: "0.09em" }}>
                  SAME CODE
                </text>
                <path className="s2" d="M212 70a30 30 0 0 1 0 60" />
                <path className="s2" d="M218 125l-6 5 6 5" />
                <text className="t" x="206" y="158" style={{ fontSize: 9, letterSpacing: "0.09em" }}>
                  REWRITTEN
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="wash" id="write">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">{C.writeKicker}</div>
              <h2 className="sh">{C.writeHeading}</h2>
              <p className="sd">{C.writeSub}</p>
            </div>
          </div>
          <div className={styles.fwrap}>
            <ContactForm />
            <aside className={styles.aside}>
              <div className={styles.acard}>
                <h3>{C.whatHappensHeading}</h3>
                <div className={styles.steps}>
                  {C.whatHappensSteps.map((step, i) => (
                    <div className={styles.step} key={step}>
                      <span className={styles.stepSn}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.stepSt}>
                        <Rich text={step} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.acard}>
                <h3>{C.fasterHeading}</h3>
                <p>
                  <b>A prompt behaving oddly?</b> The troubleshooting list on{" "}
                  <Link className={styles.inlink} href="/how-to-use#trouble">
                    How to use
                  </Link>{" "}
                  covers the common causes.
                </p>
                <p>
                  <b>Looking for a framework?</b> The{" "}
                  <Link className={styles.inlink} href="/#modules">
                    module index
                  </Link>{" "}
                  is organised by the decision you are making, not by chapter.
                </p>
                <p>
                  <b>Buying more than ten copies?</b>{" "}
                  <Link className={styles.inlink} href="/for-business">
                    For business
                  </Link>{" "}
                  and{" "}
                  <Link className={styles.inlink} href="/for-institutions">
                    For institutions
                  </Link>{" "}
                  already answer most of it.
                </p>
              </div>
            </aside>
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
