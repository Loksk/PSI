package sk.tuke.ais.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name="document_request", schema="ais")
public class DocumentRequest {
  @Id @Column(columnDefinition="uuid") private UUID id;
  @Column(name="student_id", columnDefinition="uuid", nullable=false) private UUID studentId;
  @Column(nullable=false) private String type;
  @Column(nullable=false) private String state;
  @Column(name="created_at") private OffsetDateTime createdAt;
  @Column(name="updated_at") private OffsetDateTime updatedAt;

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public UUID getStudentId() { return studentId; }
  public void setStudentId(UUID studentId) { this.studentId = studentId; }
  public String getType() { return type; }
  public void setType(String type) { this.type = type; }
  public String getState() { return state; }
  public void setState(String state) { this.state = state; }
  public OffsetDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
  public OffsetDateTime getUpdatedAt() { return updatedAt; }
  public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
