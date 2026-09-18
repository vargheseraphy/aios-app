import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LessonAccordionList } from "@/components/LessonAccordionList";
import {
  getAllLessonParams,
  getResolvedLesson,
  getResolvedLessonsForModule,
  getModule,
  parseModuleParam,
} from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLessonParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}): Promise<Metadata> {
  const { module: moduleSlug, lesson: lessonParam } = await params;
  const moduleNumber = parseModuleParam(moduleSlug);
  const lesson =
    moduleNumber !== null ? getResolvedLesson(moduleNumber, lessonParam) : undefined;
  if (!lesson) return {};
  return {
    title: `${lesson.lesson} ${lesson.title} — AI Operating System for Leaders`,
    description: `Framework ${lesson.lesson}: ${lesson.title}. A ready-to-copy AI prompt from AI Operating System for Leaders.`,
  };
}

/**
 * This is the QR target — `/m{module}/{lesson}`. No sign-in, no
 * interstitial, no database call: static content only.
 */
export default async function LessonPage({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}) {
  const { module: moduleSlug, lesson: lessonParam } = await params;
  const moduleNumber = parseModuleParam(moduleSlug);
  const mod = moduleNumber !== null ? getModule(moduleNumber) : undefined;
  const lesson =
    moduleNumber !== null ? getResolvedLesson(moduleNumber, lessonParam) : undefined;
  if (!mod || !lesson || moduleNumber === null) notFound();

  const lessons = getResolvedLessonsForModule(moduleNumber);

  return (
    <main>
      <div className="pad py-16">
        <div className="kicker">
          Module {mod.module} of 10 · Framework {lesson.lesson}
        </div>
        <h1 className="mt-3 max-w-[32ch] text-section font-display font-extrabold tracking-[-0.028em]">
          {mod.title}
        </h1>
        <p className="mt-4 max-w-[62ch] text-body text-fg-1">{mod.subtitle}</p>
      </div>
      <div className="pad pb-24">
        <LessonAccordionList lessons={lessons} expandedFileId={lesson.fileId} />
      </div>
    </main>
  );
}
