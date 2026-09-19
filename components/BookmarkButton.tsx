"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { isBookmarked, toggleBookmark } from "@/lib/actions/bookmarks";

/**
 * Bookmark icon for a lesson accordion item, per docs/product/PRD.md ("Bookmark
 * icon on every lesson's accordion item, filled in when saved"). Rendered as a
 * sibling of the accordion trigger (see Accordion.tsx's `actions` slot), not
 * nested inside it.
 *
 * This is the only auth-aware part of a lesson page: the page itself is still
 * statically generated (Phase 3) with zero server-side Supabase calls. Session
 * and bookmark state are both read client-side, after hydration, via a Server
 * Action call — never during the page's own render. See DECISIONS.md.
 *
 * `variant="dark"` restyles it for the lesson page's near-black prompt-card
 * header (lesson.html's `.pcbtn`) instead of the light accordion-row circle —
 * same auth/toggle behaviour, different chrome to match where it sits.
 */
export function BookmarkButton({
  lessonId,
  variant = "default",
}: {
  lessonId: string;
  variant?: "default" | "dark";
}) {
  const { user, openSignIn } = useAuth();
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    isBookmarked(lessonId).then((result) => {
      if (!cancelled) setSaved(result);
    });
    return () => {
      cancelled = true;
    };
  }, [user, lessonId]);

  // Signed out always renders as unsaved, regardless of stale local state
  // from a previous session — avoids resetting `saved` synchronously in the
  // effect above just to handle the sign-out case.
  const displaySaved = user ? saved : false;

  async function handleClick() {
    if (!user) {
      openSignIn();
      return;
    }
    setPending(true);
    const previous = saved;
    setSaved(!previous);
    try {
      const { bookmarked } = await toggleBookmark(lessonId);
      setSaved(bookmarked);
    } catch {
      setSaved(previous);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-pressed={displaySaved}
      aria-label={displaySaved ? "Remove bookmark" : "Bookmark this lesson"}
      title={displaySaved ? "Remove bookmark" : "Bookmark this lesson"}
      className={
        variant === "dark"
          ? `flex h-[38px] w-[38px] flex-none cursor-pointer items-center justify-center rounded-[9px] border transition-colors disabled:cursor-wait ${
              displaySaved
                ? "border-yellow/50 bg-yellow/[0.18] text-yellow"
                : "border-line-d2 bg-transparent text-white hover:bg-white/10"
            }`
          : "flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-full text-gray-l transition-colors hover:text-ink-2 disabled:cursor-wait"
      }
    >
      <svg
        className="i"
        width={variant === "dark" ? "16" : "17"}
        height={variant === "dark" ? "16" : "17"}
        viewBox="0 0 24 24"
        style={{ fill: displaySaved ? "currentColor" : "none" }}
      >
        <path d="M6 3.8c0-.6.5-1 1-1h10c.5 0 1 .4 1 1v16.4l-6-3.8-6 3.8V3.8z" />
      </svg>
    </button>
  );
}
