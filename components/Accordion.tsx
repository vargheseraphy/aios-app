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
  /**
   * `"light"` (default) for a light/wash section (e.g. the FAQ accordion) —
   * ink-2 text on a light hairline border. `"dark"` for a near-black canvas
   * (e.g. the lesson list on `/m{module}/{lesson}`) — white text on a dark
   * hairline. Lighthouse caught this as a real bug, not a style choice: the
   * lesson accordion used to render its light-section ink-2 title text
   * (#1b1c1f) directly on the near-black canvas (#0e0f12), a measured
   * 1.12:1 contrast ratio — effectively invisible. See DECISIONS.md.
   */
  variant?: "light" | "dark";
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
  variant = "light",
}: AccordionItemProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : openState;
  const toggle = controlled ? onToggle! : () => setOpenState((v) => !v);
  const panelId = `${id}-panel`;
  const triggerId = `${id}-trigger`;
  const dark = variant === "dark";

  return (
    <div
      className={`border-b ${dark ? "border-line-d" : "border-line-l"} ${className}`}
      id={id}
    >
      <div className="flex items-center gap-2">
        <button
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          className={`flex flex-1 items-center justify-between gap-4 py-[22px] text-left font-display text-[16.5px] font-bold tracking-[-0.015em] cursor-pointer ${
            dark ? "text-white" : "text-ink-2"
          }`}
        >
          {trigger}
          <span
            aria-hidden="true"
            className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border font-sans text-[15px] transition-transform duration-200 ${
              open
                ? dark
                  ? "rotate-45 border-white bg-white text-ink"
                  : "rotate-45 border-ink-2 bg-ink-2 text-white"
                : dark
                  ? "border-line-d2 text-fg-2"
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
  variant = "light",
}: {
  className?: string;
  children: ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <div className={`border-t ${variant === "dark" ? "border-line-d" : "border-line-l"} ${className}`}>
      {children}
    </div>
  );
}
