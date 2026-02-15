import './Goals.css';
import { useNavigate } from 'react-router-dom';

function Goals() {
    const navigate = useNavigate();

    async function addGoal() {

    }

    return (
      <>
        <div className='goalscontainer'>
          <div className='navbar'>
            <ul className='navbarcontent'>
              <li className='navbaritem'><a href="" onClick={() => navigate('/home')}>Home</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/accounts')}>Accounts</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/income')}>Income</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/goals')}>Goals</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/budget')}>Budget</a></li>
              <li className='navbaritem' id='logout'><a href="" onClick={() => navigate('/')}>Logout</a></li>
            </ul>
          </div>

          <div className='goals'>
            <h1>Goals</h1> <br />
            <p>On this page, you can just add a list of goals that you want your budget to achieve (i.e: Save $5000 to take a massive vacation). This will be read by the AI to help you create a budget accordingly.</p>
            <form className='goalsform' onSubmit={addGoal}>
              <div className='goalsinput'>
                <input id='goalinput' type='text' placeholder='Enter your Budget Goals Here...'></input>
                <button id='addgoalbutton' type='submit'>Add Goal</button>
              </div>
            </form>

            <div className='currentgoals'>
              <h3>Current Goals:</h3>
              <div className='goalslist'>
                
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Goals;