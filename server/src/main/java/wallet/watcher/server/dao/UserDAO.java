package wallet.watcher.server.dao;

import org.springframework.stereotype.Repository;
import wallet.watcher.server.entities.User;
import wallet.watcher.server.storage.Users;

@Repository
public class UserDAO {

    private static Users users = new Users();

    public Users getAllUsers() {
        return users;
    }

    public void addUser(User user) {
        users.getUserList().add(user);
    }
}
