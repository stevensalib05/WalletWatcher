import './Accounts.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Accounts() {
  const [userData, setUserData] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<any[] | null>([]);
  const navigate  = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/users/me", { credentials: "include" });
      if (!res.ok) throw new Error("User is not logged in.");
      const userInfo: User = await res.json();

      setUserData(userInfo);
    }

    loadUser();
  }, []);

  useEffect(() => {
    async function loadAccounts() {
      if (!userData?.email) return;

      const res = await fetch(`/api/accounts/${encodeURIComponent(userData.email)}`, { credentials: "include" });
      if (res.status) return setAccounts([]);
      const accountInfo = await res.json();

      setAccounts(accountInfo);
    }

    loadAccounts();
  }, [userData]);

  function checkEmptyAccounts() {
    if (accounts == null || accounts.length == 0) return "You have no stored accounts. Want to add some?"
  }

    return (
      <>
        <div className='accountscontainer'>
          <div className='navbar'>
            <ul className='navbarcontent'>
              <li className='navbaritem'><a href="" onClick={() => navigate('/home')}>Home</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/accounts')}>Accounts</a></li>
              <li className='navbaritem'><a href="">Budget</a></li>
              <li className='navbaritem' id='logout'><a href="" onClick={() => navigate('/')}>Logout</a></li>
            </ul>
          </div>

          <div className='accounts'>
            <h1>Your Accounts</h1>
            <div className='currentaccountscontainer'>
              <h3>All Accounts:</h3>
              <div className='noaccounts'>
                <p>{checkEmptyAccounts()}</p>
              </div>
            </div>
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

interface Accounts {
  accounts: any[];
}

export default Accounts;