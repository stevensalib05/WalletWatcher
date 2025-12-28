package wallet.watcher.server.storage;

import wallet.watcher.server.entities.Account;

import java.util.ArrayList;
import java.util.List;

public class Accounts {
    private List<Account> accounts;

    public List<Account> getAccounts() {
        if (accounts == null) {
            accounts = new ArrayList<>();
        }
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }
}
