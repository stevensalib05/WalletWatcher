package wallet.watcher.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import wallet.watcher.server.dao.AccountDAO;
import wallet.watcher.server.entities.Account;
import wallet.watcher.server.storage.Accounts;

import java.net.URI;

@RestController
@RequestMapping("/api/accounts")
public class AccountsController {

    @Autowired
    private AccountDAO accountDAO;

    @GetMapping("/")
    public Accounts getAccounts() {
        return accountDAO.getAccounts();
    }

    @GetMapping("/{email}")
    public ResponseEntity<Accounts> getUserAccounts(@PathVariable String email) {
        Accounts accounts = accountDAO.getAccountsByEmail(email);

        if (accounts == null) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.ok(accounts);
    }

    @PostMapping("/{email}")
    public ResponseEntity<Object> addAccount(@PathVariable String email, @RequestBody Account account) {
        account.setEmail(email);
        accountDAO.addAccount(account);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .buildAndExpand()
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{email}/{accountName}")
    public ResponseEntity<Object> deleteAccount(@PathVariable String email, @PathVariable String accountName) {
        Accounts accounts = accountDAO.getAccountsByEmail(email);

        if (accounts == null || accounts.getAccounts().isEmpty()) {
            return ResponseEntity.status(404).build();
        }

        boolean removed = accountDAO.deleteAccount(email, accountName);

        if (!removed) return ResponseEntity.status(404).build();
        return ResponseEntity.noContent().build();
    }
}
