import Link from "next/link";
import styles from "./SiteFooter.module.css";

/**
 * Ported from docs/design/pages/home.html's <footer>. Links only point at
 * routes that exist in this build's scope (see DECISIONS.md — /about,
 * /for-business, /for-institutions, /contact etc. aren't built); everything
 * else stays "#" rather than link to a page that isn't there.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="pad">
        <div className={styles.footTop}>
          <div className={`${styles.footCol} ${styles.footAbout}`}>
            <Link className={styles.mark} href="/">
              <span className={styles.sq} />
              AIOS
            </Link>
            <p>
              The companion site to <i>AI Operating System for Leaders</i> by Raphy Varghese
              — 108 frameworks, kept current.
            </p>
            <div className={styles.footBadges}>
              <span className={styles.fbadge}>108 prompts</span>
              <span className={styles.fbadge}>10 modules</span>
              <span className={styles.fbadge}>Free to use</span>
            </div>
          </div>
          <div className={styles.footCol}>
            <p className={styles.footColLabel}>The book</p>
            <Link href="/why-this-book">Why this book</Link>
            <Link href="/how-to-use">How to use</Link>
            <Link href="/who-its-for">Who it&rsquo;s for</Link>
            <Link href="#">About Raphy</Link>
            <Link href="/#get">Buy a copy</Link>
          </div>
          <div className={styles.footCol}>
            <p className={styles.footColLabel}>Prompts</p>
            <Link href="/#modules">All 10 modules</Link>
            <Link href="/#try">Sample prompts</Link>
            <Link href="#">Latest updates</Link>
            <Link href="/my-prompts">My prompts</Link>
          </div>
          <div className={styles.footCol}>
            <p className={styles.footColLabel}>Read</p>
            <Link href="#">Articles</Link>
            <Link href="#">Blog</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="#">Newsletter</Link>
          </div>
          <div className={styles.footCol}>
            <p className={styles.footColLabel}>Buy &amp; contact</p>
            <Link href="/for-business">For business</Link>
            <Link href="/for-institutions">For institutions</Link>
            <Link href="#">Bulk orders</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className={styles.footBot}>
          <span>&copy; 2026 Raphy Varghese &middot; aios.obio.in</span>
          <span className={styles.legal}>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Cookies</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
