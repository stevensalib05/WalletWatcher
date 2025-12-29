import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.tsx';
import Welcome from './pages/welcome/Welcome.tsx';
import Home from './pages/home/Home.tsx';
import Accounts from './pages/accounts/Accounts.tsx';
import Auth from './Auth.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Auth />}>
        <Route path="/home" element={<Home />} />
        <Route path="/accounts" element={<Accounts />} />
      </Route>
    </Routes>
  );
}

export default App;