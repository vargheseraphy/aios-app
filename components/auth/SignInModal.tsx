"use client";

import { useEffect, useId, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./AuthProvider";
import { GoogleSignInButton } from "./GoogleSignInButton";

/**
 * Passwordless sign-in: magic link + Google, per docs/technical/ARCHITECTURE.md.
 * No standalone /sign-in route in this build's scope (see DECISIONS.md) — this
 * modal is opened from the header's login icon, /account, /my-prompts and /join.
 *
 * Only mounted by AuthProvider while `isSignInOpen` is true (see
 * AuthProvider.tsx), so its form state resets for free on the next open —
 * no reset-on-close effect needed.
 */
export function SignInModal() {
  const { closeSignIn, inviteCode } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const headingId = useId();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeSignIn();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeSignIn]);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
        data: inviteCode ? { invite_code: inviteCode } : undefined,
      },
    });

    if (signInError) {
      setStatus("error");
      setError(signInError.message);
      return;
    }
    setStatus("sent");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
      onClick={closeSignIn}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[380px] rounded-2xl border border-white/10 bg-panel p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id={headingId} className="font-display text-[19px] font-bold text-white">
            Sign in
          </h2>
          <button
            type="button"
            onClick={closeSignIn}
            aria-label="Close"
            className="flex h-7 w-7 flex-none cursor-pointer items-center justify-center rounded-full text-fg-2 hover:text-white"
          >
            <svg className="i" width="15" height="15" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {inviteCode && (
          <p className="mb-4 font-mono text-[11px] text-fg-3">
            Joining with invite code <span className="text-blue-hi">{inviteCode}</span>
          </p>
        )}

        <p className="mb-4 text-[13px] leading-relaxed text-fg-1">
          Sign in to bookmark prompts and invite others. Browsing and copying prompts never
          requires an account.
        </p>

        <div className="mb-4">
          <GoogleSignInButton />
        </div>

        <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.1em] text-fg-3">
          <span className="h-px flex-1 bg-line-d" />
          or
          <span className="h-px flex-1 bg-line-d" />
        </div>

        {status === "sent" ? (
          <div
            role="status"
            className="rounded-lg border border-green/30 bg-green/10 px-3.5 py-3 text-[13px] text-white"
          >
            Check <strong>{email}</strong> for a sign-in link.
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-2.5">
            <label htmlFor="signin-email" className="sr-only">
              Email address
            </label>
            <input
              id="signin-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-line-d2 bg-ink px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-fg-3 focus:border-blue-hi focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full cursor-pointer rounded-lg bg-blue px-3.5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-blue-lo disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Continue with email"}
            </button>
            {status === "error" && (
              <p role="alert" className="text-[12px] text-red">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
