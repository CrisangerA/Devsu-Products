import React from 'react';
import { render, screen } from '@test-utils';
import ProductsError from '@modules/products/ui/components/ProductsList/ProductsError';

describe('ProductsError', () => {
  it('renders error message', () => {
    const errorMessage = 'Error al cargar productos';
    render(<ProductsError message={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it('renders with custom message', () => {
    const customMessage = 'Something went wrong';
    render(<ProductsError message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeTruthy();
  });

  it('renders with error color variant', () => {
    render(<ProductsError message="Error message" />);
    const text = screen.getByText('Error message');
    expect(text).toBeTruthy();
  });
});
