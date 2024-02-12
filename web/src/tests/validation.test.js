import Registration from "../components/Registration";
import { BrowserRouter } from "react-router-dom";

import { expect, render } from '@testing-library/react';


describe('Validation functions test', () => {
    it('displays error message for username', () => {

        const component = render(<BrowserRouter><Registration /></BrowserRouter>).container.firstChild;
// console.log(component)
//         expect(component.validatePassword("aaa")).toBe('Password must be at least 8 characters long.');
//         expect(component.validatePassword("Aa@12345678")).toBe('');
//         expect(component.validatePassword("abc123456789")).toBe('Password must contain at least one uppercase letter.');
//         expect(component.validatePassword("AAAAAaaaaaa")).toBe('Password must contain at least one digit.');
//         expect(component.validatePassword("AAAAAaaaaaa12")).toBe('Password must contain at least one special character.');

    });
    
    // it('displays error message for password', () => {
    //     expect(Registration.validatePassword("aaa")).toBe('Password must be at least 8 characters long.');
    //     expect(Registration.validatePassword("Aa@12345678")).toBe('');
    //     expect(Registration.validatePassword("abc123456789")).toBe('Password must contain at least one uppercase letter.');
    //     expect(Registration.validatePassword("AAAAAaaaaaa")).toBe('Password must contain at least one digit.');
    //     expect(Registration.validatePassword("AAAAAaaaaaa12")).toBe('Password must contain at least one special character.');

    // });

    // it('displays error message for confirm password', () => {
    //     expect(Registration.validateConfirmPassword("Aa@1234567","Aa@1234567")).toBe('');
    //     expect(Registration.validateConfirmPassword("Aa@1234567","different")).toBe('Passwords do not match.');

    // });
});

// Registration.validatePassword("Abc123!");
// function validatePasswordTests(){
//     // Password validation tests
//     console.log(validatePassword("Abc123!")); // Should return an empty string for a valid password
//     console.log(validatePassword("abc123")); // Should return an error message
// }

function validateConfirmPasswordTests(){
    // Confirm password validation tests
    console.log(validateConfirmPassword("password", "password")); // Should return an empty string for matching passwords
    console.log(validateConfirmPassword("password", "different")); // Should return an error message
}

function validateUsernameTests(){
  // Username validation tests
  console.log(validateUsername("validUsername")); // Should return an empty string for a valid username
  console.log(validateUsername("a")); // Should return an error message for a too short username
}

function validateNameTests(){
    // Name validation tests
    console.log(validateName("John")); // Should return an empty string for a valid name
    console.log(validateName("John123")); // Should return an error message for containing numbers
}

// if (!username || typeof username !== 'string' || username.trim().length === 0) {
//     return 'Username is required.';
//   }
//   if (username.length < 3) {
//     return 'Username is too short.';
//   }
//   if (username.length > 20) {
//     return 'Username is too long.';
//   }