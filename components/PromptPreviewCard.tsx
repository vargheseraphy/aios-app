import { CopyButton } from "./CopyButton";
import { PromptBody } from "./LessonPromptCard";

/**
 * A compact "example prompt" card — the marketing pages' equivalent of the
 * locked design's `.promptcard` mock (why-this-book's "inside the book",
 * who-its-for's five seat panels). Shows the real lesson prompt verbatim
 * (same source JSON the lesson page copies), not a hand-shortened excerpt,
 * so the Copy button here and on `/m{module}/{lesson}` always agree.
 */
export function PromptPreviewCard({
  lessonId,
  title,
  moduleLabel,
  prompt,
  pairsWith,
}: {
  lessonId: string;
  title: string;
  moduleLabel: string;
  prompt: string;
  pairsWith: string[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#23262E] bg-ink shadow-[0_30px_60px_-30px_rgba(10,14,25,0.5)]">
      <div className="flex flex-wrap items-center gap-[10px] border-b border-line-d bg-panel px-4 py-[13px]">
        <span className="rounded-[5px] border border-blue-hi/30 px-[7px] py-[3px] font-mono text-[10.5px] text-blue-hi">
          {lessonId}
        </span>
        <span className="font-display text-[13.5px] font-bold text-white">{title}</span>
        <span className="ml-auto font-mono text-[10.5px] text-fg-3">{moduleLabel}</span>
      </div>
      <pre className="whitespace-pre-wrap break-words px-[18px] py-5 font-mono text-[12.5px] leading-[1.85] text-white/88">
        <PromptBody prompt={prompt} />
      </pre>
      <div className="flex flex-wrap items-center gap-[10px] border-t border-line-d bg-panel px-4 py-[13px]">
        {pairsWith.length > 0 && (
          <span className="text-[11.5px] text-fg-3">Pairs with {pairsWith.join(" · ")}</span>
        )}
        <CopyButton text={prompt} className="ml-auto" />
      </div>
    </div>
  );
}
