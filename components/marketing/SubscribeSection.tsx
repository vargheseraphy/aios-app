"use client";

import styles from "./marketing.module.css";

/**
 * Ported verbatim from the locked pages' `.news` band — identical on every
 * page. No newsletter backend exists (see DECISIONS.md's never-invent
 * list), so this prevents the default submit and does nothing else, same
 * as the source HTML's own demo form.
 */
export function SubscribeSection() {
  return (
    <section className={styles.news} id="subscribe">
      <div className="pad">
        <div className={styles.newsBand}>
          <span className={styles.newsIc}>
            <svg className="i" width="24" height="24" viewBox="0 0 24 24">
              <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
              <path d="M2.5 7.5l9.5 6 9.5-6" />
            </svg>
          </span>
          <div className={styles.newsTxt}>
            <b>One framework in your inbox, every other week.</b>
            <span>A prompt worth running and the decision it is meant for. No course pitches.</span>
          </div>
          <form className={styles.newsForm} onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsEmail" className="vh">
              Email address
            </label>
            <input id="newsEmail" type="email" placeholder="you@company.com" autoComplete="email" />
            <button className={`btn btn-blue ${styles.newsBtn}`} type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
