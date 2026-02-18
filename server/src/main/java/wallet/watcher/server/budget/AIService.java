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
                Create a MONTHLY Budget Plan for this snapshot.
                Return a JSON Formatted in this EXACT way, no modifications allowed for this format:
                        {
                          "period": "MONTHLY",
                          "income": number,
                          "needs": [{"category": "...", "amount": number, "note": "..."}],
                          "wants": [...],
                          "savingsAndGoals": [...],
                          "summary": {"totalExpenses": number, "leftover": number},
                          "warnings": ["..."]
                        }
                If the income is less than expenses in terms of raw value (income < expenses), leave a warning to the user that this isn't permanently sustainable.
                Snapshot JSON:
                %s
                """.formatted(snapshotJSON);

        // Parameters for the Chat Request with OpenAI.
        StructuredResponseCreateParams<BudgetPlan> params = ResponseCreateParams.builder()
                .model(ChatModel.GPT_5_2)
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
