/**
 * USER AS MENTORS
 */
-- Create a table for Mentors
create table mentors (
  id uuid references auth.users not null primary key,
  specializations text [],
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