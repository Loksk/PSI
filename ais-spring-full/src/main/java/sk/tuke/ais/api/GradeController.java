package sk.tuke.ais.api;

import jakarta.validation.constraints.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.tuke.ais.domain.Grade;
import sk.tuke.ais.repo.GradeRepository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/grades")
public class GradeController {
  private final GradeRepository grades;
  public GradeController(GradeRepository g){ this.grades=g; }

  record SetGradeReq(@NotNull UUID studentId, @NotNull UUID courseId, @Min(1) @Max(5) int value, String note) {}

  @GetMapping("/me")
  @PreAuthorize("hasRole('STUDENT')")
  public List<Grade> my(@RequestParam UUID studentId){ return grades.findByStudentId(studentId); }

  @PostMapping
  @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
  public Grade set(@RequestBody SetGradeReq req){
    var g = grades.findByStudentIdAndCourseId(req.studentId(), req.courseId()).orElseGet(Grade::new);
    if (g.getId()==null) g.setId(UUID.randomUUID());
    g.setStudentId(req.studentId());
    g.setCourseId(req.courseId());
    g.setValue(req.value());
    g.setNote(req.note());
    g.setUpdatedAt(OffsetDateTime.now());
    if (g.getCreatedAt()==null) g.setCreatedAt(OffsetDateTime.now());
    return grades.save(g);
  }
}
