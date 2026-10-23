-- Run this in Supabase SQL Editor to enable secure CFMI testimony accounts and submissions.
create table if not exists public.testimonies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 80),
  title text not null check (char_length(title) between 3 and 120),
  testimony text not null check (char_length(testimony) between 20 and 6000),
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  created_at timestamptz not null default now()
);
alter table public.testimonies enable row level security;
drop policy if exists "Public can read published testimonies" on public.testimonies;
create policy "Public can read published testimonies" on public.testimonies for select using (status = 'published');
drop policy if exists "Users can read their own testimonies" on public.testimonies;
create policy "Users can read their own testimonies" on public.testimonies for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Authenticated users submit pending testimonies" on public.testimonies;
create policy "Authenticated users submit pending testimonies" on public.testimonies for insert to authenticated with check (auth.uid() = user_id and status = 'pending');
drop policy if exists "Users can edit their own pending testimonies" on public.testimonies;
create policy "Users can edit their own pending testimonies" on public.testimonies for update to authenticated using (auth.uid() = user_id and status = 'pending') with check (auth.uid() = user_id and status = 'pending');
