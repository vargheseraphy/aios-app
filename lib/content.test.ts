import { describe, expect, it } from "vitest";
import {
  getAllLessonParams,
  getAllModuleParams,
  getAllModules,
  getLesson,
  getLessonsForModule,
  getModule,
  isFlaggedForReview,
  parsePairing,
} from "./content";

describe("content", () => {
  it("reads all 10 modules in order", () => {
    const modules = getAllModules();
    expect(modules).toHaveLength(10);
    expect(modules.map((m) => m.module)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("reads all 108 lessons across modules", () => {
    const total = getAllModules().reduce(
      (sum, m) => sum + getLessonsForModule(m.module).length,
      0,
    );
    expect(total).toBe(108);
  });

  it("maps a module number to its content", () => {
    const module1 = getModule(1);
    expect(module1?.title).toBe("Think Like a Strategist");
  });

  it("maps a module + file id to a lesson", () => {
    const lesson = getLesson(1, "01");
    expect(lesson?.lesson).toBe("1.1");
    expect(lesson?.title).toBe("C.A.R.E Prompting");
  });

  it("flags lesson 6.6 for review and nothing else", () => {
    const flagged = getLesson(6, "06");
    expect(flagged && isFlaggedForReview(flagged)).toBe(true);

    const notFlagged = getLesson(6, "07");
    expect(notFlagged && isFlaggedForReview(notFlagged)).toBe(false);
  });

  it("parses a pairing entry into a resolved link", () => {
    const pairing = parsePairing("6.4 Hiring");
    expect(pairing.module).toBe(6);
    expect(pairing.fileId).toBe("04");
    expect(pairing.label).toBe("Hiring");
    expect(pairing.resolved).toBe(true);
  });

  it("generates static params covering all modules and lessons", () => {
    expect(getAllModuleParams()).toHaveLength(10);
    expect(getAllLessonParams()).toHaveLength(108);
  });
});
