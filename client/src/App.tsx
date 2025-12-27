import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.tsx';
import Welcome from './pages/welcome/Welcome.tsx';
import Home from './pages/home/Home.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;