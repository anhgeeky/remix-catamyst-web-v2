/**
 * USER PROFILES
 */
-- Create a table for Profiles
create table profiles (
  id uuid references auth.users not null primary key,
  -- Case insensitive text for handle/username
  handle citext unique,
  name text,
  nickname text,
  role user_role default 'Member'::user_role,
  mode user_mode default 'Learner'::user_mode,
  plan user_plan default 'Basic'::user_plan,
  avatar_url text,
  cover_url text,
  headline text,
  bio_html text,
  country text,
  location text,
  website_url text,
  work jsonb,
  socials jsonb default '[]',
  organizations uuid [],
  tracks uuid [],
  posts uuid [],
  projects uuid [],
  discussions uuid [],
  jobs_applied uuid [],
  jobs_posted uuid [],
  mentors uuid [],
  is_public boolean default true,
  is_verified boolean default false,
  theme text default 'default',
  language text default 'en-US',
  timezone text default 'Etc/UTC',
  currency text default 'USD',
  pro jsonb,
  super jsonb,
  constraint handle_length check (char_length(handle) >= 3),
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Keys
-- alter table public.profiles
-- add constraint fk_user_id foreign key (id) references auth.users(id);
-- alter table public.profiles
-- add constraint fk_user_id foreign key (id) references auth.users;
-- Comments
comment on table public.profiles is 'User profile attached to a user.';
comment on column public.profiles.id is 'References to auth.users id.';
-- Policies
alter table public.profiles enable row level security;
--
create policy "Profiles are viewable by everyone." on profiles for
select using (true);
--
create policy "Users can create a profile." on profiles for
insert with check (auth.uid() = id);
--
create policy "Users can update their own profile." on profiles for
update using (auth.uid() = id);
--
create policy "Users can delete their own profile." on profiles for delete using (auth.uid() = id);
--