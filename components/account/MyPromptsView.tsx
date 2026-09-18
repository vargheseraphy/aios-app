"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getMyBookmarkedLessons,
  toggleBookmark,
  type MyBookmarkedLesson,
} from "@/lib/actions/bookmarks";

export function MyPromptsView() {
  const [lessons, setLessons] = useState<MyBookmarkedLesson[] | null>(null);

  useEffect(() => {
    getMyBookmarkedLessons().then(setLessons);
  }, []);

  async function handleRemove(lessonId: string) {
    setLessons((prev) => prev?.filter((l) => l.lessonId !== lessonId) ?? prev);
    await toggleBookmark(lessonId);
  }

  return (
    <div className="pad mx-auto max-w-[640px] py-16">
      <h1 className="mb-8 font-display text-[28px] font-bold text-white">My prompts</h1>

      {lessons === null && <p className="text-[13px] text-fg-2">Loading…</p>}

      {lessons?.length === 0 && (
        <p className="text-[13.5px] leading-relaxed text-fg-1">
          No bookmarks yet. Open any lesson and tap the bookmark icon to save it here.
        </p>
      )}

      {lessons && lessons.length > 0 && (
        <ul className="space-y-2.5">
          {lessons.map((lesson) => (
            <li
              key={lesson.lessonId}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-panel px-4 py-3.5"
            >
              <Link
                href={`/m${lesson.module}/${lesson.fileId}`}
                className="flex items-baseline gap-3 hover:text-blue-hi"
              >
                <span className="font-mono text-[12px] text-blue-hi">{lesson.lessonId}</span>
                <span className="text-[13.5px] text-white">{lesson.title}</span>
              </Link>
              <button
                type="button"
                onClick={() => handleRemove(lesson.lessonId)}
                className="cursor-pointer text-[12px] text-fg-3 hover:text-red"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
