package wallet.watcher.server.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import wallet.watcher.server.entities.Account;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByEmail(String email);
    Optional<Account> findByEmailAndAccountName(String email, String accountName);
    @Transactional
    @Modifying
    @Query("delete from Account a where a.email = :email and a.accountName = :accountName")
    long deleteByEmailAndAccountName(@Param("email") String email, @Param("accountName") String accountName);
}
