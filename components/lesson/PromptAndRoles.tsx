"use client";

import { useState, type ReactNode } from "react";
import type { RoleProfileV2, SharpenXref } from "@/lib/content-v2";
import { PromptCard } from "./PromptCard";
import { RolesSection } from "./RolesSection";
import { LessonGate } from "./LessonGate";

/**
 * Owns the one piece of shared client state on the page: which role (if
 * any) is currently swapped into the prompt's opening clause. PromptCard
 * and RolesSection both need it, so it lives in their nearest common
 * client ancestor rather than in the (server) page component. All content
 * data is passed in as plain, already-resolved props — nothing here does
 * its own fs reads (lib/content-v2.ts's readers only run server-side).
 *
 * Also the seam between the free part of the page and the gated part
 * (DECISIONS.md): PromptCard renders outside the gate, RolesSection and
 * everything after it (`deeperContent` — use-when, how-to, method, origin,
 * pairs, passed in from page.tsx) render inside a single LessonGate, so a
 * signed-out visitor sees one sign-in panel, not one per section.
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
  deeperContent,
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
  deeperContent: ReactNode;
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
      <LessonGate>
        <RolesSection
          roleProfile={roleProfile}
          interactive={roleMatches}
          activeClause={activeRoleClause}
          onSelect={setActiveRoleClause}
          sharpenTips={sharpenTips}
          sharpenXref={sharpenXref}
        />
        {deeperContent}
      </LessonGate>
    </>
  );
}
