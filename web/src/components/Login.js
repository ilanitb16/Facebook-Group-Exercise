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
      } else {
        // Authentication failed
        alert('Incorrect username or password. Please try again.');
      }
  };

  return (
    <div className="login-container">
      {loggedIn ? (
        <p>You are logged in!</p>
      ) : (
        <>
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
