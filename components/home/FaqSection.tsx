"use client";

import { useState } from "react";
import { AccordionItem } from "@/components/Accordion";
import styles from "./home.module.css";

const FAQS = [
  {
    id: "faq-book",
    q: "Do I need the book to use the prompts?",
    a: "No. Every prompt on this site is free to read and copy. The book is what makes them make sense — it explains when to reach for each framework and what to do with the answer.",
  },
  {
    id: "faq-account",
    q: "Do I need an account to copy a prompt?",
    a: "No. Copying is never gated — a QR code scanned at a desk should work in three seconds, not after a sign-up. An account only adds bookmarking prompts into a personal list and inviting someone else.",
  },
  {
    id: "faq-tools",
    q: "Which AI tools do these work with?",
    a: "Any of them. The prompts are written in plain language with no tool-specific syntax, so they behave the same in ChatGPT, Claude, Gemini, Copilot or whatever your company has approved.",
  },
  {
    id: "faq-brackets",
    q: "What are the square brackets for?",
    node: (
      <>
        Anything in <code>[SQUARE BRACKETS]</code> is yours to replace — your industry, your
        stage, your actual numbers. That substitution is the whole reason the output stops
        sounding generic.
      </>
    ),
  },
  {
    id: "faq-models",
    q: "What happens when the models change?",
    a: "The prompt behind each QR code gets rewritten on this site. Your printed copy keeps working because the code points at a page, not at a fixed block of text.",
  },
  {
    id: "faq-team",
    q: "Can I buy copies for my team?",
    a: "Yes — bulk and institutional orders are handled directly. Use the contact form with how many copies and where they are going.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);

  return (
    <section className="wash" id="faq">
      <div className="pad">
        <div className={styles.faqGrid}>
          <div>
            <div className={styles.faqArt}>
              <div className={styles.artbg} />
              <svg viewBox="0 0 240 200" className="line" aria-hidden="true">
                <path
                  className="s"
                  d="M28 36h150a12 12 0 0 1 12 12v58a12 12 0 0 1-12 12H84l-30 24v-24H28a12 12 0 0 1-12-12V48a12 12 0 0 1 12-12z"
                />
                <path className="s" d="M88 68a16 16 0 1 1 22 15v10" />
                <circle className="fd" cx="110" cy="102" r="4" />
                <path className="s3" d="M196 60h30M196 84h22M196 108h34" />
                <circle className="s2" cx="212" cy="150" r="16" />
                <path className="s2" d="M207 150l4 4 8-9" />
              </svg>
            </div>
            <div className="kicker">FAQ</div>
            <h2 className="sh">Questions people ask first.</h2>
            <p className="sd">Still stuck? The contact form goes to Raphy directly.</p>
            <a className="btn btn-linedark" href="#" style={{ marginTop: 20 }}>
              Contact
            </a>
          </div>
          <div>
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.id}
                id={faq.id}
                trigger={<span>{faq.q}</span>}
                open={openId === faq.id}
                onToggle={() => setOpenId((cur) => (cur === faq.id ? "" : faq.id))}
              >
                <div className={styles.faqInner}>{faq.node ?? faq.a}</div>
              </AccordionItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
