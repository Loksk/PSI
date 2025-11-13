-- SCHEMAS
create schema if not exists ais;
create schema if not exists support;
create schema if not exists audit;

-- LOOKUPS
create table if not exists support.enrollment_state (
  id smallserial primary key,
  code text not null unique
);
insert into support.enrollment_state(code) values ('ENROLLED') on conflict do nothing;

create table if not exists support.grade_value (
  id smallserial primary key,
  code text not null unique
);
insert into support.grade_value(code) values ('A'),('B'),('C'),('D'),('E'),('FX') on conflict do nothing;

-- USERS
create table if not exists ais.user_account (
  id uuid primary key,
  keycloak_id text unique not null,
  email text unique not null,
  given_name text not null,
  family_name text not null,
  password_hash text not null,
  roles text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- PROGRAM/COURSE
create table if not exists ais.program (
  id uuid primary key,
  name text not null,
  level text not null,
  guarantor_teacher_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ais.course_type (
  id smallserial primary key,
  code text not null unique
);
insert into ais.course_type(code) values ('LECTURE'),('SEMINAR'),('LAB') on conflict do nothing;

create table if not exists ais.teacher (
  id uuid primary key,
  user_id uuid not null unique references ais.user_account(id),
  department text,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ais.course (
  id uuid primary key,
  code text not null unique,
  name text not null,
  credits int not null check (credits between 0 and 60),
  type_id smallint not null references ais.course_type(id),
  program_id uuid not null references ais.program(id),
  capacity int not null check (capacity >= 0),
  lecturer_id uuid references ais.teacher(id),
  semester_code text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ais.course_prereq (
  course_id uuid not null references ais.course(id) on delete cascade,
  required_course_id uuid not null references ais.course(id),
  primary key (course_id, required_course_id),
  check (course_id <> required_course_id)
);

create index if not exists idx_course_program on ais.course (program_id);
create index if not exists idx_course_sem on ais.course (semester_code);

-- STUDENT & ENROLLMENT
create table if not exists ais.student (
  id uuid primary key,
  user_id uuid not null unique references ais.user_account(id),
  program_id uuid not null references ais.program(id),
  year_of_study int not null check (year_of_study between 1 and 8),
  student_no text not null unique,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ais.enrollment (
  id uuid primary key,
  student_id uuid not null references ais.student(id),
  course_id uuid not null references ais.course(id),
  state_id smallint not null references support.enrollment_state(id),
  created_at timestamptz not null default now(),
  unique (student_id, course_id)
);

create index if not exists idx_enroll_student on ais.enrollment (student_id);
create index if not exists idx_enroll_course on ais.enrollment (course_id);

-- AUDIT
create table if not exists audit.event (
  id uuid primary key,
  actor_user_id uuid,
  action text not null,
  entity text not null,
  entity_id uuid,
  payload_jsonb jsonb,
  at timestamptz not null default now()
);
