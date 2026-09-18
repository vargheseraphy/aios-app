"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "/#why", label: "Why frameworks" },
  { href: "/#modules", label: "Modules" },
  { href: "/how-to-use", label: "How to use" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/#faq", label: "FAQ" },
  { href: "#", label: "Articles" },
];

/**
 * Sticky site nav, ported from docs/design/pages/home.html. There's no real
 * auth yet (Phase 5) — clicking the login icon just previews the signed-in
 * avatar-chip state locally, exactly as the locked design's own demo does.
 */
export function SiteHeader() {
  const [signedInPreview, setSignedInPreview] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={`pad ${styles.navIn}`}>
        <Link className={styles.mark} href="/">
          <span className={styles.sq} />
          AIOS
        </Link>
        <span className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </span>
        <span className={styles.navCta}>
          <Link className="btn btn-white btn-sm" href="/#get">
            Get the book
          </Link>
          {!signedInPreview && (
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Log in"
              title="Log in (click to preview the signed-in state)"
              onClick={() => setSignedInPreview(true)}
            >
              <svg className="i" width="17" height="17" viewBox="0 0 24 24">
                <circle cx="12" cy="8.5" r="3.6" />
                <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
              </svg>
            </button>
          )}
          {signedInPreview && (
            <button
              type="button"
              className={styles.avatarChip}
              title="Signed-in state preview"
              onClick={() => setSignedInPreview(false)}
            >
              <span className={styles.av}>RV</span>
              <svg className={`i ${styles.cr}`} width="14" height="14" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
        </span>
      </div>
    </nav>
  );
}
