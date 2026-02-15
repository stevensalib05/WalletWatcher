package wallet.watcher.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import wallet.watcher.server.entities.Expense;
import wallet.watcher.server.repositories.ExpenseRepository;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // Fetches all expenses.
    @GetMapping("/")
    public List<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    // Fetches expenses of a specified user.
    @GetMapping("/{email}")
    public List<Expense> getExpensesByEmail(@PathVariable String email) {
        return expenseRepository.findByEmail(email);
    }

    // Adds expense to a specified user.
    @PostMapping("/{email}")
    public ResponseEntity<Object> addExpense(@PathVariable String email, @RequestBody Expense expense) {
        expense.setEmail(email);

        Expense newExpense = expenseRepository.save(expense);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newExpense.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    // Deletes expenses based on its ID.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpenseById(@PathVariable Long id) {
        long deletedExpense = expenseRepository.deleteById(id);

        if (deletedExpense == 0) return ResponseEntity.status(404).build();

        return ResponseEntity.noContent().build();
    }

    // Deletes expenses based on email and ID.
    @DeleteMapping("/{email}/{name}")
    public ResponseEntity<Void> deleteExpenseById(@PathVariable String email, @PathVariable String name) {
        long deletedExpense = expenseRepository.deleteByEmailAndName(email, name);

        if (deletedExpense == 0) return ResponseEntity.status(404).build();

        return ResponseEntity.noContent().build();
    }
}
