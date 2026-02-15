package wallet.watcher.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import wallet.watcher.server.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    void deleteByEmail(String email);
}
