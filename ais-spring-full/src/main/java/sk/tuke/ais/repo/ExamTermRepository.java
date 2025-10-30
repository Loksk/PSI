package sk.tuke.ais.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.tuke.ais.domain.ExamTerm;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ExamTermRepository extends JpaRepository<ExamTerm, UUID> {
  List<ExamTerm> findByCourseId(UUID courseId);
  List<ExamTerm> findByStartsAtBetween(LocalDateTime from, LocalDateTime to);
}
