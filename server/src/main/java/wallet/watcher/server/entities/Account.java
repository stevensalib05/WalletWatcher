package wallet.watcher.server.entities;

import jakarta.persistence.*;

@Entity
@Table(name="accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false)
    private String email;
    @Column(nullable=false)
    private String accountName;
    private Integer balance;
    @Column(nullable=false)
    private String accountType;

    public Account() {

    }

    public Account(String email, String accountName, Integer balance, String accountType) {
        this.email = email;
        this.accountName = accountName;
        this.balance = balance;
        this.accountType = accountType;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccountName() {
        return accountName;
    }

    public Integer getBalance() {
        return balance;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    @Override
    public String toString() {
        return "Account [id=" + id + ", email=" + email + ", accountName=" + accountName + ", balance=" + balance + "]";
    }
}
