-- FormuNex on Supabase: one workspace per company, members with roles, and the app's data as records.
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run. Safe to run again.

create extension if not exists pgcrypto;

-- ---------- tables ----------
create table if not exists public.orgs (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (length(trim(name)) between 1 and 120),
  created_at timestamptz not null default now()
);

create table if not exists public.members (
  org_id     uuid not null references public.orgs(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  email      text not null,
  name       text not null,
  role       text not null check (role in ('admin','rnd','production')),
  active     boolean not null default true,
  last_login timestamptz,
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);
create index if not exists members_user_idx on public.members(user_id);

-- Every formula, material, test, machine... is one row. coll = collection name in the app, id = item id.
create table if not exists public.records (
  org_id     uuid not null references public.orgs(id) on delete cascade,
  coll       text not null,
  id         text not null,
  data       jsonb,
  deleted    boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid(),
  primary key (org_id, coll, id)
);

-- ---------- helpers ----------
create or replace function public.my_role(p_org uuid) returns text
language sql stable security definer set search_path = public as $$
  select role from public.members where org_id = p_org and user_id = auth.uid() and active
$$;

create or replace function public.touch_record() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end $$;
drop trigger if exists records_touch on public.records;
create trigger records_touch before insert or update on public.records
  for each row execute function public.touch_record();

-- ---------- row level security ----------
alter table public.orgs    enable row level security;
alter table public.members enable row level security;
alter table public.records enable row level security;

drop policy if exists orgs_read on public.orgs;
create policy orgs_read on public.orgs for select to authenticated
  using (public.my_role(id) is not null);

drop policy if exists members_read on public.members;
create policy members_read on public.members for select to authenticated
  using (user_id = auth.uid() or public.my_role(org_id) is not null);
-- members are changed only through the functions below

drop policy if exists records_read on public.records;
create policy records_read on public.records for select to authenticated
  using (public.my_role(org_id) is not null);

drop policy if exists records_insert on public.records;
create policy records_insert on public.records for insert to authenticated
  with check (public.my_role(org_id) in ('admin','rnd'));

drop policy if exists records_update on public.records;
create policy records_update on public.records for update to authenticated
  using (public.my_role(org_id) in ('admin','rnd'))
  with check (public.my_role(org_id) in ('admin','rnd'));
-- no delete policy: the app marks rows deleted instead, so realtime never sends unfiltered delete events

-- ---------- workspace and member management ----------
create or replace function public.create_org(p_name text, p_full_name text) returns uuid
language plpgsql security definer set search_path = public as $$
declare v_org uuid; v_email text;
begin
  if auth.uid() is null then raise exception 'not_signed_in'; end if;
  select email into v_email from auth.users where id = auth.uid();
  insert into public.orgs(name) values (trim(p_name)) returning id into v_org;
  insert into public.members(org_id, user_id, email, name, role, last_login)
    values (v_org, auth.uid(), v_email, trim(p_full_name), 'admin', now());
  return v_org;
end $$;

create or replace function public.add_member(p_org uuid, p_email text, p_name text, p_role text) returns uuid
language plpgsql security definer set search_path = public as $$
declare v_uid uuid;
begin
  if public.my_role(p_org) is distinct from 'admin' then raise exception 'not_admin'; end if;
  if p_role not in ('admin','rnd','production') then raise exception 'bad_role'; end if;
  select id into v_uid from auth.users where lower(email) = lower(trim(p_email));
  if v_uid is null then raise exception 'no_user'; end if;
  insert into public.members(org_id, user_id, email, name, role)
    values (p_org, v_uid, lower(trim(p_email)), trim(p_name), p_role)
    on conflict (org_id, user_id) do update set name = excluded.name, role = excluded.role, active = true;
  return v_uid;
end $$;

create or replace function public.active_admins(p_org uuid) returns int
language sql stable security definer set search_path = public as $$
  select count(*)::int from public.members where org_id = p_org and role = 'admin' and active
$$;

create or replace function public.update_member(p_org uuid, p_user uuid, p_role text, p_active boolean) returns void
language plpgsql security definer set search_path = public as $$
declare cur public.members;
begin
  if public.my_role(p_org) is distinct from 'admin' then raise exception 'not_admin'; end if;
  select * into cur from public.members where org_id = p_org and user_id = p_user for update;
  if not found then raise exception 'no_member'; end if;
  if coalesce(p_role, cur.role) not in ('admin','rnd','production') then raise exception 'bad_role'; end if;
  if cur.role = 'admin' and cur.active
     and (coalesce(p_role, cur.role) <> 'admin' or not coalesce(p_active, cur.active))
     and public.active_admins(p_org) <= 1 then
    raise exception 'last_admin';
  end if;
  update public.members set role = coalesce(p_role, role), active = coalesce(p_active, active)
    where org_id = p_org and user_id = p_user;
end $$;

create or replace function public.remove_member(p_org uuid, p_user uuid) returns void
language plpgsql security definer set search_path = public as $$
declare cur public.members;
begin
  if public.my_role(p_org) is distinct from 'admin' then raise exception 'not_admin'; end if;
  select * into cur from public.members where org_id = p_org and user_id = p_user for update;
  if not found then return; end if;
  if cur.role = 'admin' and cur.active and public.active_admins(p_org) <= 1 then raise exception 'last_admin'; end if;
  delete from public.members where org_id = p_org and user_id = p_user;
end $$;

create or replace function public.touch_login(p_org uuid) returns void
language sql security definer set search_path = public as $$
  update public.members set last_login = now() where org_id = p_org and user_id = auth.uid()
$$;

revoke all on function public.create_org(text,text), public.add_member(uuid,text,text,text),
  public.update_member(uuid,uuid,text,boolean), public.remove_member(uuid,uuid), public.touch_login(uuid),
  public.my_role(uuid), public.active_admins(uuid) from public, anon;
grant execute on function public.create_org(text,text), public.add_member(uuid,text,text,text),
  public.update_member(uuid,uuid,text,boolean), public.remove_member(uuid,uuid), public.touch_login(uuid),
  public.my_role(uuid), public.active_admins(uuid) to authenticated;

grant select on public.orgs, public.members to authenticated;
grant select, insert, update on public.records to authenticated;

-- ---------- live updates ----------
do $$ begin
  alter publication supabase_realtime add table public.records;
exception when duplicate_object or undefined_object then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.members;
exception when duplicate_object or undefined_object then null; end $$;
