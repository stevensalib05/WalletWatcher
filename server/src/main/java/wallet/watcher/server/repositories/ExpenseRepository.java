package wallet.watcher.server.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import wallet.watcher.server.entities.Expense;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, String> {
    List<Expense> findByEmail(String email);
    Optional<Expense> findByEmailAndName(String email, String name);
    @Transactional
    @Modifying
    @Query("delete from Expense e where e.email = :email and e.name = :name")
    Long deleteByEmailAndName(@Param("email") String email, @Param("name") String name);
    @Transactional
    @Modifying
    @Query("delete from Expense e where e.id = :id")
    Long deleteById(@Param("id") Long id);
}
