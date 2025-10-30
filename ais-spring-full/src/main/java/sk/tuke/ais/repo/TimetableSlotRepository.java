package sk.tuke.ais.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.tuke.ais.domain.TimetableSlot;
import java.util.List;
import java.util.UUID;

public interface TimetableSlotRepository extends JpaRepository<TimetableSlot, UUID> {
  List<TimetableSlot> findByCourseId(UUID courseId);
  List<TimetableSlot> findByDayOfWeek(String dayOfWeek);
}
