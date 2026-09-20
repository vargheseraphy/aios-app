"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import styles from "./bands.module.css";

/**
 * The closing account-conversion CTA. Rewritten alongside the sign-in gate
 * (DECISIONS.md) — the old copy said "nothing on this page is behind a
 * login and nothing ever will be," which stopped being true the moment the
 * deeper breakdown above got gated. This version says plainly what's free
 * (the prompt, forever) and what an account actually buys (the breakdown,
 * plus saving/syncing/sharing). "Create an account" opens the real sign-in
 * modal (Phase 5) rather than linking to a route that doesn't exist in this
 * build's scope — see SiteHeader for the same pattern.
 */
export function SaveBand() {
  const { user, openSignIn } = useAuth();

  return (
    <section className={styles.save} id="save">
      <div className={styles.saveBg} />
      <div className={styles.saveLines} />
      <div className={`pad ${styles.saveIn}`}>
        <div>
          <h2>The prompt is free. The breakdown asks for an account.</h2>
          <p>
            Copying any prompt is free and always will be &mdash; no card, no trial, no paywall
            on the prompts themselves. A free account unlocks the deeper breakdown on this page,
            and also saves prompts to your own list, syncs across devices, and lets you share a
            link with your name on it.
          </p>
          <div className={styles.saveBtns}>
            {!user && (
              <button type="button" className="btn btn-white" onClick={() => openSignIn()}>
                Create an account
              </button>
            )}
            <Link className="btn btn-line" href="/how-to-use">
              See how it works
            </Link>
          </div>
        </div>
        <div className={styles.saveList}>
          <div className={styles.sl}>
            <svg className={`i ${styles.si}`} width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="10.5" width="14" height="10" rx="2" />
              <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
            </svg>
            <span>See the full breakdown &mdash; use-when, method, roles, origin</span>
          </div>
          <div className={styles.sl}>
            <svg className={`i ${styles.si}`} width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-4-6.5 4v-16a1 1 0 0 1 1-1z" />
            </svg>
            <span>Save this framework to your own list</span>
          </div>
          <div className={styles.sl}>
            <svg className={`i ${styles.si}`} width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
              <path d="M10.5 18.5h3" />
            </svg>
            <span>Pick up where you left off on another device</span>
          </div>
          <div className={styles.sl}>
            <svg className={`i ${styles.si}`} width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="8" r="3.2" />
              <path d="M3 19c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4" />
              <path d="M17 8.5v5M14.5 11h5" />
            </svg>
            <span>Send a colleague a link with your name on it</span>
          </div>
        </div>
      </div>
    </section>
  );
}
