package wallet.watcher.server.dao;

import org.springframework.stereotype.Repository;
import wallet.watcher.server.entities.Account;
import wallet.watcher.server.storage.Accounts;

import java.util.HashMap;
import java.util.Map;

@Repository
public class AccountDAO {
    private static Accounts accounts = new Accounts();
    private final Map<String, Accounts> accountsByEmail = new HashMap<>();

    public Accounts getAccounts() {
        return accounts;
    }

    public void addAccount(Account account) {
        accounts.getAccounts().add(account);
    }

    public Accounts getAccountsByEmail(String email) {
        return accountsByEmail.get(email);
    }

    public Account getAccountByEmail(String email, String accountName) {
        Accounts accounts = getAccountsByEmail(email);
        Account acnt = null;
        for (Account account : accounts.getAccounts()) {
            if (account.getAccountName().equals(accountName)) {
                acnt = account;
            }
        }
        return acnt;
    }
}
