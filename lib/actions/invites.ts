"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

function generateCode(): string {
  // 8 URL-safe characters — collisions are handled by the unique constraint
  // on invites.code plus a retry below, not by the length alone.
  return Array.from({ length: 8 }, () =>
    "abcdefghijkmnpqrstuvwxyz23456789"[Math.floor(Math.random() * 33)],
  ).join("");
}

/** Reads the signed-in user's invite code, creating one on first call. Throws if signed out. */
export async function getOrCreateInviteCode(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in to get your invite link.");

  const { data: existing } = await supabase
    .from("invites")
    .select("code")
    .eq("inviter_id", user.id)
    .maybeSingle();
  if (existing) return existing.code as string;

  // `invites.inviter_id` is unique, so a retry only fires on a genuine
  // code collision (astronomically unlikely at this scale), not a re-insert
  // for the same user.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    const { error } = await supabase.from("invites").insert({ inviter_id: user.id, code });
    if (!error) return code;
    if (!error.message.toLowerCase().includes("code")) throw error;
  }
  throw new Error("Could not generate a unique invite code — try again.");
}

export interface InviteStats {
  code: string;
  joinedCount: number;
}

/** Reads the signed-in user's invite code and how many people have joined via it. */
export async function getMyInviteStats(): Promise<InviteStats | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("invites")
    .select("code, joined_count")
    .eq("inviter_id", user.id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return { code: data.code as string, joinedCount: data.joined_count as number };
}

/**
 * Public lookup for the `/join?ref={code}` landing page — no session
 * required. Goes through the `get_inviter_name` SECURITY DEFINER function
 * (supabase/migrations/0001_init.sql) rather than a table read, so a
 * signed-out visitor can only ever learn one inviter's display name (the
 * one whose code they already have), never enumerate the table.
 */
export async function getInviterName(code: string): Promise<string | null> {
  // Called unprompted on /join page load (no session gate) — no live
  // Supabase project is provisioned yet, so fail soft rather than throw an
  // unhandled rejection into the caller's effect. See DECISIONS.md.
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_inviter_name", { p_code: code });
  if (error) throw error;
  return (data as string | null) ?? null;
}
