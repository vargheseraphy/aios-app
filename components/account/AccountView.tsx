"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthProvider";
import { Button } from "../Button";
import { CopyButton } from "../CopyButton";
import { getAccount, updateDisplayName, type Account } from "@/lib/actions/account";
import { getMyInviteStats, getOrCreateInviteCode } from "@/lib/actions/invites";

export function AccountView() {
  const { signOut } = useAuth();
  const router = useRouter();

  const [account, setAccount] = useState<Account | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);

  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [joinedCount, setJoinedCount] = useState<number | null>(null);
  const [inviteLoading, setInviteLoading] = useState(true);

  useEffect(() => {
    getAccount().then((data) => {
      setAccount(data);
      setDisplayName(data?.displayName ?? "");
    });

    getMyInviteStats().then(async (stats) => {
      if (stats) {
        setInviteCode(stats.code);
        setJoinedCount(stats.joinedCount);
      } else {
        const code = await getOrCreateInviteCode();
        setInviteCode(code);
        setJoinedCount(0);
      }
      setInviteLoading(false);
    });
  }, []);

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault();
    setSavingName(true);
    setNameSaved(false);
    try {
      await updateDisplayName(displayName);
      setNameSaved(true);
    } finally {
      setSavingName(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  const joinLink =
    typeof window !== "undefined" && inviteCode
      ? `${window.location.origin}/join?ref=${inviteCode}`
      : "";

  return (
    <div className="pad mx-auto max-w-[640px] py-16">
      <h1 className="mb-8 font-display text-[28px] font-bold text-white">Account</h1>

      <section className="mb-10 rounded-2xl border border-white/10 bg-panel p-6">
        <h2 className="mb-4 font-display text-[15px] font-bold text-white">Profile</h2>
        <div className="mb-4">
          <span className="block text-[12px] text-fg-3">Email</span>
          <span className="text-[14px] text-white">{account?.email ?? "…"}</span>
        </div>
        <form onSubmit={handleSaveName} className="flex flex-wrap items-end gap-2.5">
          <div className="flex-1">
            <label htmlFor="display-name" className="mb-1 block text-[12px] text-fg-3">
              Display name (optional)
            </label>
            <input
              id="display-name"
              type="text"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                setNameSaved(false);
              }}
              className="w-full rounded-lg border border-line-d2 bg-ink px-3.5 py-2.5 text-[13.5px] text-white focus:border-blue-hi focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={savingName}
            className="cursor-pointer rounded-lg bg-blue px-3.5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-blue-lo disabled:cursor-not-allowed disabled:opacity-60"
          >
            {savingName ? "Saving…" : nameSaved ? "Saved" : "Save"}
          </button>
        </form>
      </section>

      <section className="mb-10 rounded-2xl border border-white/10 bg-panel p-6">
        <h2 className="mb-4 font-display text-[15px] font-bold text-white">Invite a friend</h2>
        {inviteLoading ? (
          <p className="text-[13px] text-fg-2">Loading…</p>
        ) : (
          <>
            <div className="mb-3 flex flex-wrap items-center gap-2.5">
              <code className="flex-1 truncate rounded-lg border border-line-d2 bg-ink px-3.5 py-2.5 font-mono text-[12.5px] text-fg-1">
                {joinLink}
              </code>
              <CopyButton text={joinLink} label="Copy link" />
            </div>
            <p className="font-mono text-[11px] text-fg-3">
              {joinedCount} {joinedCount === 1 ? "person has" : "people have"} joined with your
              link
            </p>
          </>
        )}
      </section>

      <Button variant="line" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}
