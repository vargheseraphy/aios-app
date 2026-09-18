"use client";

import { useEffect, useRef } from "react";
import styles from "./PillTabs.module.css";

export interface PillTab {
  id: string;
  label: string;
}

/**
 * Pill tab rail with a sliding solid indicator, ported from home.html's
 * `.tabs`/`.pillslide` (audience tabs). The parent owns which panel is
 * shown — this only renders the buttons and keeps the indicator positioned
 * under the active one, mirroring the original's `move()`/`select()` logic.
 */
export function PillTabs({
  tabs,
  activeId,
  onChange,
  idPrefix,
}: {
  tabs: PillTab[];
  activeId: string;
  onChange: (id: string) => void;
  /** prefix for each tab's `aria-controls`, e.g. "aud" -> controls "aud-a1" */
  idPrefix: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function position() {
      const rail = railRef.current;
      const slide = slideRef.current;
      if (!rail || !slide) return;
      const active = rail.querySelector<HTMLButtonElement>('[aria-selected="true"]');
      if (!active) return;
      slide.style.width = `${active.offsetWidth}px`;
      slide.style.transform = `translateX(${active.offsetLeft - 5}px)`;
    }
    position();
    window.addEventListener("resize", position);
    return () => window.removeEventListener("resize", position);
  }, [activeId]);

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" ref={railRef}>
        <span className={styles.slide} ref={slideRef} aria-hidden="true" />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            className={styles.tab}
            aria-selected={tab.id === activeId}
            aria-controls={`${idPrefix}-${tab.id}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
