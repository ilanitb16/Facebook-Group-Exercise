import "../components/Registration.js"

function runValidationTests() {
    // Password validation tests
    console.log(validatePassword("Abc123!")); // Should return an empty string for a valid password
    console.log(validatePassword("abc123")); // Should return an error message
  
    // Confirm password validation tests
    console.log(validateConfirmPassword("password", "password")); // Should return an empty string for matching passwords
    console.log(validateConfirmPassword("password", "different")); // Should return an error message
  
    // Username validation tests
    console.log(validateUsername("validUsername")); // Should return an empty string for a valid username
    console.log(validateUsername("a")); // Should return an error message for a too short username
  
    // Name validation tests
    console.log(validateName("John")); // Should return an empty string for a valid name
    console.log(validateName("John123")); // Should return an error message for containing numbers
  }
  
  // Call the function to run the validation tests
  runValidationTests();
  
// const {
//     validatePassword,
//     validateConfirmPassword,
//     validateUsername,
//     validateName,
//   } = require('./'); // The correct import path
  
//   // Test cases for validatePassword function
//   describe('validatePassword', () => {
//     it('should return an error message when password is too short', () => {
//       const password = 'Ab1'; // Too short
//       const result = validatePassword(password);
//       expect(result).toBe('Password must be at least 8 characters long.');
//     });
  
//     it('should return an error message when password lacks uppercase letter', () => {
//       const password = 'password1!'; // Missing uppercase letter
//       const result = validatePassword(password);
//       expect(result).toBe('Password must contain at least one uppercase letter.');
//     });
  
//     it('should return an error message when password lacks lowercase letter', () => {
//       const password = 'PASSWORD1!'; // Missing lowercase letter
//       const result = validatePassword(password);
//       expect(result).toBe('Password must contain at least one lowercase letter.');
//     });
  
//     it('should return an error message when password lacks a digit', () => {
//       const password = 'Password!'; // Missing digit
//       const result = validatePassword(password);
//       expect(result).toBe('Password must contain at least one digit.');
//     });
  
//     it('should return an error message when password lacks a special character', () => {
//       const password = 'Password123'; // Missing special character
//       const result = validatePassword(password);
//       expect(result).toBe('Password must contain at least one special character.');
//     });
  
//     it('should return an empty string when password meets requirements', () => {
//       const password = 'Password1!'; // Meets requirements
//       const result = validatePassword(password);
//       expect(result).toBe('');
//     });
//   });
  
//   // Test cases for validateConfirmPassword function
//   describe('validateConfirmPassword', () => {
//     it('should return an empty string when passwords match', () => {
//       const password = 'Password1!';
//       const confirmPassword = 'Password1!';
//       const result = validateConfirmPassword(password, confirmPassword);
//       expect(result).toBe('');
//     });
  
//     it('should return an error message when passwords do not match', () => {
//       const password = 'Password1!';
//       const confirmPassword = 'MismatchedPassword';
//       const result = validateConfirmPassword(password, confirmPassword);
//       expect(result).toBe('Passwords are not matching');
//     });
//   });
  
//   // Test cases for validateUsername function
//   describe('validateUsername', () => {
//     it('should return an error message when username is too short', () => {
//       const username = 'ab'; // Too short
//       const result = validateUsername(username);
//       expect(result).toBe('Username too short.');
//     });
  
//     it('should return an error message when username is too long', () => {
//       const username = 'toolongusername1234567890'; // Too long
//       const result = validateUsername(username);
//       expect(result).toBe('Username too long.');
//     });
  
//     it('should return an error message when username contains non-alphabet characters', () => {
//       const username = 'user@name'; // Contains non-alphabet characters
//       const result = validateUsername(username);
//       expect(result).toBe('Username is required.');
//     });
  
//     it('should return an empty string when username is valid', () => {
//       const username = 'ValidUsername'; // Valid username
//       const result = validateUsername(username);
//       expect(result).toBe('');
//     });
//   });
  
//   // Test cases for validateName function
//   describe('validateName', () => {
//     it('should return an error message when name is empty', () => {
//       const name = ''; // Empty name
//       const result = validateName(name);
//       expect(result).toBe('Name and last name are required.');
//     });
  
//     it('should return an error message when name contains non-alphabet characters', () => {
//       const name = 'John123'; // Contains non-alphabet characters
//       const result = validateName(name);
//       expect(result).toBe('Invalid input. Names must contain letters only.');
//     });
  
//     it('should return an empty string when name is valid', () => {
//       const name = 'John'; // Valid name
//       const result = validateName(name);
//       expect(result).toBe('');
//     });
//   });
  