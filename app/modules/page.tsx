import type { Metadata } from "next";
import {
  getAllModulesV2,
  getLessonsForModuleV2,
  getModuleStatsV2,
  getBookStatsV2,
} from "@/lib/content-v2";
import { SeamStrip } from "@/components/modules/SeamStrip";
import { PageHeadBand } from "@/components/modules/PageHeadBand";
import { TocRail, type TocItem } from "@/components/modules/TocRail";
import { ModuleRow } from "@/components/modules/ModuleRow";
import { AboutSpread } from "@/components/modules/AboutSpread";
import { JoinBand } from "@/components/modules/JoinBand";
import { ALL_MODULES_CONTENT } from "@/lib/pages-content";
import styles from "@/components/modules/modulePage.module.css";

export const metadata: Metadata = {
  title: "All Ten Modules — AI Operating System for Leaders",
  description:
    "The ten modules of AI Operating System for Leaders — what each one covers, the frameworks inside it, and where to copy the prompts. Free, no account.",
  openGraph: {
    title: "All ten modules · AIOS",
    description: "108 frameworks across 10 modules. What each module does, and every framework inside it.",
    type: "article",
  },
};

/**
 * /modules — the book's map, one level up from /m{module}: the same
 * accordion, opening to what a module does and every framework inside it
 * rather than a copy-ready prompt. Nothing here is gated, per all-module
 * .html's own thesis — every "Open module" link goes straight to /m{n}.
 */
export default function AllModulesPage() {
  const modules = getAllModulesV2();
  const bookStats = getBookStatsV2();
  const c = ALL_MODULES_CONTENT;

  const tocItems: TocItem[] = modules.map((mod) => ({
    id: String(mod.module),
    number: String(mod.module).padStart(2, "0"),
    title: mod.title,
    ariaLabel: `Go to module ${String(mod.module).padStart(2, "0")}, ${mod.title}`,
  }));

  return (
    <main className={styles.page}>
      <SeamStrip backHref="/" backLabel={c.backLabel}>
        <b>{bookStats.lessonCount} frameworks</b>
        <span className={styles.dim}> &middot; </span>
        {bookStats.moduleCount} modules
        <span className={styles.seamLong}>
          <span className={styles.dim}> &middot; {c.seamNote}</span>
        </span>
      </SeamStrip>

      <PageHeadBand
        kicker={c.kicker}
        title={c.heading}
        subtitle={c.subheading}
        chips={[
          { label: c.chipModulesLabel, value: bookStats.moduleCount },
          { label: c.chipFrameworksLabel, value: bookStats.lessonCount },
          { label: c.chipPagesLabel, value: bookStats.pageRange },
          { label: c.chipPromptsLabel, value: c.chipPromptsValue },
        ]}
      />

      <div className={`pad ${styles.mgrid}`}>
        <TocRail
          heading={`${bookStats.moduleCount} ${c.tocHeading}`}
          items={tocItems}
          sectionsHeading={c.tocSectionsHeading}
          sections={[
            { href: "#lessons", label: c.sectionModulesLabel },
            { href: "#about", label: c.sectionAboutLabel },
            { href: "#join", label: c.sectionJoinLabel },
          ]}
        />

        <div>
          <div id="lessons">
            <div className={styles.lhead2}>
              <h2>{c.modulesHeading}</h2>
              <p>{c.modulesSub}</p>
            </div>
            <div className={styles.lessons}>
              {modules.map((mod, i) => {
                const stats = getModuleStatsV2(mod.module);
                if (!stats) return null;
                return (
                  <ModuleRow
                    key={mod.module}
                    mod={{
                      module: mod.module,
                      title: mod.title,
                      promise: mod.promise,
                      whatItDoes: mod.whatItDoes,
                    }}
                    stats={stats}
                    lessons={getLessonsForModuleV2(mod.module).map((lesson) => ({
                      lesson: lesson.lesson,
                      titlePrinted: lesson.titlePrinted,
                      level: lesson.level,
                      sourcePages: lesson.sourcePages,
                    }))}
                    defaultOpen={i === 0}
                  />
                );
              })}
            </div>
          </div>

          <AboutSpread
            heading={c.aboutHeading}
            lead={`Ten modules, ${bookStats.lessonCount} frameworks, one prompt each.`}
            body={c.aboutBody}
            stats={[
              { label: c.spreadModulesLabel, value: bookStats.moduleCount, color: "var(--blue)" },
              { label: c.spreadFrameworksLabel, value: bookStats.lessonCount, color: "#1B7A3C" },
              {
                label: c.spreadRoleProfilesLabel,
                value: bookStats.roleProfileCount,
                color: "#8A5B00",
              },
              {
                label: c.spreadPrintedLabel,
                value: `Pages ${bookStats.pageRange}`,
                color: "var(--gray-l2)",
              },
            ]}
          />
        </div>
      </div>

      <JoinBand />
    </main>
  );
}
