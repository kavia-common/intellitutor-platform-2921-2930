import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import App from './App';

test('renders header brand', () => {
  render(
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
  const brand = screen.getByText(/Tutor Platform/i);
  expect(brand).toBeInTheDocument();
});
