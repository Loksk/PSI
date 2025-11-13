package sk.tuke.ais.identity.dto;

import java.time.Instant;
import java.util.List;

public record LoginResponse(
  String token,
  Instant expiresAt,
  String email,
  String givenName,
  String familyName,
  List<String> roles
) {}