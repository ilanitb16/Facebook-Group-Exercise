import React, { useState } from 'react';
import { authenticateUser } from '../Auth';
import '../styles/Login.css'; // Import the CSS file


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // flag to track login status

  const handleLogin = () => {
    // Add login logic here.
    const user = authenticateUser(username, password);

    if (user) {
        // Authentication successful
        setLoggedIn(true);
        alert('You are logged in.');
      } else {
        // Authentication failed
        alert('Incorrect username or password. Please try again.');
      }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo"></div>
        <h2 className="login-header">Log Into Facebook</h2>
        <form className="login-form">
          <div className="form-group">
            <label></label> 
            <input
              className='login-input'
              type="text"
              value={username}
              placeholder='Email or phone number'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label></label>
            <input
              className='login-input'
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin} className="login-button">
            Login
          </button>
        </form>
        <p className="login-footer">
          <a href="#">Forgot Password?</a> · <a href="#">Sign up for Facebook</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
