import './Expenses.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Expenses() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState('');
  const [expenseData, setExpenseData] = useState<any[]>([]);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (!userData?.email) return;
    loadExpenses();
  }, [userData]);

  async function loadUser() {
    const res = await fetch("/api/users/me", { credentials: "include" });
    if (!res.ok) throw new Error("User is not logged in.");
    const userInfo: User = await res.json();

    setUserData(userInfo);
  }

  async function loadExpenses() {
    const res = await fetch(`/api/expenses/${userData?.email}`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to Fetch Expenses.");
    const expenses = await res.json();

    setExpenseData(expenses);
  }

  async function addExpense() {
    const expenseData = {
      email: userData?.email,
      name: name,
      category: category,
      amount: amount,
      frequency: frequency,
    };

    if (name === '' || name == null || category === '' || category == null || frequency === '' || frequency == null) return alert("Please fill out all fields.");
    if (amount <= 0 || isNaN(amount)) return alert("Please enter a valid amount.");

    const res = await fetch(`/api/expenses/${userData?.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(expenseData),
    });

    if (!res.ok) throw new Error("Failed to Add Expense.");

    loadExpenses();
  }

  async function deleteExpense(id: number) {
    const res = await fetch(`/api/expenses/${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to Delete Expense.");

    loadExpenses();
  }

  return (
    <>
      <div className="expensescontainer">
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

          <div className='expenses'>
            <h1>Expenses</h1>
            <form className='expensesform' onSubmit={(e) => { e.preventDefault(); addExpense(); }}>
              <div className='expensesinput'>
                <label>Name:</label><input id='expenseinput' type='text' placeholder='Netflix, Spotify, Phone Bill, etc...' value={name} onChange={(e) => setName(e.target.value)}></input>
                <label>Type:</label><select id='expensecategory' aria-placeholder='---Select an Option---' value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value='RENT'>RENT</option>
                  <option value='UTILITIES'>UTILITIES</option>
                  <option value='FOOD'>FOOD</option>
                  <option value='TRANSPORT'>TRANSPORT</option>
                  <option value='INSURANCE'>INSURANCE</option>
                  <option value='ENTERTAINMENT'>ENTERTAINMENT</option>
                  <option value='SUBSCRIPTION'>SUBSCRIPTION</option>
                  <option value='HEALTH'>HEALTH</option>
                  <option value='DEBT'>DEBT</option>
                  <option value='OTHER'>OTHER</option>
                </select>
                <label>Amount:</label><input id='expenseamount' type='number' placeholder='120.25' inputMode='decimal' value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)} />
                <label>Frequency:</label><select id='expensefrequency' aria-placeholder='Monthly' value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                  <option value='WEEKLY'>WEEKLY</option>
                  <option value='BIWEEKLY'>BIWEEKLY</option>
                  <option value='MONTHLY'>MONTHLY</option>
                  <option value='YEARLY'>YEARLY</option>
                </select>
                <button id='addexpensebutton' type='submit'>Add Expense</button>
              </div>
            </form>
            <div className='expenseList'>
              {expenseData.map((expense) => (
                <div className='expenseItem' key={expense.id}>
                  <h3>{expense.name}</h3>
                  <div className='expenseDetails'>
                    <p>Category: {expense.category}</p>
                    <p>Amount: ${expense.amount}</p>
                    <p>Frequency: {expense.frequency}</p>
                  </div>
                  <button type='button' className='deleteExpenseButton' onClick={(e) => { e.preventDefault(); deleteExpense(expense.id); }}>Delete</button>
                </div>
              ))}
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

export default Expenses;
