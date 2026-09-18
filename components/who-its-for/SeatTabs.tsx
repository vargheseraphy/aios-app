"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { PromptPreviewCard } from "@/components/PromptPreviewCard";
import styles from "./who-its-for.module.css";

export interface SeatModule {
  number: number;
  title: string;
  lessonCount: number;
}

export interface Seat {
  id: string;
  label: string;
  seatNumber: number;
  /** short centred statement above the panel, e.g. "Deciding alone..." */
  seatLine: ReactNode;
  /** longer intro paragraph inside "The situation", with a bolded clause */
  lead: ReactNode;
  situationBody: string;
  startModules: SeatModule[];
  openModuleHref: string;
  prompt: {
    lessonId: string;
    title: string;
    moduleLabel: string;
    prompt: string;
    pairsWith: string[];
  };
}

/**
 * The seat index — a centred pill rail (sliding indicator, arrow-key
 * navigation) above five panels, ported from who-its-for.html's
 * `#seattabs`/`.seatpanel`. Distinct from the generic `PillTabs` used for
 * the home page's audience tabs: DESIGN.md documents "seat tab rail" and
 * "tab switcher" as separate components with different panel shapes.
 */
export function SeatTabs({ seats }: { seats: Seat[] }) {
  const [activeId, setActiveId] = useState(seats[0].id);
  const railRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    function reposition() {
      const active = tabRefs.current[activeId];
      const slide = slideRef.current;
      if (!active || !slide) return;
      slide.style.width = `${active.offsetWidth}px`;
      slide.style.transform = `translateX(${active.offsetLeft - 5}px)`;
    }
    reposition();
    window.addEventListener("resize", reposition);
    return () => window.removeEventListener("resize", reposition);
  }, [activeId]);

  function selectByOffset(offset: number) {
    const i = seats.findIndex((s) => s.id === activeId);
    const next = seats[(i + offset + seats.length) % seats.length];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  }

  return (
    <>
      <div className={styles.tabsCenter}>
        <div className={styles.tabs} role="tablist" ref={railRef}>
          <span className={styles.pillslide} ref={slideRef} aria-hidden="true" />
          {seats.map((seat) => (
            <button
              key={seat.id}
              id={`${seat.id}-tab`}
              type="button"
              role="tab"
              className={styles.tab}
              aria-selected={seat.id === activeId}
              aria-controls={seat.id}
              ref={(el) => {
                tabRefs.current[seat.id] = el;
              }}
              onClick={() => setActiveId(seat.id)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  selectByOffset(1);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  selectByOffset(-1);
                }
              }}
            >
              <span className={styles.tn}>{String(seat.seatNumber).padStart(2, "0")}</span>
              {seat.label}
            </button>
          ))}
        </div>
      </div>

      {seats.map((seat) => {
        const active = seat.id === activeId;
        return (
          <div
            key={seat.id}
            id={seat.id}
            role="tabpanel"
            aria-labelledby={`${seat.id}-tab`}
            hidden={!active}
            inert={!active}
          >
            <p className={styles.seatLine}>{seat.seatLine}</p>
            <p className={styles.seatSub}>
              Seat {String(seat.seatNumber).padStart(2, "0")} of 5 · {seat.label}
            </p>
            <div className={styles.ientry}>
              <div className={styles.colSit}>
                <h4 className={styles.collab}>The situation</h4>
                <p className={styles.lead}>{seat.lead}</p>
                <p>{seat.situationBody}</p>
              </div>

              <div>
                <h4 className={styles.collab}>Start here</h4>
                <div className={styles.mods}>
                  {seat.startModules.map((m) => (
                    <div className={styles.mod} key={m.number}>
                      <span className={styles.modMn}>{String(m.number).padStart(2, "0")}</span>
                      <span className={styles.modMt}>{m.title}</span>
                      <span className={styles.modMc}>{m.lessonCount}</span>
                    </div>
                  ))}
                </div>
                <Link className={`btn btn-ink btn-sm ${styles.colStartGo}`} href={seat.openModuleHref}>
                  Open module {String(seat.startModules[0].number).padStart(2, "0")}
                </Link>
              </div>

              <div>
                <h4 className={styles.collab}>One prompt to run</h4>
                <PromptPreviewCard {...seat.prompt} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
