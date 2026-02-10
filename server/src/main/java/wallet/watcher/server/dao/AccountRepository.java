package wallet.watcher.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import wallet.watcher.server.entities.Account;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByEmail(String email);
    Optional<Account> findByEmailAndAccountName(String email, String accountName);
    void deleteByEmailAndAccountName(String email, String accountName);
    boolean existsByEmailAndAccountName(String email, String accountName);
}
