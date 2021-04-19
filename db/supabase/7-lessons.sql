-- Create a table for Lessons
create table lessons (
  id uuid default extensions.uuid_generate_v4() not null primary key,
  is_published boolean default false,
  slug text not null unique,
  title text,
  level text,
  category text,
  blocks jsonb,
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
--
comment on table public.lessons is 'Learning lessons.';
-- Policies
alter table public.lessons enable row level security;
--
create policy "Lessons are viewable by everyone." on lessons for
select using (true);
--
create policy "Only super users can insert a lesson." on lessons for
insert with check (auth.is_super_admin() = true);
--
create policy "Only authorized users can update a lesson." on tracks for
update with check (auth.is_super_admin() = true);
--
create policy "Only authorized users can delete a lesson." on tracks for delete with check (auth.is_super_admin() = true);
--