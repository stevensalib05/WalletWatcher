import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className='welcomecontainer'>
        <div className='navbar'>
          <ul className='navbarcontent'>
            <li className='navbaritem'><a href="">Home</a></li>
            <li className='navbaritem'><a href="#Accounts">Accounts</a></li>
            <li className='navbaritem'><a href="#Budget">Budget</a></li>
            <li className='navbaritem' id='logout'><a href="" onClick={() => navigate('/')}>Logout</a></li>
          </ul>
        </div>
        <div className='welcome'>
          <h1>Welcome Back, !</h1>
        </div>
      </div>
    </>
  );
}

export default Home;