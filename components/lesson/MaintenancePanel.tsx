import Link from "next/link";
import styles from "./bands.module.css";

function formatExtractedAt(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function MaintenancePanel({
  lessonNumber,
  totalLessons,
  sourcePages,
  extractedAt,
}: {
  lessonNumber: string;
  totalLessons: number;
  sourcePages: { intro: number; prompt: number };
  extractedAt: string;
}) {
  return (
    <div className={styles.maint}>
      <div className={`pad ${styles.maintIn}`}>
        <div>
          <h2>When this page changes, your copy of the book does not have to.</h2>
          <p>
            The book prints the framework. This page keeps it — and keeps the prompt current,
            because prompting technique moves faster than print does.{" "}
            <b>When it moves, this page is rewritten and the code in your copy keeps pointing at
            it.</b>{" "}
            No second edition, no replacement purchase, no account.
          </p>
          <p style={{ marginTop: "10px" }}>
            If something here looks wrong — a prompt that does not match its framework, a figure
            that reads oddly — <Link className={styles.more} href="/contact">tell Raphy</Link>.
            That correction reaches every printed copy at once.
          </p>
        </div>
        <div className={styles.maintMeta}>
          <div className={styles.mm}>
            <span>Framework</span>
            <b>
              {lessonNumber} of {totalLessons}
            </b>
          </div>
          <div className={styles.mm}>
            <span>Printed on</span>
            <b>
              Pages {sourcePages.intro}&ndash;{sourcePages.prompt}
            </b>
          </div>
          <div className={styles.mm}>
            <span>Prompt extracted</span>
            <b>{formatExtractedAt(extractedAt)}</b>
          </div>
          <div className={styles.mm}>
            <span>The prompt</span>
            <b>Free, no account</b>
          </div>
        </div>
      </div>
    </div>
  );
}
