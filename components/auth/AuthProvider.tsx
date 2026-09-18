"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SignInModal } from "./SignInModal";

interface AuthContextValue {
  user: User | null;
  /** True until the first session check resolves — avoids a signed-out flash. */
  loading: boolean;
  isSignInOpen: boolean;
  /** `inviteCode`, when set, rides along on the next magic-link/OAuth sign-in
   * so the `handle_new_user` trigger can resolve `invited_by`. */
  openSignIn: (inviteCode?: string) => void;
  closeSignIn: () => void;
  inviteCode: string | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Client-side only: mounts a browser Supabase client and listens for auth
 * state changes. Wrapping the whole app (see app/layout.tsx) doesn't add a
 * server-side database call to any route, including the static QR pages —
 * this runs entirely after hydration. See DECISIONS.md.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Starts `false` (not loading) when no live Supabase project is
  // provisioned (see DECISIONS.md) — there's nothing to await, known
  // synchronously at init, so the effect below never needs to set it itself
  // for that branch (this repo's lint config flags a synchronous setState
  // in an effect body as a real error, not a style nit — see DECISIONS.md's
  // "Sign-in modal only mounts while open" note for the same pattern).
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  useEffect(() => {
    // Every page renders this provider, including the static QR lesson
    // pages, so skip client setup entirely rather than let `createClient()`
    // throw and crash the whole tree. Visitors are simply treated as signed
    // out until real env vars are set.
    if (!isSupabaseConfigured) return;

    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setIsSignInOpen(false);
        setInviteCode(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const openSignIn = useCallback((code?: string) => {
    if (code) setInviteCode(code);
    setIsSignInOpen(true);
  }, []);

  const closeSignIn = useCallback(() => setIsSignInOpen(false), []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    await supabase.auth.signOut();
  }, []);

  const value = useMemo(
    () => ({ user, loading, isSignInOpen, openSignIn, closeSignIn, inviteCode, signOut }),
    [user, loading, isSignInOpen, openSignIn, closeSignIn, inviteCode, signOut],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {isSignInOpen && <SignInModal />}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
