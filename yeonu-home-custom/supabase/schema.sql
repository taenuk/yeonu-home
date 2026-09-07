create extension if not exists pgcrypto;

do $$ begin
  create type public.user_role as enum ('admin','user');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare first_user boolean;
begin
  select not exists(select 1 from public.profiles) into first_user;
  insert into public.profiles(id, role) values (new.id, case when first_user then 'admin'::public.user_role else 'user'::public.user_role end);
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.is_admin(uid uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = uid and role = 'admin');
$$;

create table if not exists public.site_settings (
  id boolean primary key default true check (id = true),
  data jsonb not null default '{"title":"YEONU","subtitle":"personal archive","profileName":"여누","profileImage":"","about":"안녕하세요, 여누입니다.\n\n주로 짤뽑, 프롬 공유, 교류를 하고 있으며,\n주로 비계에서 지냈어서 아직 앵챗계가 익숙하지 않기에 틧이 적고 답멘이 느릴 수 있습니다.\n트친 한 분, 한 분 어떻게든 교류하려고 하고 있지만 내향적인 성격이라 그러지 못 할 때도 있습니다.","love":[],"hate":[],"bgmUrl":"","bgmAutoplay":true,"bgmLoop":true}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.site_settings(id) values(true) on conflict do nothing;

create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(), name text not null, image_url text not null default '', summary text not null default '', details text not null default '', sort_order int not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(), title text not null, category text not null default '', tags text[] not null default '{}', body text not null default '', sort_order int not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.links (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null default '', url text not null default '', sort_order int not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.moving_banners (
  id uuid primary key default gen_random_uuid(), image_url text not null, link_url text not null default '', alt text not null default '', sort_order int not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.friend_banners (
  id uuid primary key default gen_random_uuid(), image_url text not null, link_url text not null default '', alt text not null default '', description text not null default '', sort_order int not null default 0, created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.characters enable row level security;
alter table public.prompts enable row level security;
alter table public.links enable row level security;
alter table public.moving_banners enable row level security;
alter table public.friend_banners enable row level security;
create table if not exists public.pairs (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  character_one_id uuid references public.characters(id) on delete set null,
  character_two_id uuid references public.characters(id) on delete set null,
  image_url text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.pair_logs (
  id uuid primary key default gen_random_uuid(),
  pair_id uuid not null references public.pairs(id) on delete cascade,
  title text not null default '',
  body text not null default '',
  log_date date,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.pairs enable row level security;
alter table public.pair_logs enable row level security;
create policy "public read pairs" on public.pairs for select using (true);
create policy "admin write pairs" on public.pairs for all using (public.is_admin()) with check (public.is_admin());
create policy "public read pair logs" on public.pair_logs for select using (true);
create policy "admin write pair logs" on public.pair_logs for all using (public.is_admin()) with check (public.is_admin());


create policy "public read profiles" on public.profiles for select using (auth.uid() = id);
create policy "public read settings" on public.site_settings for select using (true);
create policy "admin write settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "public read characters" on public.characters for select using (true);
create policy "admin write characters" on public.characters for all using (public.is_admin()) with check (public.is_admin());
create policy "public read prompts" on public.prompts for select using (true);
create policy "admin write prompts" on public.prompts for all using (public.is_admin()) with check (public.is_admin());
create policy "public read links" on public.links for select using (true);
create policy "admin write links" on public.links for all using (public.is_admin()) with check (public.is_admin());
create policy "public read moving" on public.moving_banners for select using (true);
create policy "admin write moving" on public.moving_banners for all using (public.is_admin()) with check (public.is_admin());
create policy "public read friends" on public.friend_banners for select using (true);
create policy "admin write friends" on public.friend_banners for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public) values ('media','media',true) on conflict (id) do nothing;
create policy "public read media" on storage.objects for select using (bucket_id = 'media');
create policy "admin insert media" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "admin update media" on storage.objects for update using (bucket_id = 'media' and public.is_admin()) with check (bucket_id = 'media' and public.is_admin());
create policy "admin delete media" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());
