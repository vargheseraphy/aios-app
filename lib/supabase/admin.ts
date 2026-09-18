import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Bypasses RLS entirely — never import this
 * from a client component. The `server-only` import makes any accidental
 * client-side import fail the build rather than ship the key to the browser.
 *
 * There is currently no server action that needs this (every Phase 5 action
 * in ARCHITECTURE.md runs as the signed-in user, scoped by RLS). Kept ready
 * for the rare case that needs to bypass RLS deliberately — e.g. an admin
 * task run outside a user's session.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
