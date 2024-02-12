import Login from "../components/Login.js";

describe('Login test', () => {
    it('displays error message for empty username and password', () => {
      render(<Login />);
      fireEvent.click(screen.getByText('Login')); // Simulate login button click
      expect(screen.getByText('Username is required.')).toBeInTheDocument();
      expect(screen.getByText('Password is required.')).toBeInTheDocument();
    });
  });