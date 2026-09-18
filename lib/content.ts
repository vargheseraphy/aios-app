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

export function getAllModuleParams(): { module: string }[] {
  return getAllModules().map((m) => ({ module: String(m.module) }));
}

export function getAllLessonParams(): { module: string; lesson: string }[] {
  return getAllModules().flatMap((m) =>
    getLessonsForModule(m.module).map((l) => ({
      module: String(m.module),
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
