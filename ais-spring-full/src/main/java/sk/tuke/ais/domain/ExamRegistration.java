package sk.tuke.ais.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name="exam_registration", schema="ais")
public class ExamRegistration {
  @Id @Column(columnDefinition="uuid") private UUID id;
  @Column(name="exam_term_id", columnDefinition="uuid", nullable=false) private UUID examTermId;
  @Column(name="student_id", columnDefinition="uuid", nullable=false) private UUID studentId;
  @Column(nullable=false) private String state;
  @Column(name="created_at") private OffsetDateTime createdAt;

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public UUID getExamTermId() { return examTermId; }
  public void setExamTermId(UUID examTermId) { this.examTermId = examTermId; }
  public UUID getStudentId() { return studentId; }
  public void setStudentId(UUID studentId) { this.studentId = studentId; }
  public String getState() { return state; }
  public void setState(String state) { this.state = state; }
  public OffsetDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
