"use client";

import type { RoleProfileV2, RoleV2 } from "@/lib/content-v2";
import styles from "./roles.module.css";

function InteractiveRoleGroup({
  title,
  description,
  roles,
  variant,
  activeClause,
  onSelect,
}: {
  title: string;
  description: string;
  roles: RoleV2[];
  variant: "internal" | "outside";
  activeClause: string | null;
  onSelect: (clause: string | null) => void;
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
        {roles.map((role) => {
          const pressed = activeClause === role.promptClause;
          return (
            <button
              key={role.role}
              type="button"
              className={styles.roleRow}
              aria-pressed={pressed}
              aria-label={`Use the role: ${role.role}`}
              onClick={() => onSelect(pressed ? null : role.promptClause)}
            >
              <span className={styles.lvl} aria-hidden="true">
                {role.seniority}
              </span>
              <span className={styles.rn}>{role.role}</span>
              <span className={styles.rp}>{role.priorities}</span>
              <span className={styles.rw}>{role.bestWhen}</span>
              <span className={styles.use}>Use</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function RolesInteractive({
  roleProfile,
  activeClause,
  onSelect,
}: {
  roleProfile: RoleProfileV2;
  activeClause: string | null;
  onSelect: (clause: string | null) => void;
}) {
  return (
    <>
      <p className={styles.roleHint}>
        <svg className="i" width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 3L5 13.5h5.5L11 21l8-10.5h-5.5z" />
        </svg>
        Choose any role to drop it into the prompt above. Only the highlighted opening clause
        changes — the rest of the prompt stays exactly as printed.
      </p>

      <InteractiveRoleGroup
        title="Internal roles"
        description="Think from inside the organisation"
        roles={roleProfile.internal}
        variant="internal"
        activeClause={activeClause}
        onSelect={onSelect}
      />
      <InteractiveRoleGroup
        title="Outside perspectives"
        description="Challenge your blind spots"
        roles={roleProfile.outside}
        variant="outside"
        activeClause={activeClause}
        onSelect={onSelect}
      />

      {activeClause !== null && (
        <button type="button" className={styles.roleReset} onClick={() => onSelect(null)}>
          <svg className="i" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4" />
            <path d="M20.5 4.2V9h-4.8" />
          </svg>
          Put the book&rsquo;s own role back
        </button>
      )}
    </>
  );
}
