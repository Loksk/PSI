package sk.tuke.ais.api;

import jakarta.validation.constraints.NotNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.tuke.ais.domain.Enrollment;
import sk.tuke.ais.repo.CourseRepository;
import sk.tuke.ais.repo.EnrollmentRepository;
import sk.tuke.ais.repo.StudentRepository;
import sk.tuke.ais.domain.Student;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/enrollments")
public class EnrollmentController {
  private final EnrollmentRepository enrollments;
  private final StudentRepository students;
  private final CourseRepository courses;
  public EnrollmentController(EnrollmentRepository e, StudentRepository s, CourseRepository c){
    this.enrollments=e; this.students=s; this.courses=c;
  }

  record EnrollReq(@NotNull UUID courseId, @NotNull UUID studentId) {}

  @GetMapping("/me")
  @PreAuthorize("hasRole('STUDENT')")
  public List<Enrollment> my(@RequestParam UUID studentId){
    return enrollments.findByStudentId(studentId);
  }

  @PostMapping
  @PreAuthorize("hasRole('STUDENT')")
  public Enrollment enroll(@RequestBody EnrollReq req){
    var course = courses.findById(req.courseId()).orElseThrow();
    long enrolled = enrollments.countByCourseId(req.courseId());
    if (enrolled >= course.getCapacity()) throw new IllegalStateException("Course full");
    var existing = enrollments.findByStudentIdAndCourseId(req.studentId(), req.courseId());
    if (existing.isPresent()) return existing.get();
    var e = new Enrollment();
    e.setId(UUID.randomUUID());
    e.setStudentId(req.studentId());
    e.setCourseId(req.courseId());
    e.setStateId((short)1); // e.g., ENROLLED
    e.setCreatedAt(OffsetDateTime.now());
    return enrollments.save(e);
  }
}
