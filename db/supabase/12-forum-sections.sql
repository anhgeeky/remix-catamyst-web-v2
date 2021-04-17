-- Create a table for Discussions
create table sections (
  id uuid default extensions.uuid_generate_v4() not null primary key,
  is_published boolean default false,
  slug text not null unique,
  title text,
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
--
comment on table public.discussions is 'Forum discussions.';
-- Policies
alter table public.discussions enable row level security;
--
create policy "Forum sections are viewable by everyone." on discussions for
select using (true);
--
create policy "Only super users can insert a forum section." on discussions for
insert with check (auth.is_super_admin() = true);