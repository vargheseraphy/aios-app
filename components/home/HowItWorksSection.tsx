"use client";

import { useState } from "react";
import styles from "./home.module.css";

const STEPS = [
  {
    no: "01",
    title: "Scan the code on the page",
    body: "Every framework in the book carries its own code. Your phone camera is enough — no app, no login.",
  },
  {
    no: "02",
    title: "The right prompt opens",
    body: "You land on that exact lesson, already expanded. The rest of the module sits below it if you want more.",
  },
  {
    no: "03",
    title: "Copy, fill the brackets, run it",
    body: null,
  },
];

export function HowItWorksSection() {
  const [hovered, setHovered] = useState(0);

  return (
    <section className="light" id="how">
      <div className="pad">
        <div className="head-row">
          <div>
            <div className="kicker">How it works</div>
            <h2 className="sh">Three moves. Under ten seconds.</h2>
          </div>
          <a className="btn btn-linedark" href="#">
            Full guide
          </a>
        </div>
        <div className={styles.how}>
          <div className={styles.stepList}>
            {STEPS.map((step, i) => (
              <div
                key={step.no}
                className={i === hovered ? `${styles.step} ${styles.stepOn}` : styles.step}
                onMouseEnter={() => setHovered(i)}
              >
                {/* Decorative step-order flourish — the same info is already
                    conveyed by list order and the step's own heading, so
                    this low-contrast numeral is hidden from assistive tech
                    rather than requiring 3:1 against white. */}
                <span className={styles.no} aria-hidden="true">
                  {step.no}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>
                    {step.body ?? (
                      <>
                        Paste into whichever AI you use. Replace anything in{" "}
                        <span
                          style={{
                            fontFamily: "var(--font-mono-stack)",
                            fontSize: 12,
                            background: "var(--wash)",
                            padding: "1px 5px",
                            borderRadius: 4,
                          }}
                        >
                          [SQUARE BRACKETS]
                        </span>{" "}
                        with your real situation.
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.howArt}>
            <div className={styles.artbg} />
            <svg viewBox="0 0 330 300" className="line" aria-hidden="true">
              <path className="s" d="M18 92c22-12 52-12 74 4v136c-22-16-52-16-74-4z" />
              <path className="s" d="M166 92c-22-12-52-12-74 4v136c22-16 52-16 74-4z" />
              <path className="s" d="M92 96v136" />
              <path className="s2" d="M32 120h42M32 138h28M110 120h42M110 138h30" />
              <rect className="s" x="104" y="166" width="50" height="50" rx="5" />
              <rect className="s" x="110" y="172" width="13" height="13" rx="3" />
              <rect className="s" x="135" y="172" width="13" height="13" rx="3" />
              <rect className="s" x="110" y="197" width="13" height="13" rx="3" />
              <rect className="fd" x="114" y="176" width="5" height="5" rx="1" />
              <rect className="fd" x="139" y="176" width="5" height="5" rx="1" />
              <rect className="fd" x="114" y="201" width="5" height="5" rx="1" />
              <rect className="f" x="133" y="194" width="6" height="6" />
              <rect className="f" x="143" y="203" width="6" height="6" />
              <rect className="f" x="143" y="190" width="5" height="5" />
              <path className="s2" d="M96 176v-18h18M162 176v-18h-18M96 206v18h18M162 206v18h-18" opacity=".5" />
              <path className="s3" d="M212 186l-40 4M212 172l-40-8" />
              <rect className="s" x="216" y="46" width="96" height="176" rx="18" />
              <path className="s2" d="M250 62h28" />
              <rect className="s2" x="228" y="78" width="72" height="92" rx="9" />
              <rect className="s" x="240" y="92" width="48" height="10" rx="5" />
              <path className="s2" d="M240 116h48M240 130h32M240 144h42" />
              <rect className="s" x="234" y="182" width="60" height="24" rx="12" />
              <text className="t" x="249" y="198" style={{ fontSize: 10, opacity: 0.95 }}>
                COPY
              </text>
            </svg>
            <span className={styles.cap}>Line art — replace with a photo later</span>
          </div>
        </div>
      </div>
    </section>
  );
}
