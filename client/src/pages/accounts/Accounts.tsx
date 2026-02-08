import './Accounts.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Accounts() {
  const [userData, setUserData] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<any[] | null>([]);
  const [addAccountFormStatus, setAccountFormStatus] = useState<boolean | null>(null);
  const [accountType, setAccountType] = useState<string>("");

  const [accountName, setAccountName] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const navigate  = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadAccounts();
  }, [userData]);

    async function addAccount(accName: string, bal: string, accType: string) {
      const parsedBalance = Number(bal);
      if (isNaN(parsedBalance)) return alert("Enter a valid Balance");

      const newAccount = {
        email: userData?.email,
        accountName: accName,
        balance: parsedBalance,
        accountType: accType,
      }

      const res = await fetch(`/api/accounts/${userData?.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newAccount),
      });

      if (!res.ok) throw new Error("Failed to Add Account");
    }

    async function loadUser() {
      const res = await fetch("/api/users/me", { credentials: "include" });
      if (!res.ok) throw new Error("User is not logged in.");
      const userInfo: User = await res.json();

      setUserData(userInfo);
    }


    async function loadAccounts() {
      if (!userData?.email) return;

      const res = await fetch(`/api/accounts/${encodeURIComponent(userData.email)}`, { credentials: "include" });
      if (res.status !== 200) return setAccounts([]);
      const accountInfo = await res.json();

      setAccounts(accountInfo.accounts);
    }

    async function deleteAccount(accName: string) {
      if (!userData?.email) return;

      const res = await fetch(`/api/accounts/${encodeURIComponent(userData.email)}/${encodeURIComponent(accName)}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error Deleting Account.");
    }

    return (
      <>
        <div className='accountscontainer'>
          <div className='navbar'>
            <ul className='navbarcontent'>
              <li className='navbaritem'><a href="" onClick={() => navigate('/home')}>Home</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/accounts')}>Accounts</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/income')}>Income</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/budget')}>Budget</a></li>
              <li className='navbaritem' id='logout'><a href="" onClick={() => navigate('/')}>Logout</a></li>
            </ul>
          </div>

          <div className='accounts'>
            <h1>Your Accounts</h1>

            {addAccountFormStatus && (
              <>
                <div className='background' onClick={() => setAccountFormStatus(false)} />
                <form className='addaccountform'>
                  <h2>Add Account</h2>
                  <div className='formcontainer'>
                    <input type='text' placeholder='Account Name' value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                    <input type='text' placeholder='Balance' value={balance} onChange={(e) => setBalance(e.target.value)} />
                    <select className='accounttype' aria-placeholder='Asset or Liability' value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                      <option value="---Select an Option---">---Select an Option---</option>
                      <option value="Asset">Asset</option>
                      <option value="Liability">Liability</option>
                    </select>
                    <div className='formbuttons'>
                      <button className='' onClick={async (e) => {
                        e.preventDefault();
                        await addAccount(accountName, balance, accountType);
                        await loadAccounts();
                        setAccountFormStatus(false);
                        setAccountName("");
                        setBalance("");
                      }}>Add Account</button>
                      <button className='formcancel' onClick={() => setAccountFormStatus(false)}>Cancel</button>
                    </div>
                  </div>
                </form>
              </>

            )}

            <div className='currentaccountscontainer'>
              <h3>Asset Accounts:</h3>
              <div className='noaccounts'>
                {(accounts == null || accounts.filter((account) => account.accountType !== "Liability").length === 0) && (
                  <p>You have no stored accounts. Want to add some?</p>
                )}
              </div>
              <div className='currentaccounts'>
                {accounts?.filter((account) => account.accountType !== "Liability").map((account, index) => (
                  <div key={index} className='accountbox'>
                    <h3>{account.accountName}</h3>
                    <p>Current Balance: ${account.balance}</p>
                    <button id='deleteaccount' onClick={async () => {
                      await deleteAccount(account.accountName);
                      await loadAccounts();
                    }}>Delete</button>
                  </div>
                ))}
              </div>
              <button id='addaccountbutton' onClick={() => setAccountFormStatus(true)}>Add Account</button>
            </div>

            {addAccountFormStatus && (
              <>
                <div className='background' onClick={() => setAccountFormStatus(false)} />
                <form className='addaccountform'>
                  <h2>Add Account</h2>
                  <div className='formcontainer'>
                    <input type='text' placeholder='Account Name' value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                    <input type='text' placeholder='Balance' value={balance} onChange={(e) => setBalance(e.target.value)} />
                    <select className='accounttype' aria-placeholder='Asset or Liability' value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                      <option value="---Select an Option---">---Select an Option---</option>
                      <option value="Asset">Asset</option>
                      <option value="Liability">Liability</option>
                    </select>
                    <div className='formbuttons'>
                      <button className='' onClick={async (e) => {
                        e.preventDefault();
                        await addAccount(accountName, balance, accountType);
                        await loadAccounts();
                        setAccountFormStatus(false);
                        setAccountName("");
                        setBalance("");
                      }}>Add Account</button>
                      <button className='formcancel' onClick={() => setAccountFormStatus(false)}>Cancel</button>
                    </div>
                  </div>
                </form>
              </>
            )}

            <div className='borrowingaccountscontainer'>
              <h3>Borrowing Accounts:</h3>
              <div className='noaccounts'>
                {(accounts == null || accounts.filter((account) => account.accountType === "Liability").length === 0) && (
                  <p>Good on ya for not being in debt!</p>
                )}
              </div>
              <div className='currentaccounts'>
                {accounts?.filter((account) => account.accountType === "Liability").map((account, index) => (
                  <div key={index} className='accountbox'>
                    <h3>{account.accountName}</h3>
                    <p>Current Balance: ${account.balance}</p>
                    <button id='deleteaccount' onClick={async () => {
                      await deleteAccount(account.accountName);
                      await loadAccounts();
                    }}>Delete</button>
                  </div>
                ))}
              </div>
              <button id='addaccountbutton' onClick={() => setAccountFormStatus(true)}>Add Account</button>
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

export default Accounts;
