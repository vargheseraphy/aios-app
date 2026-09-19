import fs from "node:fs";
import path from "node:path";
import { moduleParam, parseModuleParam } from "@/lib/content";

/**
 * Parallel data layer for content-v2 — the richer per-lesson/per-module
 * dataset (see content-v2/README.md), consumed only by the lesson page
 * (app/[module]/[lesson]/page.tsx) and its components. lib/content.ts and
 * every page built against it are deliberately untouched — see
 * DECISIONS.md for why this stays a separate layer rather than a
 * migration.
 */

export interface SourcePages {
  intro: number;
  prompt: number;
}

export interface LessonV2 {
  module: number;
  /** e.g. "9.1" */
  lesson: string;
  title: string;
  /** the title exactly as printed, dash damage included — never "fixed" here */
  titlePrinted: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  subtitle?: string;
  sourcePages: SourcePages;
  useWhen?: string;
  howToUse?: string;
  steps?: string[];
  origin?: string;
  promptBody: string;
  proTip?: string;
  pairsWith: string[];
  extractedAt: string;
}

export interface RoleV2 {
  role: string;
  seniority: string;
  priorities: string;
  bestWhen: string;
  promptClause: string;
}

export interface RoleProfileV2 {
  internal: RoleV2[];
  outside: RoleV2[];
  question: string;
  lead: string;
  sharpen: string;
}

export interface ModuleV2 {
  module: number;
  title: string;
  subtitle: string;
  description: string;
  lessons: string[];
  roleProfile: RoleProfileV2;
}

/** "9.1" -> "01" (the two-digit file id used in content-v2/m{n}/{ll}.json). */
export function fileIdFor(lessonNumber: string): string {
  const [, fractional] = lessonNumber.split(".");
  return fractional.padStart(2, "0");
}

const CONTENT_V2_DIR = path.join(process.cwd(), "content-v2");

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

let modulesCache: ModuleV2[] | null = null;

export function getAllModulesV2(): ModuleV2[] {
  if (modulesCache) return modulesCache;
  const dir = path.join(CONTENT_V2_DIR, "modules");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort((a, b) => {
      const na = Number(a.match(/\d+/)?.[0] ?? 0);
      const nb = Number(b.match(/\d+/)?.[0] ?? 0);
      return na - nb;
    });
  modulesCache = files.map((f) => readJson<ModuleV2>(path.join(dir, f)));
  return modulesCache;
}

export function getModuleV2(moduleNumber: number): ModuleV2 | undefined {
  return getAllModulesV2().find((m) => m.module === moduleNumber);
}

const lessonCache = new Map<string, LessonV2>();

/** Reads content-v2/m{module}/{fileId}.json, cached. */
export function getLessonV2(moduleNumber: number, fileId: string): LessonV2 | undefined {
  const key = `${moduleNumber}/${fileId}`;
  if (lessonCache.has(key)) return lessonCache.get(key);
  const filePath = path.join(CONTENT_V2_DIR, `m${moduleNumber}`, `${fileId}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const lesson = readJson<LessonV2>(filePath);
  lessonCache.set(key, lesson);
  return lesson;
}

export function getLessonsForModuleV2(moduleNumber: number): LessonV2[] {
  const mod = getModuleV2(moduleNumber);
  if (!mod) return [];
  return mod.lessons
    .map((lessonId) => getLessonV2(moduleNumber, fileIdFor(lessonId)))
    .filter((l): l is LessonV2 => Boolean(l));
}

export { moduleParam, parseModuleParam };

export function getAllLessonParamsV2(): { module: string; lesson: string }[] {
  return getAllModulesV2().flatMap((m) =>
    getLessonsForModuleV2(m.module).map((l) => ({
      module: moduleParam(m.module),
      lesson: fileIdFor(l.lesson),
    })),
  );
}

/** Known content bug, unchanged in content-v2 — see DECISIONS.md. */
export function isFlaggedForReviewV2(moduleNumber: number, lessonNumber: string): boolean {
  return moduleNumber === 6 && lessonNumber === "6.6";
}

export interface SequenceItem {
  module: number;
  fileId: string;
  lesson: string;
  titlePrinted: string;
  sourcePages: SourcePages;
}

let sequenceCache: SequenceItem[] | null = null;

/** All 108 lessons, module ascending then lesson ascending — the book's own reading order. */
export function getGlobalLessonSequence(): SequenceItem[] {
  if (sequenceCache) return sequenceCache;
  sequenceCache = getAllModulesV2().flatMap((m) =>
    getLessonsForModuleV2(m.module).map((l) => ({
      module: l.module,
      fileId: fileIdFor(l.lesson),
      lesson: l.lesson,
      titlePrinted: l.titlePrinted,
      sourcePages: l.sourcePages,
    })),
  );
  return sequenceCache;
}

export interface PrevNext {
  prev: SequenceItem | null;
  next: SequenceItem | null;
}

/** Steps ±1 through the full 108-lesson sequence, crossing module boundaries. No
 * wraparound at either end of the book — the edges just omit that card. */
export function getPrevNext(moduleNumber: number, fileId: string): PrevNext {
  const seq = getGlobalLessonSequence();
  const i = seq.findIndex((s) => s.module === moduleNumber && s.fileId === fileId);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? seq[i - 1] : null,
    next: i < seq.length - 1 ? seq[i + 1] : null,
  };
}

export interface ResolvedPair {
  /** e.g. "9.2" */
  number: string;
  module: number;
  fileId: string;
  resolved: boolean;
  /** the paired lesson's own real titlePrinted, never the label embedded in pairsWith
   * (NOTE 3: that label is not always accurate) — undefined if unresolved */
  title?: string;
  sourcePages?: SourcePages;
}

/** Parses a pairsWith entry like "9.2 Burn Rate" into a real, resolved reference —
 * the number is trusted, the trailing label text is not (see NOTE 3 in lesson.html). */
export function resolvePairing(entry: string): ResolvedPair {
  const match = entry.match(/^(\d+)\.(\d+)/);
  if (!match) {
    return { number: entry, module: 0, fileId: "", resolved: false };
  }
  const [, moduleStr, fractional] = match;
  const moduleNumber = Number(moduleStr);
  const fileId = fractional.padStart(2, "0");
  const lesson = getLessonV2(moduleNumber, fileId);
  if (!lesson) {
    return { number: `${moduleStr}.${fractional}`, module: moduleNumber, fileId, resolved: false };
  }
  return {
    number: lesson.lesson,
    module: moduleNumber,
    fileId,
    resolved: true,
    title: lesson.titlePrinted,
    sourcePages: lesson.sourcePages,
  };
}

// Pure, fs-free — lives in lib/prompt-role.ts so client components (the role
// switcher) can import them without pulling this file's `node:fs` import
// into the browser bundle. Re-exported here for server-side callers.
export { parsePromptRoleLine, applyRoleClause } from "./prompt-role";
export type { PromptRoleMatch } from "./prompt-role";

export interface SharpenXref {
  number: string;
  resolved: boolean;
  module: number;
  fileId: string;
  /** the target lesson's own real title — never the text embedded in the sharpen string */
  title?: string;
}

/** Splits roleProfile.sharpen's numbered tips out from its trailing "See
 * also" reference (a pure string operation, no fs — safe to call anywhere). */
export function parseSharpenTips(sharpen: string): string[] {
  const tipsOnly = sharpen.split("→")[0].trim();
  return tipsOnly
    .replace(/^HOW TO MAKE ANY ROLE SHARPER\s*/i, "")
    .split(/\d+\.\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function normalizeTitle(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** Parses the first reference out of a roleProfile.sharpen string's trailing
 * "See also: [Framework ]N.NN Title · ..." line and resolves it against real lesson
 * data. Verified against all 10 modules' actual content-v2 data: every one of them
 * cites this same cross-reference as "Framework 1.2 Role Prompting — The Expert
 * Chair", but the lesson actually titled "Role Prompting - The Expert Chair" is 1.3
 * (content-v2/m1/03.json) — 1.2 is "The Context Stack" (content-v2/m1/02.json). The
 * mislabel is systemic and consistent, not a one-off typo, so the embedded number is
 * not trustworthy here while the embedded title is distinctive and reliable. This
 * resolves by matching the embedded title against every real lesson title first, and
 * only falls back to the embedded number if no title match is found (e.g. for some
 * other, unverified reference this function might one day see). Returns null if the
 * string carries no "See also" reference at all.
 */
export function resolveSharpenXref(sharpen: string): SharpenXref | null {
  const seeAlsoIdx = sharpen.indexOf("See also:");
  if (seeAlsoIdx === -1) return null;
  const tail = sharpen.slice(seeAlsoIdx + "See also:".length).trim();
  const firstSegment = tail.split("·")[0].trim(); // up to the first " · "
  const numberMatch = firstSegment.match(/(\d+)\.(\d+)/);
  if (!numberMatch) return null;
  const [numberText, moduleStr, fractional] = numberMatch;
  const titleText = firstSegment.slice((numberMatch.index ?? 0) + numberText.length).trim();

  if (titleText) {
    const target = normalizeTitle(titleText);
    const byTitle = getGlobalLessonSequence().find((s) => normalizeTitle(s.titlePrinted) === target);
    if (byTitle) {
      return {
        number: byTitle.lesson,
        resolved: true,
        module: byTitle.module,
        fileId: byTitle.fileId,
        title: byTitle.titlePrinted,
      };
    }
  }

  const moduleNumber = Number(moduleStr);
  const fileId = fractional.padStart(2, "0");
  const lesson = getLessonV2(moduleNumber, fileId);
  if (!lesson) {
    return { number: `${moduleStr}.${fractional}`, resolved: false, module: moduleNumber, fileId };
  }
  return {
    number: lesson.lesson,
    resolved: true,
    module: moduleNumber,
    fileId,
    title: lesson.titlePrinted,
  };
}
