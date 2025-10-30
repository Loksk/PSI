package sk.tuke.ais.api;

import jakarta.validation.constraints.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.tuke.ais.domain.ExamRegistration;
import sk.tuke.ais.domain.ExamTerm;
import sk.tuke.ais.repo.ExamRegistrationRepository;
import sk.tuke.ais.repo.ExamTermRepository;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/exam-terms")
public class ExamTermController {
  private final ExamTermRepository terms;
  private final ExamRegistrationRepository regs;
  public ExamTermController(ExamTermRepository t, ExamRegistrationRepository r){ this.terms=t; this.regs=r; }

  record CreateTermReq(@NotNull UUID courseId, @NotNull LocalDateTime startsAt, @Min(1) int capacity, @NotBlank String room) {}

  @GetMapping
  public List<ExamTerm> list(@RequestParam(required=false) UUID courseId){
    if (courseId!=null) return terms.findByCourseId(courseId);
    return terms.findAll();
  }

  @PostMapping
  @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
  public ExamTerm create(@RequestBody CreateTermReq req){
    var t = new ExamTerm();
    t.setId(UUID.randomUUID());
    t.setCourseId(req.courseId());
    t.setStartsAt(req.startsAt());
    t.setCapacity(req.capacity());
    t.setRoom(req.room());
    t.setCreatedAt(OffsetDateTime.now());
    t.setUpdatedAt(OffsetDateTime.now());
    return terms.save(t);
  }

  @PostMapping("/{id}/register")
  @PreAuthorize("hasRole('STUDENT')")
  public ExamRegistration register(@PathVariable UUID id, @RequestParam UUID studentId){
    var term = terms.findById(id).orElseThrow();
    long regCount = regs.countByExamTermId(id);
    if (regCount >= term.getCapacity()) throw new IllegalStateException("Term full");
    var existing = regs.findByStudentIdAndExamTermId(studentId, id);
    if (existing.isPresent()) return existing.get();
    var r = new ExamRegistration();
    r.setId(UUID.randomUUID());
    r.setExamTermId(id);
    r.setStudentId(studentId);
    r.setState("REGISTERED");
    r.setCreatedAt(OffsetDateTime.now());
    return regs.save(r);
  }
}
