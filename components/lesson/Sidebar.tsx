import styles from "./sidebar.module.css";

export interface JumpLink {
  href: string;
  label: string;
}

export function Sidebar({
  jumpLinks,
  level,
  sourcePages,
  moduleNumber,
  moduleTitle,
  lessonCount,
}: {
  jumpLinks: JumpLink[];
  level: string;
  sourcePages: { intro: number; prompt: number };
  moduleNumber: number;
  moduleTitle: string;
  lessonCount: number;
}) {
  return (
    <aside className={styles.colSide} aria-label="At a glance">
      <div className={styles.sidecard}>
        <h2>On this page</h2>
        <nav className={styles.jump} aria-label="Sections of this framework">
          {jumpLinks.map((link) => (
            <a key={link.href} href={link.href}>
              <span className={styles.jd} />
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={styles.qfwrap}>
        <dl className={styles.qfacts}>
          <div className={styles.qf}>
            <dt>Level</dt>
            <dd>{level}</dd>
          </div>
          <div className={styles.qf}>
            <dt>Printed on</dt>
            <dd>
              Pages {sourcePages.intro}&ndash;{sourcePages.prompt}
            </dd>
          </div>
          <div className={styles.qf}>
            <dt>Module</dt>
            <dd>
              {String(moduleNumber).padStart(2, "0")}, {moduleTitle}
            </dd>
          </div>
          <div className={styles.qf}>
            <dt>In module</dt>
            <dd>{lessonCount} frameworks</dd>
          </div>
          <div className={styles.qf}>
            <dt>Costs</dt>
            <dd>Nothing, no account</dd>
          </div>
        </dl>
      </div>

      <div className={styles.sidecard}>
        <h2>What to replace</h2>
        <div className={styles.keylist}>
          <div className={styles.krow}>
            <code>[X]</code>
            <span>
              Your own figure. <b>A real one</b> — an estimate you can defend beats a placeholder.
            </span>
          </div>
          <div className={styles.krow}>
            <code>[A / B]</code>
            <span>
              Where a bracket lists options, keep <b>one</b> and delete the rest.
            </span>
          </div>
          <div className={styles.krow}>
            <code>[DESCRIBE&hellip;]</code>
            <span>
              Two or three sentences. <b>Specifics</b>, not adjectives.
            </span>
          </div>
          <div className={styles.krow}>
            <code>Act as&hellip;</code>
            <span>
              The highlighted role. <b>Swap it</b> from the role index below.
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
