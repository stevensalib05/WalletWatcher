package wallet.watcher.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import wallet.watcher.server.entities.Goal;
import wallet.watcher.server.repositories.GoalRepository;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalRepository goalRepository;

    public GoalController(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    @GetMapping("/")
    public List<Goal> getGoals() {
        return goalRepository.findAll();
    }

    @GetMapping("/{email}")
    public List<Goal> getUserGoals(@PathVariable String email) {
        return goalRepository.findByEmail(email);
    }

    @PostMapping("/{email}")
    public ResponseEntity<Object> addGoal(@PathVariable String email, @RequestBody Goal goal) {
        goal.setEmail(email);

        Goal newGoal = goalRepository.save(goal);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newGoal.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{email}/{goal}")
    public ResponseEntity<Void> deleteGoal(@PathVariable String email, @PathVariable String goal) {
        long deletedGoal = goalRepository.deleteByEmailAndGoal(email, goal);

        if (deletedGoal == 0) return ResponseEntity.status(404).build();

        return ResponseEntity.noContent().build();
    }
}
