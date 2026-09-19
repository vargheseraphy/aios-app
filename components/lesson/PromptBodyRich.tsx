import type { ReactNode } from "react";
import styles from "./lesson.module.css";

/**
 * Renders a lesson's effective promptBody (already role-swapped if
 * applicable) with the same markup rules lesson.html's DIRECTION CONTRACT
 * NOTE 1 specifies: ALL-CAPS section lines and "Label:" prefixes get key
 * styling, every [BRACKET] placeholder gets value styling, and the opening
 * role clause (if any) gets its own highlighted span. Source whitespace and
 * newlines are preserved exactly — including the book's own aligned-colon
 * spacing (e.g. "My business model   :") — nothing here is "cleaned up",
 * matching how damaged titles render as stored elsewhere on this site.
 *
 * This renders structured JSX rather than building an HTML string and
 * setting innerHTML (what the vanilla-JS mockup does) — same visual
 * result, no HTML-escaping step needed since React already escapes text
 * content, and Copy reads the same plain `effectiveText` string this
 * component is given rather than reading rendered DOM text back out.
 */

const ALL_CAPS_LINE = /^[A-Z][A-Z0-9 &:/().,'’ -]{1,70}:?$/;
const LABEL_PREFIX = /^([A-Za-z][^:\n]{0,58}:)/;
const BRACKET = /(\[[^\]]+\])/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(BRACKET);
  return parts.map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <span key={`${keyPrefix}-${i}`} className={styles.v}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function renderLine(line: string, lineIndex: number): ReactNode {
  if (ALL_CAPS_LINE.test(line.trim()) && line.trim().length >= 3) {
    return (
      <span key={lineIndex} className={styles.k}>
        {line}
      </span>
    );
  }
  const labelMatch = line.match(LABEL_PREFIX);
  if (labelMatch) {
    const label = labelMatch[1];
    const rest = line.slice(label.length);
    return (
      <span key={lineIndex}>
        <span className={styles.k}>{label}</span>
        {renderInline(rest, `l${lineIndex}`)}
      </span>
    );
  }
  return <span key={lineIndex}>{renderInline(line, `l${lineIndex}`)}</span>;
}

export function PromptBodyRich({
  text,
  roleLine,
}: {
  text: string;
  /** If set, the first line's role clause (already substituted into `text`)
   * gets wrapped in the highlighted #roleLine-equivalent span — pass the
   * exact substring so it can be located and re-wrapped without re-parsing
   * the role regex here too. */
  roleLine?: string | null;
}) {
  const lines = text.split("\n");
  return (
    <div className={styles.pcBody}>
      {lines.map((line, i) => {
        if (i === 0 && roleLine && line.includes(roleLine)) {
          const idx = line.indexOf(roleLine);
          const before = line.slice(0, idx);
          const after = line.slice(idx + roleLine.length);
          return (
            <span key={i}>
              {before}
              <span className={styles.roleLine}>{roleLine}</span>
              {after}
              {i < lines.length - 1 ? "\n" : null}
            </span>
          );
        }
        return (
          <span key={i}>
            {renderLine(line, i)}
            {i < lines.length - 1 ? "\n" : null}
          </span>
        );
      })}
    </div>
  );
}
