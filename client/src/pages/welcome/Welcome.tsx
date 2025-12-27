import './Welcome.css';
import { useNavigate } from 'react-router-dom';


function Welcome() {
  const navigate = useNavigate();
  return (
    <>
      <div className="landing-container">
        <div className="landing-card">
          <h1 className="app-title">Wallet Watcher</h1>
          <p className="app-subtitle">
            The trustworthy web app to help you budget your way out of debt!
          </p>

          <div className="button-group">
            <button className="primary-btn" onClick={() => navigate('/login')}>
              Log In
            </button>

            <button className="secondary-btn">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
