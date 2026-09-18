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
import { createClient } from "@/lib/supabase/client";
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
  const [loading, setLoading] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  useEffect(() => {
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
