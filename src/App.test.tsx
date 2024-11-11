import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerView from './views/CustomerView';

test('renders learn react link', () => {
  render(<CustomerView />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
