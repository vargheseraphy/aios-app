import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// There's no live Postgres/Supabase project in this environment to run a real
// integration test against (no `supabase`, `docker`, or `psql` locally), so
// this proves the RLS *policy text* is correctly scoped instead of proving
// live cross-account isolation. See DECISIONS.md — a live-project test
// (sign in as account A, assert a select against account B's bookmark rows
// returns zero) is listed as follow-up work once a Supabase project exists.
const sql = readFileSync(
  join(__dirname, "0001_init.sql"),
  "utf8",
);

function policiesOn(table: string): string[] {
  const pattern = new RegExp(
    `create policy "([^"]+)"\\s+on public\\.${table}[\\s\\S]*?;`,
    "g",
  );
  return [...sql.matchAll(pattern)].map((m) => m[0]);
}

describe("0001_init.sql row-level security", () => {
  it("enables RLS on users, bookmarks and invites", () => {
    for (const table of ["users", "bookmarks", "invites"]) {
      expect(sql).toMatch(
        new RegExp(`alter table public\\.${table} enable row level security;`),
      );
    }
  });

  it("scopes every bookmarks policy to the owning user_id", () => {
    const policies = policiesOn("bookmarks");
    expect(policies.length).toBeGreaterThan(0);
    for (const policy of policies) {
      expect(policy).toMatch(/auth\.uid\(\) = user_id/);
    }
  });

  it("scopes every invites policy to the owning inviter_id", () => {
    const policies = policiesOn("invites");
    expect(policies.length).toBeGreaterThan(0);
    for (const policy of policies) {
      expect(policy).toMatch(/auth\.uid\(\) = inviter_id/);
    }
  });

  it("scopes every users policy to the owning id, with no public/anon grant", () => {
    const policies = policiesOn("users");
    expect(policies.length).toBeGreaterThan(0);
    for (const policy of policies) {
      expect(policy).toMatch(/auth\.uid\(\) = id/);
    }
    // The public /join lookup goes through get_inviter_name() instead of a
    // table policy — assert there's no "using (true)" or anon/public grant
    // that would open a table directly to anonymous reads.
    expect(sql).not.toMatch(/using\s*\(\s*true\s*\)/i);
    expect(sql).not.toMatch(/to\s+(anon|public)\s*;?\s*$/im);
  });

  it("exposes the invite-name lookup as a single scalar, not row access", () => {
    expect(sql).toMatch(/create function public\.get_inviter_name/);
    expect(sql).toMatch(/security definer/);
    expect(sql).toMatch(/returns text/);
    expect(sql).toMatch(
      /grant execute on function public\.get_inviter_name\(text\) to anon, authenticated;/,
    );
  });

  it("has no bookmarks or invites policy without a using/with check clause", () => {
    // A policy with neither clause would allow unrestricted access.
    for (const table of ["bookmarks", "invites"]) {
      for (const policy of policiesOn(table)) {
        expect(policy).toMatch(/using\s*\(|with check\s*\(/);
      }
    }
  });
});
