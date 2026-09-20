"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import lessonStyles from "./lesson.module.css";
import styles from "./gate.module.css";

/**
 * The account-conversion gate (DECISIONS.md, "The full lesson page is gated
 * behind sign-in"). The prompt itself (PromptCard) is never wrapped in this —
 * it's already free and copy-ready one click away on the module page, so
 * re-gating it here would protect nothing and only confuse a visitor who just
 * copied it. What this wraps is the deeper view a reader only reaches by
 * clicking through from the module page: who should run the prompt, when to
 * use it, how the framework works, the method, where it comes from, and what
 * it pairs with.
 *
 * Client-side only, same pattern as BookmarkButton: `children` are real
 * server-rendered content, always present in the page's HTML/JS output (this
 * route stays statically generated — no per-request Supabase call), just kept
 * `hidden` until `useAuth()` resolves a signed-in user. Defaults to hidden
 * (locked) rather than briefly flashing the full content while the session
 * check is still in flight.
 */
export function LessonGate({ children }: { children: ReactNode }) {
  const { user, loading, openSignIn } = useAuth();
  const unlocked = !loading && !!user;

  return (
    <>
      <div id="signin-gate" className={lessonStyles.blk}>
        <div className={lessonStyles.bh}>
          <span className={lessonStyles.bi} style={{ background: "#15171C", color: "#fff" }}>
            <svg className="i" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="10.5" width="14" height="10" rx="2" />
              <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
            </svg>
          </span>
          <h2>The deeper breakdown</h2>
          <span className={lessonStyles.bn}>Free account</span>
        </div>
        {!unlocked && (
          <div className={styles.panel}>
            <p>
              The prompt above is free and always will be &mdash; no card, no trial, nothing to
              sign for just to copy it. <b>What&rsquo;s below is the deeper view</b>: when to use
              this framework, how it works, who should run it, and what it pairs with. That part
              asks for a free account &mdash; it&rsquo;s how Raphy knows who&rsquo;s actually
              using the book.
            </p>
            <button type="button" className="btn btn-blue" onClick={() => openSignIn()}>
              Sign in to see the full breakdown
            </button>
          </div>
        )}
      </div>
      <div hidden={!unlocked}>{children}</div>
    </>
  );
}
