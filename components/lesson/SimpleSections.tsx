import styles from "./lesson.module.css";

/** Static, data-only sections that need no client interactivity: use-when,
 * how-the-framework-works, the method steps, and where it comes from. Each
 * is hidden entirely by its caller when the underlying field is absent
 * (real content-v2 gaps — see DECISIONS.md) rather than rendering empty. */

export function UseWhenSection({ text }: { text: string }) {
  return (
    <div id="usewhen" className={styles.blk}>
      <div className={styles.bh}>
        <span className={styles.bi} style={{ background: "#FFEBE8", color: "#C4382B" }}>
          <svg className="i" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 8.5v5" />
            <path d="M12 16.8h.01" />
            <path d="M10.3 3.9L2.5 17.5A2 2 0 0 0 4.2 20.5h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          </svg>
        </span>
        <h2>Use this when</h2>
        <span className={styles.bn}>The problem it solves</span>
      </div>
      <div className={styles.uwCard}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export function HowToUseSection({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).filter(Boolean);
  return (
    <div id="howto" className={styles.blk}>
      <div className={styles.bh}>
        <span className={styles.bi} style={{ background: "#E8F0FE", color: "#1E5CE0" }}>
          <svg className="i" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.6" />
            <path d="M12 11v5.5" />
            <path d="M12 7.6h.01" />
          </svg>
        </span>
        <h2>How the framework works</h2>
        <span className={styles.bn}>From the printed page</span>
      </div>
      <div className={styles.prose}>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}

export function MethodSteps({ steps }: { steps: string[] }) {
  return (
    <div id="method" className={styles.blk}>
      <div className={styles.bh}>
        <span className={styles.bi} style={{ background: "#E6F6EC", color: "#1B7A3C" }}>
          <svg className="i" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h10M4 12h12M4 17h7" />
            <path d="M19 5.5l2.5 2.5L19 10.5" />
          </svg>
        </span>
        <h2>The method, in {steps.length === 4 ? "four moves" : `${steps.length} moves`}</h2>
        <span className={styles.bn}>Do these in order</span>
      </div>
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <span className={styles.stepN}>{i + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OriginBlock({ text }: { text: string }) {
  return (
    <div id="origin" className={styles.blk}>
      <div className={styles.origin}>
        <span className={styles.originIcon}>
          <svg className="i" width="21" height="21" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4.5h6.5a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H4z" />
            <path d="M20 4.5h-5.5a2 2 0 0 0-2 2V20a2 2 0 0 1 2-2H20z" />
          </svg>
        </span>
        <div>
          <h2>Where the framework comes from</h2>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
