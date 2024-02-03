import React, { useState } from 'react';
import { authenticateUser } from '../Auth';
import { useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useUser } from '../providers/user_context';
import '../styles/Login.css'; // Import the CSS file


const Login = () => {
  const [user, setUser] = useUser();
    const navigate = useNavigate()

  // useState is used to declare & manage state variables in a component
  const [username, setUsername] = useState(''); // init state variable with value = empty string ''
  const [password, setPassword] = useState(''); // init state variable with value = empty string ''
  const [loggedIn, setLoggedIn] = useState(false); // flag to track login status


  const handleLogin = () => {
    const user = authenticateUser(username, password);

    if (user) {
        // Authentication successful
        setLoggedIn(true);
        setUser({authenticated: true});
        navigate("/");

        // alert('You are logged in.');
      } else {
        // Authentication failed
        alert('Incorrect username or password. Please try again.');
      }
  };

  // Validation function meeting facebook's password requirements:
  //Passwords must be at least eight characters long, and include a combination 
  // of lower and uppercase letters, special characters, and numbers.
  function validatePassword(password) {
    // password length check
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

     // at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }

     // at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }

    // at least one digit 
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one digit.';
    }

    // at least one special character 
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return 'Password must contain at least one special character.';
    }

    // all checks passed, returns empty string
    return '';
  }

  // username can be either a phone number or your email address
  function validateUsername(){

   // Regular expression for phone number 
  const phoneNumberPattern = /^[0-9]{10}$/; // Matches 10-digit numbers

  // Regular expression for Gmail address
  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


   // Test if the input is a phone number or a Gmail address
   if (phoneNumberPattern.test(username)) {
    return ''; // Valid phone number
  } else if (gmailPattern.test(username)) {
    return ''; // Valid Gmail address
  } else {
    return 'Username must be a valid phone number or Gmail address.'; //invalid input 
  }
  }

  return (
    <div className="login-container">
      <div className="registration-box">
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
          <a href="#">Forgot Password?</a> · <Link to="/registration">Sign up for Facebook</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
