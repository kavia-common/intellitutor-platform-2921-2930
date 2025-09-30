import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header brand', () => {
  render(<App />);
  const brandElement = screen.getByText(/IntelliTutor/i);
  expect(brandElement).toBeInTheDocument();
});
