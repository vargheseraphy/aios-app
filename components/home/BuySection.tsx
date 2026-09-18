import styles from "./home.module.css";

/**
 * Store links stay "#" with a visible note — no real Amazon/Notion Press
 * URLs exist yet (see DECISIONS.md's "Items needing Raphy" list).
 */
export function BuySection() {
  return (
    <section className={styles.buy} id="get">
      <div className={styles.bg} />
      <div className={styles.lines} />
      <div className={`pad ${styles.buyIn}`}>
        <div>
          <h2>Keep it on the desk. Not on a shelf.</h2>
          <p>108 frameworks in print, every prompt live on this site, updated as the models change.</p>
          <div className={styles.heroBtns}>
            <a className="btn btn-line" href="#modules">
              Browse the prompts free
            </a>
          </div>
          <p className={styles.buyNote}>Paperback · 276 pages · published by Notion Press</p>
        </div>
        <div className={styles.sellers}>
          <a className={styles.seller} href="#">
            <span className={styles.si}>
              <svg className="i" width="22" height="22" viewBox="0 0 24 24">
                <path d="M3 16.5c4.2 3 13.8 3 18-0.5" />
                <path d="M19.2 19c1-1.5 1.3-3.2.8-3.6" />
                <path d="M7 4.5h10v8H7z" />
                <path d="M9.5 8h5" />
              </svg>
            </span>
            <span>
              <b>Amazon</b>
              <span className={styles.sub}>Paperback and Kindle — ships next day</span>
            </span>
            <span className={styles.go}>
              <svg className="i" width="18" height="18" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
          <a className={styles.seller} href="#">
            <span className={styles.si}>
              <svg className="i" width="22" height="22" viewBox="0 0 24 24">
                <rect x="4" y="3" width="16" height="18" rx="2.5" />
                <path d="M8 7.5h8M8 12h8M8 16.5h5" />
              </svg>
            </span>
            <span>
              <b>Notion Press</b>
              <span className={styles.sub}>Direct from the publisher</span>
            </span>
            <span className={styles.go}>
              <svg className="i" width="18" height="18" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
          <a className={styles.seller} href="#">
            <span className={styles.si}>
              <svg className="i" width="22" height="22" viewBox="0 0 24 24">
                <circle cx="9" cy="8" r="3.4" />
                <circle cx="16.5" cy="9.5" r="2.6" />
                <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                <path d="M15.5 19c0-2.3 1.3-4 3.2-4s2.8 1.3 2.8 3" />
              </svg>
            </span>
            <span>
              <b>Bulk &amp; institutions</b>
              <span className={styles.sub}>Ten copies or more, invoiced</span>
            </span>
            <span className={styles.go}>
              <svg className="i" width="18" height="18" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
          <p className={styles.buyNote}>Store links to be added before launch</p>
        </div>
      </div>
    </section>
  );
}
