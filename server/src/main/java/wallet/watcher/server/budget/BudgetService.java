package wallet.watcher.server.budget;

import org.springframework.stereotype.Service;
import wallet.watcher.server.entities.*;
import wallet.watcher.server.repositories.*;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BudgetService {
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final GoalRepository goalRepository;

    public BudgetService(UserRepository userRepository, AccountRepository accountRepository, IncomeRepository incomeRepository, ExpenseRepository expenseRepository, GoalRepository goalRepository) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
        this.goalRepository = goalRepository;
    }

    public BudgetSnapshot buildSnapshot(String email) {
        User user = userRepository.findById(email).orElseThrow(() -> new IllegalArgumentException("No user found."));
        List<Account> accounts = accountRepository.findByEmail(email);
        List<Income> incomes = incomeRepository.findByEmail(email);
        List<Expense> expenses = expenseRepository.findByEmail(email);
        List<Goal> goals = goalRepository.findByEmail(email);

        BudgetSnapshot snapshot = new BudgetSnapshot();

        snapshot.user = new BudgetSnapshot.UserInfo(
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );

        // CashFlow
        snapshot.cashFlow = new BudgetSnapshot.CashFlow();
        snapshot.cashFlow.monthlyIncome = computeMonthlyIncome(incomes);
        snapshot.cashFlow.monthlyExpenses = computeMonthlyExpenses(expenses);

        snapshot.cashFlow.surplus = round2(
                snapshot.cashFlow.monthlyIncome.total
                        - snapshot.cashFlow.monthlyExpenses.total
        );

        snapshot.balanceSheet = computeBalanceSheet(accounts);

        snapshot.goals = goals.stream()
                .map(Goal::getGoal)
                .collect(Collectors.toList());

        return snapshot;
    }

    private BudgetSnapshot.MonthlyIncome computeMonthlyIncome(List<Income> incomes) {
        List<BudgetSnapshot.IncomeLine> breakdown = new ArrayList<>();

        double total = 0.0;
        for (Income inc : incomes) {
            String type = safeString(inc.getIncomeType());
            double monthly = incomeToMonthly(inc);
            breakdown.add(new BudgetSnapshot.IncomeLine(
                    safeString(inc.getIncomeName()),
                    type,
                    round2(monthly)
            ));
            total += monthly;
        }

        BudgetSnapshot.MonthlyIncome out = new BudgetSnapshot.MonthlyIncome();
        out.breakdown = breakdown;
        out.total = round2(total);
        return out;
    }

    private double incomeToMonthly(Income inc) {
        String type = safeString(inc.getIncomeType()).toLowerCase(Locale.ROOT);

        double amount = inc.getAmount();
        int weeklyHours = (int) inc.getWeeklyHours();

        if (type.contains("hour")) {
            return amount * weeklyHours * 4.33;
        }

        return amount / 12.0;
    }

    private BudgetSnapshot.MonthlyExpenses computeMonthlyExpenses(List<Expense> expenses) {
        List<BudgetSnapshot.ExpenseItem> items = new ArrayList<>();
        Map<String, Double> byCategory = new HashMap<>();

        double total = 0.0;

        for (Expense ex : expenses) {
            String category = normalizeCategory(ex.getCategory());
            String freq = safeString(ex.getFrequency());

            double monthly = expenseToMonthly(ex.getAmount(), freq);

            items.add(new BudgetSnapshot.ExpenseItem(
                    safeString(ex.getName()),
                    category,
                    freq,
                    round2(monthly)
            ));

            byCategory.merge(category, monthly, Double::sum);
            total += monthly;
        }

        List<BudgetSnapshot.CategoryAmount> cats = byCategory.entrySet().stream()
                .map(e -> new BudgetSnapshot.CategoryAmount(e.getKey(), round2(e.getValue())))
                .sorted((a, b) -> Double.compare(b.monthlyAmount, a.monthlyAmount))
                .collect(Collectors.toList());

        BudgetSnapshot.MonthlyExpenses out = new BudgetSnapshot.MonthlyExpenses();
        out.items = items;
        out.byCategory = cats;
        out.total = round2(total);
        return out;
    }

    private double expenseToMonthly(double amount, String frequency) {
        String f = safeString(frequency).toUpperCase(Locale.ROOT);

        return switch (f) {
            case "WEEKLY" -> amount * 4.33;
            case "BIWEEKLY" -> amount * 2.17;
            case "YEARLY" -> amount / 12.0;
            case "MONTHLY" -> amount;
            default -> amount;
        };
    }

    private BudgetSnapshot.BalanceSheet computeBalanceSheet(List<Account> accounts) {
        double assets = 0.0;
        double liabs = 0.0;

        List<BudgetSnapshot.AccountItem> list = new ArrayList<>();

        for (Account a : accounts) {
            String type = safeString(a.getAccountType());
            double bal = a.getBalance();

            list.add(new BudgetSnapshot.AccountItem(
                    safeString(a.getAccountName()),
                    type,
                    round2(bal)
            ));

            if (type.equalsIgnoreCase("asset")) assets += bal;
            else if (type.equalsIgnoreCase("liability")) liabs += bal;
        }

        BudgetSnapshot.BalanceSheet out = new BudgetSnapshot.BalanceSheet();
        out.assetsTotal = round2(assets);
        out.liabilitiesTotal = round2(liabs);
        out.netWorth = round2(assets - liabs);
        out.accounts = list;
        return out;
    }

    private String normalizeCategory(String category) {
        String c = safeString(category).trim();
        return c.isEmpty() ? "UNCATEGORIZED" : c;
    }

    private String safeString(String s) {
        return s == null ? "" : s;
    }

    private double round2(double x) {
        return Math.round(x * 100.0) / 100.0;
    }
}
