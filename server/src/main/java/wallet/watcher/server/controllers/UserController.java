package wallet.watcher.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import wallet.watcher.server.dao.UserDAO;
import wallet.watcher.server.entities.User;
import wallet.watcher.server.storage.Users;

import java.net.URI;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserDAO userDAO;

    // GET Method
    @GetMapping("/")
    public Users getUsers() {
        return userDAO.getAllUsers();
    }

    // POST Method
    @PostMapping("/")
    public ResponseEntity<Object>
    addUser(@RequestBody User user) {
        userDAO.addUser(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{email}")
                .buildAndExpand(user.getEmail())
                .toUri();
        return ResponseEntity.created(location).build();
    }
}
