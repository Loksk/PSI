-- =========================================
-- SEED DEMO DATA
-- =========================================

-- USERS (admin, 2x teacher, 2x student)
-- heslá:
--  admin:    admin123
--  teacher1: teacher123
--  teacher2: teacher123
--  student1: student123
--  student2: student456

insert into ais.user_account (id, keycloak_id, email, given_name, family_name, password_hash, roles)
values
  ('00000000-0000-0000-0000-000000000001', 'k-admin',    'admin@ais.local',    'System',  'Admin',
   '$2b$10$F1WRtIIkZ1i2/yL2zRXMcOuOohKSE34ikZ1pNIWR49m5L9kVvCamq',  '{"ROLE_ADMIN"}'),
  ('00000000-0000-0000-0000-000000000002', 'k-teacher1', 'teacher1@ais.local', 'Peter',   'Novák',
   '$2b$10$yYfoeSbgObSsL3N5p8M9U.AbJegRMdX3qsTz/d3hNQgbtfKIX.nJS', '{"ROLE_TEACHER"}'),
  ('00000000-0000-0000-0000-000000000005', 'k-teacher2', 'teacher2@ais.local', 'Jana',    'Horváthová',
   '$2b$10$yYfoeSbgObSsL3N5p8M9U.AbJegRMdX3qsTz/d3hNQgbtfKIX.nJS', '{"ROLE_TEACHER"}'),
  ('00000000-0000-0000-0000-000000000003', 'k-student1', 'student1@ais.local', 'Martin',  'Kováč',
   '$2b$10$bewMPnIUtsMhvqk9NiCxhO38vnRh3mIBZJc6SLNixpjMVzYECNBMq', '{"ROLE_STUDENT"}'),
  ('00000000-0000-0000-0000-000000000004', 'k-student2', 'student2@ais.local', 'Lucia',   'Bieliková',
   '$2b$10$kytzdd569w4bOvzuWlCJreegOtJqKPjvryDiRyH/4A4If7WWcOTlm', '{"ROLE_STUDENT"}')
on conflict (id) do nothing;

-- TEACHERS
insert into ais.teacher (id, user_id, department, title)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Katedra informatiky', 'doc. Ing.'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005', 'Katedra matematiky',  'prof. RNDr.')
on conflict (id) do nothing;

-- PROGRAMS
insert into ais.program (id, name, level, guarantor_teacher_id)
values
  ('20000000-0000-0000-0000-000000000001', 'Informatika',         'Bc.',  '10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000002', 'Aplikovaná informatika', 'Ing.', '10000000-0000-0000-0000-000000000002')
on conflict (id) do nothing;

-- COURSES
-- predpoklad: ais.course_type:
--   1 = LECTURE, 2 = SEMINAR, 3 = LAB
insert into ais.course (id, code, name, credits, type_id, program_id, capacity, lecturer_id, semester_code)
values
  ('30000000-0000-0000-0000-000000000001', 'ICS101', 'Úvod do informatiky', 6, 1,
   '20000000-0000-0000-0000-000000000001', 100, '10000000-0000-0000-0000-000000000001', 'WS2024'),
  ('30000000-0000-0000-0000-000000000002', 'MAT101', 'Diskrétna matematika', 5, 1,
   '20000000-0000-0000-0000-000000000001', 80, '10000000-0000-0000-0000-000000000002', 'WS2024'),
  ('30000000-0000-0000-0000-000000000003', 'PROG1', 'Programovanie 1', 6, 3,
   '20000000-0000-0000-0000-000000000001', 60, '10000000-0000-0000-0000-000000000001', 'WS2024')
on conflict (id) do nothing;

-- OPTIONAL: prerequisites
insert into ais.course_prereq (course_id, required_course_id)
values
  ('30000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000001') -- PROG1 requires ICS101
on conflict (course_id, required_course_id) do nothing;

-- STUDENTS
insert into ais.student (id, user_id, program_id, year_of_study, student_no, status)
values
  ('40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003',
   '20000000-0000-0000-0000-000000000001', 1, '20240001', 'ACTIVE'),
  ('40000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004',
   '20000000-0000-0000-0000-000000000001', 2, '20230002', 'ACTIVE')
on conflict (id) do nothing;

-- ENROLLMENTS (predmety zapísané študentmi)
-- predpoklad: support.enrollment_state ENROLLED má id = 1
insert into ais.enrollment (id, student_id, course_id, state_id)
values
  ('41000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 1),
  ('41000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', 1),
  ('41000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 1)
on conflict (id) do nothing;

-- EXAM TERMS
insert into ais.exam_term (id, course_id, starts_at, capacity, room)
values
  ('50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001',
   '2025-01-10 09:00:00', 50, 'A-101'),
  ('50000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002',
   '2025-01-12 13:00:00', 40, 'B-205')
on conflict (id) do nothing;

-- EXAM REGISTRATIONS
insert into ais.exam_registration (id, exam_term_id, student_id, state)
values
  ('60000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001',
   '40000000-0000-0000-0000-000000000001', 'REGISTERED'),
  ('60000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000002',
   '40000000-0000-0000-0000-000000000002', 'REGISTERED')
on conflict (id) do nothing;

-- GRADES
insert into ais.grade (id, student_id, course_id, value, note)
values
  ('70000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001',
   '30000000-0000-0000-0000-000000000001', 1, 'Výborný zápočet a skúška'),
  ('70000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001',
   '30000000-0000-0000-0000-000000000003', 2, 'Veľmi dobrý výkon'),
  ('70000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000002',
   '30000000-0000-0000-0000-000000000002', 3, 'Priemerný výsledok')
on conflict (id) do nothing;

-- TIMETABLE SLOTS
insert into ais.timetable_slot (id, course_id, room, day_of_week, starts_at, ends_at, week_parity)
values
  ('80000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001',
   'A-101', 'MONDAY', '08:00', '09:50', 'ALL'),
  ('80000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002',
   'B-205', 'TUESDAY', '10:00', '11:50', 'ALL'),
  ('80000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000003',
   'C-307', 'WEDNESDAY', '14:00', '15:50', 'ODD')
on conflict (id) do nothing;

-- DOCUMENT REQUESTS
insert into ais.document_request (id, student_id, type, state)
values
  ('90000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001',
   'Potvrdenie o štúdiu', 'NEW'),
  ('90000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002',
   'Prepis známok', 'PROCESSING')
on conflict (id) do nothing;

-- AUDIT EVENTS
insert into audit.event (id, actor_user_id, action, entity, entity_id, payload_jsonb)
values
  ('A0000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000001',
   'CREATE', 'COURSE', '30000000-0000-0000-0000-000000000001',
   '{"detail": "Course ICS101 created"}'),
  ('A0000000-0000-0000-0000-000000000002',
   '00000000-0000-0000-0000-000000000002',
   'ENROLL', 'ENROLLMENT', '41000000-0000-0000-0000-000000000001',
   '{"detail": "Student enrolled to ICS101"}')
on conflict (id) do nothing;