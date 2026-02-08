import './Budget.css';
import { useNavigate } from 'react-router-dom';

function Budget() {
    const navigate = useNavigate();
    return (
          <div className='navbar'>
            <ul className='navbarcontent'>
              <li className='navbaritem'><a href="" onClick={() => navigate('/home')}>Home</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/accounts')}>Accounts</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/income')}>Income</a></li>
              <li className='navbaritem'><a href="" onClick={() => navigate('/budget')}>Budget</a></li>
              <li className='navbaritem' id='logout'><a href="" onClick={() => navigate('/')}>Logout</a></li>
            </ul>
          </div>
    )
}

export default Budget;