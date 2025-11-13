package sk.tuke.ais.config;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.OctetSequenceKey;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import sk.tuke.ais.identity.DatabaseUserDetailsService;
import com.nimbusds.jose.jwk.source.ImmutableSecret;

import java.text.ParseException;
import java.time.Duration;
import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(
    DatabaseUserDetailsService userDetailsService,
    PasswordEncoder passwordEncoder
  ) {
    var provider = new DaoAuthenticationProvider();
    provider.setUserDetailsService(userDetailsService);
    provider.setPasswordEncoder(passwordEncoder);
    return new ProviderManager(provider);
  }

  @Bean
  public JwtEncoder jwtEncoder(@Value("${security.jwt.secret}") String secret) throws ParseException {
    var jwk = new OctetSequenceKey.Builder(secret.getBytes()).build();
    return new NimbusJwtEncoder(new ImmutableSecret<>(jwk.toOctetSequenceKey().toByteArray()));
  }

  @Bean
  public JwtDecoder jwtDecoder(@Value("${security.jwt.secret}") String secret) throws JOSEException {
    var jwk = new OctetSequenceKey.Builder(secret.getBytes()).build();
    return NimbusJwtDecoder.withSecretKey(jwk.toSecretKey()).build();
  }

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(AbstractHttpConfigurer::disable)
      .authorizeHttpRequests(auth -> auth
        .requestMatchers(
          "/api/v1/auth/login",
          "/v3/api-docs/**",
          "/swagger-ui/**",
          "/swagger-ui.html",
          "/actuator/health"
        ).permitAll()
        .anyRequest().authenticated()
      )
      .oauth2ResourceServer(oauth2 -> oauth2
        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthConverter()))
      );
    return http.build();
  }

  private JwtAuthenticationConverter jwtAuthConverter() {
    var converter = new JwtAuthenticationConverter();
    converter.setJwtGrantedAuthoritiesConverter(jwt -> {
      var defaultConv = new JwtGrantedAuthoritiesConverter();
      Collection<GrantedAuthority> defaults = defaultConv.convert(jwt);
      List<String> realmRoles = jwt.getClaimAsStringList("roles");
      var mapped = realmRoles == null ? Stream.<GrantedAuthority>empty()
        : realmRoles.stream()
          .map(role -> role.startsWith("ROLE_") ? role : "ROLE_" + role.toUpperCase())
          .map(SimpleGrantedAuthority::new);
      return Stream.concat(defaults == null ? Stream.empty() : defaults.stream(), mapped).toList();
    });
    return converter;
  }
}
