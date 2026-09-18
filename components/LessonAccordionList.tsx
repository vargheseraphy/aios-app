"use client";

import { useEffect, useRef } from "react";
import { Accordion, AccordionItem } from "./Accordion";
import { BookmarkButton } from "./BookmarkButton";
import { LessonPromptCard } from "./LessonPromptCard";
import type { ResolvedLesson } from "@/lib/content";

/**
 * Renders every lesson in a module as an accordion. When `expandedFileId`
 * is set (the QR/lesson-deep-link route), that item is open in the
 * server-rendered HTML already — the effect below only handles scrolling
 * it into view, so the prompt is visible even before hydration finishes.
 */
export function LessonAccordionList({
  lessons,
  expandedFileId,
}: {
  lessons: ResolvedLesson[];
  expandedFileId?: string;
}) {
  const scrolledRef = useRef(false);

  useEffect(() => {
    if (!expandedFileId || scrolledRef.current) return;
    scrolledRef.current = true;
    document
      .getElementById(`lesson-${expandedFileId}`)
      ?.scrollIntoView({ block: "start" });
  }, [expandedFileId]);

  return (
    <Accordion variant="dark">
      {lessons.map((lesson) => (
        <AccordionItem
          key={lesson.fileId}
          id={`lesson-${lesson.fileId}`}
          defaultOpen={lesson.fileId === expandedFileId}
          className="scroll-mt-20"
          variant="dark"
          actions={<BookmarkButton lessonId={lesson.lesson} />}
          trigger={
            <span className="flex items-baseline gap-3">
              <span className="font-mono text-[12px] text-blue-hi">
                {lesson.lesson}
              </span>
              <span>{lesson.title}</span>
            </span>
          }
        >
          <LessonPromptCard lesson={lesson} />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
