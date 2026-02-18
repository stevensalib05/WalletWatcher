import { useState, useEffect } from 'react';
import './Budget.css';
import { useNavigate } from 'react-router-dom';

function Budget() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null);
    const [budget, setBudget] = useState<BudgetPlan | null>(null);
    const [isLoadingBudget, setIsLoadingBudget] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
      loadUser();
    }, []);

    async function loadUser() {
      const res = await fetch("/api/users/me", { credentials: "include" });
      if (!res.ok) throw new Error("User is not logged in.");
      const userInfo: User = await res.json();

      setUserData(userInfo);
    }

    async function loadBudget() {
        if (!userData?.email) return;

        setIsLoadingBudget(true);
        setLoadError(null);

        try {
          const res = await fetch(`/api/plan/${encodeURIComponent(userData.email)}`, { credentials: "include" });
          if (!res.ok) throw new Error("Failed to Load Budget.");
          const budgetInfo: BudgetPlan = await res.json();
          setBudget(budgetInfo);
          console.log(JSON.stringify(budgetInfo));
        } catch {
          setLoadError("Couldn't load the AI budget right now. Please try again.");
        } finally {
          setIsLoadingBudget(false);
        }
    }

    const formatCurrency = (value?: number) =>
      value == null ? "$0.00" : `$${value.toFixed(2)}`;

    return (
      <>
        <div className='budgetscontainer'>
          <div className='navbar'>
            <ul className='navbarcontent'>
              <li className='navbaritem'><a href="" onClick={(e) => { e.preventDefault(); navigate('/home'); }}>Home</a></li>
              <li className='navbaritem'><a href="" onClick={(e) => { e.preventDefault(); navigate('/accounts'); }}>Accounts</a></li>
              <li className='navbaritem'><a href="" onClick={(e) => { e.preventDefault(); navigate('/income'); }}>Income</a></li>
              <li className='navbaritem'><a href="" onClick={(e) => { e.preventDefault(); navigate('/goals'); }}>Goals</a></li>
              <li className='navbaritem'><a href="" onClick={(e) => { e.preventDefault(); navigate('/expenses'); }}>Expenses</a></li>
              <li className='navbaritem'><a href="" onClick={(e) => { e.preventDefault(); navigate('/budget'); }}>Budget</a></li>
              <li className='navbaritem' id='logout'><a href="" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Logout</a></li>
            </ul>
          </div>

          <div className='budgets'>
            <h1>Budget</h1>
            <button
              className='loadbudgetbutton'
              type='button'
              onClick={(e) => { e.preventDefault(); loadBudget(); }}
              disabled={!userData?.email || isLoadingBudget}
            >
              {isLoadingBudget ? "Loading AI Budget..." : "Load AI Budget"}
            </button>
            {loadError && <p className='budgeterror'>{loadError}</p>}

            {budget && (
              <div className='budgetgrid'>
                <div className='budget'>
                  <h3>Overview</h3>
                  <p><strong>Period:</strong> {budget.period ?? "MONTHLY"}</p>
                  <p><strong>Income:</strong> {formatCurrency(budget.income)}</p>
                  <p><strong>Total Planned:</strong> {formatCurrency(budget.summary?.totalExpenses)}</p>
                  <p><strong>Leftover:</strong> {formatCurrency(budget.summary?.leftover)}</p>
                </div>

                <div className='budget'>
                  <h3>Needs</h3>
                  {(budget.needs ?? []).length === 0 ? (
                    <p className='mutedline'>No needs items generated.</p>
                  ) : (
                    (budget.needs ?? []).map((item, idx) => (
                      <div key={`${item.category}-${idx}`} className='budgetlineitem'>
                        <p>{item.category}</p>
                        <p>{formatCurrency(item.amount)}</p>
                        <p className='mutedline'>{item.note}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className='budget'>
                  <h3>Wants</h3>
                  {(budget.wants ?? []).length === 0 ? (
                    <p className='mutedline'>No wants items generated.</p>
                  ) : (
                    (budget.wants ?? []).map((item, idx) => (
                      <div key={`${item.category}-${idx}`} className='budgetlineitem'>
                        <p>{item.category}</p>
                        <p>{formatCurrency(item.amount)}</p>
                        <p className='mutedline'>{item.note}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className='budget'>
                  <h3>Savings & Goals</h3>
                  {(budget.savingsAndGoals ?? []).length === 0 ? (
                    <p className='mutedline'>No savings/goals generated.</p>
                  ) : (
                    (budget.savingsAndGoals ?? []).map((item, idx) => (
                      <div key={`${item.category}-${idx}`} className='budgetlineitem'>
                        <p>{item.category}</p>
                        <p>{formatCurrency(item.amount)}</p>
                        <p className='mutedline'>{item.note}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className='budget budgetwide'>
                  <h3>Warnings & Recommendations</h3>
                  {(budget.warnings ?? []).length === 0 ? (
                    <p className='mutedline'>No warnings.</p>
                  ) : (
                    <ul className='warninglist'>
                      {(budget.warnings ?? []).map((warning, idx) => (
                        <li key={idx}>{warning}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
}

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface BudgetItem {
  category: string;
  amount: number;
  note: string;
}

interface BudgetPlan {
  period?: string;
  income?: number;
  needs?: BudgetItem[];
  wants?: BudgetItem[];
  savingsAndGoals?: BudgetItem[];
  summary?: {
    totalExpenses?: number;
    leftover?: number;
  };
  warnings?: string[];
}

export default Budget;
