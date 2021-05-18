-- Create a table for Topics
create table topics (
  id uuid default extensions.uuid_generate_v4() not null primary key,
  is_published boolean default true,
  slug text not null unique,
  title text,
  description text,
  icon_url text,
  icon_emoji text,
  total_lessons int2 default 5,
  total_hours int2 default 5,
  total_days text default '1-2',
  category topic_category,
  levels level [],
  sections jsonb,
  -- timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
comment on table public.topics is 'Learning topics.';
--
alter table public.topics enable row level security;
--
create policy "Topics are viewable by everyone." on topics for
select using (true);
--
create policy "Only authorized users can insert a topic." on tracks for
insert with check (auth.is_super_admin() = true);
--
create policy "Only authorized users can update a topic." on tracks for
update with check (auth.is_super_admin() = true);
--
create policy "Only authorized users can delete a topic." on tracks for delete using (auth.is_super_admin() = true);
--