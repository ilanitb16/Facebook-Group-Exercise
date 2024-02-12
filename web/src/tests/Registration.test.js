import "../components/Registration.js"
import Registration from "../components/Registration.js";


  describe('Registration test', () => {
    it('displays error message for empty fields', () => {
      render(<Registration />);
      fireEvent.click(screen.getByText('Register')); // Simulate register button click
      expect(screen.getByText('First name is required.')).toBeInTheDocument();
      expect(screen.getByText('Last name is required.')).toBeInTheDocument();
      expect(screen.getByText('Email is required.')).toBeInTheDocument();
      expect(screen.getByText('Password is required.')).toBeInTheDocument();
    });
  }); 

