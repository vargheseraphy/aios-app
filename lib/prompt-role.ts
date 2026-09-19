/**
 * Pure prompt-text helpers with no filesystem dependency, split out of
 * lib/content-v2.ts specifically so client components (the role switcher)
 * can import them without pulling `node:fs` into the browser bundle —
 * Turbopack refuses to chunk a client bundle that transitively imports it.
 * lib/content-v2.ts re-exports these for server-side callers.
 */

const ROLE_LINE_RE = /^Act as (.+?)\.\n/;

export interface PromptRoleMatch {
  matches: boolean;
  /** the captured role clause, e.g. "a startup finance advisor specialising in unit economics" */
  defaultClause: string | null;
  /** promptBody with the "Act as {clause}.\n" prefix removed — null when matches is false */
  rest: string | null;
}

/** Implements NOTE 4: the role switcher only activates when promptBody opens with an
 * "Act as {clause}.\n" line. Everything else renders the role list as plain, non-interactive. */
export function parsePromptRoleLine(promptBody: string): PromptRoleMatch {
  const match = promptBody.match(ROLE_LINE_RE);
  if (!match) return { matches: false, defaultClause: null, rest: null };
  return { matches: true, defaultClause: match[1], rest: promptBody.slice(match[0].length) };
}

/** Builds the copy/display text for a given promptBody with an optional role override —
 * used both for the initial render and for Copy after a role swap. */
export function applyRoleClause(promptBody: string, overrideClause: string | null): string {
  const parsed = parsePromptRoleLine(promptBody);
  if (!parsed.matches || overrideClause === null) return promptBody;
  return `Act as ${overrideClause}.\n${parsed.rest}`;
}
