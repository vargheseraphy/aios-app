import Link from "next/link";
import { CopyButton } from "./CopyButton";
import type { ResolvedLesson } from "@/lib/content";

function formatUpdatedAt(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Renders [BRACKETED PLACEHOLDERS] in blue, everything else plain. */
export function PromptBody({ prompt }: { prompt: string }) {
  const parts = prompt.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span key={i} className="text-blue-hi font-medium">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function LessonPromptCard({ lesson }: { lesson: ResolvedLesson }) {
  const flagged = lesson.flaggedForReview;
  const pairings = lesson.pairings;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink">
      <div className="flex flex-wrap items-center gap-[10px] border-b border-line-d bg-panel px-4 py-[13px]">
        <span className="rounded-[5px] border border-blue-hi/30 px-[7px] py-[3px] font-mono text-[10.5px] text-blue-hi">
          {lesson.lesson}
        </span>
        <span className="font-display text-[13.5px] font-bold text-white">
          {lesson.title}
        </span>
        <span className="ml-auto font-mono text-[10.5px] text-fg-3">
          updated {formatUpdatedAt(lesson.updatedAt)}
        </span>
      </div>

      <div className="px-[18px] py-5">
        {flagged && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red/40 bg-red/10 px-3.5 py-3 text-[13px] leading-relaxed text-white"
          >
            <strong className="font-display font-bold text-red">
              Prompt under review.
            </strong>{" "}
            This lesson&apos;s prompt is being corrected and shouldn&apos;t be
            used yet — the text below is a known duplicate copied from another
            framework in the printed book.
          </div>
        )}
        <pre className="whitespace-pre-wrap break-words font-mono text-[12.5px] leading-[1.95] text-white/88">
          <PromptBody prompt={lesson.prompt} />
        </pre>
      </div>

      <div className="flex flex-wrap items-center gap-[10px] border-t border-line-d bg-panel px-4 py-[13px]">
        {pairings.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-fg-3">
            <span>pairs with</span>
            {pairings.map((pairing, i) =>
              pairing.resolved ? (
                <Link
                  key={i}
                  href={`/m${pairing.module}/${pairing.fileId}`}
                  className="rounded border border-line-d2 px-[7px] py-[2px] text-fg-1 hover:border-blue-hi hover:text-blue-hi"
                >
                  {pairing.lessonId} {pairing.label}
                </Link>
              ) : (
                <span key={i} className="rounded border border-line-d2 px-[7px] py-[2px]">
                  {pairing.label}
                </span>
              ),
            )}
          </div>
        )}
        <div className="ml-auto">
          {!flagged && <CopyButton text={lesson.prompt} />}
        </div>
      </div>
    </div>
  );
}
