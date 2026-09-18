"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const GSI_SRC = "https://accounts.google.com/gsi/client";

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleIdClient {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: { type: "standard"; theme: "outline"; size: "large"; width: number; text: "continue_with" },
  ) => void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdClient } };
  }
}

function loadGsiScript(): Promise<void> {
  if (document.querySelector(`script[src="${GSI_SRC}"]`)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GSI_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Sign-In"));
    document.head.appendChild(script);
  });
}

/**
 * Renders Google's own button via Google Identity Services — per
 * docs/technical/ARCHITECTURE.md, "the Google Sign-In button is not
 * restyled," only its container is positioned. Exchanges the resulting ID
 * token for a Supabase session directly (`signInWithIdToken`), no OAuth
 * redirect needed.
 *
 * No live Google Cloud OAuth client exists in this environment (see
 * DECISIONS.md — "Items needing Raphy") so `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
 * is unset here; the button renders a disabled placeholder instead of
 * failing, and lights up once the env var is configured.
 */
export function GoogleSignInButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const containerId = useId().replace(/:/g, "");
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || !containerRef.current) return;
    let cancelled = false;

    loadGsiScript()
      .then(() => {
        if (cancelled || !window.google || !containerRef.current) return;

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: GoogleCredentialResponse) => {
            const supabase = createClient();
            const { error: signInError } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: response.credential,
            });
            if (signInError) setError(signInError.message);
          },
        });
        window.google.accounts.id.renderButton(containerRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          width: 300,
          text: "continue_with",
        });
      })
      .catch((err: Error) => setError(err.message));

    return () => {
      cancelled = true;
    };
  }, [clientId]);

  if (!clientId) {
    return (
      <div
        aria-disabled="true"
        className="flex w-full items-center justify-center rounded-lg border border-dashed border-line-d2 px-3.5 py-2.5 text-[12.5px] text-fg-3"
        title="Needs NEXT_PUBLIC_GOOGLE_CLIENT_ID — see DECISIONS.md"
      >
        Google sign-in not configured yet
      </div>
    );
  }

  return (
    <div>
      <div id={containerId} ref={containerRef} className="flex justify-center" />
      {error && (
        <p role="alert" className="mt-2 text-[12px] text-red">
          {error}
        </p>
      )}
    </div>
  );
}
