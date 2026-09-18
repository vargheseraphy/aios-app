"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { Button } from "../Button";
import { getInviterName } from "@/lib/actions/invites";

export function JoinView() {
  const searchParams = useSearchParams();
  const code = searchParams.get("ref");
  const { user, openSignIn } = useAuth();
  const router = useRouter();

  const [inviterName, setInviterName] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.replace("/account");
      return;
    }
    if (!code) return;
    let cancelled = false;
    getInviterName(code).then((name) => {
      if (!cancelled) setInviterName(name);
    });
    return () => {
      cancelled = true;
    };
  }, [code, user, router]);

  return (
    <div className="pad mx-auto flex max-w-[420px] flex-col items-center gap-4 py-24 text-center">
      <span className="kicker">You&apos;re invited</span>
      <h1 className="font-display text-[26px] font-bold text-white">
        {inviterName
          ? `${inviterName} invited you to AIOS`
          : "Join AI Operating System for Leaders"}
      </h1>
      <p className="text-[13.5px] leading-relaxed text-fg-1">
        Sign in to bookmark prompts and build your own list. Browsing and copying any prompt
        never needs an account.
      </p>
      <Button variant="blue" onClick={() => openSignIn(code ?? undefined)}>
        Sign in to join
      </Button>
    </div>
  );
}
