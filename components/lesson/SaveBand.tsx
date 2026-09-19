"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import styles from "./bands.module.css";

/** The closing "accounts are free, nothing gated" CTA. "Create an account"
 * opens the real sign-in modal (Phase 5) rather than linking to a route
 * that doesn't exist in this build's scope — see SiteHeader for the same
 * pattern. */
export function SaveBand() {
  const { user, openSignIn } = useAuth();

  return (
    <section className={styles.save} id="save">
      <div className={styles.saveBg} />
      <div className={styles.saveLines} />
      <div className={`pad ${styles.saveIn}`}>
        <div>
          <h2>Copying is free. An account keeps them.</h2>
          <p>
            Nothing on this page is behind a login and nothing ever will be. Save any prompt to
            your own list, pick up on another device, and send a colleague a link with your name
            on it. No card, no trial, no paywall on the prompts themselves.
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
