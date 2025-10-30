package sk.tuke.ais.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name="enrollment", schema="ais")
public class Enrollment {
  @Id @Column(columnDefinition="uuid") private UUID id;
  @Column(name="student_id", columnDefinition="uuid", nullable=false) private UUID studentId;
  @Column(name="course_id", columnDefinition="uuid", nullable=false) private UUID courseId;
  @Column(name="state_id", nullable=false) private short stateId;
  @Column(name="created_at") private OffsetDateTime createdAt;

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public UUID getStudentId() { return studentId; }
  public void setStudentId(UUID studentId) { this.studentId = studentId; }
  public UUID getCourseId() { return courseId; }
  public void setCourseId(UUID courseId) { this.courseId = courseId; }
  public short getStateId() { return stateId; }
  public void setStateId(short stateId) { this.stateId = stateId; }
  public OffsetDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
