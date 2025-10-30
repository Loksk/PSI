# AIS API (Spring Boot 3, Java 21) — Full Core

## Modules
- Identity (OIDC Resource Server, Keycloak-ready)
- Study (Programs, Courses, Enrollments)
- Exams (Terms, Registrations)
- Grades
- Timetable
- Documents (requests lifecycle)

## Quickstart
```bash
docker compose up -d           # postgres + keycloak
./mvnw spring-boot:run
# Swagger: http://localhost:8080/swagger-ui/index.html
```

## Key Endpoints
- `GET /api/v1/auth/me`
- Courses: `GET /api/v1/courses`, `GET /api/v1/courses/{id}`, `POST /api/v1/courses` (TEACHER|ADMIN)
- Enrollments: `GET /api/v1/enrollments/me?studentId=` (STUDENT), `POST /api/v1/enrollments` (STUDENT)
- Exams: `GET /api/v1/exam-terms`, `POST /api/v1/exam-terms` (TEACHER|ADMIN), `POST /api/v1/exam-terms/{id}/register?studentId=` (STUDENT)
- Grades: `GET /api/v1/grades/me?studentId=` (STUDENT), `POST /api/v1/grades` (TEACHER|ADMIN)
- Timetable: `GET /api/v1/timetable?courseId=&dayOfWeek=`
- Documents: `GET /api/v1/document-requests/me?studentId=` (STUDENT), `POST /api/v1/document-requests` (STUDENT), `POST /api/v1/document-requests/{id}/advance?state=` (ADMIN)

## RBAC
JWT → roles claim to `ROLE_*`. Use Keycloak realm roles: `STUDENT`, `TEACHER`, `ADMIN`.
