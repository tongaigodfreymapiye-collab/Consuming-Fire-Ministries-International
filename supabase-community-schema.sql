-- CFMI community accounts, prayer requests and testimonies.
-- Run in Supabase SQL Editor. Never put a service_role key in the website.
create table if not exists public.community_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null check (char_length(username) between 2 and 32),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- Usernames are public display names; the site validates their format.

create or replace function public.cfmi_create_community_profile()
returns trigger language plpgsql security definer set search_path = public
as $$
declare new_username text;
begin
  new_username := trim(coalesce(new.raw_user_meta_data->>'username', 'CFMI Member'));
  if char_length(new_username) < 2 then new_username := 'CFMI Member'; end if;
  if char_length(new_username) > 32 then new_username := left(new_username,32); end if;
  insert into public.community_profiles(user_id,username)
  values(new.id,new_username)
  on conflict (user_id) do nothing;
  return new;
end; $$;
drop trigger if exists cfmi_auth_user_created on auth.users;
create trigger cfmi_auth_user_created after insert on auth.users
for each row execute procedure public.cfmi_create_community_profile();

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('prayer','testimony')),
  title text not null check (char_length(title) between 3 and 120),
  body text not null check (char_length(body) between 10 and 6000),
  username text not null check (char_length(username) between 2 and 32),
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  created_at timestamptz not null default now()
);
create index if not exists community_posts_public_feed on public.community_posts(status,kind,created_at desc);
alter table public.community_profiles enable row level security;
alter table public.community_posts enable row level security;

drop policy if exists "Public read usernames" on public.community_profiles;
create policy "Public read usernames" on public.community_profiles for select using (true);
drop policy if exists "Members insert own profile" on public.community_profiles;
create policy "Members insert own profile" on public.community_profiles for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Members update own profile" on public.community_profiles;
create policy "Members update own profile" on public.community_profiles for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Public read approved community posts" on public.community_posts;
create policy "Public read approved community posts" on public.community_posts for select using (status = 'published');
drop policy if exists "Members read own community posts" on public.community_posts;
create policy "Members read own community posts" on public.community_posts for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Members submit pending community posts" on public.community_posts;
create policy "Members submit pending community posts" on public.community_posts for insert to authenticated with check (auth.uid() = user_id and status = 'pending' and username = (select username from public.community_profiles where user_id = auth.uid()));
-- Church moderators can publish/reject posts from the Supabase dashboard.
-- Email addresses are held only by Supabase Auth and are never included in public queries.
