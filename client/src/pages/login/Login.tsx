import './Login.css';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-container">
        <div className="left-panel">
          <h1 className="app-title">Wallet Watcher</h1>
          <p className='app-subtitle'>Track Spending, Stay in Control.</p>
        </div>
        <div className='right-panel'>
          <div className='login-panel'>
            <GoogleLogin onSuccess={async (credentialResponse) => {
              const ok = await onLoginOk(credentialResponse);
              if (ok) navigate('/home');
            }} onError={() => console.log("Temp Failed")} />                
          </div>
        </div>
      </div>
    </>
  );
}

async function onLoginOk(res: CredentialResponse) {
  const resp = await fetch("/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ credential: res.credential })
  });

  return resp.ok;
}

export default Login;