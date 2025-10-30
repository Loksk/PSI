package sk.tuke.ais.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.tuke.ais.domain.ExamRegistration;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExamRegistrationRepository extends JpaRepository<ExamRegistration, UUID> {
  List<ExamRegistration> findByStudentId(UUID studentId);
  long countByExamTermId(UUID termId);
  Optional<ExamRegistration> findByStudentIdAndExamTermId(UUID studentId, UUID termId);
}
