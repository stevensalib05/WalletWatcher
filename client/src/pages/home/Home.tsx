import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [snapshot, setSnapshot] = useState<BudgetSnapshot | null>(null);

  useEffect(() => {
    async function loadUserAndSnapshot() {
      const res = await fetch('/api/users/me', { credentials: 'include' });
      const userInfo: User = await res.json();
      setUserData(userInfo);

      if (userInfo?.email) {
        const res = await fetch(`/api/budget/${encodeURIComponent(userInfo.email)}`, { credentials: 'include' });
        if (res.ok) {
          const snap = await res.json();
          setSnapshot(snap);
        }
      }
    }

    loadUserAndSnapshot();
  }, []);

  return (
    <div className='welcomecontainer'>
      <div className='navbar'>
        <ul className='navbarcontent'>
          <li className='navbaritem'><a href="" onClick={() => navigate('/home')}>Home</a></li>
          <li className='navbaritem'><a href="" onClick={() => navigate('/accounts')}>Accounts</a></li>
          <li className='navbaritem'><a href="" onClick={() => navigate('/income')}>Income</a></li>
          <li className='navbaritem'><a href="" onClick={() => navigate('/goals')}>Goals</a></li>
          <li className='navbaritem'><a href="" onClick={() => navigate('/expenses')}>Expenses</a></li>
          <li className='navbaritem'><a href="" onClick={() => navigate('/budget')}>Budget</a></li>
          <li className='navbaritem' id='logout'><a href="" onClick={() => navigate('/')}>Logout</a></li>
        </ul>
      </div>

      <div className='welcome'>
        <h1>Welcome Back, {userData?.firstName}!</h1>
      </div>

      <div className='dashboard'>
        <div className='dashboard-grid'>
          <div className='card big'>
            <h3>Cash Flow</h3>
            <div className='card-row'>
              <div>
                <div className='muted'>Monthly Income</div>
                <div className='large'>${snapshot?.cashFlow?.monthlyIncome?.total ?? '0.00'}</div>
              </div>
              <div>
                <div className='muted'>Monthly Expenses</div>
                <div className='large'>${snapshot?.cashFlow?.monthlyExpenses?.total ?? '0.00'}</div>
              </div>
              <div>
                <div className='muted'>Surplus</div>
                <div className={`large ${(snapshot?.cashFlow?.surplus ?? 0) < 0 ? 'negative' : 'positive'}`}>
                  ${snapshot?.cashFlow?.surplus ?? '0.00'}
                </div>
              </div>
            </div>
            <div className='breakdown'>
              <h4>Top Income</h4>
              <ul>
                {(snapshot?.cashFlow?.monthlyIncome?.breakdown ?? []).slice(0,3).map((inc, idx) => (
                  <li key={idx}>{inc.incomeName} — ${inc.monthlyAmount}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className='card'>
            <h3>Balance</h3>
            <div className='muted'>Assets</div>
            <div className='large'>${snapshot?.balanceSheet?.assetsTotal ?? '0.00'}</div>
            <div className='muted'>Liabilities</div>
            <div className='large'>${snapshot?.balanceSheet?.liabilitiesTotal ?? '0.00'}</div>
            <div className='muted'>Net Worth</div>
            <div className='large'>${snapshot?.balanceSheet?.netWorth ?? '0.00'}</div>
          </div>

          <div className='card'>
            <h3>Top Expense Categories</h3>
            <ul>
              {(snapshot?.cashFlow?.monthlyExpenses?.byCategory ?? []).slice(0,5).map((c, i) => (
                <li key={i}>{c.category} — ${c.monthlyAmount}</li>
              ))}
            </ul>
          </div>

          <div className='card'>
            <h3>Accounts</h3>
            <ul>
              {(snapshot?.balanceSheet?.accounts ?? []).slice(0,5).map((a, i) => (
                <li key={i}>{a.accountName} ({a.accountType}) — ${a.balance}</li>
              ))}
            </ul>
          </div>

          <div className='card'>
            <h3>Goals</h3>
            <ul>
              {(snapshot?.goals ?? []).slice(0,5).map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>

          <div className='card'>
            <h3>Recent Expenses</h3>
            <ul>
              {(snapshot?.cashFlow?.monthlyExpenses?.items ?? []).slice(0,5).map((e, i) => (
                <li key={i}>{e.name} — {e.category} — ${e.monthlyAmount}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface User {
  email: string,
  firstName: string,
  lastName: string,
}

// Types mirroring BudgetSnapshot from backend
interface BudgetSnapshot {
  user?: {
    email?: string,
    firstName?: string,
    lastName?: string,
  };
  cashFlow?: {
    monthlyIncome?: {
      total?: number,
      breakdown?: { incomeName: string, incomeType: string, monthlyAmount: number }[]
    };
    monthlyExpenses?: {
      total?: number,
      byCategory?: { category: string, monthlyAmount: number }[],
      items?: { name: string, category: string, frequency: string, monthlyAmount: number }[]
    };
    surplus?: number;
  };
  balanceSheet?: {
    assetsTotal?: number,
    liabilitiesTotal?: number,
    netWorth?: number,
    accounts?: { accountName: string, accountType: string, balance: number }[]
  };
  goals?: string[];
}

export default Home;