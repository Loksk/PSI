package sk.tuke.ais.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.tuke.ais.domain.Enrollment;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {
  List<Enrollment> findByStudentId(UUID studentId);
  Optional<Enrollment> findByStudentIdAndCourseId(UUID studentId, UUID courseId);
  long countByCourseId(UUID courseId);
}
