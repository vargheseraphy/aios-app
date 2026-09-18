"use client";

import type { ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import { Button } from "../Button";

/**
 * Wraps a page that requires an account (/account, /my-prompts). Renders
 * nothing signed-in-only until the client-side session check resolves, so a
 * signed-out visitor never briefly sees another user's data flash by.
 */
export function SignInGate({ children }: { children: ReactNode }) {
  const { user, loading, openSignIn } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <div className="pad mx-auto flex max-w-[420px] flex-col items-start gap-4 py-24 text-center sm:items-center">
        <h1 className="font-display text-[22px] font-bold text-white">Sign in required</h1>
        <p className="text-[13.5px] leading-relaxed text-fg-1">
          Bookmarking prompts and inviting others need an account. Browsing and copying prompts
          never does.
        </p>
        <Button variant="blue" onClick={() => openSignIn()}>
          Sign in
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
