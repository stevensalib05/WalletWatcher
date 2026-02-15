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
            <li className='navbaritem'><a href="" onClick={() => navigate('/home')}>Home</a></li>
            <li className='navbaritem'><a href="" onClick={() => navigate('/accounts')}>Accounts</a></li>
            <li className='navbaritem'><a href="" onClick={() => navigate('/income')}>Income</a></li>
            <li className='navbaritem'><a href="" onClick={() => navigate('/goals')}>Goals</a></li>
            <li className='navbaritem'><a href="" onClick={() => navigate('/budget')}>Budget</a></li>
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
  email: string,
  firstName: string,
  lastName: string,
}

export default Home;