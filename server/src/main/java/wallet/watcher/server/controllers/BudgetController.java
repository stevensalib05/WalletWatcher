package wallet.watcher.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wallet.watcher.server.budget.BudgetService;
import wallet.watcher.server.budget.BudgetSnapshot;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {
    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping("/{email}")
    public BudgetSnapshot getSnapshot(@PathVariable String email) {
        return budgetService.buildSnapshot(email);
    }
}
