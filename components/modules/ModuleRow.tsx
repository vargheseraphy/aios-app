"use client";

import { useState } from "react";
import Link from "next/link";
import type { LessonV2, ModuleStats } from "@/lib/content-v2";
import { ALL_MODULES_CONTENT } from "@/lib/pages-content";
import styles from "./modulePage.module.css";

const LEVEL_CLASS: Record<string, string> = {
  Beginner: styles.levBeginner,
  Intermediate: styles.levIntermediate,
  Advanced: styles.levAdvanced,
};

export interface ModuleRowLessonSummary {
  lesson: string;
  titlePrinted: string;
  level: LessonV2["level"];
  sourcePages: LessonV2["sourcePages"];
}

/**
 * Only the fields this row actually renders — not the full ModuleV2 (which
 * also carries description, roleProfile and startHere). Since this is a
 * client component every prop gets serialised into the page's RSC payload;
 * narrowing it keeps startHere (all-module.html's NOTE 2: extracted but
 * never rendered) out of the client bundle entirely, not just off-screen.
 */
export interface ModuleRowModule {
  module: number;
  title: string;
  promise: string;
  whatItDoes: string;
}

/**
 * One accordion row on /modules — all-module.html's per-module binding.
 * Nothing here is gated (NOTE 3 in the design points every "Open module"
 * link straight at /m{n}); this page is the map, not a prompt source, so
 * there is no prompt card and no Copy button at this level.
 */
export function ModuleRow({
  mod,
  stats,
  lessons,
  defaultOpen = false,
}: {
  mod: ModuleRowModule;
  stats: ModuleStats;
  lessons: ModuleRowLessonSummary[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const c = ALL_MODULES_CONTENT;
  const buttonId = `b-${mod.module}`;
  const panelId = `p-${mod.module}`;
  const numberPrinted = String(mod.module).padStart(2, "0");
  const [introPage, promptPage] = stats.pageRange.split("–").map(Number);
  const printedPages =
    Number.isFinite(introPage) && Number.isFinite(promptPage) ? promptPage - introPage + 1 : "";

  return (
    <div className={styles.lrow}>
      <h3 className={styles.lrowH}>
        <button
          id={buttonId}
          type="button"
          className={`${styles.lrowBtn} ${styles.withPromise}`}
          aria-controls={panelId}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.ln}>{numberPrinted}</span>
          <span className={styles.lt2}>{mod.title}</span>
          <span className={styles.lpromise}>{mod.promise}</span>
          <span className={styles.lp}>
            {stats.lessonCount} {c.modstatFrameworksLabel.toLowerCase()} &middot; pp.{" "}
            {stats.pageRange}
          </span>
          <span className={styles.lx} aria-hidden="true">
            <svg className="i" width="15" height="15" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.lpanel} hidden={!open}>
        <div className={styles.mods}>
          <div className={styles.modstat}>
            <b>{stats.lessonCount}</b>
            <span>{c.modstatFrameworksLabel}</span>
          </div>
          <div className={styles.modstat}>
            <b>{stats.roleCount}</b>
            <span>{c.modstatRolesLabel}</span>
          </div>
          <div className={styles.modstat}>
            <b>{printedPages}</b>
            <span>{c.modstatPagesLabel}</span>
          </div>
          <div className={styles.modstat}>
            <b>{c.modstatFreeLabel}</b>
            <span>{c.modstatFreeValue}</span>
          </div>
        </div>
        <p className={styles.mwhat}>{mod.whatItDoes}</p>
        <div className={styles.frlist}>
          <div className={styles.frhead} aria-hidden="true">
            <span>{c.frameworkListHeadNo}</span>
            <span>{c.frameworkListHeadFramework}</span>
            <span>{c.frameworkListHeadLevel}</span>
            <span>{c.frameworkListHeadPages}</span>
          </div>
          {lessons.map((lesson) => (
            <div className={styles.fr} key={lesson.lesson}>
              <span className={styles.fn}>{lesson.lesson}</span>
              <span className={styles.ft}>{lesson.titlePrinted}</span>
              <span className={`${styles.flv} ${LEVEL_CLASS[lesson.level] ?? ""}`}>{lesson.level}</span>
              <span className={styles.fp}>
                pp. {lesson.sourcePages.intro}&ndash;{lesson.sourcePages.prompt}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.macts}>
          <Link className="btn btn-blue btn-sm" href={`/m${mod.module}`}>
            {c.openModulePrefix} {numberPrinted} &mdash; {c.openModuleSuffix}
          </Link>
          <span className={styles.lockwhy}>
            All {stats.lessonCount} {c.openModuleLockWhySuffix}
          </span>
        </div>
      </div>
    </div>
  );
}
