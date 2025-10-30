package sk.tuke.ais.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name="course", schema="ais")
public class Course {
  @Id @Column(columnDefinition="uuid")
  private UUID id;

  @Column(nullable=false, unique=true)
  private String code;

  @Column(nullable=false)
  private String name;

  @Column(nullable=false)
  private int credits;

  @Column(nullable=false)
  private int capacity;

  @Column(name="semester_code")
  private String semesterCode;

  // 🔥 doplnené: nech sedí s findByProgramId(...)
  @Column(name="program_id", columnDefinition="uuid", nullable=false)
  private UUID programId;

  // getters/setters
  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public String getCode() { return code; }
  public void setCode(String code) { this.code = code; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public int getCredits() { return credits; }
  public void setCredits(int credits) { this.credits = credits; }
  public int getCapacity() { return capacity; }
  public void setCapacity(int capacity) { this.capacity = capacity; }
  public String getSemesterCode() { return semesterCode; }
  public void setSemesterCode(String semesterCode) { this.semesterCode = semesterCode; }
  public UUID getProgramId() { return programId; }
  public void setProgramId(UUID programId) { this.programId = programId; }
}
