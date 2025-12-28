package wallet.watcher.server.entities;

public class Account {
    private String email;
    private String accountName;
    private Integer balance;

    public Account(String email, String accountName, Integer balance) {
        this.email = email;
        this.accountName = accountName;
        this.balance = balance;
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

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "Account [email=" + email + ", accountName=" + accountName + ", balance=" + balance + "]";
    }
}
