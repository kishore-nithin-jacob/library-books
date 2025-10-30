import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('renders nav title', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getByText(/Library Manager/i)).toBeInTheDocument();
  });
});
