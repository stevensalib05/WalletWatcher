import './Home.css';

function Home() {

  return (
    <>
      <div className='welcomecontainer'>
        <div className='navbar'>
          <ul className='navbarcontent'>
            <li className='navbaritem'><a href="#Home">Home</a></li>
            <li className='navbaritem'><a href="#Accounts">Accounts</a></li>
            <li className='navbaritem'><a href="#Budget">Budget</a></li>
            <li className='navbaritem'><a href="#Logout">Logout</a></li>
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