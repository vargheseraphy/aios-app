import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllModulesV2,
  getModuleV2,
  getLessonsForModuleV2,
  getModuleStatsV2,
  isFlaggedForReviewV2,
  fileIdFor,
  moduleParam,
  parseModuleParam,
} from "@/lib/content-v2";
import { SeamStrip } from "@/components/modules/SeamStrip";
import { PageHeadBand } from "@/components/modules/PageHeadBand";
import { TocRail, type TocItem } from "@/components/modules/TocRail";
import { LessonRow } from "@/components/modules/LessonRow";
import { AboutSpread } from "@/components/modules/AboutSpread";
import { WhySignupBand } from "@/components/modules/WhySignupBand";
import { JoinBand } from "@/components/modules/JoinBand";
import { EACH_MODULE_CONTENT } from "@/lib/pages-content";
import styles from "@/components/modules/modulePage.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllModulesV2().map((m) => ({ module: moduleParam(m.module) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module: moduleSlug } = await params;
  const moduleNumber = parseModuleParam(moduleSlug);
  const mod = moduleNumber !== null ? getModuleV2(moduleNumber) : undefined;
  if (!mod) return {};
  const numberPrinted = String(mod.module).padStart(2, "0");
  return {
    title: `${mod.title} · Module ${numberPrinted} · AI Operating System for Leaders`,
    description: `Module ${numberPrinted} of AI Operating System for Leaders — all ${mod.lessons.length} prompts, free to copy, no account needed.`,
    openGraph: {
      title: `${mod.title} · Module ${numberPrinted} · AIOS`,
      description: `${mod.lessons.length} frameworks, ${mod.lessons.length} prompts, free to copy. Module ${numberPrinted} of AI Operating System for Leaders.`,
      type: "article",
    },
  };
}

/**
 * /m{module} — the module QR target. Every prompt in the module is open and
 * copy-ready with no account, per each-module.html's DIRECTION CONTRACT.
 * "View full lesson" links straight to /m{module}/{lesson} for every
 * visitor; that page's own sign-in gate is a separate, later change, not
 * this one — see DECISIONS.md.
 */
export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleSlug } = await params;
  const moduleNumber = parseModuleParam(moduleSlug);
  const mod = moduleNumber !== null ? getModuleV2(moduleNumber) : undefined;
  const stats = moduleNumber !== null ? getModuleStatsV2(moduleNumber) : undefined;
  if (!mod || !stats || moduleNumber === null) notFound();

  const lessons = getLessonsForModuleV2(moduleNumber);
  const numberPrinted = String(moduleNumber).padStart(2, "0");
  const c = EACH_MODULE_CONTENT;

  const tocItems: TocItem[] = lessons.map((lesson) => {
    const fileId = fileIdFor(lesson.lesson);
    return {
      id: fileId,
      number: lesson.lesson,
      title: lesson.titlePrinted,
      ariaLabel: `Go to ${lesson.lesson} ${lesson.titlePrinted}`,
    };
  });

  return (
    <main className={styles.page}>
      <SeamStrip backHref="/modules" backLabel={c.backLabel}>
        <b>Module {numberPrinted}</b>
        <span className={styles.dim}> &middot; </span>
        Pages {stats.pageRange}
        <span className={styles.seamLong}>
          <span className={styles.dim}> &middot; {c.seamNote}</span>
        </span>
      </SeamStrip>

      <PageHeadBand
        kicker={<>Module {numberPrinted}</>}
        title={mod.title}
        subtitle={mod.subtitle}
        chips={[
          { label: c.chipFrameworksLabel, value: stats.lessonCount },
          { label: c.chipPagesLabel, value: stats.pageRange },
          { label: c.chipPromptsLabel, value: c.chipPromptsValue },
        ]}
      />

      <div className={`pad ${styles.mgrid}`}>
        <TocRail
          heading={`${stats.lessonCount} ${c.tocFrameworksSuffix}`}
          items={tocItems}
          sectionsHeading={c.tocSectionsHeading}
          sections={[
            { href: "#lessons", label: c.sectionLessonsLabel },
            { href: "#about", label: c.sectionAboutLabel },
            { href: "#why", label: c.sectionWhyLabel },
            { href: "#join", label: c.sectionJoinLabel },
          ]}
        />

        <div>
          <div id="lessons">
            <div className={styles.lhead2}>
              <h2>{c.lessonsHeading}</h2>
              <p>{c.lessonsSub}</p>
            </div>
            <div className={styles.lessons}>
              {lessons.map((lesson, i) => (
                <LessonRow
                  key={lesson.lesson}
                  lesson={{
                    lesson: lesson.lesson,
                    titlePrinted: lesson.titlePrinted,
                    level: lesson.level,
                    subtitle: lesson.subtitle,
                    sourcePages: lesson.sourcePages,
                    promptBody: lesson.promptBody,
                  }}
                  fileId={fileIdFor(lesson.lesson)}
                  moduleNumber={moduleNumber}
                  flagged={isFlaggedForReviewV2(moduleNumber, lesson.lesson)}
                  defaultOpen={i === 0}
                />
              ))}
            </div>
          </div>

          <AboutSpread
            heading={c.aboutHeading}
            lead={mod.subtitle}
            body={mod.description}
            stats={[
              { label: c.spreadBeginnerLabel, value: stats.levelCount.beginner, color: "#1B7A3C" },
              {
                label: c.spreadIntermediateLabel,
                value: stats.levelCount.intermediate,
                color: "#1E5CE0",
              },
              { label: c.spreadAdvancedLabel, value: stats.levelCount.advanced, color: "#8A5B00" },
              { label: c.spreadPrintedLabel, value: `Pages ${stats.pageRange}`, color: "var(--gray-l2)" },
            ]}
          />

          <WhySignupBand roleCount={stats.roleCount} />
        </div>
      </div>

      <JoinBand />
    </main>
  );
}
