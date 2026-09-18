"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import styles from "./home.module.css";

interface Testimonial {
  quote: string;
  initials: string;
  avatarGradient: string;
  name: string;
  role: string;
}

/**
 * Draft quotes for layout, ported verbatim from home.html — the source file
 * itself is labelled "replace with real ones you have permission to
 * publish" (see DECISIONS.md's never-invent list). Kept as draft, not
 * invented further.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I used to open ChatGPT and stare at it. Now I scan the page for whichever decision I am stuck on and the thinking is already structured for me. The pre-mortem one saved us from a launch that was not ready.",
    initials: "AM",
    avatarGradient: "linear-gradient(140deg,#3B7BF7,#1E5CE0)",
    name: "Anoop Menon",
    role: "Founder, SaaS studio · Kochi",
  },
  {
    quote:
      "The 1-on-1 framework changed how my team reviews go. I run it the night before instead of walking in and improvising, and the conversations are far less awkward for both of us.",
    initials: "DN",
    avatarGradient: "linear-gradient(140deg,#EC4A3B,#B5301F)",
    name: "Deepa Nair",
    role: "Engineering Manager · Technopark, Trivandrum",
  },
  {
    quote:
      "I bought four copies for the sales team. What I did not expect was that everyone started sending proposals in the same structure within a fortnight. That consistency was worth more than the prompts.",
    initials: "SK",
    avatarGradient: "linear-gradient(140deg,#2FAB57,#1B7A3C)",
    name: "Sreejith Kumar",
    role: "Sales Head, logistics firm · Kozhikode",
  },
  {
    quote:
      "As a first-time founder the finance module was the one I avoided and needed most. Working through the unit economics prompt was the first time our numbers made sense to me rather than to my accountant.",
    initials: "FR",
    avatarGradient: "linear-gradient(140deg,#FBBE10,#C68F00)",
    name: "Fathima Rasheed",
    role: "Co-founder, D2C brand · Kochi",
  },
  {
    quote:
      "What sold me was the QR codes. I keep the book on the desk, scan whatever page I am on, and the prompt is on my phone before the meeting starts. No hunting through saved notes.",
    initials: "VP",
    avatarGradient: "linear-gradient(140deg,#6EA0FF,#3B7BF7)",
    name: "Vishnu Prasad",
    role: "Operations Lead · Thrissur",
  },
  {
    quote:
      "I teach an entrepreneurship elective and recommended it to my students. They actually use it, which is more than I can say for most books on the reading list.",
    initials: "NT",
    avatarGradient: "linear-gradient(140deg,#2FAB57,#3B7BF7)",
    name: "Neethu Thomas",
    role: "Faculty, management college · Ernakulam",
  },
];

function Star() {
  return (
    <svg className="i" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7-6.3-3.4L5.7 21 7 14.2 2 9.4l7-.9z" />
    </svg>
  );
}

export function TestimonialsSection() {
  const trailRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const sync = useCallback(() => {
    const trail = trailRef.current;
    if (!trail) return;
    const firstCard = trail.querySelector<HTMLElement>(`.${styles.tcard}`);
    if (!firstCard) return;
    const width = firstCard.offsetWidth + 14;
    setActive(Math.round(trail.scrollLeft / width));
  }, []);

  useEffect(() => {
    sync();
  }, [sync]);

  function goTo(i: number) {
    const trail = trailRef.current;
    const card = trail?.querySelectorAll<HTMLElement>(`.${styles.tcard}`)[i];
    if (!trail || !card) return;
    trail.scrollTo({ left: card.offsetLeft - trail.offsetLeft, behavior: "smooth" });
  }

  return (
    <section className="light">
      <div className="pad">
        <div className="head-row">
          <div>
            <div className="kicker">Readers</div>
            <h2 className="sh">What people say after a month.</h2>
            <p className="sd" style={{ fontStyle: "italic" }}>
              Draft quotes — replace with real ones you have permission to publish.
            </p>
          </div>
        </div>
      </div>
      <div className="pad">
        <div className={styles.trail} ref={trailRef} onScroll={sync}>
          {TESTIMONIALS.map((t) => (
            <article className={styles.tcard} key={t.name}>
              <span className={styles.stars}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </span>
              <q>{t.quote}</q>
              <div className={styles.who}>
                <span className={styles.av} style={{ background: t.avatarGradient }}>
                  {t.initials}
                </span>
                <span>
                  <span className={styles.nm}>{t.name}</span>
                  <br />
                  <span className={styles.rl}>{t.role}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="dots" style={{ justifyContent: "flex-start" }}>
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className="dot-b"
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
