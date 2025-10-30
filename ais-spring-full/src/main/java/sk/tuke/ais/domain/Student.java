package sk.tuke.ais.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "student", schema = "ais")
public class Student {
  @Id @Column(columnDefinition = "uuid")
  private UUID id;

  @Column(name = "user_id", columnDefinition = "uuid", nullable = false)
  private UUID userId;

  @Column(name = "program_id", columnDefinition = "uuid", nullable = false)
  private UUID programId;

  @Column(name = "year_of_study", nullable = false)
  private int yearOfStudy;

  @Column(name = "student_no", nullable = false, unique = true)
  private String studentNo;

  @Column(nullable = false)
  private String status; // ACTIVE, INTERRUPTED, FINISHED...

  @Column(name = "created_at")
  private OffsetDateTime createdAt;

  @Column(name = "updated_at")
  private OffsetDateTime updatedAt;

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public UUID getUserId() { return userId; }
  public void setUserId(UUID userId) { this.userId = userId; }
  public UUID getProgramId() { return programId; }
  public void setProgramId(UUID programId) { this.programId = programId; }
  public int getYearOfStudy() { return yearOfStudy; }
  public void setYearOfStudy(int yearOfStudy) { this.yearOfStudy = yearOfStudy; }
  public String getStudentNo() { return studentNo; }
  public void setStudentNo(String studentNo) { this.studentNo = studentNo; }
  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }
  public OffsetDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
  public OffsetDateTime getUpdatedAt() { return updatedAt; }
  public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
