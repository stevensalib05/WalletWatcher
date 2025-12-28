package wallet.watcher.server.dao;

import org.springframework.stereotype.Repository;
import wallet.watcher.server.entities.Account;
import wallet.watcher.server.storage.Accounts;

@Repository
public class AccountDAO {
    private static Accounts accounts = new Accounts();

    public Accounts getAccounts() {
        return accounts;
    }

    public void addAccount(Account account) {
        accounts.getAccounts().add(account);
    }

    public Accounts getAccountsByEmail(String email) {
        Accounts results = new Accounts();
        for (Account account : accounts.getAccounts()) {
            if (account.getEmail().equals(email) && account.getEmail() != null) {
                results.getAccounts().add(account);
            }
        }

        return results;
    }

    public Account getAccountByEmail(String email, String accountName) {
        Accounts accounts = getAccountsByEmail(email);
        if (accounts == null || accounts.getAccounts() == null) return null;

        for (Account account : accounts.getAccounts()) {
            if (account.getAccountName().equals(accountName)) {
                return account;
            }
        }
        return null;
    }
}
