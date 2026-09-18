-- Initial schema: users, bookmarks, invites.
-- Row-level security is enabled and policies are written here, day one, not bolted on
-- later — see docs/technical/ARCHITECTURE.md "Security — built in from day 1".

-- ---------------------------------------------------------------------------
-- users
-- ---------------------------------------------------------------------------

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text,
  invited_by uuid references public.users (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

-- A signed-in user may read and update only their own row.
create policy "users select own"
  on public.users for select
  using (auth.uid() = id);

create policy "users update own"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No insert/delete policy: rows are created only by the handle_new_user trigger
-- below (which runs as security definer, bypassing RLS) and deleted only via the
-- auth.users cascade. Nothing else should ever write this table directly.

-- ---------------------------------------------------------------------------
-- bookmarks
-- ---------------------------------------------------------------------------

create table public.bookmarks (
  user_id uuid not null references public.users (id) on delete cascade,
  lesson_id text not null,
  saved_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.bookmarks enable row level security;

create policy "bookmarks select own"
  on public.bookmarks for select
  using (auth.uid() = user_id);

create policy "bookmarks insert own"
  on public.bookmarks for insert
  with check (auth.uid() = user_id);

create policy "bookmarks delete own"
  on public.bookmarks for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- invites
-- ---------------------------------------------------------------------------

create table public.invites (
  inviter_id uuid not null unique references public.users (id) on delete cascade,
  code text primary key,
  joined_count integer not null default 0
);

alter table public.invites enable row level security;

create policy "invites select own"
  on public.invites for select
  using (auth.uid() = inviter_id);

create policy "invites insert own"
  on public.invites for insert
  with check (auth.uid() = inviter_id);

create policy "invites update own"
  on public.invites for update
  using (auth.uid() = inviter_id)
  with check (auth.uid() = inviter_id);

-- No delete policy: an invite code should not be removable once issued (joined
-- users keep a stable invited_by reference).

-- ---------------------------------------------------------------------------
-- Public invite-name lookup, without a public SELECT policy on either table.
--
-- The /join?ref={code} landing page needs to show "invited by <name>" to a
-- signed-out visitor. A public SELECT policy on `invites` or `users` would leak
-- every inviter's code/email/display_name to any anonymous caller who can query
-- the table, which is wider than what the page needs. Instead: a single
-- SECURITY DEFINER function that takes a code and returns only the matching
-- display name (or null), and nothing else. This is the least-privilege
-- option — one scalar out, no row access — while normal reads/writes on both
-- tables stay owner-only via the policies above.
-- ---------------------------------------------------------------------------

create function public.get_inviter_name(p_code text)
returns text
language sql
security definer
set search_path = public
stable
as $$
  select u.display_name
  from public.invites i
  join public.users u on u.id = i.inviter_id
  where i.code = p_code;
$$;

revoke all on function public.get_inviter_name(text) from public;
grant execute on function public.get_inviter_name(text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Auto-create a public.users row whenever a Supabase Auth user is created.
--
-- Server actions in ARCHITECTURE.md (toggleBookmark, getOrCreateInviteCode,
-- etc.) assume a public.users row already exists for the signed-in auth user.
-- If the signup came from /join?ref={code}, the client passes the code through
-- as auth metadata (`raw_user_meta_data->>'invite_code'`); the trigger resolves
-- it to the inviter, sets invited_by, and bumps that inviter's joined_count.
-- ---------------------------------------------------------------------------

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invite_code text;
  v_inviter_id uuid;
begin
  v_invite_code := new.raw_user_meta_data ->> 'invite_code';

  if v_invite_code is not null then
    select inviter_id into v_inviter_id
    from public.invites
    where code = v_invite_code;
  end if;

  insert into public.users (id, email, invited_by)
  values (new.id, new.email, v_inviter_id);

  if v_inviter_id is not null then
    update public.invites
    set joined_count = joined_count + 1
    where inviter_id = v_inviter_id;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
