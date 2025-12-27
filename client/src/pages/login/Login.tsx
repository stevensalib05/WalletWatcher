import './Login.css';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

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
            <GoogleLogin onSuccess={(credentialResponse) => {
              onLoginOk(credentialResponse);
              navigate('/home');
            }} onError={() => console.log("Temp Failed")} />                
          </div>
        </div>
      </div>
    </>
  );
}

async function onLoginOk(res: CredentialResponse) {
  const jwtDecoder = jwtDecode(res.credential ?? "");

  const response = await fetch("/api/users/");
  if (!response.ok) throw new Error("Error " + response.status);

  const userData = await response.json();
  const jwtEmail = (jwtDecoder as any).email;
  const jwtFirst = (jwtDecoder as any).given_name;
  const jwtLast = (jwtDecoder as any).family_name;
  const user = userData.userList.find((u: { email: String}) => u.email.toLowerCase() === jwtEmail.toLowerCase());

  const userJSON = {
    email: jwtEmail,
    firstName: jwtFirst,
    lastName: jwtLast,
  }

  console.log(jwtDecoder);

  if (!user) {
    const req = await fetch("/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userJSON),
    });

    if (!req.ok) throw new Error("Error " + req.status);
  }
}

export default Login;