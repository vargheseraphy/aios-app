"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./for-business.module.css";

/**
 * Sticky side rail that highlights the department in view — ported from
 * the locked design's IntersectionObserver behavior (`#rail a` toggling
 * `.on` as each `.dept` section crosses the middle of the viewport).
 */
export function DeptRail({ items }: { items: { id: string; number: string; name: string; colorKey: string }[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = items
      .map((item) => document.getElementById(`d-${item.id}`))
      .filter((el): el is HTMLElement => el !== null);
    sectionsRef.current = sections;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = sections.indexOf(entry.target as HTMLElement);
          if (index !== -1) setActiveId(items[index].id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className={styles.rail} aria-label="Departments">
      <span className={styles.railLab}>Jump to</span>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#d-${item.id}`}
          className={`${styles[`c${cap(item.colorKey)}`]} ${item.id === activeId ? styles.on : ""}`}
        >
          <span className={styles.rn}>{item.number}</span>
          {item.name}
        </a>
      ))}
    </nav>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
