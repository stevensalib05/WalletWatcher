package wallet.watcher.server.budget;

import java.util.List;

// This class serves to just format the output so that the LLM can format this into a JSON format for the frontend to callback on.
public class BudgetPlan {
    public static class CategoryItem {
        private String category;
        private double amount;
        private String note;

        public CategoryItem() {

        }

        public CategoryItem(String category, double amount, String note) {
            this.category = category;
            this.amount = amount;
            this.note = note;
        }

        public String getCategory() {
            return category;
        }

        public double getAmount() {
            return amount;
        }

        public String getNote() {
            return note;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public void setAmount(double amount) {
            this.amount = amount;
        }

        public void setNote(String note) {
            this.note = note;
        }
    }

    public static class Summary {
        private double totalExpenses;
        private double leftover;

        public Summary() {

        }

        public Summary (double totalExpenses, double leftover) {
            this.totalExpenses = totalExpenses;
            this.leftover = leftover;
        }

        public double getTotalExpenses() {
            return totalExpenses;
        }

        public double getLeftover() {
            return leftover;
        }

        public void setTotalExpenses(double totalExpenses) {
            this.totalExpenses = totalExpenses;
        }

        public void setLeftover(double leftover) {
            this.leftover = leftover;
        }
    }


    private String period;
    private double income;
    private List<CategoryItem> needs;
    private List<CategoryItem> wants;
    private List<CategoryItem> savingsAndGoals;
    private Summary summary;
    private List<String> warnings;

    public BudgetPlan() {

    }

    public BudgetPlan(String period, double income, List<CategoryItem> needs, List<CategoryItem> wants, List<CategoryItem> savingsAndGoals, Summary summary, List<String> warnings) {
        this.period = period;
        this.income = income;
        this.needs = needs;
        this.wants = wants;
        this.savingsAndGoals = savingsAndGoals;
        this.summary = summary;
        this.warnings = warnings;
    }

    public String getPeriod() {
        return period;
    }

    public double getIncome() {
        return income;
    }

    public List<CategoryItem> getNeeds() {
        return needs;
    }

    public List<CategoryItem> getWants() {
        return wants;
    }

    public List<CategoryItem> getSavingsAndGoals() {
        return savingsAndGoals;
    }

    public Summary getSummary() {
        return summary;
    }

    public List<String> getWarnings() {
        return warnings;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public void setIncome(double income) {
        this.income = income;
    }

    public void setNeeds(List<CategoryItem> needs) {
        this.needs = needs;
    }

    public void setWants(List<CategoryItem> wants) {
        this.wants = wants;
    }

    public void setSavingsAndGoals(List<CategoryItem> savingsAndGoals) {
        this.savingsAndGoals = savingsAndGoals;
    }

    public void setSummary(Summary summary) {
        this.summary = summary;
    }

    public void setWarnings(List<String> warnings) {
        this.warnings = warnings;
    }
}
