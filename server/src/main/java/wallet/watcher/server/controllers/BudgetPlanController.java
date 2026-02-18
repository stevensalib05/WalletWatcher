package wallet.watcher.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wallet.watcher.server.budget.AIService;
import wallet.watcher.server.budget.BudgetPlan;

@RestController
@RequestMapping("/api/plan")
public class BudgetPlanController {
    private final AIService aiService;

    public BudgetPlanController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/")
    public BudgetPlan getPlan(@RequestParam String email) throws Exception {
        return aiService.generatePlan(email);
    }
}
