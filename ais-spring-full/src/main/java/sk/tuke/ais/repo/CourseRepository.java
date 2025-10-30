package sk.tuke.ais.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.tuke.ais.domain.Course;
import java.util.List;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
  List<Course> findByProgramId(UUID programId);
  List<Course> findBySemesterCode(String semesterCode);
}
