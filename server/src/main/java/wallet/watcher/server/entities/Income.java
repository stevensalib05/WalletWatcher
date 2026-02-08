package wallet.watcher.server.entities;

public class Income {
    private String email;
    private String incomeType;
    private double amount;
    private double weeklyHours;

    public Income(String email, String incomeType, double amount) {
        this.email = email;
        this.incomeType = incomeType;
        this.amount = amount;
    }

    public Income(String email, String incomeType, double amount, double weeklyHours) {
        this.email = email;
        this.incomeType = incomeType;
        this.amount = amount;
        this.weeklyHours = weeklyHours;
    }

    public String getEmail() {
        return email;
    }

    public String getIncomeType() {
        return incomeType;
    }

    public double getAmount() {
        return amount;
    }

    public double getWeeklyHours() {
        return weeklyHours;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setIncomeType(String incomeType) {
        this.incomeType = incomeType;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setWeeklyHours(double weeklyHours) {
        this.weeklyHours = weeklyHours;
    }

    @Override
    public String toString() {
        return "Income [email=" + email + ", incomeType=" + incomeType + ", amount=" + amount + ", weeklyHours=" + weeklyHours + "]";
    }
}
