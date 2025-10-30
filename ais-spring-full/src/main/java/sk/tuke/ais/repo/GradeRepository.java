package sk.tuke.ais.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.tuke.ais.domain.Grade;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GradeRepository extends JpaRepository<Grade, UUID> {
  List<Grade> findByStudentId(UUID studentId);
  Optional<Grade> findByStudentIdAndCourseId(UUID studentId, UUID courseId);
}
