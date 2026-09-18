import styles from "./home.module.css";

export function WhySection({ totalLessons }: { totalLessons: number }) {
  return (
    <section className="light" id="why">
      <div className="pad">
        <div className="head-row">
          <div>
            <div className="kicker">Why a framework</div>
            <h2 className="sh">A blank chat box knows nothing about your business.</h2>
            <p className="sd">
              Most people type one sentence, get something generic, and conclude AI is
              overrated. A framework fixes the input, not the model.
            </p>
          </div>
        </div>
        <div className={styles.facts}>
          <div className={`${styles.fact} ${styles.factFeature}`}>
            <div className={styles.bg} />
            <div className={styles.inner}>
              <span className={styles.ic}>
                <svg className="i" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h11M4 18h7" />
                  <circle cx="19" cy="18" r="2.4" />
                </svg>
              </span>
              <div>
                <h3>Four layers beat one sentence.</h3>
                <p>
                  Every prompt states a role, the context, the action and the expected format.
                  That is the difference between &ldquo;write me a sales email&rdquo; and output
                  you can actually send.
                </p>
              </div>
              <div className={styles.artbox}>
                <svg
                  viewBox="0 0 280 118"
                  className="line"
                  style={{ width: "100%", height: "auto" }}
                  aria-hidden="true"
                >
                  <rect className="s2" x="8" y="8" width="264" height="102" rx="12" />
                  <rect className="s" x="24" y="22" width="56" height="18" rx="6" />
                  <text className="t" x="34" y="34">
                    ROLE
                  </text>
                  <path className="s2" d="M88 31h72" />
                  <circle className="fd" cx="166" cy="31" r="3" />
                  <rect className="s" x="24" y="46" width="76" height="18" rx="6" />
                  <text className="t" x="34" y="58">
                    CONTEXT
                  </text>
                  <path className="s2" d="M108 55h58" />
                  <circle className="fd" cx="172" cy="55" r="3" />
                  <rect className="s" x="24" y="70" width="66" height="18" rx="6" />
                  <text className="t" x="34" y="82">
                    ACTION
                  </text>
                  <path className="s2" d="M98 79h86" />
                  <circle className="fd" cx="190" cy="79" r="3" />
                  <rect className="s" x="24" y="92" width="92" height="16" rx="6" opacity=".55" />
                  <text className="t" x="34" y="103">
                    EXPECTATION
                  </text>
                  <path className="s3" d="M214 24v72" />
                  <rect className="s" x="222" y="42" width="38" height="36" rx="8" />
                  <path className="s" d="M232 60l6 6 12-14" />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.fact}>
            <span className={styles.ic}>
              <svg className="i" width="20" height="20" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
                <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
                <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
                <path d="M17.25 13.5v7.5M13.5 17.25h7.5" />
              </svg>
            </span>
            <div className={styles.big}>
              {totalLessons} <span>frameworks</span>
            </div>
            <p>
              One for nearly every recurring decision a founder or manager faces — hiring,
              pricing, positioning, firing, forecasting.
            </p>
          </div>

          <div className={styles.fact}>
            <span className={styles.ic}>
              <svg className="i" width="20" height="20" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3.6" />
                <path d="M12 2.5v3.4M12 18.1v3.4M2.5 12h3.4M18.1 12h3.4M5.2 5.2l2.4 2.4M16.4 16.4l2.4 2.4M18.8 5.2l-2.4 2.4M7.6 16.4l-2.4 2.4" />
              </svg>
            </span>
            <div className={styles.big}>Any model</div>
            <p>
              Plain language, no tool-specific syntax — the same prompt works in ChatGPT, Claude,
              Gemini or whatever replaces them next year.
            </p>
          </div>

          <div className={styles.fact}>
            <span className={styles.ic}>
              <svg className="i" width="20" height="20" viewBox="0 0 24 24">
                <path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4" />
                <path d="M20.5 4.2V9h-4.8" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </span>
            <div className={styles.big}>Never stale</div>
            <p>
              The print run is fixed. The prompts on this site get rewritten as technique moves —
              the QR code always opens the current one.
            </p>
          </div>

          <div className={styles.fact}>
            <span className={styles.ic}>
              <svg className="i" width="20" height="20" viewBox="0 0 24 24">
                <path d="M5 20V9M12 20V4M19 20v-7" />
                <circle cx="5" cy="6.5" r="1.6" />
                <circle cx="19" cy="10.5" r="1.6" />
              </svg>
            </span>
            <div className={styles.big}>10 modules</div>
            <p>
              Strategy through self-leadership, in the order a business actually grows — not the
              order a textbook teaches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
