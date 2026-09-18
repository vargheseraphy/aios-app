import styles from "./Marquee.module.css";

export interface MarqueeItem {
  index: string;
  label: string;
}

/**
 * Continuous pill-item marquee, ported from home.html's `.marq`. Renders the
 * item list twice back to back so the 42s loop (`translateX(-50%)`) is
 * seamless; pauses under `prefers-reduced-motion` via pure CSS, no JS state
 * needed.
 */
export function Marquee({ items }: { items: MarqueeItem[] }) {
  return (
    <div className={styles.marq}>
      <div className={styles.track}>
        {[0, 1].map((rep) => (
          <span key={rep} style={{ display: "contents" }}>
            {items.map((item) => (
              <span className={styles.item} key={`${rep}-${item.index}`}>
                <b>{item.index}</b>
                {item.label}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
