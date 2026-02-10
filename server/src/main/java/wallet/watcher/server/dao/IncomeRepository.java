package wallet.watcher.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import wallet.watcher.server.entities.Income;

import java.util.List;
import java.util.Optional;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByEmail(String email);
    Optional<Income> findByEmailAndIncomeName(String email, String incomeName);
    void deleteByEmailAndIncomeName(String email, String incomeName);
}
