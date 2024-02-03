import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Registration.css'; // Import the CSS file for registration styles
import {users} from '../Auth.js';

// Import the necessary components from react-router-dom


function Registration() {
    const navigate = useNavigate();
    const [registeredUser, setRegisteredUser] = useState(null); // state variable that holds info about user

    // a state var used to store data entered by user. 
    const [formData, setFormData] = useState({
        // contains key-value pairs for different form fields
        first_name: '',
        last_name:'',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target)
        setFormData({
        ...formData,
        [name]: value,
        });
    };

const handleSubmit = (e) => {
    e.preventDefault(); //  prevent page from getting reloaded (otherwise we will loose our state)
    // const user = {
    //     username: formData.username,
    //     password: formData.confirmPassword,
    //     first_name: formData.first_name,
    //     last_name: formData.last_name,
    //   }; 

    // users.push(user);
    // navigate("/login");
    // return;

    // Validation function meeting facebook's password requirements:
    function validatePassword(password) {
    // facebook's requirments: 
    //Passwords must be at least eight characters long, and include a combination 
    // of lower and uppercase letters, special characters, and numbers.


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

// Username can be either a phone number or your email address
function validateUsername(username){

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
     
  // Validate form fields
  const firstnameError = validateUsername(formData.first_name);
  const lastnameError = validateUsername(formData.last_name);
  const usernameError = validateUsername(formData.username);
  const passwordError = validatePassword(formData.password);
  const confirmPasswordError = validateUsername(formData.confirmPassword);

  // Check for validation errors
  if (firstnameError !== '' || lastnameError !== ''|| passwordError !== '' || confirmPasswordError !== '' || usernameError !== ''){
    // update the state of the errors accordingly
    setErrors({
        username: usernameError,
        first_name: firstnameError,
        last_name:lastnameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
  } else {
    // No validation errors - success

    const user = {
        username: formData.username,
        password: formData.confirmPassword,
        first_name: formData.first_name,
        last_name: formData.last_name,
      }; 

    users.push(user);
    navigate("/login");

    // setRegisteredUser(user); // Save the registration information 
    
    console.log('Registration data:', formData);
  }

  };

  return (
    <div className="registration-container">
            <h1 className='logo-text'>facebook</h1>
    <div className="registration-box">

    <div className='registration-header'>
        <h2>Create a new account</h2>
        <h5 style={{color:'grey'}}>It’s quick and easy.</h5>
    </div >

<form onSubmit={handleSubmit}>
    <div className="form-group">
    <div className="name_inputs">
          <label></label>
          <input 
            className="registration-input"
            type="text"
            name="first_name"
            placeholder='First name'
            value={formData.first_name}
            onChange={handleChange}
          />
          <label></label>
          <input
            className="registration-input"
            type="text"
            name="last_name"
            placeholder='Last name'
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.first_name && <span className="error">{errors.last_name}</span>}
        </div>
    </div>
       

        <div className="form-group">
          <label></label>
          <input
            type="text"
            name="username"
            placeholder='username'
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <span className="error">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label></label>
          <input
            type="password"
            name="password"
            placeholder='password'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>


        <div className="form-group">
          <label></label>
          <input
            type="password"
            name="confirmPassword"
            placeholder='confirm password'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <button className='registration-button' type="register">sign up</button>

        <p className="login-footer">
            <a href="Login.js">Already have an account?</a> 
        </p>
</form>
      </div>
</div>
  );
}

export default Registration;



