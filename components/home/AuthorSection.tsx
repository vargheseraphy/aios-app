import styles from "./home.module.css";

/**
 * Draft copy in Raphy's voice, ported verbatim from home.html — flagged
 * there as draft and needing his own words + a real portrait before launch
 * (see DECISIONS.md). Keep the draft-note label, don't invent a bio.
 */
export function AuthorSection() {
  return (
    <section className="light" id="author">
      <div className="pad">
        <div className={styles.authorGrid}>
          <div className={styles.authorArt}>
            <div className={styles.artbg} />
            <svg viewBox="0 0 260 300" className="line" aria-hidden="true">
              <circle className="s" cx="130" cy="96" r="42" />
              <path className="s" d="M56 216c0-40 33-66 74-66s74 26 74 66" />
              <path className="s2" d="M100 88c8-6 22-6 30 0" />
              <rect className="s" x="74" y="232" width="112" height="46" rx="8" />
              <path className="s" d="M130 232v46" />
              <path className="s2" d="M88 250h30M142 250h30M88 264h22M142 264h26" />
              <path className="s3" d="M26 150h32M202 150h32" />
            </svg>
            <span className={styles.cap}>Portrait — add Raphy&rsquo;s photo</span>
          </div>
          <div className={styles.authorCopy}>
            <div className="kicker">The author</div>
            <h2 className="sh">Why this book exists.</h2>
            <blockquote>
              Everyone had access to the same AI. Almost nobody was getting anything useful out
              of it.
            </blockquote>
            <p>
              I kept watching capable founders and managers open a chat window, type one line,
              read something generic, and quietly decide the whole thing was hype. The tool was
              not the problem. The input was. The people getting real value were the ones who
              already knew how to frame a business question — and that framing was the part
              nobody was teaching.
            </p>
            <p>
              So I wrote down the frameworks I use, one per decision, in the order a business
              actually grows. Then I put a QR code on every one of them, because a framework you
              cannot reach in three seconds is a framework you will not use. The book is the
              thinking. This site is the part that keeps up.
            </p>
            <div className={styles.authorSign}>
              <span className={styles.av}>RV</span>
              <span>
                <b>Raphy Varghese</b>
                <span>Author, AI Operating System for Leaders</span>
              </span>
            </div>
            <p className={styles.draftNote}>Draft copy — rewrite in your own words before launch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
