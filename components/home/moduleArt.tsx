import type { ReactNode } from "react";

/**
 * Per-module decorative gradient + line-art icon for the module rail card,
 * ported 1:1 from home.html's `.mcard .media` blocks (module numbers 1-10).
 */
export const MODULE_ART: Record<number, { background: string; icon: ReactNode }> = {
  1: {
    background:
      "radial-gradient(180px 130px at 30% 30%,#3B7BF7,transparent 64%),radial-gradient(160px 130px at 82% 78%,#6EA0FF,transparent 60%),#0B0C0F",
    icon: (
      <svg viewBox="0 0 72 72" className="line" aria-hidden="true">
        <circle className="s" cx="36" cy="36" r="24" />
        <path className="s" d="M46 26L40 42l-16 6 6-16z" />
        <circle className="fd" cx="36" cy="36" r="3.2" />
        <path className="s2" d="M36 8v6M36 58v6M8 36h6M58 36h6" />
      </svg>
    ),
  },
  2: {
    background:
      "radial-gradient(180px 130px at 70% 25%,#EC4A3B,transparent 62%),radial-gradient(180px 140px at 20% 85%,#FBBE10,transparent 60%),#0B0C0F",
    icon: (
      <svg viewBox="0 0 72 72" className="line" aria-hidden="true">
        <path className="s" d="M14 30l22-14 22 14-22 13z" />
        <path className="s" d="M14 30v18l22 13 22-13V30" />
        <path className="s2" d="M36 43v18" />
        <path className="s3" d="M24 24l24 14" />
      </svg>
    ),
  },
  3: {
    background:
      "radial-gradient(180px 140px at 25% 35%,#2FAB57,transparent 62%),radial-gradient(160px 140px at 85% 75%,#3B7BF7,transparent 60%),#0B0C0F",
    icon: (
      <svg viewBox="0 0 72 72" className="line" aria-hidden="true">
        <circle className="s" cx="32" cy="32" r="17" />
        <path className="s" d="M44 44l14 14" />
        <path className="s" d="M26 36v-8M32 36V24M38 36v-5" />
      </svg>
    ),
  },
  4: {
    background:
      "radial-gradient(180px 130px at 40% 20%,#FBBE10,transparent 60%),radial-gradient(180px 140px at 80% 85%,#EC4A3B,transparent 62%),#0B0C0F",
    icon: (
      <svg viewBox="0 0 72 72" className="line" aria-hidden="true">
        <path className="s" d="M12 16h48L42 38v18l-12 6V38z" />
        <path className="s2" d="M20 24h32" />
        <circle className="fd" cx="36" cy="52" r="2.6" />
      </svg>
    ),
  },
  5: {
    background:
      "radial-gradient(190px 140px at 30% 70%,#6EA0FF,transparent 62%),radial-gradient(160px 130px at 75% 25%,#2FAB57,transparent 60%),#0B0C0F",
    icon: (
      <svg viewBox="0 0 72 72" className="line" aria-hidden="true">
        <path className="s" d="M14 28v14h10l16 12V16L24 28z" />
        <path className="s" d="M18 42v10h8v-10" />
        <path className="s2" d="M48 28c5 5 5 11 0 16M55 22c8 8 8 20 0 28" />
      </svg>
    ),
  },
  6: {
    background:
      "radial-gradient(180px 140px at 65% 30%,#3B7BF7,transparent 62%),radial-gradient(180px 140px at 20% 80%,#FBBE10,transparent 60%),#0B0C0F",
    icon: (
      <svg viewBox="0 0 72 72" className="line" aria-hidden="true">
        <circle className="s" cx="26" cy="26" r="9" />
        <path className="s" d="M10 52c0-9 7-15 16-15s16 6 16 15" />
        <circle className="s2" cx="48" cy="29" r="7.5" />
        <path className="s2" d="M38 52c0-8 5-13 10-13s10 5 10 13" />
      </svg>
    ),
  },
  7: {
    background:
      "radial-gradient(180px 130px at 35% 30%,#EC4A3B,transparent 60%),radial-gradient(180px 140px at 85% 80%,#2FAB57,transparent 62%),#0B0C0F",
    icon: (
      <svg viewBox="0 0 72 72" className="line" aria-hidden="true">
        <circle className="s" cx="36" cy="36" r="10" />
        <path className="s" d="M36 14v8M36 50v8M14 36h8M50 36h8M20 20l6 6M46 46l6 6M52 20l-6 6M26 46l-6 6" />
        <circle className="fd" cx="36" cy="36" r="3" />
      </svg>
    ),
  },
  8: {
    background:
      "radial-gradient(190px 140px at 25% 25%,#2FAB57,transparent 62%),radial-gradient(160px 130px at 80% 80%,#6EA0FF,transparent 58%),#0B0C0F",
    icon: (
      <svg viewBox="0 0 72 72" className="line" aria-hidden="true">
        <path className="s" d="M36 16v14M36 30L20 48M36 30l16 18" />
        <circle className="s" cx="36" cy="14" r="5" />
        <circle className="s2" cx="20" cy="52" r="6" />
        <circle className="s" cx="52" cy="52" r="6" />
        <path className="s" d="M49 52l2.5 2.5L56 50" />
      </svg>
    ),
  },
  9: {
    background:
      "radial-gradient(180px 140px at 70% 35%,#FBBE10,transparent 60%),radial-gradient(180px 140px at 25% 85%,#3B7BF7,transparent 62%),#0B0C0F",
    icon: (
      <svg viewBox="0 0 72 72" className="line" aria-hidden="true">
        <path className="s" d="M14 54V34M28 54V24M42 54V40M56 54V18" />
        <path className="s2" d="M10 58h52" />
        <path className="s3" d="M14 30l14-10 14 14 14-20" />
      </svg>
    ),
  },
  10: {
    background:
      "radial-gradient(180px 130px at 30% 75%,#6EA0FF,transparent 60%),radial-gradient(180px 140px at 80% 25%,#EC4A3B,transparent 62%),#0B0C0F",
    icon: (
      <svg viewBox="0 0 72 72" className="line" aria-hidden="true">
        <circle className="s" cx="36" cy="26" r="10" />
        <path className="s" d="M18 56c0-10 8-16 18-16s18 6 18 16" />
        <path className="s2" d="M36 6v6M22 11l3 5M50 11l-3 5" />
      </svg>
    ),
  },
};
