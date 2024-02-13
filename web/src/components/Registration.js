import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { users } from '../Auth.js';
import '../styles/Registration.css'; // Import the CSS file for registration styles

function Registration() {
    const navigate = useNavigate();

    // a state var used to store data entered by user. 
    const [formData, setFormData] = useState({
        // contains key-value pairs for different form fields
        first_name: '',
        last_name:'',
        username: '',
        password: '',
        confirmPassword: '',
        photo: null, 
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null; // Check if files exist and if there's at least one file selected

        //const selectedFile = e.target.files[0]; // Access files from e.target
    
        setFormData({
        ...formData,
      //  [name]: value,
        [name]: name === 'photo' ? selectedFile : value,
        });
    };

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

    function validateConfirmPassword(password, confirmPassword){
      if (!confirmPassword || confirmPassword.trim().length === 0) {
        return 'Please confirm your password.';
      }
      if (!password || password.trim().length === 0) {
        return '';
      }
      if (password === confirmPassword) {
        return '';
      }
      return 'Passwords do not match.';
    }  
    
    // Username can be either a phone number or your email address
    function validateUsername(username){
      if (!username || typeof username !== 'string' || username.trim().length === 0) {
        return 'Username is required.';
      }
      if (username.length < 3) {
        return 'Username is too short.';
      }
      if (username.length > 20) {
        return 'Username is too long.';
      }
    
      return ''; // No errors
    }

    function validateName(name){
    
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return 'Name and last name are required.';
      }
    
      // Regular expression pattern for letters only
      const pattern = /^[A-Za-z]+$/;
    
      // Test if the name contains only letters
      const containsOnlyLetters = pattern.test(name);
    
      if (!containsOnlyLetters) {
        return 'Invalid input. Names must contain letters only.';
      }
    
      return ''; // No errors
    
    }

  const handleSubmit = (e) => {
    e.preventDefault(); //  prevent page from getting reloaded (otherwise we will loose our state)
     
  // Validate form fields
  const firstnameError =  validateName(formData.first_name);
  const lastnameError =  validateName(formData.last_name);
  const usernameError = validateUsername(formData.username);
  const passwordError = validatePassword(formData.password);
  const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

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
        photo : formData.photo,
    }; 

    users.push(user);
    navigate("/");
    
    console.log('Registration data:', formData);
    setErrors({});

    }
  };

  return (
    <div className="registration-container">
      <h1 className='logo-text'>facebook</h1>

      <div className="registration-box">
        <div className='registration-header'>
          <h2>Create a new account</h2>
          <h3>It’s quick and easy.</h3>
        </div >

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div style={{marginTop:'15px'}} className="form-group">
              <label></label>
              <input
                type="file"
                name="photo"
                accept="image/*" 
                onChange={handleChange}
              />
            </div>
            <div className="name_inputs">
              {errors.first_name && <span style={{position:'absolute'}} className="error-message">{errors.last_name}</span>}
              <input 
                className="registration-input left"
                type="text"
                name="first_name"
                placeholder='First name'
                value={formData.first_name}
                onChange={handleChange}
              />
            
              <input
                className="registration-input right"
                type="text"
                name="last_name"
                placeholder='Last name'
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
            
          <div className="form-group">
              {errors.username && ( <span className="error-message">{errors.username}</span>)}
            <label></label>
            <input
              type="text"
              name="username"
              placeholder='User Name'
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            {errors.password && <span className="error-message">{errors.password}</span>}
            <label></label>
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            <label></label>
            <input
              type="password"
              name="confirmPassword"
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button className='registration-button' type="register">sign up</button>

          <p className="login-footer">
              <a href="/login">Already have an account?</a>  
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;



