package wallet.watcher.server.budget;

import java.util.List;

public class BudgetSnapshot {
    public UserInfo user;
    public CashFlow cashFlow;
    public BalanceSheet balanceSheet;
    public List<String> goals;

    public static class UserInfo {
        public String email;
        public String firstName;
        public String lastName;

        public UserInfo(String email, String firstName, String lastName) {
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }

    public static class CashFlow {
        public MonthlyIncome monthlyIncome;
        public MonthlyExpenses monthlyExpenses;
        public double surplus;
    }

    public static class MonthlyIncome {
        public double total;
        public List<IncomeLine> breakdown;
    }

    public static class IncomeLine {
        public String incomeName;
        public String incomeType;
        public double monthlyAmount;

        public IncomeLine(String incomeName, String incomeType, double monthlyAmount) {
            this.incomeName = incomeName;
            this.incomeType = incomeType;
            this.monthlyAmount = monthlyAmount;
        }
    }

    public static class MonthlyExpenses {
        public double total;
        public List<CategoryAmount> byCategory;
        public List<ExpenseItem> items;
    }

    public static class CategoryAmount {
        public String category;
        public double monthlyAmount;

        public CategoryAmount(String category, double monthlyAmount) {
            this.category = category;
            this.monthlyAmount = monthlyAmount;
        }
    }

    public static class ExpenseItem {
        public String name;
        public String category;
        public String frequency;
        public double monthlyAmount;

        public ExpenseItem(String name, String category, String frequency, double monthlyAmount) {
            this.name = name;
            this.category = category;
            this.frequency = frequency;
            this.monthlyAmount = monthlyAmount;
        }
    }

    public static class BalanceSheet {
        public double assetsTotal;
        public double liabilitiesTotal;
        public double netWorth;
        public List<AccountItem> accounts;
    }

    public static class AccountItem {
        public String accountName;
        public String accountType;
        public double balance;

        public AccountItem(String accountName, String accountType, double balance) {
            this.accountName = accountName;
            this.accountType = accountType;
            this.balance = balance;
        }
    }
}
