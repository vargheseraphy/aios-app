import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * The QR path is sacred: a scanned code must reach its prompt with zero
 * database calls and no added latency, per docs/product/PRODUCT.md and
 * BUILD-PROMPT.md's non-negotiables. `/m{module}` and `/m{module}/{lesson}`
 * need no session state at all — refreshing the Supabase session there would
 * add exactly the network round-trip this route is not allowed to have, so
 * it's skipped entirely rather than merely "made fast." See DECISIONS.md.
 */
const QR_PATH = /^\/m\d+(\/|$)/;

export async function middleware(request: NextRequest) {
  if (QR_PATH.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // No live Supabase project is provisioned yet (see DECISIONS.md).
  // `createServerClient` throws synchronously without these, which — before
  // this guard — turned into a hard 500 on every non-QR route (home, every
  // marketing page, /account, /my-prompts, /join), since middleware runs on
  // all of them. There's nothing to refresh a session against yet, so just
  // pass the request through.
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Refreshes the session cookie if it's expired. The return value isn't
  // used here — reading it is what triggers @supabase/ssr's refresh-on-read
  // behaviour; route handlers and server components read the user again
  // themselves when they actually need it.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
