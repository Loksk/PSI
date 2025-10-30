package sk.tuke.ais.util;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

public record CurrentUser(@AuthenticationPrincipal Jwt jwt) {
  public String sub() { return jwt.getSubject(); }
  public String email() { return jwt.getClaimAsString("email"); }
  public boolean hasRole(String role) {
    var roles = jwt.getClaimAsStringList("roles");
    if (roles == null && jwt.hasClaim("realm_access")) {
      var realm = jwt.getClaimAsMap("realm_access");
      if (realm != null && realm.get("roles") instanceof java.util.List<?> rr) {
        roles = (java.util.List<String>) rr;
      }
    }
    return roles != null && roles.stream().anyMatch(r -> r.equalsIgnoreCase(role));
  }
}
