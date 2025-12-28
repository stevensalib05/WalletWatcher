package wallet.watcher.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingController {

    // I literally just have this here bc i was encountering so many issues and used this to test some routes.
    // Don't judge...
    @GetMapping("/ping")
    public String ping() { return "pong"; }
}
