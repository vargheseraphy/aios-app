import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LessonAccordionList } from "@/components/LessonAccordionList";
import {
  getAllModuleParams,
  getResolvedLessonsForModule,
  getModule,
  parseModuleParam,
} from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllModuleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module: moduleSlug } = await params;
  const moduleNumber = parseModuleParam(moduleSlug);
  const mod = moduleNumber !== null ? getModule(moduleNumber) : undefined;
  if (!mod) return {};
  return {
    title: `${mod.title} — AI Operating System for Leaders`,
    description: mod.subtitle,
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleSlug } = await params;
  const moduleNumber = parseModuleParam(moduleSlug);
  const mod = moduleNumber !== null ? getModule(moduleNumber) : undefined;
  if (!mod || moduleNumber === null) notFound();

  const lessons = getResolvedLessonsForModule(moduleNumber);

  return (
    <main>
      <div className="pad py-16">
        <div className="kicker">
          Module {mod.module} of 10
        </div>
        <h1 className="mt-3 max-w-[32ch] text-section font-display font-extrabold tracking-[-0.028em]">
          {mod.title}
        </h1>
        <p className="mt-4 max-w-[62ch] text-body text-fg-1">
          {mod.subtitle}
        </p>
      </div>
      <div className="pad pb-24">
        <LessonAccordionList lessons={lessons} />
      </div>
    </main>
  );
}
