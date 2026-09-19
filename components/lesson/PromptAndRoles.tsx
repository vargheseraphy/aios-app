"use client";

import { useState } from "react";
import type { RoleProfileV2, SharpenXref } from "@/lib/content-v2";
import { PromptCard } from "./PromptCard";
import { RolesSection } from "./RolesSection";

/**
 * Owns the one piece of shared client state on the page: which role (if
 * any) is currently swapped into the prompt's opening clause. PromptCard
 * and RolesSection both need it, so it lives in their nearest common
 * client ancestor rather than in the (server) page component. All content
 * data is passed in as plain, already-resolved props — nothing here does
 * its own fs reads (lib/content-v2.ts's readers only run server-side).
 */
export function PromptAndRoles({
  lessonId,
  lessonNumber,
  title,
  promptBody,
  proTip,
  flagged,
  roleMatches,
  roleProfile,
  sharpenTips,
  sharpenXref,
}: {
  lessonId: string;
  lessonNumber: string;
  title: string;
  promptBody: string;
  proTip?: string;
  flagged: boolean;
  roleMatches: boolean;
  roleProfile: RoleProfileV2;
  sharpenTips: string[];
  sharpenXref: SharpenXref | null;
}) {
  const [activeRoleClause, setActiveRoleClause] = useState<string | null>(null);

  return (
    <>
      <PromptCard
        lessonId={lessonId}
        lessonNumber={lessonNumber}
        title={title}
        promptBody={promptBody}
        proTip={proTip}
        flagged={flagged}
        activeRoleClause={activeRoleClause}
      />
      <RolesSection
        roleProfile={roleProfile}
        interactive={roleMatches}
        activeClause={activeRoleClause}
        onSelect={setActiveRoleClause}
        sharpenTips={sharpenTips}
        sharpenXref={sharpenXref}
      />
    </>
  );
}
