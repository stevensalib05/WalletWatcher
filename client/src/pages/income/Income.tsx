import './Income.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Income() {
    const navigate = useNavigate();
    const [incomeType, setIncomeType] = useState<string>('');
    return (
      <>
        <div className='navbar'>
          <ul className='navbarcontent'>
            <li className='navbaritem'><a href="" onClick={() => navigate('/home')}>Home</a></li>
            <li className='navbaritem'><a href="" onClick={() => navigate('/accounts')}>Accounts</a></li>
            <li className='navbaritem'><a href="" onClick={() => navigate('/income')}>Income</a></li>
            <li className='navbaritem'><a href="" onClick={() => navigate('/budget')}>Budget</a></li>
            <li className='navbaritem' id='logout'><a href="" onClick={() => navigate('/')}>Logout</a></li>
          </ul>
        </div>


        <div className='incomecontainer'>
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
                  <input type='text' name='incomeName' placeholder='e.g., Part-time job' />
                </label><br />
                <label>
                  Amount ($/h) &emsp;
                  <input type='number' name='incomeAmount' placeholder='e.g., 20' />
                </label><br />
                <label>
                  Hours/Week &ensp; &ensp;
                  <input type='number' name='incomeHours' placeholder='e.g., 25' />
                </label><br />
              </div>
            )}

            {incomeType === 'Salary' && (
              <div className='incomeSalaryFields'>
                <label>
                  Income Name &ensp;
                  <input type='text' name='incomeName' placeholder='e.g., Full Time Babysitting' />
                </label><br />
                <label>
                  Amount ($) &emsp; &ensp;
                  <input type='number' name='incomeAmount' placeholder='65000' />
                </label><br />
              </div>
            )}
          </div>
        </div>
      </>
    );
}

export default Income;
