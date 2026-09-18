import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client for use in server components, route handlers
 * and server actions. Reads the session from the request's cookies via the
 * anon key — RLS scopes what it can actually see, per signed-in user.
 *
 * `setAll` is wrapped in try/catch because a server component cannot write
 * cookies; when this is called from one, middleware.ts (Phase 5) is what
 * refreshes the session cookie instead.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component — middleware.ts refreshes the
            // session cookie on the next request instead.
          }
        },
      },
    },
  );
}
