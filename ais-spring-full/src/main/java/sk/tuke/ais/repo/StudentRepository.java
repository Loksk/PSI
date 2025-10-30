package sk.tuke.ais.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.tuke.ais.domain.Student;
import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {
  Optional<Student> findByUserId(UUID userId);
  Optional<Student> findByStudentNo(String studentNo);
}
