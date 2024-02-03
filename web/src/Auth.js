// src/services/AuthService.js

// Simulated user data (will be replaced with actual user data later on)
export const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
];
  
export const authenticateUser = (username, password) => {
  // authentication logic
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    // Authentication successful

    return user;
  } else {
    // Authentication failed
    return null;
  }
};

export default {
  users,
}
  