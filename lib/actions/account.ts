"use server";

import { createClient } from "@/lib/supabase/server";

export interface Account {
  email: string;
  displayName: string | null;
}

/** Returns null for a signed-out visitor — /account renders a sign-in prompt itself. */
export async function getAccount(): Promise<Account | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("email, display_name")
    .eq("id", user.id)
    .single();
  if (error) throw error;
  return { email: data.email as string, displayName: (data.display_name as string) ?? null };
}

export async function updateDisplayName(displayName: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in to update your account.");

  const trimmed = displayName.trim();
  const { error } = await supabase
    .from("users")
    .update({ display_name: trimmed.length > 0 ? trimmed : null })
    .eq("id", user.id);
  if (error) throw error;
}
