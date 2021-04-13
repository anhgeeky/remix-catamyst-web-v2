/**
 * DATA TYPES
 */
-- Enumerable types
-- drop type user_role;
-- drop type user_mode;
-- drop type user_plan;
-- drop type level;
-- drop type track_category;
-- drop type topic_category;
-- drop type lesson_category;
-- alter type enum_type add value 'Mentor';
-- alter type user_mode add value 'Teacher';
create type user_role as enum ('Admin', 'Bot', 'Staff', 'Mentor', 'Member');
create type user_mode as enum ('Learner', 'Teacher', 'Employer', 'Investor');
create type user_plan as enum ('Basic', 'Pro', 'Super');
create type level as enum (
  'Newbie',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
);
create type track_category as enum ('Design', 'Code', 'Web', 'Mobile', 'AI');
create type topic_category as enum (
  'Preparation',
  'General',
  'Frontend',
  'Backend',
  'Career',
  'Special'
);
create type lesson_category as enum ('Fundamental', 'Specific', 'Project');
--------------------------------------------------------------------------------
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
create policy "Profiles are viewable by everyone." on profiles for
select using (true);
create policy "Users can create a profile." on profiles for
insert with check (auth.uid() = id);
create policy "Users can update their own profile." on profiles for
update using (auth.uid() = id);
create policy "Users can delete their own profile." on profiles for delete using (auth.uid() = id);
--------------------------------------------------------------------------------
/**
 * USER AS MENTORS
 */
-- Create a table for Mentors
create table mentors (
  id uuid references auth.users not null primary key,
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Comments
comment on table public.mentors is 'User as mentors list.';
comment on column public.mentors.id is 'References to auth.users id.';
-- Policies
alter table public.mentors enable row level security;
create policy "Mentors are viewable by everyone." on mentors for
select using (true);
--------------------------------------------------------------------------------
/**
 * STORAGE
 */
-- Set up Storage
insert into storage.buckets (id, name)
values ('avatars', 'avatars');
insert into storage.buckets (id, name)
values ('covers', 'covers');
create policy "Avatar images are publicly accessible." on storage.objects for
select using (bucket_id = 'avatars');
create policy "Cover images are publicly accessible." on storage.objects for
select using (bucket_id = 'covers');
create policy "Anyone can upload an avatar image." on storage.objects for
insert with check (bucket_id = 'avatars');
create policy "Anyone can upload a cover image.." on storage.objects for
insert with check (bucket_id = 'covers');
--------------------------------------------------------------------------------
/**
 * CUSTOMERS / PINGS / WEBHOOKS
 * For Gumroad / Stripe
 * Private table that maps user IDs to customer IDs in payment processor
 */
create table customers (
  -- Generate new id because it needs history
  id uuid default extensions.uuid_generate_v4() not null primary key,
  -- Reference public.customers.user_id to auth.users.id
  user_id uuid references auth.users not null,
  -- The user's customer ID in Gumroad/Stripe
  -- User must not be able to update this
  customer_email citext not null,
  plan user_plan default 'Pro'::user_plan,
  -- Purchase-related data
  data jsonb,
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Comments
comment on table public.customers is 'User as customers list.';
comment on column public.customers.id is 'References to auth.users id.';
-- Policies
alter table customers enable row level security;
create policy "Can only view own customer data." on customers for
select using (auth.uid() = id);
--------------------------------------------------------------------------------
/**
 * ORGANIZATIONS
 */
-- Create a table for Organizations
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
create policy "Users can create an organization." on organizations for
insert with check (auth.uid() = owner_id);
create policy "Owners can update their own organization." on organizations for
update using (auth.uid() = owner_id);
create policy "Owners can delete their own organization." on organizations for delete using (auth.uid() = owner_id);
--------------------------------------------------------------------------------
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
create policy "Tracks are viewable by everyone." on tracks for
select using (true);
-- create policy "Only super users can create a track." on tracks for
-- insert with check (auth.is_super_admin() = true);
--------------------------------------------------------------------------------
-- Create a table for Topics
create table topics (
  id uuid default extensions.uuid_generate_v4() not null primary key,
  is_published boolean default false,
  slug text not null unique,
  title text,
  description text,
  category text,
  icon_url text,
  icon_emoji text,
  total_lessons int2 default 5,
  total_hours int2 default 5,
  total_days text default '1-2',
  levels text [],
  sections jsonb,
  -- timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
comment on table public.topics is 'Learning topics.';
--------------------------------------------------------------------------------
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
comment on table public.lessons is 'Learning lessons.';
--------------------------------------------------------------------------------
-- Policies
alter table public.topics enable row level security;
alter table public.lessons enable row level security;
-- Topics
create policy "Topics are viewable by everyone." on topics for
select using (true);
-- create policy "Only super users can create a topic." on topics for
-- insert with check (auth.is_super_admin() = true);
-- Lessons
create policy "Lessons are viewable by everyone." on lessons for
select using (true);
-- create policy "Only super users can create a lesson." on lessons for
-- insert with check (auth.is_super_admin() = true);
--------------------------------------------------------------------------------
/**
 * Trigger updatet at
 */
create extension if not exists moddatetime schema extensions;
-- assuming the table name is "todos", and a timestamp column "updated_at"
-- this trigger will set the "updated_at" column to the current timestamp for every update
create trigger handle_updated_at before
update on profiles for each row execute procedure moddatetime (updated_at);
create trigger handle_updated_at before
update on mentors for each row execute procedure moddatetime (updated_at);
create trigger handle_updated_at before
update on customers for each row execute procedure moddatetime (updated_at);
create trigger handle_updated_at before
update on organizations for each row execute procedure moddatetime (updated_at);
--------------------------------------------------------------------------------
/**
 * RPC Functions
 */
-- Inserts a row into public.users on new auth.users
create function public.handle_new_user() returns trigger as $$ begin
insert into public.profiles (id)
values (new.id);
return new;
end;
$$ language plpgsql security definer;
-- trigger the function every time a user is created
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();
--------------------------------------------------------------------------------
-- Get user.id by email
create or replace function get_user_by_email(input text) returns table (id uuid) as $$ begin return query
select users.id
from auth.users
where users.email = input;
end;
$$ language plpgsql security definer;
--------------------------------------------------------------------------------
-- Get users
-- drop function get_users;
create or replace function get_users() returns table (
    id uuid,
    email varchar,
    is_super_admin boolean,
    last_sign_in_at timestamp with time zone,
    confirmed_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
  ) as $$ begin return query
select users.id,
  users.email,
  users.is_super_admin,
  users.last_sign_in_at,
  users.confirmed_at,
  users.created_at,
  users.updated_at
from auth.users;
end;
$$ language plpgsql security definer;
--------------------------------------------------------------------------------
-- Get all users
-- create or replace function get_all_users() returns setof users $body$
-- select *
-- from users;
-- $body$ language sql volatile cost 100 rows 1000;
--------------------------------------------------------------------------------
-- Delete user by auth.id
-- create or replace function delete_user_by_auth_id() returns void as $function$
-- delete from auth.users
-- where id = auth.uid();
-- $function$ language plpgsql security definer;
--------------------------------------------------------------------------------
/**
 * REALTIME SUBSCRIPTIONS
 * Set up Realtime for Supabase subscription.
 * Only allow realtime listening on public tables.
 */
begin;
-- remove the realtime publication
drop publication if exists supabase_realtime;
-- re-create the publication but don't enable it for any tables
create publication supabase_realtime;
commit;
-- add a table to the publication
-- alter publication supabase_realtime
-- add table products;
create publication supabase_realtime for table profiles,
mentors,
customers,
organizations;