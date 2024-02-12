import Registration from "../components/Registration.js";
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";


describe('Registration test', () => {
    it('displays error message for empty username and password', () => { 
      render(<BrowserRouter><Registration /></BrowserRouter>);
      fireEvent.click(screen.getByText('sign up')); // Simulate login button click
      expect(screen.getByText('Name and last name are required.')).toBeInTheDocument();
      expect(screen.getByText('Name and last name are required.')).toBeInTheDocument();
      expect(screen.getByText('Username is required.')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters long.')).toBeInTheDocument();
      expect(screen.getByText('Please confirm your password.')).toBeInTheDocument();

    });
  });

