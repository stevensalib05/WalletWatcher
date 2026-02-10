package wallet.watcher.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import wallet.watcher.server.dao.AccountRepository;
import wallet.watcher.server.entities.Account;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountsController {

    private final AccountRepository accountRepository;

    public AccountsController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // Get all accounts;
    @GetMapping("/")
    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    // Gets all accounts belonging to a specific user.
    @GetMapping("/{email}")
    public ResponseEntity<List<Account>> getUserAccounts(@PathVariable String email) {
        List<Account> accounts = accountRepository.findByEmail(email);

        if (accounts.isEmpty()) return ResponseEntity.status(404).build();

        return ResponseEntity.ok(accounts);
    }

    // Adds an account to a user's profile.
    @PostMapping("/{email}")
    public ResponseEntity<Object> addAccount(@PathVariable String email, @RequestBody Account account) {
        account.setEmail(email);
        Account newAccount = accountRepository.save(account);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newAccount.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    // Deleting an account by its user and the account name.
    @DeleteMapping("/{email}/{accountName}")
    public ResponseEntity<Object> deleteAccount(@PathVariable String email, @PathVariable String accountName) {
        boolean account = accountRepository.existsByEmailAndAccountName(email, accountName);

        if(!account) return ResponseEntity.status(404).build();
        accountRepository.deleteByEmailAndAccountName(email, accountName);
        return ResponseEntity.noContent().build();
    }
}
