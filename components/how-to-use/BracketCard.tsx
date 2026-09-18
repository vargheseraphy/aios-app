"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import styles from "./how-to-use.module.css";

/** Matches a `[...]` group, allowing one level of nesting (e.g. the Action
 * line's `[WHAT YOU WANT ... [MARKET / REGION]]`) so the whole outer phrase
 * becomes one clickable unit, same as the locked design's `.brk` spans. */
const BRACKET_RE = /\[(?:[^[\]]|\[[^[\]]*\])*\]/g;

interface Segment {
  text: string;
  /** index into the flat bracket list, or -1 for a plain-text segment */
  bracketIndex: number;
}

function splitBrackets(prompt: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;
  let bracketCount = 0;
  for (const match of prompt.matchAll(BRACKET_RE)) {
    const index = match.index ?? 0;
    if (index > lastIndex) segments.push({ text: prompt.slice(lastIndex, index), bracketIndex: -1 });
    segments.push({ text: match[0], bracketIndex: bracketCount });
    bracketCount += 1;
    lastIndex = index + match[0].length;
  }
  if (lastIndex < prompt.length) segments.push({ text: prompt.slice(lastIndex), bracketIndex: -1 });
  return segments;
}

/**
 * The interactive bracket-fill card from how-to-use.html's `#brkBody`.
 * Tap (or Enter/Space) a bracket to swap it for an example fill; "Fill
 * all" / "Reset" affect every bracket at once; Copy always copies exactly
 * what's currently displayed, filled or not.
 */
export function BracketCard({
  lessonId,
  title,
  prompt,
  fills,
}: {
  lessonId: string;
  title: string;
  prompt: string;
  fills: string[];
}) {
  const segments = useMemo(() => splitBrackets(prompt), [prompt]);
  const bracketCount = useMemo(
    () => segments.reduce((max, s) => Math.max(max, s.bracketIndex + 1), 0),
    [segments],
  );
  const [filled, setFilled] = useState<boolean[]>(() => new Array(bracketCount).fill(false));

  function toggle(bracketIndex: number) {
    setFilled((cur) => cur.map((v, i) => (i === bracketIndex ? !v : v)));
  }

  const filledCount = filled.filter(Boolean).length;

  const displayedText = useMemo(
    () =>
      segments
        .map((seg) =>
          seg.bracketIndex === -1
            ? seg.text
            : filled[seg.bracketIndex]
              ? (fills[seg.bracketIndex] ?? seg.text)
              : seg.text,
        )
        .join(""),
    [segments, filled, fills],
  );

  return (
    <div className={styles.brkCard}>
      <div className={styles.pcTop}>
        <span className={styles.pcTag}>{lessonId}</span>
        <span className={styles.pcTtl}>{title}</span>
        <span className={styles.pcUp}>tap a bracket</span>
      </div>
      <div className={styles.pcBody}>
        {segments.map((seg, i) => {
          if (seg.bracketIndex === -1) return <span key={i}>{seg.text}</span>;
          const isFilled = filled[seg.bracketIndex];
          return (
            <span
              key={i}
              role="button"
              tabIndex={0}
              className={`${styles.brk} ${isFilled ? styles.brkFilled : ""}`}
              onClick={() => toggle(seg.bracketIndex)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(seg.bracketIndex);
                }
              }}
            >
              {isFilled ? (fills[seg.bracketIndex] ?? seg.text) : seg.text}
            </span>
          );
        })}
      </div>
      <div className={styles.pcFoot}>
        <span className={styles.pcFootSt}>
          <b>{filledCount}</b> of {bracketCount} filled
        </span>
        <span className={styles.pcFootActions}>
          <button
            className="btn btn-line btn-sm"
            type="button"
            onClick={() => setFilled(new Array(bracketCount).fill(true))}
          >
            Fill all
          </button>
          <button
            className="btn btn-line btn-sm"
            type="button"
            onClick={() => setFilled(new Array(bracketCount).fill(false))}
          >
            Reset
          </button>
          <CopyButton text={displayedText} />
        </span>
      </div>
    </div>
  );
}
