-- FormuNex book library: books (PDF, Word, images) per company, their text split by page, and full-text search.
-- Run once after schema.sql: Supabase dashboard -> SQL Editor -> New query -> paste -> Run. Safe to run again.

create table if not exists public.books (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references public.orgs(id) on delete cascade,
  title       text not null check (length(trim(title)) between 1 and 300),
  file_name   text,
  file_path   text,            -- object path in the "library" storage bucket, null if only the text was saved
  pages       int not null default 0,
  size_bytes  bigint,
  uploaded_by uuid default auth.uid(),
  created_at  timestamptz not null default now()
);
create index if not exists books_org_idx on public.books(org_id);

-- One row per passage. content is the original text shown to people; norm is the same text
-- normalised by the app (Arabic letter variants unified, diacritics removed, lower case) for search.
create table if not exists public.book_chunks (
  id      bigserial primary key,
  org_id  uuid not null references public.orgs(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  page    int not null,
  content text not null,
  norm    text not null,
  tsv     tsvector generated always as (to_tsvector('simple', norm)) stored
);
create index if not exists book_chunks_tsv_idx on public.book_chunks using gin (tsv);
create index if not exists book_chunks_book_idx on public.book_chunks(book_id);

alter table public.books enable row level security;
alter table public.book_chunks enable row level security;

drop policy if exists books_read on public.books;
create policy books_read on public.books for select to authenticated using (public.my_role(org_id) is not null);
drop policy if exists books_write on public.books;
create policy books_write on public.books for insert to authenticated with check (public.my_role(org_id) in ('admin','rnd'));
drop policy if exists books_update on public.books;
create policy books_update on public.books for update to authenticated
  using (public.my_role(org_id) in ('admin','rnd')) with check (public.my_role(org_id) in ('admin','rnd'));
drop policy if exists books_delete on public.books;
create policy books_delete on public.books for delete to authenticated using (public.my_role(org_id) in ('admin','rnd'));

drop policy if exists chunks_read on public.book_chunks;
create policy chunks_read on public.book_chunks for select to authenticated using (public.my_role(org_id) is not null);
drop policy if exists chunks_write on public.book_chunks;
create policy chunks_write on public.book_chunks for insert to authenticated
  with check (public.my_role(org_id) in ('admin','rnd')
              and exists (select 1 from public.books b where b.id = book_id and b.org_id = book_chunks.org_id));
-- chunks are removed together with their book (on delete cascade)

grant select, insert, update, delete on public.books to authenticated;
grant select, insert on public.book_chunks to authenticated;
grant usage, select on sequence public.book_chunks_id_seq to authenticated;

-- Search: passages that contain the most query words first. Words are matched as whole words or prefixes through the
-- index; if that finds too little, also as parts of words (so Arabic words with attached letters like و / ب still match).
-- p_query should already be normalised by the app. Runs as owner after one membership check, so it stays fast on large
-- libraries (no per-row policy check), and looks at no more than 3000 candidate passages.
drop function if exists public.search_books(uuid, text, int);
create function public.search_books(p_org uuid, p_query text, p_limit int default 10)
returns table (book_id uuid, title text, page int, content text, rank real)
language plpgsql stable security definer set search_path = public as $$
declare
  v_words text[];
  v_tq tsquery;
  v_lim int := greatest(1, least(coalesce(p_limit, 10), 50));
  v_found int;
begin
  if public.my_role(p_org) is null then return; end if;
  select array_agg(distinct x) into v_words
  from regexp_split_to_table(regexp_replace(lower(coalesce(p_query, '')), '[&|!():*<>''\\%_]', ' ', 'g'), '\s+') as x
  where length(x) > 1;
  if v_words is null then return; end if;
  v_words := v_words[1:12];
  select to_tsquery('simple', string_agg(w || ':*', ' | ')) into v_tq from unnest(v_words) w;

  select count(*) into v_found from (select 1 from public.book_chunks where org_id = p_org and tsv @@ v_tq limit v_lim) x;
  return query
    with hits as (
      select c.id, ((select count(*) from unnest(v_words) w where c.tsv @@ to_tsquery('simple', w || ':*')) + ts_rank_cd(c.tsv, v_tq))::real as score
      from (select * from public.book_chunks where org_id = p_org and tsv @@ v_tq limit 3000) c
      union all
      select c.id, (select count(*) from unnest(v_words) w where position(w in c.norm) > 0)::real
      from (select id, norm from public.book_chunks
            where v_found < v_lim and org_id = p_org and not (tsv @@ v_tq)
              and norm like any (select '%' || w || '%' from unnest(v_words) w where length(w) > 2)
            limit 3000) c
    )
    select c.book_id, b.title, c.page, c.content, h.score
    from hits h join public.book_chunks c on c.id = h.id join public.books b on b.id = c.book_id
    order by h.score desc, c.page
    limit v_lim;
end $$;
revoke all on function public.search_books(uuid, text, int) from public, anon;
grant execute on function public.search_books(uuid, text, int) to authenticated;

-- Passages per book, for the library list
create or replace function public.book_stats(p_org uuid)
returns table (book_id uuid, chunks bigint)
language sql stable security definer set search_path = public as $$
  select c.book_id, count(*) from public.book_chunks c
  where c.org_id = p_org and public.my_role(p_org) is not null
  group by c.book_id
$$;
revoke all on function public.book_stats(uuid) from public, anon;
grant execute on function public.book_stats(uuid) to authenticated;

create or replace function public.org_role_from_path(p_name text) returns text
language sql stable security definer set search_path = public as $$
  select case when split_part(p_name, '/', 1) ~ '^[0-9a-f-]{36}$'
              then public.my_role(split_part(p_name, '/', 1)::uuid) end
$$;
grant execute on function public.org_role_from_path(text) to authenticated;

-- Book files: private bucket, one folder per company (<org id>/<book id>.<ext>).
-- If this part fails (for example no permission on the storage schema), the books' text still works:
-- only the original files are not kept.
do $storage$ begin
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('library', 'library', false, 52428800, array['application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/jpeg','image/png','image/webp','image/gif','image/bmp'])
on conflict (id) do update set allowed_mime_types = excluded.allowed_mime_types, file_size_limit = excluded.file_size_limit;

drop policy if exists library_read on storage.objects;
create policy library_read on storage.objects for select to authenticated
  using (bucket_id = 'library' and public.org_role_from_path(name) is not null);
drop policy if exists library_insert on storage.objects;
create policy library_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'library' and public.org_role_from_path(name) in ('admin','rnd'));
drop policy if exists library_update on storage.objects;
create policy library_update on storage.objects for update to authenticated
  using (bucket_id = 'library' and public.org_role_from_path(name) in ('admin','rnd'));
drop policy if exists library_delete on storage.objects;
create policy library_delete on storage.objects for delete to authenticated
  using (bucket_id = 'library' and public.org_role_from_path(name) in ('admin','rnd'));
exception when others then
  raise warning 'library storage not set up (% %). Book text still works; original files will not be kept.', sqlstate, sqlerrm;
end $storage$;

select 'FormuNex library ready' as result;
