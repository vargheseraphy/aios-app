"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import styles from "./SiteHeader.module.css";

// Kept to the reader's two most common jobs (a QR scanner browsing modules,
// a buyer/gifter reading the pitch) so the nav doesn't turn into a list of
// every route on the site. Everything else lives in the "More" menu below or
// in the footer only — see DECISIONS.md's nav/footer curation entry.
const PRIMARY_LINKS = [
  { href: "/why-this-book", label: "Why frameworks" },
  { href: "/how-to-use", label: "How to use" },
  { href: "/modules", label: "Modules" },
  { href: "/who-its-for", label: "Who it's for" },
];

const MORE_LINKS = [
  { href: "/for-business", label: "For business" },
  { href: "/for-institutions", label: "For institutions" },
  { href: "/about", label: "About Raphy" },
  { href: "/contact", label: "Contact" },
];

/**
 * Sticky site nav, ported from docs/design/pages/home.html. The login icon
 * opens the real sign-in modal (Phase 5); once signed in it swaps to an
 * avatar-chip linking to /account, matching the locked design's own states.
 */
export function SiteHeader() {
  const { user, openSignIn } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const initials = (user?.user_metadata?.display_name || user?.email || "?")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    if (!moreOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  return (
    <nav className={styles.nav}>
      <div className={`pad ${styles.navIn}`}>
        <Link className={styles.mark} href="/">
          <span className={styles.sq} />
          AIOS
        </Link>
        <span className={styles.navLinks}>
          {PRIMARY_LINKS.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
          <div className={styles.more} ref={moreRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
            >
              More
              <svg
                className={styles.moreCr}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            {moreOpen && (
              <div className={styles.moreMenu} role="menu">
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </span>
        <span className={styles.navCta}>
          <Link className="btn btn-white btn-sm" href="/#get">
            Get the book
          </Link>
          {!user && (
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Log in"
              title="Log in"
              onClick={() => openSignIn()}
            >
              <svg className="i" width="17" height="17" viewBox="0 0 24 24">
                <circle cx="12" cy="8.5" r="3.6" />
                <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
              </svg>
            </button>
          )}
          {user && (
            <Link href="/account" className={styles.avatarChip} title="Your account">
              <span className={styles.av}>{initials}</span>
              <svg className={`i ${styles.cr}`} width="14" height="14" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Link>
          )}
        </span>
      </div>
    </nav>
  );
}
