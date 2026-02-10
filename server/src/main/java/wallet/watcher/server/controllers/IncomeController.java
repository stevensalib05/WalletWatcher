package wallet.watcher.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import wallet.watcher.server.dao.IncomeRepository;
import wallet.watcher.server.entities.Income;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

    private final IncomeRepository incomeRepository;

    public IncomeController(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    // Get all Incomes.
    @GetMapping("/")
    public List<Income> getIncomes() {
        return incomeRepository.findAll();
    }

    // Get all Incomes of a certain user.
    @GetMapping("/{email}")
    public ResponseEntity<List<Income>> getUserIncomes(@PathVariable String email) {
        List<Income> income =  incomeRepository.findByEmail(email);

        if (income.isEmpty()) return ResponseEntity.status(404).build();

        return ResponseEntity.ok(income);
    }

    // Adding Income to a user profile.
    @PostMapping("/{email}")
    public ResponseEntity<Object> addIncome(@PathVariable String email, @RequestBody Income income) {
        income.setEmail(email);
        Income newIncome = incomeRepository.save(income);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newIncome.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    // Deleting Income by the user email and income name.
    @DeleteMapping("/{email}/{incomeName}")
    public ResponseEntity<Void> deleteIncome(@PathVariable String email, @PathVariable String incomeName) {
        boolean income = incomeRepository.existsByEmailAndIncomeName(email, incomeName);

        if (!income) return ResponseEntity.status(404).build();

        incomeRepository.deleteByEmailAndIncomeName(email, incomeName);
        return ResponseEntity.noContent().build();
    }
}
