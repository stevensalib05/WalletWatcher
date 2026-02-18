import './Goals.css';
import { useNavigate } from 'react-router-dom';
import {  useState, useEffect } from 'react';

function Goals() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState<User | null>(null);
    const [goalData, setGoalData] = useState<any[]>([]);
    const [goal, setGoal] = useState<string>("");

    useEffect(() => {
      loadUser();
    }, []);

    useEffect(() => {
      if (!userData?.email) return;
      loadGoals()
    }, [userData]);

    async function loadUser() {
      const res = await fetch("/api/users/me", { credentials: "include" });
      if (!res.ok) throw new Error("User is not logged in.");
      const userInfo: User = await res.json();

      setUserData(userInfo);
    }

    async function addGoal() {
      const data = {
        email: userData?.email,
        goal: goal,
      };

      if (goal === '' || goal == null) return alert("Please enter a valid goal.");

      const res = await fetch(`/api/goals/${userData?.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to Add Goal.");
    }

    async function loadGoals() {
      const res = await fetch(`/api/goals/${userData?.email}`, { credentials: "include" });
      const data = await res.json();
      setGoalData(data);
    }

    async function deleteGoal(id: number) {
      const res = await fetch(`/api/goals/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to Delete Goal.");

      loadGoals();
    }

    return (
      <>
        <div className='goalscontainer'>
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

          <div className='goals'>
            <h1>Goals</h1> <br />
            <p>On this page, you can just add a list of goals that you want your budget to achieve (i.e: Save $5000 to take a massive vacation). This will be read by the AI to help you create a budget accordingly.</p>
            <form className='goalsform' onSubmit={(e) => { e.preventDefault(); addGoal(); }}>
              <div className='goalsinput'>
                <input id='goalinput' type='text' placeholder='Enter your Budget Goals Here...' value={goal} onChange={(e) => setGoal(e.target.value)}></input>
                <button id='addgoalbutton' type='submit'>Add Goal</button>
              </div>
            </form>

            <div className='currentgoals'>
              <h3>Current Goals:</h3>
              <div className='goalslist'>
                {goalData.map((goal) => (
                  <div key={goal.id} className='goallistitem'>
                    <p>Goal ID: {goal.id}</p>
                    <p>Goal: {goal.goal}</p>
                    <button className='deletegoalbutton' type='button' onClick={(e) => { e.preventDefault(); deleteGoal(goal.id); }}>Delete</button>
                  </div>
                ))}
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

export default Goals;
