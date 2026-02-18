package wallet.watcher.server.controllers;

import org.springframework.web.bind.annotation.*;
import wallet.watcher.server.budget.AIService;
import wallet.watcher.server.budget.BudgetPlan;

@RestController
@RequestMapping("/api/plan")
public class BudgetPlanController {
    private final AIService aiService;

    public BudgetPlanController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/{email}")
    public BudgetPlan getPlan(@PathVariable String email) throws Exception {
        return aiService.generatePlan(email);
    }
}
