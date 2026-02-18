package wallet.watcher.server.budget;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openai.client.OpenAIClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.*;
import org.springframework.stereotype.Service;

// This entire class is just to pull the BudgetSnapshot from the user. Gonna be used in the BudgetPlanController later.
@Service
public class AIService {
    private final BudgetService budgetService;
    private final OpenAIClient openAIClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AIService(BudgetService budgetService, OpenAIClient openAIClient) {
        this.budgetService = budgetService;
        this.openAIClient = openAIClient;
    }

    public BudgetPlan generatePlan(String email) throws Exception {
        BudgetSnapshot budgetSnapshot = budgetService.buildSnapshot(email);

        String snapshotJSON;

        try {
            snapshotJSON = objectMapper.writeValueAsString(budgetSnapshot);
        } catch(Exception e) { throw new Exception(e); }

        // This is the prompt that will be used to build
        String prompt = """
                You are generating a MONTHLY budget plan as STRICT JSON.
                
                YOU MUST FOLLOW THESE DEFINITIONS:
                - plannedSpending = sum(needs.amount) + sum(wants.amount)
                - summary.totalExpenses = plannedSpending   (IMPORTANT: DO NOT include savingsAndGoals here)
                - summary.leftover = income - summary.totalExpenses
                - savingsAndGoals are OPTIONAL recommendations that the user *could* fund using leftover. They are NOT mandatory.
                
                HARD CONSTRAINTS (MUST NOT BREAK):
                1) income MUST equal the snapshot income exactly. Never change it.
                2) Do NOT create a wants category named (or meaning) "leftover", "buffer", "spending money", "discretionary allowance", "extra", or anything similar.
                   - Leftover is ONLY represented by summary.leftover.
                3) needs and wants must contain real spending categories (rent, groceries, transport, entertainment, etc.), not placeholders.
                4) summary.totalExpenses MUST equal EXACTLY sum(needs.amount)+sum(wants.amount).
                   - Do NOT set totalExpenses = income - leftover unless that ALSO matches the list sums.
                5) summary.leftover MUST equal EXACTLY income - summary.totalExpenses.
                6) summary.totalExpenses MUST be <= income and summary.leftover MUST be >= 0.
                   - If you are over income, reduce wants first (lowest priority), then reduce adjustable needs, until leftover >= 0.
                7) savingsAndGoals amounts MUST be affordable from leftover:
                   - Let recommendedSavings = sum(savingsAndGoals.amount).
                   - recommendedSavings MUST be <= (summary.leftover * 0.70).
                   - This guarantees the user keeps at least 30%% of leftover as free spending buffer.
                8) All amounts must be non-negative and rounded to 2 decimals.
                
                BUDGET LOGIC (GUIDANCE):
                - Use the 50/30/20 rule as a guide:
                  - needsTarget ≈ 50%% of income
                  - wantsTarget ≈ 30%% of income
                  - savingsTarget ≈ 20%% of income (but these are RECOMMENDATIONS from leftover, not plannedSpending)
                - If snapshot has fixed needs already (rent, utilities), keep them realistic and stable.
                - Wants should be modest and flexible; do not swing wildly.
                
                OUTPUT JSON ONLY (no extra text) in this exact shape:
                {
                  "period":"MONTHLY",
                  "income": number,
                  "needs":[{"category":"...","amount":number,"note":"..."}],
                  "wants":[{"category":"...","amount":number,"note":"..."}],
                  "savingsAndGoals":[{"category":"...","amount":number,"note":"..."}],
                  "summary":{"totalExpenses":number,"leftover":number},
                  "warnings":["..."]
                }
                
                FINAL REQUIRED CALCULATION STEP (DO THIS LAST BEFORE OUTPUT):
                A) Compute plannedSpending = sum(needs.amount)+sum(wants.amount)
                B) Set summary.totalExpenses = plannedSpending
                C) Set summary.leftover = income - plannedSpending
                D) Compute recommendedSavings = sum(savingsAndGoals.amount)
                E) If recommendedSavings > summary.leftover * 0.70, reduce savingsAndGoals amounts (keep at least one item) until it fits.
                F) Verify ALL HARD CONSTRAINTS again. If any fail, fix and re-check.
                
                WARNINGS RULE:
                - If summary.leftover < (0.05 * income), add a warning that the budget is tight.
                - In warnings, include 1–3 actionable suggestions using leftover (ex: “Allocate $X of your leftover to Student Loans…”).
                - Do NOT claim income < expenses unless summary.totalExpenses > income (which is not allowed by constraints anyway).
                
                Snapshot JSON:
                %s
                """.formatted(snapshotJSON);

        // Parameters for the Chat Request with OpenAI.
        StructuredResponseCreateParams<BudgetPlan> params = ResponseCreateParams.builder()
                .model(ChatModel.GPT_4O_MINI)
                .input(prompt)
                .text(BudgetPlan.class)
                .build();

        StructuredResponse<BudgetPlan> res = openAIClient.responses().create(params);

        return res.output().stream()
                .filter(StructuredResponseOutputItem::isMessage)
                .map(StructuredResponseOutputItem::asMessage)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No message returned"))
                .content().stream()
                .filter(StructuredResponseOutputMessage.Content::isOutputText)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("OpenAI didn't return the structured Budget Plann"))
                .asOutputText();
    }

    private String toJson(Object o) {
        try { return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(o); }
        catch (Exception e) { throw new RuntimeException(e); }
    }
}
