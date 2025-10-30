package sk.tuke.ais.api;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.tuke.ais.domain.Course;
import sk.tuke.ais.repo.CourseRepository;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {
  private final CourseRepository courses;
  public CourseController(CourseRepository courses){ this.courses = courses; }

  @GetMapping
  public List<Course> list(@RequestParam(required=false) UUID programId, @RequestParam(required=false) String semester){
    if (programId != null) return courses.findByProgramId(programId);
    if (semester != null) return courses.findBySemesterCode(semester);
    return courses.findAll();
  }

  @GetMapping("/{id}")
  public Course get(@PathVariable UUID id){ return courses.findById(id).orElseThrow(); }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
  public Course create(@RequestBody Course c){ return courses.save(c); }
}
