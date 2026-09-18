"use client";

import { useState, type ReactNode } from "react";
import { PillTabs } from "@/components/PillTabs";
import styles from "./home.module.css";

interface Feature {
  icon: ReactNode;
  title: string;
  text: string;
}

interface AudiencePanel {
  id: string;
  label: string;
  cardBg: string;
  heading: string;
  lead: string;
  features: Feature[];
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  artBg: string;
  art: ReactNode;
}

const PANELS: AudiencePanel[] = [
  {
    id: "a1",
    label: "Founders",
    cardBg:
      "radial-gradient(700px 420px at 12% 12%,rgba(59,123,247,.55),transparent 62%),radial-gradient(600px 400px at 92% 88%,rgba(251,190,16,.30),transparent 60%),#0B0C0F",
    heading: "You decide five things a day with nobody to check them against.",
    lead: "The frameworks give you a second opinion in the time it takes to paste a prompt.",
    features: [
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <path d="M3 17l5.5-6.5 4 3.5L21 5" />
            <path d="M21 5v6h-6" />
          </svg>
        ),
        title: "Pressure-test before you commit",
        text: "Module 02 makes you defend the business model on paper, before the money moves.",
      },
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7v5.5l3.5 2" />
          </svg>
        ),
        title: "Decide in an hour, not a week",
        text: "Module 08 turns a spinning decision into a written comparison you can act on today.",
      },
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <path d="M12 21V6" />
            <path d="M6.5 11.5L12 6l5.5 5.5" />
            <path d="M5 21h14" />
          </svg>
        ),
        title: "The founder problems nobody slides",
        text: "Module 10 covers the ones you do not raise in a board meeting.",
      },
    ],
    ctaLabel: "Know more for founders",
    ctaHref: "#",
    secondaryLabel: "Get the book",
    secondaryHref: "#get",
    artBg:
      "radial-gradient(320px 240px at 30% 26%,#3B7BF7,transparent 64%),radial-gradient(280px 240px at 84% 82%,#FBBE10,transparent 60%),#090A0D",
    art: (
      <svg viewBox="0 0 300 220" className="line" aria-hidden="true">
        <path className="s3" d="M30 192h244" />
        <path className="s3" d="M34 192V40" />
        <path className="s" d="M46 170l50-42 40 26 44-56 52 32" />
        <circle className="fd" cx="96" cy="128" r="4.5" />
        <circle className="fd" cx="180" cy="98" r="4.5" />
        <path className="s" d="M232 130V62h46l-11 12 11 12h-46" />
        <rect className="s2" x="42" y="34" width="104" height="56" rx="10" />
        <path className="s2" d="M58 56h60M58 72h38" />
      </svg>
    ),
  },
  {
    id: "a2",
    label: "Managers",
    cardBg:
      "radial-gradient(700px 420px at 14% 14%,rgba(236,74,59,.45),transparent 62%),radial-gradient(600px 400px at 90% 86%,rgba(47,171,87,.35),transparent 60%),#0B0C0F",
    heading: "You were promoted for doing the work, then handed a team.",
    lead: "Delegation, feedback, hiring, culture — the parts nobody trained you for, turned into prompts you run before the conversation.",
    features: [
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <circle cx="9" cy="8" r="3.6" />
            <circle cx="17" cy="9.5" r="2.8" />
            <path d="M3 19c0-3.4 2.7-6 6-6s6 2.6 6 6" />
            <path d="M15.5 19c0-2.4 1.4-4.2 3.5-4.2s3 1.4 3 3.2" />
          </svg>
        ),
        title: "Build people, not just output",
        text: "Module 06 puts hiring, feedback and delegation frameworks in one place.",
      },
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3.4" />
            <path d="M12 4v3.2M12 16.8V20M4 12h3.2M16.8 12H20M6.5 6.5l2.2 2.2M15.3 15.3l2.2 2.2" />
          </svg>
        ),
        title: "Systems that hold without you",
        text: "Module 07 documents the process so the team stops asking you the same question.",
      },
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <path d="M4 18l5-6 4 3 7-9" />
            <path d="M20 6v5h-5" />
            <path d="M3 21h18" />
          </svg>
        ),
        title: "Coach a team to a number",
        text: "Module 04 breaks a sales target into conversations your team can actually have.",
      },
    ],
    ctaLabel: "Know more for managers",
    ctaHref: "#",
    secondaryLabel: "Get the book",
    secondaryHref: "#get",
    artBg:
      "radial-gradient(320px 240px at 26% 30%,#EC4A3B,transparent 62%),radial-gradient(280px 240px at 82% 80%,#2FAB57,transparent 60%),#090A0D",
    art: (
      <svg viewBox="0 0 300 220" className="line" aria-hidden="true">
        <rect className="s" x="112" y="22" width="76" height="38" rx="9" />
        <circle className="fd" cx="150" cy="41" r="4" />
        <path className="s3" d="M150 60v26M58 112V86h184v26M150 86v26" />
        <rect className="s" x="22" y="112" width="72" height="38" rx="9" />
        <path className="s2" d="M38 132h40" />
        <rect className="s2" x="114" y="112" width="72" height="38" rx="9" />
        <path className="s2" d="M130 132h40" />
        <rect className="s2" x="206" y="112" width="72" height="38" rx="9" />
        <path className="s2" d="M222 132h40" />
        <path className="s3" d="M58 150v24h184v-24" />
        <rect className="s" x="112" y="182" width="76" height="26" rx="8" />
        <path className="s2" d="M128 195h44" />
      </svg>
    ),
  },
  {
    id: "a3",
    label: "Students",
    cardBg:
      "radial-gradient(700px 420px at 12% 16%,rgba(47,171,87,.45),transparent 62%),radial-gradient(600px 400px at 88% 84%,rgba(110,160,255,.4),transparent 60%),#0B0C0F",
    heading: "You’ll graduate into a job where AI fluency is assumed.",
    lead: "Not prompt tricks — the thinking behind a business decision, with the prompt as the way in.",
    features: [
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <path d="M12 4L2.8 8.6 12 13.2l9.2-4.6L12 4z" />
            <path d="M6.5 11v4.6c0 1.7 2.7 3.2 5.5 3.2s5.5-1.5 5.5-3.2V11" />
          </svg>
        ),
        title: "Think, then ask",
        text: "Module 01 teaches the reasoning first and the prompt second.",
      },
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l5 5" />
            <path d="M8.5 12V9.5M11 12V7.5M13.5 12v-2" />
          </svg>
        ),
        title: "Read a market before you pitch it",
        text: "Module 03 is the difference between an opinion and a case.",
      },
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <path d="M5 19v-7M12 19V5M19 19v-9" />
            <path d="M3 21h18" />
          </svg>
        ),
        title: "Numbers that decide an idea",
        text: "Module 09 gives you the model a real investor asks for.",
      },
    ],
    ctaLabel: "Know more for students",
    ctaHref: "#",
    secondaryLabel: "Get the book",
    secondaryHref: "#get",
    artBg:
      "radial-gradient(320px 240px at 28% 32%,#2FAB57,transparent 62%),radial-gradient(280px 240px at 84% 78%,#6EA0FF,transparent 60%),#090A0D",
    art: (
      <svg viewBox="0 0 300 220" className="line" aria-hidden="true">
        <path className="s" d="M150 40L56 82l94 42 94-42-94-42z" />
        <path className="s" d="M88 98v34c0 15 28 26 62 26s62-11 62-26V98" />
        <path className="s" d="M244 82v50" />
        <circle className="fd" cx="244" cy="138" r="5" />
        <rect className="s2" x="98" y="176" width="104" height="30" rx="8" />
        <path className="s2" d="M114 191h40" />
      </svg>
    ),
  },
  {
    id: "a4",
    label: "Teams",
    cardBg:
      "radial-gradient(700px 420px at 14% 12%,rgba(59,123,247,.5),transparent 62%),radial-gradient(600px 400px at 90% 88%,rgba(251,190,16,.32),transparent 60%),#0B0C0F",
    heading: "Everyone uses AI differently, so nothing compounds.",
    lead: "One shared set of frameworks means a plan from one person looks like a plan from another.",
    features: [
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <path d="M4 7h16M4 12h16M4 17h10" />
            <circle cx="19" cy="17" r="2" />
          </svg>
        ),
        title: "Same language in a week",
        text: "Marketing, sales and ops stop reinventing the same brief.",
      },
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <rect x="3" y="6" width="14" height="14" rx="2.5" />
            <path d="M7 3h11a2.5 2.5 0 0 1 2.5 2.5V16" />
            <path d="M7 11h6M7 15h4" />
          </svg>
        ),
        title: "Bulk copies, one desk each",
        text: "Volume pricing for teams of ten and up, invoiced directly.",
      },
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4" />
            <path d="M20.5 4.2V9h-4.8" />
          </svg>
        ),
        title: "The book never goes stale",
        text: "Prompts update on the site; nobody reprints anything.",
      },
    ],
    ctaLabel: "Know more for teams",
    ctaHref: "#",
    secondaryLabel: "Bulk orders",
    secondaryHref: "#get",
    artBg:
      "radial-gradient(320px 240px at 30% 28%,#3B7BF7,transparent 62%),radial-gradient(280px 240px at 82% 82%,#FBBE10,transparent 60%),#090A0D",
    art: (
      <svg viewBox="0 0 300 220" className="line" aria-hidden="true">
        <circle className="s" cx="150" cy="110" r="38" />
        <path className="s2" d="M130 102h40M130 114h26" />
        <circle className="fd" cx="150" cy="110" r="3" />
        <circle className="s2" cx="58" cy="54" r="20" />
        <circle className="s2" cx="242" cy="54" r="20" />
        <circle className="s2" cx="58" cy="166" r="20" />
        <circle className="s2" cx="242" cy="166" r="20" />
        <path className="s3" d="M76 68l42 24M224 68l-42 24M76 152l42-24M224 152l-42-24" />
      </svg>
    ),
  },
  {
    id: "a5",
    label: "Institutions",
    cardBg:
      "radial-gradient(700px 420px at 12% 14%,rgba(251,190,16,.4),transparent 62%),radial-gradient(600px 400px at 90% 86%,rgba(236,74,59,.4),transparent 60%),#0B0C0F",
    heading: "For libraries, colleges and B-school shelves.",
    lead: "A reference title students take off the shelf, because every page does something rather than explains something.",
    features: [
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <path d="M3 20V8.5L12 4l9 4.5V20" />
            <path d="M9 20v-6h6v6" />
            <path d="M2 20h20" />
          </svg>
        ),
        title: "Library and department copies",
        text: "Institutional pricing, invoiced to the department.",
      },
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
        ),
        title: "Fits existing coursework",
        text: "Maps onto entrepreneurship and management modules without a syllabus rewrite.",
      },
      {
        icon: (
          <svg className="i" width="17" height="17" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M3.5 12h17M12 3.5c3.2 3.7 3.2 13.3 0 17" />
          </svg>
        ),
        title: "Current without a new edition",
        text: "The digital layer refreshes; the shelf copy stays valid.",
      },
    ],
    ctaLabel: "Know more for institutions",
    ctaHref: "#",
    secondaryLabel: "Request a quote",
    secondaryHref: "#get",
    artBg:
      "radial-gradient(320px 240px at 26% 70%,#FBBE10,transparent 60%),radial-gradient(280px 240px at 82% 26%,#EC4A3B,transparent 62%),#090A0D",
    art: (
      <svg viewBox="0 0 300 220" className="line" aria-hidden="true">
        <path className="s" d="M44 94L150 42l106 52" />
        <circle className="fd" cx="150" cy="68" r="5" />
        <path className="s" d="M64 94v74M110 94v74M190 94v74M236 94v74" />
        <path className="s" d="M36 168h228" />
        <path className="s2" d="M36 184h228" />
        <rect className="s2" x="124" y="118" width="52" height="50" rx="5" />
        <path className="s2" d="M136 132h28M136 144h20" />
      </svg>
    ),
  },
];

export function AudienceSection() {
  const [activeId, setActiveId] = useState(PANELS[0].id);

  return (
    <section className="wash" id="who">
      <div className="pad">
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <div className="kicker">Who it&rsquo;s for</div>
          <h2 className="sh" style={{ maxWidth: "24ch" }}>
            Built for the person doing the job, not studying it.
          </h2>
        </div>

        <PillTabs
          idPrefix="aud"
          tabs={PANELS.map((p) => ({ id: p.id, label: p.label }))}
          activeId={activeId}
          onChange={setActiveId}
        />

        <div className={styles.aud}>
          {PANELS.map((panel) => (
            <div
              className={styles.audPanel}
              id={`aud-${panel.id}`}
              key={panel.id}
              hidden={panel.id !== activeId}
              inert={panel.id !== activeId}
            >
              <div className={styles.audCard}>
                <div className={styles.cardbg} style={{ background: panel.cardBg }} />
                <div className={styles.audGrid}>
                  <div className={styles.audCopy}>
                    <h3>{panel.heading}</h3>
                    <p className={styles.lead}>{panel.lead}</p>
                    <ul className={styles.feats}>
                      {panel.features.map((f) => (
                        <li key={f.title}>
                          <span className={styles.fi}>{f.icon}</span>
                          <span>
                            <b>{f.title}</b>
                            <span className={styles.tx}>{f.text}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.audCta}>
                      <a className="btn btn-white" href={panel.ctaHref}>
                        {panel.ctaLabel}
                      </a>
                      <a className="btn btn-line" href={panel.secondaryHref}>
                        {panel.secondaryLabel}
                      </a>
                    </div>
                  </div>
                  <div className={styles.audArt}>
                    <div className={styles.artbg} style={{ background: panel.artBg }} />
                    {panel.art}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
