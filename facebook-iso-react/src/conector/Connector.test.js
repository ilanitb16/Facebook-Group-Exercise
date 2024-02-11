import { render, screen } from '@testing-library/react';
import Connector from './Connector';

test('check if hello world exists', () => {
  render(<Connector />);
  const linkElement = screen.getByText(/Hello world/i);
  expect(linkElement).toBeInTheDocument();
});
