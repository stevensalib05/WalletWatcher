package wallet.watcher.server.storage;

import wallet.watcher.server.entities.Income;

import java.util.ArrayList;
import java.util.List;

public class Incomes {
    private List<Income> incomeList;

    public List<Income> getIncomes() {
        if (incomeList == null) {
            incomeList = new ArrayList<>();
        }
        return incomeList;
    }

    public void setIncomeList(List<Income> incomeList) {
        this.incomeList = incomeList;
    }
}
