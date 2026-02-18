import './Income.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Income() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null);
    const [incomeType, setIncomeType] = useState<string>('');
    const [incomeName, setIncomeName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [weeklyHours, setWeeklyHours] = useState<number>(0);
    const [incomeData, setIncomeData] = useState<any[]>([]);

    useEffect(() => {
      loadUser();
    }, []);

    useEffect(() => {
      if (!userData?.email) return;
      loadIncomes()
    }, [userData]);

    async function loadUser() {
      const res = await fetch("/api/users/me", { credentials: "include" });
      if (!res.ok) throw new Error("User is not logged in.");
      const userInfo: User = await res.json();

      setUserData(userInfo);
    }

    async function addIncome() {
      const incomeData = {
        amount: amount,
        email: userData?.email,
        incomeName: incomeName,
        incomeType: incomeType,
        weeklyHours: weeklyHours,
      };

      if (incomeType === '' || incomeName === '' || incomeType == null || incomeName == null) return alert("Please fill out all required fields.");
      if (amount <= 0 || isNaN(amount)) return alert("Please enter a valid amount.");

      const res = await fetch(`/api/incomes/${userData?.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(incomeData),
      });

      if (!res.ok) throw new Error("Failed to Add Income.");
    }

    async function loadIncomes() {
      const res = await fetch(`/api/incomes/${userData?.email}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to Fetch Incomes.");
      const income = await res.json();

      setIncomeData(income);
    }

    async function deleteIncome(incomeName: string) {
      const res = await fetch(`/api/incomes/${userData?.email}/${encodeURIComponent(incomeName)}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to Delete Income.");

      loadIncomes();
    }

    return (
      <div className='incomecontainer'>
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

        <div className='incomecontent'>
          <div className='incomeTopRow'>
            <div className='income'>
              <h1>Income</h1>
              <p>
                Okay so, this is an important one, so PLEASE input ALL forms of income here. Please only input it in form of $/h or in salary form.
                We only ask of this so that we can manually calculate yearly income from what you add and not for any other purpose.
                This is crucial as the AI will take this information, alongside its trained data and will attempt to make a budget for you!
              </p>
            </div>
            <div className='incomeInput'>
              <h2>Income Form</h2>
              <form onSubmit={(e) => { e.preventDefault(); addIncome(); }}>
                <label>
                  Income Type &emsp;
                  <select className='incomeType' aria-placeholder='Hourly or Salary' value={incomeType} onChange={(e) => {setIncomeType(e.target.value)}}>
                    <option value='---Select an Option---'>---Select an Option---</option>
                    <option value='Hourly'>Hourly</option>
                    <option value='Salary'>Salary</option>
                  </select>
                </label>

                {incomeType === 'Hourly' && (
                  <div className='incomeHourlyFields'>
                    <label>
                      Income name &ensp;
                      <input type='text' name='incomeName' placeholder='e.g., Part-time job' value={incomeName} onChange={(e) => setIncomeName(e.target.value)} />
                    </label><br />
                    <label>
                      Amount ($/h) &emsp;
                      <input type='number' name='incomeAmount' placeholder='e.g., 17.50' step='0.01' inputMode='decimal' value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    </label><br />
                    <label>
                      Hours/Week &ensp; &ensp;
                      <input type='number' name='incomeHours' placeholder='e.g., 25' value={weeklyHours} onChange={(e) => setWeeklyHours(Number(e.target.value))} />
                    </label><br />
                  </div>
                )}

                {incomeType === 'Salary' && (
                  <div className='incomeSalaryFields'>
                    <label>
                      Income Name &ensp;
                      <input type='text' name='incomeName' placeholder='e.g., Full Time Babysitting' value={incomeName} onChange={(e) => setIncomeName(e.target.value)} />
                    </label><br />
                    <label>
                      Amount ($) &emsp; &ensp;
                      <input type='number' name='incomeAmount' placeholder='65000' value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    </label><br />
                  </div>
                )}
                <button type='submit' id='addIncomeButton'>Add Income</button>
              </form>
            </div>
          </div>

          <div className='incomelist'>
            <h2>Income List</h2>
            {incomeData.length === 0 && (
              <p>No Income added to your account yet. Fill the form above to add it!</p>
            )}

            {incomeData.filter(income => income.incomeType === "Hourly").map((income) => (
              <div key={income.id} className='incomeItem'>
                <h3>{income.incomeName}</h3>
                <div className='incomeDetails'>
                  <p>Type of Income: {income.incomeType}</p>
                  <p>Amount Paid ($/h): {income.amount}</p>
                  <p>Hours/Week: {income.weeklyHours}</p>
                </div>
                <button className='deleteIncomeButton' type='button' onClick={(e) => { e.preventDefault(); deleteIncome(income.incomeName); }}>Delete</button>
              </div>
            ))}

            {incomeData.filter(income => income.incomeType === "Salary").map((income) => (
              <div key={income.id} className='incomeItem'>
                <h3>{income.incomeName}</h3>
                <div className='incomeDetails'>
                  <p>Type of Income: {income.incomeType}</p>
                  <p>Amount Paid ($/year): {income.amount}</p>
                </div>
                <button className='deleteIncomeButton' type='button' onClick={(e) => { e.preventDefault(); deleteIncome(income.incomeName); }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export default Income;
