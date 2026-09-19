"use client";

import { CopyButton } from "@/components/CopyButton";
import { BookmarkButton } from "@/components/BookmarkButton";
import { PromptBodyRich } from "./PromptBodyRich";
import { applyRoleClause, parsePromptRoleLine } from "@/lib/prompt-role";
import styles from "./lesson.module.css";

export interface PromptCardProps {
  lessonId: string;
  lessonNumber: string;
  title: string;
  promptBody: string;
  proTip?: string;
  flagged: boolean;
  /** the currently-selected role's promptClause, or null for the book's own default */
  activeRoleClause: string | null;
}

/**
 * The prompt card, first, before any context — per lesson.html's overriding
 * constraint: reached by phone camera mid-task, prompt + Copy come first.
 * Sticky header on mobile so it stays visible while the prompt scrolls.
 */
export function PromptCard({
  lessonId,
  lessonNumber,
  title,
  promptBody,
  proTip,
  flagged,
  activeRoleClause,
}: PromptCardProps) {
  const roleMatch = parsePromptRoleLine(promptBody);
  const effectiveText = applyRoleClause(promptBody, activeRoleClause);
  const currentRoleLine = roleMatch.matches
    ? (activeRoleClause ?? roleMatch.defaultClause)
    : null;

  return (
    <div id="prompt" className={styles.blk}>
      <div className={styles.bh}>
        <span className={styles.bi} style={{ background: "#15171C", color: "#fff" }}>
          <svg className="i" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 8l-3.5 4L7 16M17 8l3.5 4L17 16M13.5 6l-3 12" />
          </svg>
        </span>
        <h2>The prompt</h2>
        <span className={styles.bn}>Copy &amp; paste ready</span>
      </div>

      <div className={styles.promptCard} id="promptcard" tabIndex={-1}>
        <div className={styles.pcTop}>
          <span className={styles.pcTag}>{lessonNumber}</span>
          <span className={styles.pcTitle}>{title}</span>
          <span className={styles.pcUp}>
            <BookmarkButton lessonId={lessonId} variant="dark" />
            {!flagged && (
              <CopyButton
                text={effectiveText}
                className={styles.copyBtnInCard}
                label="Copy prompt"
                copiedLabel="Copied"
              />
            )}
          </span>
        </div>

        {flagged && (
          <div className={styles.reviewNotice} role="alert">
            <strong>Prompt under review.</strong> This lesson&rsquo;s prompt is a known
            duplicate, copied from another framework in the printed book, and
            isn&rsquo;t ready to use yet — shown below for transparency, Copy is
            disabled until it&rsquo;s corrected.
          </div>
        )}

        <PromptBodyRich text={effectiveText} roleLine={currentRoleLine} />

        <div className={styles.pcFoot}>
          <span className={styles.legend}>
            <span>
              <i className={`${styles.legendDot} ${styles.ky}`} />
              Labels
            </span>
            <span>
              <i className={`${styles.legendDot} ${styles.vl}`} />
              Replace these
            </span>
            {roleMatch.matches && (
              <span>
                <i className={`${styles.legendDot} ${styles.rl}`} />
                Swap the role below
              </span>
            )}
          </span>
        </div>
      </div>
      <p className={styles.mLegend}>
        <span>
          <i className={`${styles.legendDot} ${styles.ky}`} />
          Labels
        </span>
        <span>
          <i className={`${styles.legendDot} ${styles.vl}`} />
          Replace these
        </span>
        {roleMatch.matches && (
          <span>
            <i className={`${styles.legendDot} ${styles.rl}`} />
            Swap the role below
          </span>
        )}
      </p>

      {proTip && (
        <div className={styles.tipCard}>
          <p className={styles.tipLabel}>
            <svg
              className="i"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ color: "#C99400" }}
            >
              <path d="M9 18h6M10 21.5h4" />
              <path d="M12 2.5a6.5 6.5 0 0 0-3.6 11.9c.4.3.6.7.6 1.2v.4h6v-.4c0-.5.2-.9.6-1.2A6.5 6.5 0 0 0 12 2.5z" />
            </svg>
            Pro tip, from the book
          </p>
          <p>{proTip}</p>
        </div>
      )}
    </div>
  );
}
