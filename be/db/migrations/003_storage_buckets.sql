insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('campaign-covers', 'campaign-covers', true, 3145728, array['image/png', 'image/jpeg', 'image/webp']),
  ('proofs', 'proofs', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'application/pdf']),
  ('certificates', 'certificates', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'application/pdf', 'text/html'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public can read campaign covers" on storage.objects;
create policy "public can read campaign covers"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'campaign-covers');

drop policy if exists "public can read proofs" on storage.objects;
create policy "public can read proofs"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'proofs');

drop policy if exists "public can read certificates" on storage.objects;
create policy "public can read certificates"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'certificates');

-- ponytail: no insert/update/delete storage policies; writes stay service-role only.
