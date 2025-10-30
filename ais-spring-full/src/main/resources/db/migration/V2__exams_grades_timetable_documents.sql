-- Exams
create table if not exists ais.exam_term (
  id uuid primary key,
  course_id uuid not null references ais.course(id),
  starts_at timestamp not null,
  capacity int not null check (capacity >= 1),
  room text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ais.exam_registration (
  id uuid primary key,
  exam_term_id uuid not null references ais.exam_term(id),
  student_id uuid not null references ais.student(id),
  state text not null default 'REGISTERED',
  created_at timestamptz not null default now(),
  unique (exam_term_id, student_id)
);

-- Grades
create table if not exists ais.grade (
  id uuid primary key,
  student_id uuid not null references ais.student(id),
  course_id uuid not null references ais.course(id),
  value int not null check (value between 1 and 5),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, course_id)
);

-- Timetable
create table if not exists ais.timetable_slot (
  id uuid primary key,
  course_id uuid not null references ais.course(id),
  room text not null,
  day_of_week text not null,
  starts_at text not null,
  ends_at text not null,
  week_parity text not null default 'ALL'
);

-- Documents
create table if not exists ais.document_request (
  id uuid primary key,
  student_id uuid not null references ais.student(id),
  type text not null,
  state text not null default 'NEW',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
