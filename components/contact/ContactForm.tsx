"use client";

import { useActionState, useState } from "react";
import { submitContactMessage, type ContactFormState } from "@/lib/actions/contact";
import { CONTACT_CONTENT as C } from "@/lib/pages-content";
import { Rich } from "@/components/RichText";
import styles from "./contact.module.css";

const initialState: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState);
  const [topic, setTopic] = useState(C.topics[0].value);
  const active = C.topics.find((t) => t.value === topic) ?? C.topics[0];

  return (
    <form action={formAction} className={styles.formcard} id="contactForm">
      <fieldset className={styles.routes}>
        <legend>What is this about?</legend>
        <div className={styles.rgrid}>
          {C.topics.map((t) => (
            <label className={styles.rpill} key={t.value}>
              <input
                type="radio"
                name="topic"
                value={t.value}
                checked={topic === t.value}
                onChange={() => setTopic(t.value)}
              />
              <span className={styles.rpillLabel}>{t.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={`${styles.fgrid} ${styles.fgridTwo}`}>
        <div className={styles.field}>
          <label htmlFor="cName">Your name</label>
          <input id="cName" name="name" type="text" autoComplete="name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="cEmail">Email</label>
          <input id="cEmail" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </div>
      </div>
      <div className={styles.fgrid}>
        <div className={styles.field}>
          <label htmlFor="cOrg">
            Organisation <span className={styles.opt}>— optional</span>
          </label>
          <input id="cOrg" name="organisation" type="text" autoComplete="organization" placeholder="Company, college or department" />
        </div>
      </div>

      <p className={styles.fhint} id="topicHint" aria-live="polite">
        <Rich text={active.hint} />
      </p>

      <div className={styles.fgrid}>
        <div className={styles.field}>
          <label htmlFor="cMsg">Message</label>
          <textarea id="cMsg" name="message" aria-describedby="topicHint" placeholder={active.placeholder} required />
        </div>
      </div>

      <div className={styles.fpend}>
        <svg className={`i ${styles.pi}`} width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.6" />
          <path d="M12 7.6v5" />
          <path d="M12 16.2h.01" />
        </svg>
        <span>
          <Rich text={C.formPendingNotice} />
        </span>
      </div>

      <div className={styles.fsend}>
        <button className="btn btn-blue" type="submit" disabled={isPending}>
          {isPending ? "Sending…" : "Send the message"}
        </button>
        <span className={styles.fstatus} role="status">
          {state.status !== "idle" ? state.message : ""}
        </span>
      </div>
    </form>
  );
}
