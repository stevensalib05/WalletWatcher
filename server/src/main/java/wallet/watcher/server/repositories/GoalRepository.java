package wallet.watcher.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import wallet.watcher.server.entities.Goal;

import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, String> {
    List<Goal> findByEmail(String email);
    @Modifying
    @Query("delete from Goal g where g.email = :email and g.goal = :goal")
    Long deleteByEmailAndGoal(@Param("email") String email, @Param("goal") String goal);
}
