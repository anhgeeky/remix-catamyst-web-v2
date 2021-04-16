/**
 * Trigger updated at
 */
--------------------------------------------------------------------------------
-- Inserts a row into public.users on new auth.users
create function public.handle_new_user() returns trigger as $$ begin
insert into public.profiles (id)
values (new.id);
return new;
end;
$$ language plpgsql security definer;
--------------------------------------------------------------------------------
-- trigger the function every time a user is created
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();
--------------------------------------------------------------------------------
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
create trigger handle_updated_at before
update on tracks for each row execute procedure moddatetime (updated_at);
create trigger handle_updated_at before
update on topics for each row execute procedure moddatetime (updated_at);
create trigger handle_updated_at before
update on lessons for each row execute procedure moddatetime (updated_at);
create trigger handle_updated_at before
update on projects for each row execute procedure moddatetime (updated_at);
create trigger handle_updated_at before
update on posts for each row execute procedure moddatetime (updated_at);