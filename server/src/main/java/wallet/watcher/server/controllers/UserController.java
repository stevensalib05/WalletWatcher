package wallet.watcher.server.controllers;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import wallet.watcher.server.repositories.UserRepository;
import wallet.watcher.server.entities.User;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private GoogleIdToken.Payload verifyToken(String token) throws Exception {

        NetHttpTransport transport = new NetHttpTransport();
        JacksonFactory jsonFactory = JacksonFactory.getDefaultInstance();

        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                        .setAudience(List.of("YOUR_GOOGLE_CLIENT_ID"))
                        .build();

        GoogleIdToken idToken = verifier.verify(token);

        if (idToken == null)
            throw new RuntimeException("Invalid Google token");

        return idToken.getPayload();
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Principal principal) throws Exception {
        if (principal == null) return ResponseEntity.status(401).build();

        return userRepository.findById(principal.getName())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).build());
    }

    // GET Method
    @GetMapping("/")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // POST Method
    @PostMapping("/")
    public ResponseEntity<Void> addUser(@RequestBody User user) {
        User addedUser = userRepository.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{email}")
                .buildAndExpand(addedUser.getEmail())
                .toUri();
        return ResponseEntity.created(location).build();
    }
}
