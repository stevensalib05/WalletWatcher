import { useState, useEffect } from 'react';
import './Budget.css';
import { useNavigate } from 'react-router-dom';

function Budget() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
      loadUser();
    }, []);

    async function loadUser() {
      const res = await fetch("/api/users/me", { credentials: "include" });
      if (!res.ok) throw new Error("User is not logged in.");
      const userInfo: User = await res.json();

      setUserData(userInfo);
    }

    async function returnAllUserData() {
      // Fetching ALL user data since it will be parsed and returned in an overall compacted JSON for the LLM to utilize for budget creation!
      const accountResponse = await fetch(`/api/accounts/${userData?.email}`, { credentials: "include" });
      if (!accountResponse.ok) return new Error("Can't fetch Account Data.");

      const incomeResponse = await fetch(`/api/incomes/${userData?.email}`, { credentials: "include" });
      if (!incomeResponse.ok) return new Error("Can't fetch Income Data.");

      const goalResponse = await fetch(`/api/goals/${userData?.email}`, { credentials: "include" });
      if (!goalResponse.ok) return new Error("Can't fetch Goal Data.");

      const expenseResponse = await fetch(`/api/expenses/${userData?.email}`, { credentials: "include" });
      if (!expenseResponse.ok) return new Error("Can't fetch Expense Data.");

      
    }

    return (
      <>
        <div className='budgetscontainer'>
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

          <div className='budgets'>
            <h1>Budget</h1>
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

export default Budget;