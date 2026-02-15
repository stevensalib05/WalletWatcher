package wallet.watcher.server.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import wallet.watcher.server.entities.Income;

import java.util.List;
import java.util.Optional;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByEmail(String email);
    Optional<Income> findByEmailAndIncomeName(String email, String incomeName);
    @Transactional
    @Modifying
    @Query("delete from Income i where i.email = :email and i.incomeName = :incomeName")
    long deleteByEmailAndIncomeName(@Param("email") String email, @Param("incomeName") String incomeName);
}
