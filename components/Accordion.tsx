"use client";

import { useState, type ReactNode } from "react";

interface AccordionItemProps {
  id: string;
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  /**
   * Controlled mode, for an exclusive-open accordion (e.g. FAQ) where a
   * parent decides which single item is open. When provided, `open`/`onToggle`
   * replace the item's own internal state; omit both for the default
   * every-item-independent behaviour used on lesson pages.
   */
  open?: boolean;
  onToggle?: () => void;
  /**
   * Rendered as a sibling of the trigger button, not inside it — e.g. a
   * bookmark button (Phase 5). Nesting an interactive element inside the
   * trigger `<button>` would be invalid HTML and double-fire clicks.
   */
  actions?: ReactNode;
}

/**
 * A single accordion row: a button trigger plus its panel. Native <button>
 * semantics give keyboard operability (Tab, Enter, Space) for free — no
 * key handling needed. The panel animates with grid-template-rows rather
 * than a JS-measured max-height, so a server-rendered `defaultOpen` item
 * is correctly visible before any client JS runs.
 */
export function AccordionItem({
  id,
  trigger,
  children,
  defaultOpen = false,
  className = "",
  open: openProp,
  onToggle,
  actions,
}: AccordionItemProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : openState;
  const toggle = controlled ? onToggle! : () => setOpenState((v) => !v);
  const panelId = `${id}-panel`;
  const triggerId = `${id}-trigger`;

  return (
    <div className={`border-b border-line-l ${className}`} id={id}>
      <div className="flex items-center gap-2">
        <button
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          className="flex flex-1 items-center justify-between gap-4 py-[22px] text-left font-display text-[16.5px] font-bold tracking-[-0.015em] text-ink-2 cursor-pointer"
        >
          {trigger}
          <span
            aria-hidden="true"
            className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border font-sans text-[15px] transition-transform duration-200 ${
              open
                ? "rotate-45 border-ink-2 bg-ink-2 text-white"
                : "border-line-l2 text-gray-l"
            }`}
          >
            +
          </span>
        </button>
        {actions}
      </div>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        inert={!open}
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="pb-[22px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`border-t border-line-l ${className}`}>{children}</div>;
}
