-- Follow-up from the Supabase advisor report run right after 0001 shipped to a
-- live project: one real security gap and two standard performance fixes.

-- ---------------------------------------------------------------------------
-- handle_new_user() must not be callable as a public RPC.
--
-- It's a `returns trigger` function meant to run only via on_auth_user_created;
-- Postgres already refuses to invoke a trigger function outside trigger
-- context, so this was not actually exploitable, but the advisor is right that
-- leaving EXECUTE granted to anon/authenticated is needless exposed surface
-- for a function that inserts into public.users and mutates invites.joined_count.
-- get_inviter_name's equivalent warning is intentional (see 0001's comment)
-- and is left as-is.
-- ---------------------------------------------------------------------------

revoke all on function public.handle_new_user() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- RLS policies: wrap auth.uid() as (select auth.uid()) so Postgres evaluates
-- it once per query instead of once per row. Same policy logic, no change in
-- who can read or write what — see
-- https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select
-- ---------------------------------------------------------------------------

drop policy "users select own" on public.users;
create policy "users select own"
  on public.users for select
  using ((select auth.uid()) = id);

drop policy "users update own" on public.users;
create policy "users update own"
  on public.users for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy "bookmarks select own" on public.bookmarks;
create policy "bookmarks select own"
  on public.bookmarks for select
  using ((select auth.uid()) = user_id);

drop policy "bookmarks insert own" on public.bookmarks;
create policy "bookmarks insert own"
  on public.bookmarks for insert
  with check ((select auth.uid()) = user_id);

drop policy "bookmarks delete own" on public.bookmarks;
create policy "bookmarks delete own"
  on public.bookmarks for delete
  using ((select auth.uid()) = user_id);

drop policy "invites select own" on public.invites;
create policy "invites select own"
  on public.invites for select
  using ((select auth.uid()) = inviter_id);

drop policy "invites insert own" on public.invites;
create policy "invites insert own"
  on public.invites for insert
  with check ((select auth.uid()) = inviter_id);

drop policy "invites update own" on public.invites;
create policy "invites update own"
  on public.invites for update
  using ((select auth.uid()) = inviter_id)
  with check ((select auth.uid()) = inviter_id);

-- ---------------------------------------------------------------------------
-- Cover the users.invited_by foreign key with an index — unindexed FKs slow
-- the cascade/lookup path as the table grows.
-- ---------------------------------------------------------------------------

create index users_invited_by_idx on public.users (invited_by);
