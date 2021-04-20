-- Create a table for Tracks
create table tracks (
  id uuid default extensions.uuid_generate_v4() not null primary key,
  is_published boolean default false,
  slug text not null unique,
  title text not null,
  description text,
  icon_url text,
  total_topics int2 default 2,
  total_lessons int2 default 2,
  total_hours int2 default 10,
  total_months text default '1-2',
  levels text [],
  topics uuid [],
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Comments
comment on table public.tracks is 'Learning tracks.';
-- Policies
alter table public.tracks enable row level security;
--
create policy "Tracks are viewable by everyone." on tracks for
select using (true);
--
create policy "Only authorized users can insert a track." on tracks for
insert with check (auth.is_super_admin() = true);
--
create policy "Only authorized users can update a track." on tracks for
update with check (auth.is_super_admin() = true);
--
create policy "Only authorized users can delete a track." on tracks for delete using (auth.is_super_admin() = true);
--