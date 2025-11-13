package sk.tuke.ais.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "user_account", schema = "ais")
public class UserAccount {
  @Id
  @Column(columnDefinition = "uuid")
  private UUID id;

  @Column(name = "keycloak_id", nullable = false, unique = true)
  private String keycloakId;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(name = "given_name", nullable = false)
  private String givenName;

  @Column(name = "family_name", nullable = false)
  private String familyName;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @JdbcTypeCode(SqlTypes.ARRAY)
  @Column(columnDefinition = "text[]", nullable = false)
  private String[] roles;

  @Column(name = "created_at")
  private OffsetDateTime createdAt;

  @Column(name = "updated_at")
  private OffsetDateTime updatedAt;

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public String getKeycloakId() { return keycloakId; }
  public void setKeycloakId(String keycloakId) { this.keycloakId = keycloakId; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getGivenName() { return givenName; }
  public void setGivenName(String givenName) { this.givenName = givenName; }
  public String getFamilyName() { return familyName; }
  public void setFamilyName(String familyName) { this.familyName = familyName; }
  public String getPasswordHash() { return passwordHash; }
  public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
  public List<String> getRoles() { return roles == null ? List.of() : Arrays.asList(roles); }
  public void setRoles(String[] roles) { this.roles = roles; }
  public OffsetDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
  public OffsetDateTime getUpdatedAt() { return updatedAt; }
  public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
