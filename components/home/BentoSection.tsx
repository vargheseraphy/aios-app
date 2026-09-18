import styles from "./home.module.css";

export function BentoSection() {
  return (
    <section className="wash">
      <div className="pad">
        <div className="head-row">
          <div>
            <div className="kicker">What you get</div>
            <h2 className="sh">
              Start with one prompt. Run the whole system when you&rsquo;re ready.
            </h2>
          </div>
          <a className="btn btn-ink" href="#get">
            Get the book
          </a>
        </div>
        <div className={styles.bento}>
          <article className={`${styles.bcard} ${styles.toneWash} ${styles.b1}`}>
            <h3>Every framework, ready to paste</h3>
            <p>
              108 prompts across ten modules, each one written and tested against a real
              business decision — not generated filler. Open the one you need, fill the
              brackets, run it.
            </p>
            <ul className={styles.blist}>
              {[
                "Bracketed placeholders so it fits your industry, not a generic one",
                "Every prompt names the frameworks it pairs with next",
                "One-tap copy on a phone, straight from a scanned page",
                "Free to read and copy — the book explains when to use which",
              ].map((text) => (
                <li key={text}>
                  <span className={styles.ti}>
                    <svg className="i" width="12" height="12" viewBox="0 0 24 24" strokeWidth={3}>
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className={styles.bcta}>
              <a className="btn btn-ink btn-sm" href="#try">
                See a prompt
              </a>
              <a className="btn btn-linedark btn-sm" href="#modules">
                Browse modules
              </a>
            </div>
            <div className={styles.bart}>
              <svg viewBox="0 0 320 132" className="line" style={{ width: "100%", height: "auto" }} aria-hidden="true">
                <rect className="s" x="6" y="12" width="126" height="108" rx="12" />
                <rect className="s2" x="22" y="28" width="42" height="14" rx="7" />
                <path className="s" d="M22 60h94M22 76h68M22 92h84" />
                <path className="s3" d="M142 66h22" />
                <path className="s2" d="M158 60l6 6-6 6" />
                <rect className="s" x="174" y="12" width="140" height="70" rx="12" />
                <path className="s2" d="M192 38h96M192 56h64" />
                <rect className="s" x="250" y="94" width="64" height="26" rx="13" />
                <text className="t" x="264" y="111" style={{ fontSize: 10, opacity: 0.95 }}>
                  COPY
                </text>
              </svg>
            </div>
          </article>

          <article className={`${styles.bcard} ${styles.toneInk} ${styles.b2}`}>
            <h3>Ten modules that connect to each other</h3>
            <p>
              Each framework names the others it pairs with, so one decision leads to the next
              instead of dead-ending.
            </p>
            <div className={styles.bart}>
              <svg viewBox="0 0 540 140" className="line" style={{ width: "100%", height: "auto" }} aria-hidden="true">
                <path className="s3" d="M56 70h428" />
                <path
                  className="s"
                  d="M76 66q32-26 68-26M184 44q44 26 66 52M290 100q44 26 66-52M396 44q44 0 68 26"
                />
                <circle className="s" cx="56" cy="70" r="19" fill="#0B0C0F" />
                <text className="t" x="47" y="74" style={{ opacity: 0.95 }}>
                  01
                </text>
                <circle className="s" cx="166" cy="40" r="19" fill="#0B0C0F" />
                <text className="t" x="157" y="44" style={{ opacity: 0.95 }}>
                  03
                </text>
                <circle className="s" cx="272" cy="100" r="19" fill="#0B0C0F" />
                <text className="t" x="263" y="104" style={{ opacity: 0.95 }}>
                  06
                </text>
                <circle className="s" cx="378" cy="40" r="19" fill="#0B0C0F" />
                <text className="t" x="369" y="44" style={{ opacity: 0.95 }}>
                  08
                </text>
                <circle className="s" cx="484" cy="70" r="19" fill="#0B0C0F" />
                <text className="t" x="475" y="74" style={{ opacity: 0.95 }}>
                  10
                </text>
              </svg>
            </div>
          </article>

          <article className={`${styles.bcard} ${styles.toneBlue} ${styles.b3}`}>
            <h3>One system, the whole team</h3>
            <p>
              Hand out copies. Everyone works from the same frameworks, so plans arrive in the
              same shape.
            </p>
            <div className={styles.bart}>
              <svg viewBox="0 0 260 124" className="line" style={{ width: "100%", height: "auto" }} aria-hidden="true">
                <rect className="s" x="94" y="6" width="72" height="42" rx="8" />
                <path className="s2" d="M110 22h40M110 34h24" />
                <path className="s3" d="M130 48v10M48 66v-8h164v8" />
                <circle className="s" cx="48" cy="80" r="13" />
                <path className="s" d="M35 116c0-8 6-13 13-13s13 5 13 13" />
                <circle className="s" cx="130" cy="80" r="13" />
                <path className="s" d="M117 116c0-8 6-13 13-13s13 5 13 13" />
                <circle className="s" cx="212" cy="80" r="13" />
                <path className="s" d="M199 116c0-8 6-13 13-13s13 5 13 13" />
              </svg>
            </div>
          </article>

          <article className={`${styles.bcard} ${styles.toneYellow} ${styles.b4}`}>
            <h3>Updated as the models change</h3>
            <p>
              The page behind each QR code gets rewritten. The book on the desk never goes out
              of date.
            </p>
            <div className={styles.bart}>
              <svg viewBox="0 0 260 124" className="line" style={{ width: "100%", height: "auto" }} aria-hidden="true">
                <rect className="s" x="12" y="46" width="52" height="30" rx="8" />
                <text className="t" x="27" y="65" style={{ fontSize: 11, opacity: 0.95 }}>
                  v1
                </text>
                <path className="s3" d="M70 61h16" />
                <rect className="s" x="92" y="46" width="52" height="30" rx="8" />
                <text className="t" x="107" y="65" style={{ fontSize: 11, opacity: 0.95 }}>
                  v2
                </text>
                <path className="s3" d="M150 61h16" />
                <circle className="s" cx="206" cy="61" r="38" />
                <path className="s" d="M206 34a27 27 0 1 1-25 17" />
                <path className="s" d="M194 22l12 12-12 10" />
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
