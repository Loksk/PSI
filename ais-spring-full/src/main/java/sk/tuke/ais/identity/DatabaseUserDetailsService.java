package sk.tuke.ais.identity;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sk.tuke.ais.repo.UserAccountRepository;

import java.util.stream.Stream;

@Service
public class DatabaseUserDetailsService implements UserDetailsService {

  private final UserAccountRepository repository;

  public DatabaseUserDetailsService(UserAccountRepository repository) {
    this.repository = repository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    var account = repository.findByEmailIgnoreCase(username)
      .orElseThrow(() -> new UsernameNotFoundException("User %s not found".formatted(username)));

    var authorities = account.getRoles().stream()
      .map(role -> role.startsWith("ROLE_") ? role : "ROLE_" + role.toUpperCase())
      .map(SimpleGrantedAuthority::new)
      .toList();

    return User.withUsername(account.getEmail())
      .password(account.getPasswordHash())
      .authorities(authorities)
      .accountLocked(false)
      .disabled(false)
      .build();
  }
}
