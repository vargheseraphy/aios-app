"use client";

import { useState, type ReactNode } from "react";

interface AccordionItemProps {
  id: string;
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
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
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `${id}-panel`;
  const triggerId = `${id}-trigger`;

  return (
    <div className={`border-b border-line-l ${className}`} id={id}>
      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-[22px] text-left font-display text-[16.5px] font-bold tracking-[-0.015em] text-ink-2 cursor-pointer"
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
