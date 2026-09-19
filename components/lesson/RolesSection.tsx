import Link from "next/link";
import type { RoleProfileV2, RoleV2, SharpenXref } from "@/lib/content-v2";
import { RolesInteractive } from "./RolesInteractive";
import styles from "./roles.module.css";

export interface RolesSectionProps {
  roleProfile: RoleProfileV2;
  /** false when this lesson's promptBody doesn't match the "Act as ..." role-line
   * pattern (NOTE 4) — role rows still inform the reader, but render as plain,
   * non-interactive cards rather than a switcher. */
  interactive: boolean;
  activeClause: string | null;
  onSelect: (clause: string | null) => void;
  /** Pre-parsed on the server (lib/content-v2.ts does real fs reads to resolve
   * this, which can't run in client-bundled code) — see page.tsx. */
  sharpenTips: string[];
  sharpenXref: SharpenXref | null;
}

/** Non-interactive role row — used only when this lesson's prompt has no
 * swappable role clause to apply a selection to (see NOTE 4). Plain markup,
 * no event handlers, so the section stays server-rendered in that case. */
function StaticRoleGroup({
  title,
  description,
  roles,
  variant,
}: {
  title: string;
  description: string;
  roles: RoleV2[];
  variant: "internal" | "outside";
}) {
  return (
    <div className={`${styles.roleGrp} ${variant === "outside" ? styles.gOut : styles.gIn}`}>
      <div className={styles.gh}>
        <span className={styles.gt}>{title}</span>
        <span className={styles.gd}>{description}</span>
      </div>
      <div className={styles.roleList} role="group" aria-label={title}>
        <div className={styles.roleHead} aria-hidden="true">
          <span>Level</span>
          <span>Role</span>
          <span>They prioritise</span>
          <span>Best used when</span>
          <span />
        </div>
        {roles.map((role) => (
          <div key={role.role} className={styles.roleRow}>
            <span className={styles.lvl} aria-hidden="true">
              {role.seniority}
            </span>
            <span className={styles.rn}>{role.role}</span>
            <span className={styles.rp}>{role.priorities}</span>
            <span className={styles.rw}>{role.bestWhen}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RolesSection({
  roleProfile,
  interactive,
  activeClause,
  onSelect,
  sharpenTips,
  sharpenXref,
}: RolesSectionProps) {
  return (
    <div id="roles" className={styles.blk}>
      <div className={styles.bh}>
        <span className={styles.bi} style={{ background: "#E8F0FE", color: "#1E5CE0" }}>
          <svg className="i" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3 19c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4" />
            <path d="M16.5 6.2a3.2 3.2 0 0 1 0 5.6M18 19c0-2.6-1-4.3-2.6-5.1" />
          </svg>
        </span>
        <h2>Who should run this prompt</h2>
        <span className={styles.bn}>Module role profile</span>
      </div>

      <p className={styles.roleLead}>
        <b>{roleProfile.question}</b> {roleProfile.lead}
      </p>

      {interactive ? (
        <RolesInteractive
          roleProfile={roleProfile}
          activeClause={activeClause}
          onSelect={onSelect}
        />
      ) : (
        <>
          <p className={styles.roleHint}>
            The roles below are who the book suggests running this prompt — this lesson&rsquo;s
            prompt doesn&rsquo;t open with a single swappable role clause, so pick one and adapt
            the prompt&rsquo;s own wording yourself.
          </p>
          <StaticRoleGroup
            title="Internal roles"
            description="Think from inside the organisation"
            roles={roleProfile.internal}
            variant="internal"
          />
          <StaticRoleGroup
            title="Outside perspectives"
            description="Challenge your blind spots"
            roles={roleProfile.outside}
            variant="outside"
          />
        </>
      )}

      <p className={styles.senKey}>
        <span>
          <b>◆◆◆◆◆ → ◆</b> seniority, board level down to specialist
        </span>
        <span>
          <b>◈</b> outside the organisation
        </span>
      </p>

      <div className={styles.sharpen}>
        <h3>How to make any role sharper</h3>
        <ol>
          {sharpenTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ol>
        {sharpenXref?.resolved && (
          <Link className={styles.xref} href={`/m${sharpenXref.module}/${sharpenXref.fileId}`}>
            See also: {sharpenXref.number} {sharpenXref.title}
            <svg className="i" width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
