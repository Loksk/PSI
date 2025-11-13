package sk.tuke.ais.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.tuke.ais.domain.UserAccount;

import java.util.Optional;
import java.util.UUID;

public interface UserAccountRepository extends JpaRepository<UserAccount, UUID> {
  Optional<UserAccount> findByEmailIgnoreCase(String email);
}
