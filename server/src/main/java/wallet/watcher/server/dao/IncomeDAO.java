package wallet.watcher.server.dao;

import wallet.watcher.server.entities.Income;
import wallet.watcher.server.storage.Incomes;

public class IncomeDAO {
    private static Incomes incomes = new Incomes();

    public Incomes getIncomes() {
        return incomes;
    }

    public void addIncome(Income income) {
        incomes.getIncomes().add(income);
    }

    public Incomes getIncomesByEmail(String email) {
        Incomes results = new Incomes();
        for (Income income : incomes.getIncomes()) {
            if (income.getEmail().equals(email) && income.getEmail() != null) {
                results.getIncomes().add(income);
            }
        }

        return results;
    }
}
