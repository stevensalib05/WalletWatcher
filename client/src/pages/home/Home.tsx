import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/users/me");
      const userInfo = await res.json();
      setUserData(userInfo);
    }

    loadUser();
  }, []);

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
          <h1>Welcome Back, {userData?.firstName}!</h1>
        </div>
      </div>
    </>
  );
}

interface User {
  email: String,
  firstName: String,
  lastName: String,
}

export default Home;