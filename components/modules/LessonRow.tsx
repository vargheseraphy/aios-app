"use client";

import { useState } from "react";
import Link from "next/link";
import type { LessonV2 } from "@/lib/content-v2";
import { CopyButton } from "@/components/CopyButton";
import { PromptBodyRich } from "@/components/lesson/PromptBodyRich";
import lessonStyles from "@/components/lesson/lesson.module.css";
import { EACH_MODULE_CONTENT } from "@/lib/pages-content";
import styles from "./modulePage.module.css";

const LEVEL_CLASS: Record<string, string> = {
  Beginner: styles.levBeginner,
  Intermediate: styles.levIntermediate,
  Advanced: styles.levAdvanced,
};

/**
 * Only the fields this row actually renders — not the full LessonV2 (which
 * also carries useWhen, howToUse, steps, origin, pairsWith and
 * extractedAt, all of which belong to the full lesson page, not this
 * accordion row). Since this is a client component every prop gets
 * serialised into the page's RSC payload, so narrowing it keeps that data
 * out of /m{module}'s client bundle entirely.
 */
export interface LessonRowLesson {
  lesson: string;
  titlePrinted: string;
  level: LessonV2["level"];
  subtitle?: string;
  sourcePages: LessonV2["sourcePages"];
  promptBody: string;
}

/**
 * One accordion row on /m{module} — each-module.html's per-lesson binding.
 * The panel uses the native `hidden` attribute when closed (NOTE 2: this
 * keeps it out of the tab order and out of find-in-page, which a
 * CSS-only collapse would not). "View full lesson" is a PLAIN link to
 * /m{module}/{lesson} for every visitor — the design's own NOTE 3 describes
 * a signed-out redirect to #join; that lock is deliberately not built here.
 * The sign-in gate belongs on the lesson page itself, which this task does
 * not touch — see DECISIONS.md.
 */
export function LessonRow({
  lesson,
  fileId,
  moduleNumber,
  flagged,
  defaultOpen = false,
}: {
  lesson: LessonRowLesson;
  fileId: string;
  moduleNumber: number;
  flagged: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const c = EACH_MODULE_CONTENT;
  const buttonId = `b-${fileId}`;
  const panelId = `p-${fileId}`;

  return (
    <div className={styles.lrow}>
      <h3 className={styles.lrowH}>
        <button
          id={buttonId}
          type="button"
          className={styles.lrowBtn}
          aria-controls={panelId}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.ln}>{lesson.lesson}</span>
          <span className={styles.lt2}>{lesson.titlePrinted}</span>
          <span className={`${styles.lv} ${LEVEL_CLASS[lesson.level] ?? ""}`}>{lesson.level}</span>
          <span className={styles.lp}>
            pp. {lesson.sourcePages.intro}&ndash;{lesson.sourcePages.prompt}
          </span>
          <span className={styles.lx} aria-hidden="true">
            <svg className="i" width="15" height="15" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.lpanel} hidden={!open}>
        {lesson.subtitle && <p className={styles.lsum}>{lesson.subtitle}</p>}
        <div className={lessonStyles.promptCard}>
          <div className={lessonStyles.pcTop}>
            <span className={lessonStyles.pcTag}>{lesson.lesson}</span>
            <span className={lessonStyles.pcTitle}>{lesson.titlePrinted}</span>
            <span className={lessonStyles.pcUp}>
              {!flagged && <CopyButton text={lesson.promptBody} label={c.copyLabel} copiedLabel={c.copiedLabel} />}
            </span>
          </div>
          {flagged && (
            <div className={lessonStyles.reviewNotice} role="alert">
              <strong>Prompt under review.</strong> This lesson&rsquo;s prompt is a known
              duplicate, copied from another framework in the printed book, and isn&rsquo;t
              ready to use yet — shown below for transparency, Copy is disabled until it&rsquo;s
              corrected.
            </div>
          )}
          <PromptBodyRich text={lesson.promptBody} />
        </div>
        <p className={styles.mlegend}>
          <span>
            <i className={`${styles.legendDot} ${styles.ky}`} />
            {c.legendKeyLabel}
          </span>
          <span>
            <i className={`${styles.legendDot} ${styles.vl}`} />
            {c.legendValueLabel}
          </span>
        </p>
        <div className={styles.lacts}>
          <Link className={styles.fulllink} href={`/m${moduleNumber}/${fileId}`}>
            <svg className="i" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
              <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
            </svg>
            {c.fullLessonLabel}
          </Link>
          <span className={styles.lockwhy}>
            {c.lockWhyPrefix} &mdash; <a href="#why">{c.lockWhyLinkLabel}</a>
          </span>
        </div>
      </div>
    </div>
  );
}
