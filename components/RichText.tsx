import { Fragment } from "react";

/**
 * Renders `**bold**` markers as <strong>. Lets page-content modules hold
 * plain, editable strings (matching the emphasis the locked designs use
 * inside a paragraph) without embedding JSX or HTML in data.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
