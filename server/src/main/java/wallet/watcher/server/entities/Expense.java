package wallet.watcher.server.entities;

import jakarta.persistence.*;

@Entity
@Table(name="expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    private double amount;
    @Column(nullable = false)
    private String frequency;

    public Expense() {

    }

    public Expense(Long id, String email, String name, String category, double amount, String frequency) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.category = category;
        this.amount = amount;
        this.frequency = frequency;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public double getAmount() {
        return amount;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    @Override
    public String toString() {
        return "Expense [id=" + id + ", email=" + email + ", name=" + name + ", category=" + category + ", amount=" + amount + ", frequency=" + frequency + "]";
    }
}
