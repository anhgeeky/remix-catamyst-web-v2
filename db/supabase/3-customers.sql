/**
 * CUSTOMERS / PINGS / WEBHOOKS
 * For Gumroad / Stripe
 * Private table that maps user email/ID to customer ID in payment processor
 */
-- drop table if exists customers;
create table customers (
  -- Generate new id because it needs history
  id uuid default extensions.uuid_generate_v4() not null primary key,
  -- The user's customer email or ID in Gumroad/Stripe
  -- User must not be able to update this
  customer_email citext,
  customer_id text,
  plan user_plan default 'Pro'::user_plan,
  -- Reference public.customers.user_id to auth.users.id
  user_id uuid references auth.users,
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
--