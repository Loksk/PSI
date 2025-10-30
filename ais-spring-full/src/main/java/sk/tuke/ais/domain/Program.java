package sk.tuke.ais.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "program", schema = "ais")
public class Program {
  @Id @Column(columnDefinition = "uuid")
  private UUID id;

  @Column(nullable = false, unique = true)
  private String name;

  @Column(nullable = false)
  private String level; // BACHELOR / MASTER / PHD ...

  @Column(name = "guarantor_teacher_id", columnDefinition = "uuid")
  private UUID guarantorTeacherId;

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getLevel() { return level; }
  public void setLevel(String level) { this.level = level; }
  public UUID getGuarantorTeacherId() { return guarantorTeacherId; }
  public void setGuarantorTeacherId(UUID guarantorTeacherId) { this.guarantorTeacherId = guarantorTeacherId; }
}
