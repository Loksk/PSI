package sk.tuke.ais.domain;

import jakarta.persistence.*;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "timetable_slot", schema = "ais")
public class TimetableSlot {
  @Id @Column(columnDefinition = "uuid")
  private UUID id;

  @Column(name = "course_id", columnDefinition = "uuid", nullable = false)
  private UUID courseId;

  @Column(name = "day_of_week", nullable = false)
  private String dayOfWeek; // MONDAY..SUNDAY (alebo 1-7, podľa migrácie)

  @Column(name = "start_time", nullable = false)
  private LocalTime startTime;

  @Column(name = "end_time", nullable = false)
  private LocalTime endTime;

  @Column(nullable = false)
  private String room;

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public UUID getCourseId() { return courseId; }
  public void setCourseId(UUID courseId) { this.courseId = courseId; }
  public String getDayOfWeek() { return dayOfWeek; }
  public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
  public LocalTime getStartTime() { return startTime; }
  public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
  public LocalTime getEndTime() { return endTime; }
  public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
  public String getRoom() { return room; }
  public void setRoom(String room) { this.room = room; }
}
