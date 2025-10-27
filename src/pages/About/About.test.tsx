import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import About from './About';

describe('About', () => {
  it('renders the page title', () => {
    render(<About />);

    expect(screen.getByRole('heading', { name: /senior frontend developer/i })).toBeInTheDocument();
  });

  it('renders main requirement sections', () => {
    render(<About />);

    expect(screen.getByText(/1\. sorting functionality/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. pagination/i)).toBeInTheDocument();
    expect(screen.getByText(/3\. responsive layout/i)).toBeInTheDocument();
  });

  it('renders evaluation criteria', () => {
    render(<About />);

    expect(screen.getByText(/code quality/i)).toBeInTheDocument();
    expect(screen.getByText(/scalability/i)).toBeInTheDocument();
  });
});
