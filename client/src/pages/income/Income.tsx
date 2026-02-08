import './Income.css';
import { useNavigate } from 'react-router-dom';

function Income() {
    const navigate = useNavigate();
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
            <select className='incomeType' aria-placeholder='Hourly or Salary'>
              <option value='---Select an Option---'>---Select an Option---</option>
              <option value='Hourly'>Hourly</option>
              <option value='Salary'>Salary</option>
              </select>

          </div>
        </div>
      </>
    );
}

export default Income;
