// src/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the Login.css file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/devices');
      })
      .catch((error) => {
        alert("Invalid Crediantials")
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form>
        <h1 className='logtext'>Login</h1>
        <label htmlFor="email">Email : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br/><br/><br/><br/>
        <label htmlFor="password">Password :&nbsp;&nbsp;</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br/><br/><br/><br/>
        <button className="login-button" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
