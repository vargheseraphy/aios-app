"use client";

import { useRef, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { PromptBody } from "@/components/LessonPromptCard";
import styles from "./how-to-use.module.css";

/**
 * The right-hand "page" of the spread hero: tap the QR, the paper slides
 * left and a phone slides in showing the prompt already expanded — the
 * whole point of the QR path, demonstrated rather than described. Ported
 * from how-to-use.html's `#demo`/`#qrBtn`/`#demoReset` behaviour.
 */
export function ScanDemo({ prompt }: { prompt: string }) {
  const [scanned, setScanned] = useState(false);
  const copyBtnWrapRef = useRef<HTMLDivElement>(null);

  function handleScan() {
    setScanned(true);
    setTimeout(() => {
      copyBtnWrapRef.current?.querySelector("button")?.focus({ preventScroll: true });
    }, 420);
  }

  function handleReset() {
    setScanned(false);
  }

  return (
    <>
      <div className={`${styles.demo} ${scanned ? styles.demoDone : ""}`}>
        <div className={styles.paper}>
          <span className={styles.pt}>Module 01 · Framework 1.1</span>
          <span className={styles.ph}>C.A.R.E Prompting</span>
          <span className={`${styles.pl} ${styles.plw1}`} />
          <span className={`${styles.pl} ${styles.plw3}`} />
          <span className={`${styles.pl} ${styles.plw2}`} />
          <span className={`${styles.pl} ${styles.plw4}`} />
          <button
            className={styles.qrHit}
            type="button"
            aria-label="Scan the QR code to open the prompt"
            onClick={handleScan}
          >
            <span className={styles.pulse} />
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <rect x="4" y="4" width="56" height="56" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <rect x="10" y="10" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <rect x="15" y="15" width="6" height="6" fill="currentColor" />
              <rect x="38" y="10" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <rect x="43" y="15" width="6" height="6" fill="currentColor" />
              <rect x="10" y="38" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <rect x="15" y="43" width="6" height="6" fill="currentColor" />
              <rect x="34" y="34" width="6" height="6" fill="currentColor" />
              <rect x="44" y="34" width="6" height="6" fill="currentColor" />
              <rect x="34" y="44" width="6" height="6" fill="currentColor" />
              <rect x="48" y="44" width="6" height="6" fill="currentColor" />
              <rect x="40" y="50" width="6" height="6" fill="currentColor" />
            </svg>
            <span className={styles.qrCap}>tap the code</span>
          </button>
        </div>

        <div className={styles.phone} aria-live="polite">
          <div className={styles.phoneShell}>
            <div className={styles.phoneScreen}>
              <div className={styles.phoneUrl}>
                <i /> aios.obio.in/m1/01
              </div>
              <div className={styles.phonePcTop}>
                <span className={styles.phoneTag}>1.1</span>
                <span className={styles.phoneTtl}>C.A.R.E Prompting</span>
              </div>
              <div className={styles.phonePcBody}>
                <PromptBody prompt={prompt} />
              </div>
              <div className={styles.phonePcFoot} ref={copyBtnWrapRef}>
                <CopyButton text={prompt} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pageRightFoot}>
        <span className="hint">Any phone camera reads it. No app, no account.</span>
        <button
          className={`${styles.demoReset} ${scanned ? styles.demoResetShow : ""}`}
          type="button"
          onClick={handleReset}
        >
          ← put the book back
        </button>
      </div>
    </>
  );
}
