"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import styles from "./home.module.css";

interface SlideSegment {
  key: string;
  text: string;
  emphasis?: "key" | "value";
}

interface Slide {
  tag: string;
  title: string;
  module: string;
  body: SlideSegment[];
  pairs: string;
}

const SLIDES: Slide[] = [
  {
    tag: "1.1",
    title: "C.A.R.E Prompting",
    module: "Module 01",
    pairs: "Pairs with 1.2 Context Stack · 1.3 Role Prompting",
    body: [
      { key: "a", emphasis: "key", text: "Role:        " },
      { key: "b", text: "Act as a " },
      { key: "c", emphasis: "value", text: "[EXPERT ROLE — e.g. B2B sales coach]" },
      { key: "d", text: ".\n" },
      { key: "e", emphasis: "key", text: "Context:     " },
      { key: "f", text: "I am " },
      { key: "g", emphasis: "value", text: "[YOUR SITUATION — company, stage, industry]" },
      { key: "h", text: ".\n" },
      { key: "i", emphasis: "key", text: "Action:      " },
      {
        key: "j",
        emphasis: "value",
        text: "[WHAT YOU WANT — e.g. Give me 5 positioning ideas\n             to differentiate in the [MARKET / REGION]]",
      },
      { key: "k", text: ".\n" },
      { key: "l", emphasis: "key", text: "Expectation: " },
      {
        key: "m",
        text: "Format as a numbered list. Each point 2–3 lines.\n             Use plain business language. No jargon.",
      },
    ],
  },
  {
    tag: "8.2",
    title: "Pre-Mortem Analysis",
    module: "Module 08",
    pairs: "Pairs with 8.1 Decision Matrix · 8.4 Risk Register",
    body: [
      { key: "a", text: "Act as a Pre-Mortem facilitator.\n\n" },
      { key: "b", emphasis: "key", text: "Project or decision: " },
      { key: "c", emphasis: "value", text: " [DESCRIBE WHAT YOU ARE ABOUT TO DO]" },
      { key: "d", text: "\n" },
      { key: "e", emphasis: "key", text: "Timeline:           " },
      { key: "f", emphasis: "value", text: " [HOW LONG THIS WILL TAKE]" },
      { key: "g", text: "\n" },
      { key: "h", emphasis: "key", text: "Team involved:      " },
      { key: "i", emphasis: "value", text: " [ROLES RESPONSIBLE FOR EXECUTION]" },
      { key: "j", text: "\n\n" },
      { key: "k", emphasis: "key", text: "SCENARIO:" },
      { key: "l", text: " It is " },
      { key: "m", emphasis: "value", text: "[DATE 12 MONTHS FROM NOW]" },
      {
        key: "n",
        text: ". This project has\nfailed. Not partially — completely. What happened?\n\nGenerate 10 specific reasons, ranked by likelihood.",
      },
    ],
  },
  {
    tag: "4.2",
    title: "SPIN Discovery Call",
    module: "Module 04",
    pairs: "Pairs with 4.1 ICP Builder · 4.5 Objection Handling",
    body: [
      { key: "a", text: "Act as a B2B sales coach using SPIN Selling.\n\n" },
      { key: "b", emphasis: "key", text: "I am selling:   " },
      { key: "c", emphasis: "value", text: "  [YOUR PRODUCT OR SERVICE]" },
      { key: "d", text: "\n" },
      { key: "e", emphasis: "key", text: "Prospect role:  " },
      { key: "f", emphasis: "value", text: " [JOB TITLE AND INDUSTRY]" },
      { key: "g", text: "\n" },
      { key: "h", emphasis: "key", text: "Known context:  " },
      { key: "i", emphasis: "value", text: " [WHAT YOU ALREADY KNOW ABOUT THEM]" },
      { key: "j", text: "\n\nGenerate 3 strong questions for each stage:\n" },
      { key: "k", emphasis: "key", text: "SITUATION" },
      { key: "l", text: "    — their current state and setup\n" },
      { key: "m", emphasis: "key", text: "PROBLEM" },
      { key: "n", text: "      — the pain they may not have named\n" },
      { key: "o", emphasis: "key", text: "IMPLICATION" },
      { key: "p", text: "  — the cost of leaving it alone" },
    ],
  },
  {
    tag: "10.2",
    title: "90-Day Planning",
    module: "Module 10",
    pairs: "Pairs with 10.1 Energy Audit · 10.5 Weekly Review",
    body: [
      { key: "a", text: "Act as a 90-day planning coach.\n\n" },
      { key: "b", emphasis: "key", text: "My context:         " },
      { key: "c", emphasis: "value", text: " [ROLE, BUSINESS STAGE, KEY PRIORITIES]" },
      { key: "d", text: "\n" },
      { key: "e", emphasis: "key", text: "Longer-term vision: " },
      { key: "f", emphasis: "value", text: " [WHERE YOU WANT TO BE IN 12–18 MONTHS]" },
      { key: "g", text: "\n" },
      { key: "h", emphasis: "key", text: "Current blockers:   " },
      { key: "i", emphasis: "value", text: " [WHAT IS SLOWING YOU MOST]" },
      { key: "j", text: "\n\n" },
      { key: "k", emphasis: "key", text: "BREAKTHROUGH GOALS:" },
      {
        key: "l",
        text: " 3 outcomes that would make this\nquarter genuinely significant — not just busy.",
      },
    ],
  },
];

function slideText(slide: Slide): string {
  return slide.body.map((seg) => seg.text).join("");
}

export function PromptSliderSection({ totalLessons }: { totalLessons: number }) {
  const [idx, setIdx] = useState(0);

  return (
    <section className="wash" id="try">
      <div className="pad">
        <div className={styles.try}>
          <div>
            <div className="kicker">See it working</div>
            <h2 className="sh">Pick a decision. There&rsquo;s a prompt for it.</h2>
            <p className="sd">
              No sign-up wall, no tour, no explainer video. The prompt, the brackets you fill in,
              and a copy button. That is the whole experience — repeated {totalLessons} times.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24, alignItems: "center" }}>
              <a className="btn btn-ink" href="#modules">
                Browse all {totalLessons}
              </a>
            </div>
          </div>

          <div>
            {SLIDES.map((slide, i) => (
              <div key={slide.tag} className={i === idx ? `${styles.slide} ${styles.slideOn}` : styles.slide}>
                <div className={styles.promptcard}>
                  <div className={styles.pcTop}>
                    <span className={styles.tag}>{slide.tag}</span>
                    <span className={styles.ttl}>{slide.title}</span>
                    <span className={styles.up}>{slide.module}</span>
                  </div>
                  <div className={styles.pcBody}>
                    {slide.body.map((seg) => (
                      <span
                        key={seg.key}
                        className={seg.emphasis === "key" ? styles.k : seg.emphasis === "value" ? styles.v : undefined}
                      >
                        {seg.text}
                      </span>
                    ))}
                  </div>
                  <div className={styles.pcFoot}>
                    <span className={styles.pairs}>{slide.pairs}</span>
                    <CopyButton text={slideText(slide)} className="ml-auto" />
                  </div>
                </div>
              </div>
            ))}
            <div className="dots">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.tag}
                  type="button"
                  className="dot-b"
                  aria-label={`Show prompt ${i + 1}`}
                  aria-current={i === idx}
                  onClick={() => setIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
