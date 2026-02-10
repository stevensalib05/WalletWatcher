package wallet.watcher.server.entities;

import jakarta.persistence.*;

@Entity
@Table(name="incomes")
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false)
    private String email;
    @Column(nullable=false)
    private String incomeType;
    @Column(nullable=false)
    private String incomeName;

    private double amount;
    private double weeklyHours;

    public Income() {

    }

    public Income(String email, String incomeType, String incomeName, double amount) {
        this.email = email;
        this.incomeType = incomeType;
        this.incomeName = incomeName;
        this.amount = amount;
    }

    public Income(String email, String incomeType, String incomeName, double amount, double weeklyHours) {
        this.email = email;
        this.incomeType = incomeType;
        this.incomeName = incomeName;
        this.amount = amount;
        this.weeklyHours = weeklyHours;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getIncomeType() {
        return incomeType;
    }

    public String getIncomeName() {
        return incomeName;
    }

    public double getAmount() {
        return amount;
    }

    public double getWeeklyHours() {
        return weeklyHours;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setIncomeType(String incomeType) {
        this.incomeType = incomeType;
    }

    public void setIncomeName(String incomeName) {
        this.incomeName = incomeName;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setWeeklyHours(double weeklyHours) {
        this.weeklyHours = weeklyHours;
    }

    @Override
    public String toString() {
        return "Income [id=" + id + ", email=" + email + ", incomeType=" + incomeType + ", incomeName=" + incomeName + ", amount=" + amount + ", weeklyHours=" + weeklyHours + "]";
    }
}
