"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { MODULES_JOIN_CONTENT } from "@/lib/pages-content";
import styles from "./joinBand.module.css";

/**
 * The closing "create an account" band shared by /m{module} and /modules.
 * "Create an account" opens the real sign-in modal rather than a route —
 * same pattern as SiteHeader and components/lesson/SaveBand.tsx.
 */
export function JoinBand() {
  const { user, openSignIn } = useAuth();
  const c = MODULES_JOIN_CONTENT;

  return (
    <section className={styles.join} id="join">
      <div className={styles.bg} />
      <div className={styles.lines} />
      <div className={`pad ${styles.in}`}>
        <div>
          <h2>{c.heading}</h2>
          <p>{c.body}</p>
          <div className={styles.btns}>
            {!user && (
              <button type="button" className="btn btn-white" onClick={() => openSignIn()}>
                {c.ctaPrimary}
              </button>
            )}
            <Link className="btn btn-line" href="/how-to-use">
              {c.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.jl}>
            <svg className={`i ${styles.si}`} width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
            <span>{c.list[0]}</span>
          </div>
          <div className={styles.jl}>
            <svg className={`i ${styles.si}`} width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-4-6.5 4v-16a1 1 0 0 1 1-1z" />
            </svg>
            <span>{c.list[1]}</span>
          </div>
          <div className={styles.jl}>
            <svg className={`i ${styles.si}`} width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="8" r="3.2" />
              <path d="M3 19c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4" />
              <path d="M17 8.5v5M14.5 11h5" />
            </svg>
            <span>{c.list[2]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
