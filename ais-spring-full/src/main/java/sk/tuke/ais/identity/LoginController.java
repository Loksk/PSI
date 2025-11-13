package sk.tuke.ais.identity;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.tuke.ais.config.JwtProperties;
import sk.tuke.ais.domain.UserAccount;
import sk.tuke.ais.identity.dto.LoginRequest;
import sk.tuke.ais.identity.dto.LoginResponse;
import sk.tuke.ais.repo.UserAccountRepository;

import java.time.Instant;

@RestController
@RequestMapping("/api/v1/auth")
@Validated
public class LoginController {

  private final AuthenticationManager authenticationManager;
  private final JwtEncoder jwtEncoder;
  private final JwtProperties jwtProperties;
  private final UserAccountRepository userAccountRepository;

  public LoginController(
    AuthenticationManager authenticationManager,
    JwtEncoder jwtEncoder,
    JwtProperties jwtProperties,
    UserAccountRepository userAccountRepository
  ) {
    this.authenticationManager = authenticationManager;
    this.jwtEncoder = jwtEncoder;
    this.jwtProperties = jwtProperties;
    this.userAccountRepository = userAccountRepository;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody @Validated LoginRequest request) {
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(request.email(), request.password())
    );
    var principal = (UserDetails) authentication.getPrincipal();
    var account = userAccountRepository.findByEmailIgnoreCase(principal.getUsername()).orElseThrow();

    Instant now = Instant.now();
    Instant expiresAt = now.plus(jwtProperties.expiration());

    var claims = JwtClaimsSet.builder()
      .issuer(jwtProperties.issuer())
      .issuedAt(now)
      .expiresAt(expiresAt)
      .subject(account.getId().toString())
      .claim("email", account.getEmail())
      .claim("name", account.getGivenName() + " " + account.getFamilyName())
      .claim("roles", account.getRoles())
      .build();

    var token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    var response = new LoginResponse(
      token,
      expiresAt,
      account.getEmail(),
      account.getGivenName(),
      account.getFamilyName(),
      account.getRoles()
    );
    return ResponseEntity.ok(response);
  }
}
