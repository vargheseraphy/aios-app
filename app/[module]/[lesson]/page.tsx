import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllLessonParamsV2,
  getLessonV2,
  getModuleV2,
  getLessonsForModuleV2,
  getGlobalLessonSequence,
  getPrevNext,
  isFlaggedForReviewV2,
  parsePromptRoleLine,
  resolvePairing,
  resolveSharpenXref,
  parseSharpenTips,
  fileIdFor,
  parseModuleParam,
} from "@/lib/content-v2";
import { SeamBar, LessonHead } from "@/components/lesson/LessonHead";
import { PromptAndRoles } from "@/components/lesson/PromptAndRoles";
import {
  UseWhenSection,
  HowToUseSection,
  MethodSteps,
  OriginBlock,
} from "@/components/lesson/SimpleSections";
import { PairsRail } from "@/components/lesson/PairsRail";
import { Sidebar, type JumpLink } from "@/components/lesson/Sidebar";
import { ModuleRail } from "@/components/lesson/ModuleRail";
import { MaintenancePanel } from "@/components/lesson/MaintenancePanel";
import { SaveBand } from "@/components/lesson/SaveBand";
import gridStyles from "@/components/lesson/grid.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLessonParamsV2();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}): Promise<Metadata> {
  const { module: moduleSlug, lesson: lessonParam } = await params;
  const moduleNumber = parseModuleParam(moduleSlug);
  const lesson = moduleNumber !== null ? getLessonV2(moduleNumber, lessonParam) : undefined;
  if (!lesson) return {};
  // All three derive from titlePrinted so the title never shows three different
  // strings across the tab, search results and social previews.
  return {
    title: lesson.titlePrinted,
    description: `${lesson.titlePrinted} — framework ${lesson.lesson} from AI Operating System for Leaders. Free, no account.`,
    openGraph: {
      title: `${lesson.titlePrinted} · ${lesson.lesson} · AIOS`,
      description: "Framework from AI Operating System for Leaders. The prompt, kept current.",
      type: "article",
    },
  };
}

/**
 * This is the QR target — `/m{module}/{lesson}`. No sign-in, no
 * interstitial, no database call: static content only, read from
 * content-v2 at build time. See DECISIONS.md for why this lives on a
 * separate data layer from the rest of the site.
 */
export default async function LessonPage({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}) {
  const { module: moduleSlug, lesson: lessonParam } = await params;
  const moduleNumber = parseModuleParam(moduleSlug);
  const lesson = moduleNumber !== null ? getLessonV2(moduleNumber, lessonParam) : undefined;
  const mod = moduleNumber !== null ? getModuleV2(moduleNumber) : undefined;
  if (!mod || !lesson || moduleNumber === null) notFound();

  const flagged = isFlaggedForReviewV2(moduleNumber, lesson.lesson);
  const roleMatch = parsePromptRoleLine(lesson.promptBody);
  const pairs = lesson.pairsWith.map(resolvePairing);
  const prevNext = getPrevNext(moduleNumber, lessonParam);
  const sharpenTips = parseSharpenTips(mod.roleProfile.sharpen);
  const sharpenXref = resolveSharpenXref(mod.roleProfile.sharpen);
  const totalLessons = getGlobalLessonSequence().length;

  const moduleLessons = getLessonsForModuleV2(moduleNumber);
  const moduleRailRows = moduleLessons.map((l) => ({
    lesson: l.lesson,
    fileId: fileIdFor(l.lesson),
    titlePrinted: l.titlePrinted,
    sourcePages: l.sourcePages,
    current: l.lesson === lesson.lesson,
  }));
  const pageRange = moduleLessons.length
    ? `${moduleLessons[0].sourcePages.intro}–${moduleLessons[moduleLessons.length - 1].sourcePages.prompt}`
    : "";

  // Only jump-link to a section that's actually rendered below — several
  // fields are genuinely absent on some lessons (see DECISIONS.md).
  const jumpLinks: JumpLink[] = [{ href: "#prompt", label: "The prompt" }];
  if (lesson.useWhen) jumpLinks.push({ href: "#usewhen", label: "Use this when" });
  if (lesson.howToUse) jumpLinks.push({ href: "#howto", label: "How the framework works" });
  if (lesson.steps && lesson.steps.length > 0) {
    jumpLinks.push({ href: "#method", label: "The method" });
  }
  jumpLinks.push({ href: "#roles", label: "Who should run this prompt" });
  if (lesson.origin) jumpLinks.push({ href: "#origin", label: "Where it comes from" });
  if (pairs.length > 0) jumpLinks.push({ href: "#pairs", label: "Pairs well with" });
  jumpLinks.push({ href: "#module", label: "The rest of the module" });

  return (
    <main>
      <SeamBar
        sourcePages={lesson.sourcePages}
        moduleNumber={moduleNumber}
        moduleTitle={mod.title}
      />
      <LessonHead
        lessonNumber={lesson.lesson}
        level={lesson.level}
        moduleNumber={moduleNumber}
        moduleTitle={mod.title}
        titlePrinted={lesson.titlePrinted}
        subtitle={lesson.subtitle}
      />

      <div className={`pad ${gridStyles.lgrid}`}>
        <div className={gridStyles.colMain}>
          <PromptAndRoles
            lessonId={lesson.lesson}
            lessonNumber={lesson.lesson}
            title={lesson.title}
            promptBody={lesson.promptBody}
            proTip={lesson.proTip}
            flagged={flagged}
            roleMatches={roleMatch.matches}
            roleProfile={mod.roleProfile}
            sharpenTips={sharpenTips}
            sharpenXref={sharpenXref}
          />
          {lesson.useWhen && <UseWhenSection text={lesson.useWhen} />}
          {lesson.howToUse && <HowToUseSection text={lesson.howToUse} />}
          {lesson.steps && lesson.steps.length > 0 && <MethodSteps steps={lesson.steps} />}
          {lesson.origin && <OriginBlock text={lesson.origin} />}
          <PairsRail pairs={pairs} />
        </div>

        <Sidebar
          jumpLinks={jumpLinks}
          level={lesson.level}
          sourcePages={lesson.sourcePages}
          moduleNumber={moduleNumber}
          moduleTitle={mod.title}
          lessonCount={moduleLessons.length}
        />
      </div>

      <ModuleRail
        moduleNumber={moduleNumber}
        moduleTitle={mod.title}
        moduleSubtitle={mod.subtitle}
        pageRange={pageRange}
        rows={moduleRailRows}
        prevNext={prevNext}
      />

      <MaintenancePanel
        lessonNumber={lesson.lesson}
        totalLessons={totalLessons}
        sourcePages={lesson.sourcePages}
        extractedAt={lesson.extractedAt}
      />

      <SaveBand />
    </main>
  );
}
