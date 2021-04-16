/**
 * ORGANIZATIONS
 */
-- Create a table for Organizations
-- drop table if exists organizations;
create table organizations (
  id uuid default extensions.uuid_generate_v4() not null primary key,
  -- Case insensitive text for handle
  handle citext unique,
  owner_id uuid references auth.users not null,
  name text,
  logo_url text,
  cover_url text,
  headline text,
  bio_html text,
  country text,
  location text,
  website_url text,
  socials jsonb,
  posts uuid [],
  projects uuid [],
  jobs_posted uuid [],
  mentors uuid [],
  is_public boolean default true,
  is_verified boolean default false,
  constraint handle_length check (char_length(handle) >= 3),
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Comments
comment on table public.organizations is 'Organization profile created by a user.';
comment on column public.organizations.owner_id is 'References to auth.users id.';
-- Policies
alter table public.organizations enable row level security;
create policy "Organizations are viewable by everyone." on organizations for
select using (true);
create policy "Users can insert an organization." on organizations for
insert with check (auth.uid() = owner_id);
create policy "Owners can update their own organization." on organizations for
update using (auth.uid() = owner_id);
create policy "Owners can delete their own organization." on organizations for delete using (auth.uid() = owner_id);
--