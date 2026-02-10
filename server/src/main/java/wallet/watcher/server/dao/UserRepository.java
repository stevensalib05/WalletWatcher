package wallet.watcher.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import wallet.watcher.server.entities.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    void deleteByEmail(String email);
}
