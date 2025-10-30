package sk.tuke.ais.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "teacher", schema = "ais")
public class Teacher {
  @Id @Column(columnDefinition = "uuid")
  private UUID id;

  @Column(name = "user_id", columnDefinition = "uuid", nullable = false)
  private UUID userId;

  @Column(nullable = false)
  private String department; // e.g., KPI

  @Column(nullable = false)
  private String title; // Ing., Mgr., doc., ...

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public UUID getUserId() { return userId; }
  public void setUserId(UUID userId) { this.userId = userId; }
  public String getDepartment() { return department; }
  public void setDepartment(String department) { this.department = department; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
}
