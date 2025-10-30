package sk.tuke.ais.api;

import org.springframework.web.bind.annotation.*;
import sk.tuke.ais.domain.TimetableSlot;
import sk.tuke.ais.repo.TimetableSlotRepository;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/timetable")
public class TimetableController {
  private final TimetableSlotRepository slots;
  public TimetableController(TimetableSlotRepository s){ this.slots=s; }

  @GetMapping
  public List<TimetableSlot> list(@RequestParam(required=false) UUID courseId,
                                  @RequestParam(required=false) String dayOfWeek){
    if (courseId!=null) return slots.findByCourseId(courseId);
    if (dayOfWeek!=null) return slots.findByDayOfWeek(dayOfWeek);
    return slots.findAll();
  }
}
