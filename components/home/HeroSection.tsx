import styles from "./home.module.css";

export function HeroSection({
  totalLessons,
  totalModules,
  moduleTitles,
}: {
  totalLessons: number;
  totalModules: number;
  moduleTitles: string[];
}) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroGridLines} />
      <div className={styles.heroScrim} />
      <div className={`pad ${styles.heroIn}`}>
        <div className={styles.heroCopy}>
          <span className={styles.glass}>
            <span className={styles.dot} />
            Free to use <span className={styles.mute}>— no account needed to copy a prompt</span>
          </span>
          <h1 className={styles.heroH}>Every prompt in the book. Kept current.</h1>
          <p className={styles.heroSub}>
            Scan the code on any page and land on that framework&rsquo;s prompt — ready to paste
            into ChatGPT, Claude or Gemini. The book stays printed. The prompts keep improving.
          </p>
          <div className={styles.heroBtns}>
            <a className="btn btn-white" href="#try">
              See a prompt
            </a>
            <a className="btn btn-line" href="#modules">
              All {totalModules} modules
            </a>
          </div>
          <div className={styles.heroMeta}>
            <div>
              <div className={styles.n}>{totalLessons}</div>
              <div className={styles.l}>Prompts</div>
            </div>
            <div>
              <div className={styles.n}>{totalModules}</div>
              <div className={styles.l}>Modules</div>
            </div>
            <div>
              <div className={styles.n}>1 tap</div>
              <div className={styles.l}>To copy</div>
            </div>
            <div>
              <div className={styles.n}>Free</div>
              <div className={styles.l}>To use</div>
            </div>
          </div>
        </div>
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[0, 1].map((rep) =>
              moduleTitles.map((title, i) => (
                <span key={`${rep}-${title}`} className={i === 0 ? styles.on : undefined}>
                  {title}
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
