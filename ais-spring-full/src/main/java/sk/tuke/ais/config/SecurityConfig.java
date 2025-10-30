package sk.tuke.ais.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
          .requestMatchers(
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/actuator/health"
          ).permitAll()
          .anyRequest().permitAll()
        );
      // .oauth2ResourceServer(oauth2 -> oauth2.jwt()); // zapneš neskôr
    return http.build();
  }

  private JwtAuthenticationConverter jwtAuthConverter() {
    var converter = new JwtAuthenticationConverter();
    converter.setJwtGrantedAuthoritiesConverter(jwt -> {
      var defaultConv = new JwtGrantedAuthoritiesConverter();
      Collection<GrantedAuthority> defaults = defaultConv.convert(jwt);
      List<String> realmRoles = jwt.getClaimAsStringList("roles");
      if (realmRoles == null && jwt.hasClaim("realm_access")) {
        var realm = jwt.getClaimAsMap("realm_access");
        if (realm != null && realm.get("roles") instanceof List<?> rr) {
          realmRoles = rr.stream().map(Object::toString).toList();
        }
      }
      var mapped = realmRoles == null ? Stream.<GrantedAuthority>empty()
              : realmRoles.stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r.toUpperCase()));
      return Stream.concat(defaults == null ? Stream.empty() : defaults.stream(), mapped).toList();
    });
    return converter;
  }
}
