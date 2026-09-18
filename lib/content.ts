import fs from "node:fs";
import path from "node:path";

export interface SourcePages {
  intro: number;
  prompt: number;
}

export interface Lesson {
  module: number;
  /** e.g. "6.6" */
  lesson: string;
  title: string;
  sourcePages: SourcePages;
  prompt: string;
  /** free-text pairings, e.g. "6.4 Hiring" */
  pairsWith: string[];
  updatedAt: string;
}

export interface LessonWithFileId extends Lesson {
  /** two-digit file id used in the URL, e.g. "06" for lesson "6.6" */
  fileId: string;
}

export interface Module {
  module: number;
  title: string;
  subtitle: string;
  description: string;
  /** ordered lesson ids, e.g. "1.0" */
  lessons: string[];
}

export interface Pairing {
  /** e.g. "6.4" */
  lessonId: string;
  module: number;
  fileId: string;
  label: string;
  /** false if the paired lesson id doesn't resolve to a real lesson file */
  resolved: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

let modulesCache: Module[] | null = null;

export function getAllModules(): Module[] {
  if (modulesCache) return modulesCache;
  const dir = path.join(CONTENT_DIR, "modules");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort((a, b) => moduleNumberFromFile(a) - moduleNumberFromFile(b));
  modulesCache = files.map((f) => readJson<Module>(path.join(dir, f)));
  return modulesCache;
}

function moduleNumberFromFile(fileName: string): number {
  return Number(fileName.replace(/^m/, "").replace(/\.json$/, ""));
}

export function getModule(moduleNumber: number): Module | undefined {
  return getAllModules().find((m) => m.module === moduleNumber);
}

const lessonsByModuleCache = new Map<number, LessonWithFileId[]>();

export function getLessonsForModule(moduleNumber: number): LessonWithFileId[] {
  const cached = lessonsByModuleCache.get(moduleNumber);
  if (cached) return cached;

  const dir = path.join(CONTENT_DIR, `m${moduleNumber}`);
  if (!fs.existsSync(dir)) {
    lessonsByModuleCache.set(moduleNumber, []);
    return [];
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const lessons = files.map((f) => {
    const lesson = readJson<Lesson>(path.join(dir, f));
    return { ...lesson, fileId: f.replace(/\.json$/, "") };
  });

  lessonsByModuleCache.set(moduleNumber, lessons);
  return lessons;
}

export function getLesson(
  moduleNumber: number,
  fileId: string,
): LessonWithFileId | undefined {
  return getLessonsForModule(moduleNumber).find((l) => l.fileId === fileId);
}

/**
 * The `module` route param carries the `m` prefix itself (e.g. "m6"), not
 * just the number — `app/[module]` can't be named `app/m[module]` to get a
 * literal "m" prefix in the URL, since Turbopack (Next.js 16.3.5) doesn't
 * substitute static params into a folder name that mixes literal text with
 * a bracket (confirmed via the prerender manifest emitting the literal
 * string "m[module]" instead of "m1", "m6", ...). Baking the prefix into
 * the param value instead is the portable fix — see DECISIONS.md.
 */
export function moduleParam(moduleNumber: number): string {
  return `m${moduleNumber}`;
}

/** "m6" -> 6, or null if the param isn't in that shape. */
export function parseModuleParam(param: string): number | null {
  const match = param.match(/^m(\d+)$/);
  return match ? Number(match[1]) : null;
}

export function getAllModuleParams(): { module: string }[] {
  return getAllModules().map((m) => ({ module: moduleParam(m.module) }));
}

export function getAllLessonParams(): { module: string; lesson: string }[] {
  return getAllModules().flatMap((m) =>
    getLessonsForModule(m.module).map((l) => ({
      module: moduleParam(m.module),
      lesson: l.fileId,
    })),
  );
}

/**
 * Parses a free-text pairing entry like "6.4 Hiring" into a linkable
 * reference. Falls back to an unresolved pairing (no link) if the text
 * doesn't start with a recognisable lesson id.
 */
export function parsePairing(entry: string): Pairing {
  const match = entry.match(/^(\d+)\.(\d+)\s*(.*)$/);
  if (!match) {
    return { lessonId: entry, module: 0, fileId: "", label: entry, resolved: false };
  }
  const [, moduleStr, fractional, label] = match;
  const moduleNumber = Number(moduleStr);
  const fileId = fractional.padStart(2, "0");
  const resolved = Boolean(getLesson(moduleNumber, fileId));
  return {
    lessonId: `${moduleStr}.${fractional}`,
    module: moduleNumber,
    fileId,
    label: label || `${moduleStr}.${fractional}`,
    resolved,
  };
}

/** Known content bug flagged in DECISIONS.md — do not silently ship it. */
export function isFlaggedForReview(lesson: Lesson): boolean {
  return lesson.module === 6 && lesson.lesson === "6.6";
}

export interface ResolvedLesson extends LessonWithFileId {
  pairings: Pairing[];
  flaggedForReview: boolean;
}

function ensureAllModulesLoaded(): void {
  getAllModules().forEach((m) => getLessonsForModule(m.module));
}

/**
 * Like `getLessonsForModule`, but with pairings resolved into links and the
 * 6.6 review flag pre-computed — so presentational components (some of
 * which render inside client component trees) never need to import this
 * fs-backed module themselves, only the plain `ResolvedLesson` type.
 */
export function getResolvedLessonsForModule(moduleNumber: number): ResolvedLesson[] {
  ensureAllModulesLoaded();
  return getLessonsForModule(moduleNumber).map((lesson) => ({
    ...lesson,
    pairings: lesson.pairsWith.map(parsePairing),
    flaggedForReview: isFlaggedForReview(lesson),
  }));
}

export function getResolvedLesson(
  moduleNumber: number,
  fileId: string,
): ResolvedLesson | undefined {
  return getResolvedLessonsForModule(moduleNumber).find((l) => l.fileId === fileId);
}
