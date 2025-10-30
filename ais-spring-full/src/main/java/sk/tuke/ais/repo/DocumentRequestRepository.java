package sk.tuke.ais.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.tuke.ais.domain.DocumentRequest;
import java.util.List;
import java.util.UUID;

public interface DocumentRequestRepository extends JpaRepository<DocumentRequest, UUID> {
  List<DocumentRequest> findByStudentId(UUID studentId);
}
