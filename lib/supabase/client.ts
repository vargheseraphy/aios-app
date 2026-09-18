import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * False until a live Supabase project's URL/anon key are set (see
 * DECISIONS.md — none is provisioned yet). `createBrowserClient` throws
 * synchronously when either is missing, and since `AuthProvider` wraps the
 * whole app (including the static QR lesson pages), that throw used to crash
 * every route's client-side render with no error boundary to catch it.
 * Callers must check this before calling `createClient()`.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Browser-side Supabase client. Uses the anon key only — safe to import from
 * client components. RLS on every table is what actually protects data, not
 * this key's scope. Throws if `isSupabaseConfigured` is false — check that
 * first.
 */
export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY unset) — check isSupabaseConfigured before calling createClient().",
    );
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
