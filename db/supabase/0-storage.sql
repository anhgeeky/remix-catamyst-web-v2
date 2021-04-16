/**
 * STORAGE
 */
-- Set up Storage
insert into storage.buckets (id, name)
values ('avatars', 'avatars');
create policy "Avatar images are publicly accessible." on storage.objects for
select using (bucket_id = 'avatars');
create policy "Anyone can upload an avatar image." on storage.objects for
insert with check (bucket_id = 'avatars');
--
insert into storage.buckets (id, name)
values ('covers', 'covers');
create policy "Cover images are publicly accessible." on storage.objects for
select using (bucket_id = 'covers');
create policy "Anyone can upload a cover image." on storage.objects for
insert with check (bucket_id = 'covers');
--insert into storage.buckets (id, name)
values ('pictures', 'pictures');
create policy "Pictures are publicly accessible." on storage.objects for
select using (bucket_id = 'pictures');
create policy "Only authorized users can upload a picture." on storage.objects for
insert with check (bucket_id = 'pictures');
--