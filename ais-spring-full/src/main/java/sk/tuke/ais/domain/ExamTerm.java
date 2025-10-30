package sk.tuke.ais.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name="exam_term", schema="ais")
public class ExamTerm {
  @Id @Column(columnDefinition="uuid") private UUID id;
  @Column(name="course_id", columnDefinition="uuid", nullable=false) private UUID courseId;
  @Column(name="starts_at", nullable=false) private LocalDateTime startsAt;
  @Column(nullable=false) private int capacity;
  @Column(nullable=false) private String room;
  @Column(name="created_at") private OffsetDateTime createdAt;
  @Column(name="updated_at") private OffsetDateTime updatedAt;

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public UUID getCourseId() { return courseId; }
  public void setCourseId(UUID courseId) { this.courseId = courseId; }
  public LocalDateTime getStartsAt() { return startsAt; }
  public void setStartsAt(LocalDateTime startsAt) { this.startsAt = startsAt; }
  public int getCapacity() { return capacity; }
  public void setCapacity(int capacity) { this.capacity = capacity; }
  public String getRoom() { return room; }
  public void setRoom(String room) { this.room = room; }
  public OffsetDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
  public OffsetDateTime getUpdatedAt() { return updatedAt; }
  public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
