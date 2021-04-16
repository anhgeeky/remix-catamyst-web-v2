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