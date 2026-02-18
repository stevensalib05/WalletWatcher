import { useState, useEffect } from 'react';
import './Budget.css';
import { useNavigate } from 'react-router-dom';

function Budget() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null);
    const [budget, setBudget] = useState<any>(null);

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

        const res = await fetch(`/api/plan/${encodeURIComponent(userData.email)}`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to Load Budget.");
        const budgetInfo = await res.json();
        setBudget(budgetInfo);
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