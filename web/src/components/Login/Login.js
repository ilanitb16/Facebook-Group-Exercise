import React, { useState } from 'react';
import { authenticateUser } from '../../Auth';
import { useNavigate, Link } from "react-router-dom";
import { useUser } from '../../providers/user_context';
import './Login.css'; // Import the CSS file


const Login = ({ darkMode, toggleDarkMode }) => {
  const [user, setUser] = useUser();
  const navigate = useNavigate()

  // useState is used to declare & manage state variables in a component
  const [username, setUsername] = useState(''); // init state variable with value = empty string ''
  const [password, setPassword] = useState(''); // init state variable with value = empty string ''
  const [loggedIn, setLoggedIn] = useState(false); // flag to track login status
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message
// Assume authenticateUser function is defined in '../../Auth' module


 const authenticateUser = (username, password) => {
  // Define the default user
  const defaultUser = { username: '1', password: '1', photo: 'default.jpg' };

  // Check if the provided username and password match the default user
  if (username === defaultUser.username && password === defaultUser.password) {
    return defaultUser; // Return the default user if authentication is successful
  } else {
    return null; // Return null if authentication fails
  }
};

  const handleLogin = () => {
    const user = authenticateUser(username, password);

    if (user) {
        // Authentication successful
        setLoggedIn(true);
        setUser({authenticated: true, username: user.username, photo: user.photo});
        navigate("/");
        
      } else {
        // Authentication failed
        setErrorMessage('Incorrect username or password. Please try again.'); // Set error message
      }
  };

  
  return (
   // <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>

    <div className="login-container">
      <h1 className='logo-text1'>facebook</h1>
      <div className="login-box">
        <h2 className="login-header">Log Into Facebook</h2>
        <form className="login-form">
          <div className="form-group">
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
            <label></label> 
            <input
              className='login-input'
              type="text"
              value={username}
              placeholder='Username'
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
          <a href="#">Forgot Password?</a> · <Link to="/registration">Sign up for Facebook</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;