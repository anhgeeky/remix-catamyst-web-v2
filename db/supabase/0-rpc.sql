/**
 * PostgreSQL RPC Functions
 */
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