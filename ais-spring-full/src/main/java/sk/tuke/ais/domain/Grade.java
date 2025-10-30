package sk.tuke.ais.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name="grade", schema="ais")
public class Grade {
  @Id @Column(columnDefinition="uuid") private UUID id;
  @Column(name="student_id", columnDefinition="uuid", nullable=false) private UUID studentId;
  @Column(name="course_id", columnDefinition="uuid", nullable=false) private UUID courseId;
  @Column(nullable=false) private int value;
  private String note;
  @Column(name="created_at") private OffsetDateTime createdAt;
  @Column(name="updated_at") private OffsetDateTime updatedAt;

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public UUID getStudentId() { return studentId; }
  public void setStudentId(UUID studentId) { this.studentId = studentId; }
  public UUID getCourseId() { return courseId; }
  public void setCourseId(UUID courseId) { this.courseId = courseId; }
  public int getValue() { return value; }
  public void setValue(int value) { this.value = value; }
  public String getNote() { return note; }
  public void setNote(String note) { this.note = note; }
  public OffsetDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
  public OffsetDateTime getUpdatedAt() { return updatedAt; }
  public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
