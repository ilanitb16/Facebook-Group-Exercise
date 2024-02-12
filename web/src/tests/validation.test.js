import Registration from "../components/Registration";

// Registration.validatePassword("Abc123!");
function validatePasswordTests(){
    // Password validation tests
    console.log(validatePassword("Abc123!")); // Should return an empty string for a valid password
    console.log(validatePassword("abc123")); // Should return an error message
}

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

function runValidationTests() {
    validatePasswordTests();
    validateConfirmPasswordTests();
    validateUsernameTests();
    validateNameTests();
}